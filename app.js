/**
 * Project Zomboid Dashboard - Core Application Logic
 * Supports Account Aggregation, Total Kills Ranking, Death Count Leaderboards, and Character Log Sequence.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  let currentEarthFilter = 'all';
  let currentSearchQuery = '';
  let currentStatusFilter = 'all';
  let currentSortOption = 'kills-desc';
  let currentViewMode = 'table';

  // DOM Elements
  const statTotalAccounts = document.getElementById('stat-total-accounts');
  const statTotalKills = document.getElementById('stat-total-kills');
  const statTopKiller = document.getElementById('stat-top-killer');
  const statTopKillerKills = document.getElementById('stat-top-killer-kills');
  const statTopDead = document.getElementById('stat-top-dead');
  const statTopDeadCount = document.getElementById('stat-top-dead-count');

  const earthTabsContainer = document.getElementById('earth-tabs');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const statusFilterSelect = document.getElementById('status-filter');
  const sortSelect = document.getElementById('sort-select');

  const viewTableBtn = document.getElementById('view-table-btn');
  const viewCardsBtn = document.getElementById('view-cards-btn');
  const tableViewContainer = document.getElementById('table-view-container');
  const cardsViewContainer = document.getElementById('cards-view-container');

  const characterTableBody = document.getElementById('character-table-body');
  const visibleCountEl = document.getElementById('visible-count');
  const noDataMsg = document.getElementById('no-data-msg');

  // Verify dataset availability
  const rawDataset = (typeof zomboidData !== 'undefined' && Array.isArray(zomboidData)) ? zomboidData : [];

  // Initialize App
  function init() {
    renderOverviewStats();
    buildEarthTabs();
    setupEventListeners();
    applyFilterAndRender();
  }

  // Header Summary Cards (Total Accounts, Kills, Top Kills Rank, Top Deaths Rank)
  function renderOverviewStats() {
    if (rawDataset.length === 0) {
      if (statTotalAccounts) statTotalAccounts.textContent = '0';
      if (statTotalKills) statTotalKills.textContent = '0';
      if (statTopKiller) statTopKiller.textContent = '-';
      if (statTopDead) statTopDead.textContent = '-';
      return;
    }

    if (statTotalAccounts) statTotalAccounts.textContent = rawDataset.length;

    // Total Kills across all accounts
    const totalKills = rawDataset.reduce((sum, acc) => sum + (Number(acc.totalKills) || 0), 0);
    if (statTotalKills) statTotalKills.textContent = totalKills.toLocaleString();

    // Top Kills Player
    const topKiller = rawDataset.reduce((prev, current) => {
      return ((Number(current.totalKills) || 0) > (Number(prev.totalKills) || 0)) ? current : prev;
    }, rawDataset[0]);

    if (topKiller && statTopKiller) {
      statTopKiller.textContent = topKiller.account;
      if (statTopKillerKills) {
        statTopKillerKills.textContent = `${(Number(topKiller.totalKills) || 0).toLocaleString()} Kills (${topKiller.characterCount}개 캐릭터)`;
      }
    }

    // Top Deaths Player (데스왕 💀)
    const topDead = rawDataset.reduce((prev, current) => {
      return ((Number(current.deathCount) || 0) > (Number(prev.deathCount) || 0)) ? current : prev;
    }, rawDataset[0]);

    if (topDead && statTopDead) {
      statTopDead.textContent = topDead.account;
      if (statTopDeadCount) {
        statTopDeadCount.textContent = `${topDead.deathCount || 0}회 사망 (${topDead.characterCount}개 캐릭터)`;
      }
    }
  }

  // Build Earth Filter Tabs
  function buildEarthTabs() {
    // Extract unique earths across all characters
    const earthsSet = new Set();
    rawDataset.forEach(acc => {
      if (Array.isArray(acc.characters)) {
        acc.characters.forEach(c => {
          if (c.earth) earthsSet.add(c.earth);
        });
      }
    });

    const uniqueEarths = Array.from(earthsSet).sort();
    earthTabsContainer.innerHTML = '';

    const allTab = document.createElement('button');
    allTab.className = `tab-btn ${currentEarthFilter === 'all' ? 'active' : ''}`;
    allTab.textContent = `전체 계정 (${rawDataset.length})`;
    allTab.dataset.earth = 'all';
    allTab.addEventListener('click', () => setEarthFilter('all'));
    earthTabsContainer.appendChild(allTab);

    uniqueEarths.forEach(earthName => {
      // Count accounts that have played in this earth
      const count = rawDataset.filter(acc => 
        Array.isArray(acc.characters) && acc.characters.some(c => c.earth === earthName)
      ).length;

      const tab = document.createElement('button');
      tab.className = `tab-btn ${currentEarthFilter === earthName ? 'active' : ''}`;
      tab.textContent = `${earthName} (${count})`;
      tab.dataset.earth = earthName;
      tab.addEventListener('click', () => setEarthFilter(earthName));
      earthTabsContainer.appendChild(tab);
    });
  }

  function setEarthFilter(earthName) {
    currentEarthFilter = earthName;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.earth === earthName);
    });
    applyFilterAndRender();
  }

  function setupEventListeners() {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      clearSearchBtn.style.display = currentSearchQuery ? 'block' : 'none';
      applyFilterAndRender();
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchQuery = '';
      clearSearchBtn.style.display = 'none';
      applyFilterAndRender();
    });

    statusFilterSelect.addEventListener('change', (e) => {
      currentStatusFilter = e.target.value;
      applyFilterAndRender();
    });

    sortSelect.addEventListener('change', (e) => {
      currentSortOption = e.target.value;
      applyFilterAndRender();
    });

    viewTableBtn.addEventListener('click', () => {
      currentViewMode = 'table';
      viewTableBtn.classList.add('active');
      viewCardsBtn.classList.remove('active');
      tableViewContainer.classList.remove('hidden');
      cardsViewContainer.classList.add('hidden');
    });

    viewCardsBtn.addEventListener('click', () => {
      currentViewMode = 'cards';
      viewCardsBtn.classList.add('active');
      viewTableBtn.classList.remove('active');
      cardsViewContainer.classList.remove('hidden');
      tableViewContainer.classList.add('hidden');
    });
  }

  // Filtering, Sorting and View Rendering
  function applyFilterAndRender() {
    let filtered = rawDataset.slice();

    // 1. Earth Filter
    if (currentEarthFilter !== 'all') {
      filtered = filtered.filter(acc => 
        Array.isArray(acc.characters) && acc.characters.some(c => c.earth === currentEarthFilter)
      );
    }

    // 2. Status Filter ("사망기록", "전원생존")
    if (currentStatusFilter === '사망기록') {
      filtered = filtered.filter(acc => (acc.deathCount || 0) > 0);
    } else if (currentStatusFilter === '전원생존') {
      filtered = filtered.filter(acc => (acc.deathCount || 0) === 0);
    }

    // 3. Search Query Filter (account, steamId, character names, occupations, traits, location)
    if (currentSearchQuery) {
      filtered = filtered.filter(acc => {
        const accountMatch = acc.account && acc.account.toLowerCase().includes(currentSearchQuery);
        const steamIdMatch = acc.steamId && acc.steamId.toLowerCase().includes(currentSearchQuery);

        const charMatch = Array.isArray(acc.characters) && acc.characters.some(c => {
          const nameMatch = c.name && c.name.toLowerCase().includes(currentSearchQuery);
          const occMatch = c.occupation && c.occupation.toLowerCase().includes(currentSearchQuery);
          const locMatch = c.location && c.location.toLowerCase().includes(currentSearchQuery);
          const earthMatch = c.earth && c.earth.toLowerCase().includes(currentSearchQuery);

          const traitMatch = Array.isArray(c.traits) && c.traits.some(t => {
            const tName = typeof t === 'string' ? t : t.name;
            return tName.toLowerCase().includes(currentSearchQuery);
          });

          return nameMatch || occMatch || locMatch || earthMatch || traitMatch;
        });

        return accountMatch || steamIdMatch || charMatch;
      });
    }

    // 4. Sorting
    filtered.sort((a, b) => {
      const killsA = Number(a.totalKills) || 0;
      const killsB = Number(b.totalKills) || 0;
      const deathsA = Number(a.deathCount) || 0;
      const deathsB = Number(b.deathCount) || 0;

      if (currentSortOption === 'kills-desc') {
        return killsB - killsA;
      } else if (currentSortOption === 'deaths-desc') {
        return deathsB - deathsA || killsB - killsA;
      } else if (currentSortOption === 'account-asc') {
        return a.account.localeCompare(b.account, 'ko');
      } else if (currentSortOption === 'survival-desc') {
        return (b.totalSurvivalHours || 0) - (a.totalSurvivalHours || 0);
      } else if (currentSortOption === 'chars-desc') {
        return (b.characterCount || 0) - (a.characterCount || 0);
      }
      return 0;
    });

    visibleCountEl.textContent = filtered.length;

    if (filtered.length === 0) {
      noDataMsg.classList.remove('hidden');
      tableViewContainer.classList.add('hidden');
      cardsViewContainer.classList.add('hidden');
    } else {
      noDataMsg.classList.add('hidden');
      if (currentViewMode === 'table') {
        tableViewContainer.classList.remove('hidden');
      } else {
        cardsViewContainer.classList.remove('hidden');
      }
    }

    renderTableView(filtered);
    renderCardsView(filtered);
  }

  // Render Table View
  function renderTableView(data) {
    characterTableBody.innerHTML = '';

    data.forEach((acc, index) => {
      const tr = document.createElement('tr');

      const rank = index + 1;
      const rankBadge = rank === 1 ? '🥇 1' : (rank === 2 ? '🥈 2' : (rank === 3 ? '🥉 3' : `${rank}`));

      // Death Count Badge HTML
      const hasDeaths = (acc.deathCount || 0) > 0;
      const deathBadgeHtml = hasDeaths
        ? `<span class="death-count-badge has-deaths"><i class="fa-solid fa-skull"></i> ${acc.deathCount}회 사망</span>`
        : `<span class="death-count-badge no-deaths"><i class="fa-solid fa-heart"></i> 0회 사망 (생존)</span>`;

      // Total Kills badge
      const isHighKiller = (Number(acc.totalKills) || 0) >= 1000;
      const killsHtml = `
        <span class="kill-count-badge ${isHighKiller ? 'high-killer' : ''}">
          <i class="fa-solid fa-crosshairs"></i> ${(Number(acc.totalKills) || 0).toLocaleString()} 킬
        </span>
      `;

      // Character History Sequence List HTML
      const historyHtml = buildCharacterHistoryHtml(acc.characters);

      tr.innerHTML = `
        <td class="col-rank-cell"><strong>${rankBadge}</strong></td>
        <td class="col-account">
          <div class="account-badge-title">
            <i class="fa-solid fa-user-circle"></i> ${escapeHtml(acc.account)}
          </div>
          <div>
            <span class="char-count-tag"><i class="fa-solid fa-users"></i> ${acc.characterCount || 1}개 캐릭터</span>
          </div>
        </td>
        <td class="col-kills">${killsHtml}</td>
        <td class="col-deaths">${deathBadgeHtml}</td>
        <td class="col-survival"><i class="fa-regular fa-clock" style="color: var(--text-dim); margin-right: 4px;"></i>${escapeHtml(acc.totalSurvivalTime || '0시간')}</td>
        <td class="col-history">${historyHtml}</td>
      `;

      characterTableBody.appendChild(tr);
    });
  }

  // Render Cards View
  function renderCardsView(data) {
    cardsViewContainer.innerHTML = '';

    data.forEach((acc, index) => {
      const card = document.createElement('div');
      card.className = 'char-card';

      const rank = index + 1;
      const hasDeaths = (acc.deathCount || 0) > 0;
      const deathBadgeHtml = hasDeaths
        ? `<span class="death-count-badge has-deaths"><i class="fa-solid fa-skull"></i> ${acc.deathCount}회 사망</span>`
        : `<span class="death-count-badge no-deaths"><i class="fa-solid fa-heart"></i> 0회 사망 (생존)</span>`;

      const isHighKiller = (Number(acc.totalKills) || 0) >= 1000;
      const historyHtml = buildCharacterHistoryHtml(acc.characters);

      card.innerHTML = `
        <div class="char-card-header">
          <div class="char-card-title">
            <div class="card-rank-tag">#${rank} 위</div>
            <h3 style="font-size: 1.3rem; color: var(--accent-gold);"><i class="fa-solid fa-user-circle" style="margin-right: 6px;"></i>${escapeHtml(acc.account)}</h3>
          </div>
          <div>
            ${deathBadgeHtml}
          </div>
        </div>

        <div class="char-card-body">
          <div class="card-stat-row">
            <span class="card-stat-label">통합 좀비 킬 수</span>
            <span class="kill-count-badge ${isHighKiller ? 'high-killer' : ''}">
              <i class="fa-solid fa-crosshairs"></i> ${(Number(acc.totalKills) || 0).toLocaleString()} 킬
            </span>
          </div>
          <div class="card-stat-row">
            <span class="card-stat-label">통합 생존 시간</span>
            <span class="card-stat-val">${escapeHtml(acc.totalSurvivalTime || '0시간')}</span>
          </div>

          <div style="margin-top: 0.5rem;">
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
              <span><i class="fa-solid fa-list-ol"></i> 캐릭터 생성 & 사망 이력 (${acc.characterCount}개):</span>
            </div>
            ${historyHtml}
          </div>
        </div>
      `;

      cardsViewContainer.appendChild(card);
    });
  }

  // Build Character Log Sequence HTML per Account (순서대로 차례별 출력)
  function buildCharacterHistoryHtml(characters) {
    if (!characters || !Array.isArray(characters) || characters.length === 0) {
      return '<div style="color: var(--text-dim); font-size: 0.8rem;">캐릭터 기록 없음</div>';
    }

    const itemsHtml = characters.map(c => {
      const isDead = c.status === '사망';
      const statusIcon = isDead ? '💀 사망' : '🟢 생존';
      const statusClass = isDead ? 'dead' : 'alive';
      const traitsHtml = buildTraitsBadgesHtml(c.traits);

      return `
        <div class="char-history-item ${isDead ? 'is-dead' : ''}">
          <div class="char-history-header">
            <div>
              <span class="char-order-tag">#${c.order} 차례</span>
              <strong class="char-history-name">${escapeHtml(c.name)}</strong>
              <span class="earth-badge" style="margin-left: 4px;">${escapeHtml(c.earth)}</span>
            </div>
            <div>
              <span class="status-badge ${statusClass}">${statusIcon}</span>
            </div>
          </div>

          <div class="char-history-meta">
            <span><i class="fa-solid fa-crosshairs" style="color: var(--accent-red);"></i> ${c.kills || 0} 킬</span>
            <span><i class="fa-regular fa-clock"></i> ${escapeHtml(c.survivalTime || '0시간')}</span>
            <span><i class="fa-solid fa-briefcase"></i> ${escapeHtml(c.occupation || '무직')}</span>
          </div>

          ${c.location ? `<div style="font-size: 0.75rem; color: var(--accent-gold); font-family: var(--font-mono);"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(c.location)}</div>` : ''}

          <div class="traits-wrapper" style="margin-top: 0.2rem;">${traitsHtml}</div>
        </div>
      `;
    }).join('');

    return `<div class="char-history-list">${itemsHtml}</div>`;
  }

  // Trait Badges HTML builder
  function buildTraitsBadgesHtml(traits) {
    if (!traits || !Array.isArray(traits) || traits.length === 0) {
      return '<span style="color: var(--text-dim); font-size: 0.72rem;">특성 없음</span>';
    }

    return traits.map(t => {
      let name = '';
      let type = 'pos';

      if (typeof t === 'string') {
        name = t;
      } else if (typeof t === 'object' && t !== null) {
        name = t.name || '';
        type = t.type || 'pos';
      }

      return `<span class="trait-badge ${type}">${escapeHtml(name)}</span>`;
    }).join('');
  }

  // XSS protection
  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  init();
});
