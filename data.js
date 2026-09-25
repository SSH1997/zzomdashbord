/**
 * ==========================================
 * 프로젝트 좀보이드 지구별 캐릭터 데이터베이스
 * ==========================================
 * 
 * 💡 데이터 업데이트 가이드:
 * 새로운 지구(회차)나 캐릭터가 추가될 때 아래 `zomboidData` 배열에 데이터를 추가하거나 수정하고 저장하세요.
 * 커밋 후 Push 하면 GitHub Pages에 자동으로 최신 정보가 반영됩니다!
 * 
 * 📌 필드 항목 가이드:
 * - earth: 지구 이름 (예: "1지구", "2지구", "3지구", "서버 1회차" 등)
 * - name: 캐릭터 이름
 * - status: 상태 ("생존" | "사망" | "실종")
 * - kills: 처치한 좀비 수 (숫자)
 * - survivalTime: 생존한 기간 (예: "3개월 12일", "15일", "1년 2개월")
 * - occupation: 캐릭터 직업 (예: "소방관", "경찰관", "퇴직 군인", "의사", "무직" 등)
 * - traits: 특성 리스트 (긍정/부정 특성을 객체 형태로 작성)
 *     - type: "pos" (긍정/이로운 특성 - 초록색) | "neg" (부정/해로운 특성 - 빨간색) | "job" (직업 특성 - 주황색)
 * - deathCause: 사망 원인 또는 특이사항/메모
 */

const zomboidData = [
  // --- 1지구 데이터 ---
  {
    id: 1,
    earth: "1지구",
    name: "박생존",
    status: "사망",
    kills: 1450,
    survivalTime: "2개월 18일",
    occupation: "소방관",
    traits: [
      { name: "용감함", type: "pos" },
      { name: "체력왕", type: "pos" },
      { name: "뛰어난 청력", type: "pos" },
      { name: "대식가", type: "neg" },
      { name: "얇은 피부", type: "neg" }
    ],
    deathCause: "몰드루 백화점 루팅 중 창문 너머 좀비 무리에 둘러싸임"
  },
  {
    id: 2,
    earth: "1지구",
    name: "이아포칼립스",
    status: "사망",
    kills: 820,
    survivalTime: "1개월 05일",
    occupation: "경찰관",
    traits: [
      { name: "명사수", type: "pos" },
      { name: "빠른 학습가", type: "pos" },
      { name: "애주가", type: "neg" },
      { name: "수면 장애", type: "neg" }
    ],
    deathCause: "웨스트포인트 권총 총성으로 인한 대규모 웨이브 유입"
  },
  {
    id: 3,
    earth: "1지구",
    name: "최철벽",
    status: "사망",
    kills: 310,
    survivalTime: "18일",
    occupation: "목수",
    traits: [
      { name: "손재주", type: "pos" },
      { name: "두꺼운 피부", type: "pos" },
      { name: "느린 걸음", type: "neg" }
    ],
    deathCause: "거점 요새화 작업 도중 계단 추락 후 좀비 감염"
  },

  // --- 2지구 데이터 ---
  {
    id: 4,
    earth: "2지구",
    name: "강무적",
    status: "생존",
    kills: 3840,
    survivalTime: "5개월 22일",
    occupation: "퇴직 군인",
    traits: [
      { name: "둔감함", type: "pos" },
      { name: "조용함", type: "pos" },
      { name: "야구 방망이 숙련", type: "pos" },
      { name: "빠른 정비사", type: "pos" },
      { name: "흡연자", type: "neg" },
      { name: "밀폐공포증", type: "neg" }
    ],
    deathCause: "현재 루이빌 은신처에서 거주 중 (전력/수도 끊김)"
  },
  {
    id: 5,
    earth: "2지구",
    name: "정의사",
    status: "사망",
    kills: 450,
    survivalTime: "2개월 01일",
    occupation: "의사",
    traits: [
      { name: "응급처치 숙련", type: "pos" },
      { name: "빠른 치료", type: "pos" },
      { name: "체중 미달", type: "neg" },
      { name: "겁쟁이", type: "neg" }
    ],
    deathCause: "병원 약품 털이 중 헬기 소리로 인한 좀비 침범"
  },

  // --- 3지구 데이터 ---
  {
    id: 6,
    earth: "3지구",
    name: "한루터",
    status: "생존",
    kills: 2190,
    survivalTime: "3개월 10일",
    occupation: "정비사",
    traits: [
      { name: "차량 전문가", type: "pos" },
      { name: "행운아", type: "pos" },
      { name: "낮은 시력", type: "neg" },
      { name: "소화불량", type: "neg" }
    ],
    deathCause: "로즈우드 주유소 거점 구축 완료"
  },
  {
    id: 7,
    earth: "3지구",
    name: "윤스피드",
    status: "실종",
    kills: 670,
    survivalTime: "1개월 14일",
    occupation: "도둑",
    traits: [
      { name: "열쇠공", type: "pos" },
      { name: "은밀함", type: "pos" },
      { name: "경솔함", type: "neg" }
    ],
    deathCause: "차량 고장 후 군사 기지 부근에서 실종"
  }
];
