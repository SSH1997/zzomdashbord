/**
 * Project Zomboid Dashboard - Core Application Logic
 * Configured for Primary Player Account ID Display & Single-Line Column Layout
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  let currentEarthFilter = 'all';
  let currentSearchQuery = '';
  let currentStatusFilter = 'all';
  let currentSortOption = 'kills-desc';
  let currentViewMode = 'table'; // 'table' or 'cards'

  // DOM Elements
  const statTotalEarths = document.getElementById('stat-total-earths');
  const statTotalChars = document.getElementById('stat-total-chars');
  const statTotalKills = document.getElementById('stat-total-kills');
  const statTopKiller = document.getElementById('stat-top-killer');
  const statTopKillerKills = document.getElementById('stat-top-killer-kills');

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
  const dataset = (typeof zomboidData !== 'undefined' && Array.isArray(zomboidData)) ? zomboidData : [];

  // Initialize App
  function init() {
    renderOverviewStats();
    buildEarthTabs();
    setupEventListeners();
    applyFilterAndRender();
  }

  // Calculate and display top header statistics
  function renderOverviewStats() {
    if (dataset.length === 0) {
      statTotalEarths.textContent = '0';
      statTotalChars.textContent = '0';
      statTotalKills.textContent = '0';
      statTopKiller.textContent = '-';
      statTopKillerKills.textContent = '0 Kills';
      return;
    }

    // Unique Earths
    const uniqueEarths = new Set(dataset.map(item => item.earth));
    statTotalEarths.textContent = uniqueEarths.size;

    // Total Players
    statTotalChars.textContent = dataset.length;

    // Total Kills
    const totalKills = dataset.reduce((sum, char) => sum + (Number(char.kills) || 0), 0);
    statTotalKills.textContent = totalKills.toLocaleString();

    // Top Killer
    const topKiller = dataset.reduce((prev, current) => {
      return ((Number(current.kills) || 0) > (Number(prev.kills) || 0)) ? current : prev;
    }, dataset[0]);

    if (topKiller) {
      const displayId = topKiller.account || topKiller.name;
      statTopKiller.textContent = displayId;
      statTopKillerKills.textContent = `${(Number(topKiller.kills) || 0).toLocaleString()} Kills (${topKiller.name} / ${topKiller.earth})`;
    }
  }

  // Dynamically generate Earth Tabs
  function buildEarthTabs() {
    const uniqueEarths = Array.from(new Set(dataset.map(item => item.earth))).sort();

    earthTabsContainer.innerHTML = '';

    // "전체 (All)" Tab
    const allTab = document.createElement('button');
    allTab.className = `tab-btn ${currentEarthFilter === 'all' ? 'active' : ''}`;
    allTab.textContent = `전체 (${dataset.length})`;
    allTab.dataset.earth = 'all';
    allTab.addEventListener('click', () => setEarthFilter('all'));
    earthTabsContainer.appendChild(allTab);

    // Individual Earth Tabs
    uniqueEarths.forEach(earthName => {
      const count = dataset.filter(item => item.earth === earthName).length;
      const tab = document.createElement('button');
      tab.className = `tab-btn ${currentEarthFilter === earthName ? 'active' : ''}`;
      tab.textContent = `${earthName} (${count})`;
      tab.dataset.earth = earthName;
      tab.addEventListener('click', () => setEarthFilter(earthName));
      earthTabsContainer.appendChild(tab);
    });
  }

  // Set selected earth filter
  function setEarthFilter(earthName) {
    currentEarthFilter = earthName;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.earth === earthName);
    });
    applyFilterAndRender();
  }

  // Event Listeners Registration
  function setupEventListeners() {
    // Search input
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

    // Status Filter dropdown
    statusFilterSelect.addEventListener('change', (e) => {
      currentStatusFilter = e.target.value;
      applyFilterAndRender();
    });

    // Sort dropdown
    sortSelect.addEventListener('change', (e) => {
      currentSortOption = e.target.value;
      applyFilterAndRender();
    });

    // View Mode buttons
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

  // Main Filtering, Sorting and Rendering logic
  function applyFilterAndRender() {
    let filtered = dataset.slice();

    // 1. Earth Filter
    if (currentEarthFilter !== 'all') {
      filtered = filtered.filter(item => item.earth === currentEarthFilter);
    }

    // 2. Status Filter
    if (currentStatusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === currentStatusFilter);
    }

    // 3. Search Query Filter (account, name, occupation, traits, notes, earth)
    if (currentSearchQuery) {
      filtered = filtered.filter(item => {
        const accountMatch = item.account && item.account.toLowerCase().includes(currentSearchQuery);
        const nameMatch = item.name && item.name.toLowerCase().includes(currentSearchQuery);
        const occupationMatch = item.occupation && item.occupation.toLowerCase().includes(currentSearchQuery);
        const notesMatch = item.deathCause && item.deathCause.toLowerCase().includes(currentSearchQuery);
        const earthMatch = item.earth && item.earth.toLowerCase().includes(currentSearchQuery);

        const traitsMatch = Array.isArray(item.traits) && item.traits.some(t => {
          const traitName = typeof t === 'string' ? t : t.name;
          return traitName.toLowerCase().includes(currentSearchQuery);
        });

        return accountMatch || nameMatch || occupationMatch || notesMatch || earthMatch || traitsMatch;
      });
    }

    // 4. Sorting
    filtered.sort((a, b) => {
      const killsA = Number(a.kills) || 0;
      const killsB = Number(b.kills) || 0;

      if (currentSortOption === 'kills-desc') {
        return killsB - killsA;
      } else if (currentSortOption === 'kills-asc') {
        return killsA - killsB;
      } else if (currentSortOption === 'account-asc') {
        return (a.account || a.name).localeCompare(b.account || b.name, 'ko');
      } else if (currentSortOption === 'name-asc') {
        return a.name.localeCompare(b.name, 'ko');
      } else if (currentSortOption === 'earth-asc') {
        return a.earth.localeCompare(b.earth, 'ko') || (killsB - killsA);
      }
      return 0;
    });

    // Update Result Count
    visibleCountEl.textContent = filtered.length;

    // Handle empty state
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

    // Render Views
    renderTableView(filtered);
    renderCardsView(filtered);
  }

  // Render Table View
  function renderTableView(data) {
    characterTableBody.innerHTML = '';

    data.forEach(char => {
      const tr = document.createElement('tr');

      // Status Badge HTML
      const statusClass = char.status === '생존' ? 'alive' : (char.status === '실종' ? 'missing' : 'dead');
      const statusIcon = char.status === '생존' ? '<i class="fa-solid fa-heart-pulse"></i>' : (char.status === '실종' ? '<i class="fa-solid fa-circle-question"></i>' : '<i class="fa-solid fa-skull"></i>');
      const statusHtml = `<span class="status-badge ${statusClass}">${statusIcon} ${char.status || '사망'}</span>`;

      // Kills badge html
      const isHighKiller = (Number(char.kills) || 0) >= 1000;
      const killsHtml = `
        <span class="kill-count-badge ${isHighKiller ? 'high-killer' : ''}">
          <i class="fa-solid fa-crosshairs"></i> ${(Number(char.kills) || 0).toLocaleString()} 킬
        </span>
      `;

      // Traits HTML
      const traitsHtml = buildTraitsBadgesHtml(char.traits);

      // Account & Character Display
      const accountDisplay = char.account || char.name || '-';
      const charNameDisplay = char.name || '-';

      tr.innerHTML = `
        <td class="col-earth"><span class="earth-badge">${escapeHtml(char.earth)}</span></td>
        <td class="col-account"><strong style="color: #fff; font-size: 0.95rem;"><i class="fa-solid fa-user-circle" style="color: var(--accent-gold); margin-right: 4px;"></i>${escapeHtml(accountDisplay)}</strong></td>
        <td class="col-name"><span style="color: var(--text-main);">${escapeHtml(charNameDisplay)}</span></td>
        <td class="col-status">${statusHtml}</td>
        <td class="col-kills">${killsHtml}</td>
        <td class="col-survival survival-cell"><i class="fa-regular fa-clock" style="color: var(--text-dim); margin-right: 4px;"></i>${escapeHtml(char.survivalTime || '-')}</td>
        <td class="col-occupation"><span class="occupation-tag">${escapeHtml(char.occupation || '-')}</span></td>
        <td class="col-traits"><div class="traits-wrapper">${traitsHtml}</div></td>
        <td class="col-notes">${escapeHtml(char.deathCause || '-')}</td>
      `;

      characterTableBody.appendChild(tr);
    });
  }

  // Render Cards View
  function renderCardsView(data) {
    cardsViewContainer.innerHTML = '';

    data.forEach(char => {
      const card = document.createElement('div');
      card.className = 'char-card';

      const statusClass = char.status === '생존' ? 'alive' : (char.status === '실종' ? 'missing' : 'dead');
      const statusIcon = char.status === '생존' ? '<i class="fa-solid fa-heart-pulse"></i>' : (char.status === '실종' ? '<i class="fa-solid fa-circle-question"></i>' : '<i class="fa-solid fa-skull"></i>');
      const statusHtml = `<span class="status-badge ${statusClass}">${statusIcon} ${char.status || '사망'}</span>`;
      const traitsHtml = buildTraitsBadgesHtml(char.traits);

      const isHighKiller = (Number(char.kills) || 0) >= 1000;
      const accountDisplay = char.account || char.name || '-';

      card.innerHTML = `
        <div class="char-card-header">
          <div class="char-card-title">
            <h3 style="font-size: 1.2rem; color: #fff;"><i class="fa-solid fa-user-circle" style="color: var(--accent-gold); margin-right: 6px;"></i>${escapeHtml(accountDisplay)}</h3>
            <span class="occ" style="font-size: 0.85rem; color: var(--text-muted);">${escapeHtml(char.name)} (${escapeHtml(char.occupation || '직업 미지정')})</span>
          </div>
          <div>
            <span class="earth-badge">${escapeHtml(char.earth)}</span>
          </div>
        </div>

        <div class="char-card-body">
          <div class="card-stat-row">
            <span class="card-stat-label">상태</span>
            <span>${statusHtml}</span>
          </div>
          <div class="card-stat-row">
            <span class="card-stat-label">처치한 좀비</span>
            <span class="kill-count-badge ${isHighKiller ? 'high-killer' : ''}">
              <i class="fa-solid fa-crosshairs"></i> ${(Number(char.kills) || 0).toLocaleString()} 킬
            </span>
          </div>
          <div class="card-stat-row">
            <span class="card-stat-label">생존 기간</span>
            <span class="card-stat-val survival-cell">${escapeHtml(char.survivalTime || '-')}</span>
          </div>

          <div style="margin-top: 0.25rem;">
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.35rem;">특성 (Traits):</div>
            <div class="traits-wrapper">${traitsHtml}</div>
          </div>
        </div>

        <div class="char-card-footer">
          <i class="fa-solid fa-note-sticky" style="margin-right: 4px;"></i> ${escapeHtml(char.deathCause || '메모 없음')}
        </div>
      `;

      cardsViewContainer.appendChild(card);
    });
  }

  // Trait Badges HTML builder
  function buildTraitsBadgesHtml(traits) {
    if (!traits || !Array.isArray(traits) || traits.length === 0) {
      return '<span style="color: var(--text-dim); font-size: 0.8rem;">특성 없음</span>';
    }

    return traits.map(t => {
      let name = '';
      let type = 'pos';

      if (typeof t === 'string') {
        name = t;
        if (t.startsWith('-')) {
          type = 'neg';
          name = t.substring(1).trim();
        } else if (t.startsWith('+')) {
          type = 'pos';
          name = t.substring(1).trim();
        }
      } else if (typeof t === 'object' && t !== null) {
        name = t.name || '';
        type = t.type || 'pos';
      }

      return `<span class="trait-badge ${type}">${escapeHtml(name)}</span>`;
    }).join('');
  }

  // Utility to prevent XSS
  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Run initialization
  init();
});
