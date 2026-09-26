/**
 * ==========================================
 * 프로젝트 좀보이드 1지구 플레이어 계정/캐릭터 데이터베이스
 * (서버 로그 및 DB 검증 완료)
 * ==========================================
 */

const zomboidData = [
  {
    "id": 1,
    "earth": "1지구",
    "account": "daun",
    "steamId": "76561198210496256",
    "totalKills": 33,
    "deathCount": 1,
    "totalSurvivalHours": 20.67,
    "totalSurvivalTime": "20.7시간 (0.9일)",
    "characterCount": 2,
    "characters": [
      {
        "order": 1,
        "earth": "1지구",
        "name": "마르코 맥앨리스터",
        "status": "사망",
        "kills": 33,
        "survivalHours": 20.67,
        "survivalTime": "20.67시간 (0.9일)",
        "occupation": "무직 (Unemployed)",
        "traits": [
          {
            "name": "게으름 [SOTO] (Slack)",
            "type": "neg"
          },
          {
            "name": "야행성 (Night Vision)",
            "type": "pos"
          },
          {
            "name": "창술가 [SOTO] (Spearman)",
            "type": "mod"
          },
          {
            "name": "도검 전문가 [SOTO] (Cutter)",
            "type": "mod"
          },
          {
            "name": "짐꾼 [ETW] (Pack Mule)",
            "type": "mod"
          },
          {
            "name": "양손 무기 숙련 [SW]",
            "type": "mod"
          },
          {
            "name": "연약함 (Feeble)",
            "type": "neg"
          }
        ],
        "location": "X: 13713.0, Y: 1721.0, Z: 0.0 (사망 지점)",
        "lastSaved": "2026-09-26 21:08:57"
      },
      {
        "order": 2,
        "earth": "1지구",
        "name": "daun 2차 캐릭터",
        "status": "생존",
        "kills": 0,
        "survivalHours": 0.0,
        "survivalTime": "0.00시간 (0.0일)",
        "occupation": "무직 (Unemployed)",
        "traits": [],
        "location": "X: 13714.2, Y: 1721.0, Z: 0.0",
        "lastSaved": "2026-09-26 23:15:09"
      }
    ]
  },
  {
    "id": 2,
    "earth": "1지구",
    "account": "JINDOL",
    "steamId": "76561199546981794",
    "totalKills": 16,
    "deathCount": 2,
    "totalSurvivalHours": 19.57,
    "totalSurvivalTime": "19.6시간 (0.8일)",
    "characterCount": 3,
    "characters": [
      {
        "order": 1,
        "earth": "1지구",
        "name": "JINDOL 1차 캐릭터",
        "status": "사망",
        "kills": 0,
        "survivalHours": 0.0,
        "survivalTime": "0.00시간 (0.0일)",
        "occupation": "무직 (Unemployed)",
        "traits": [],
        "location": "X: 13319.0, Y: 1446.0, Z: 0.0 (사망 지점)",
        "lastSaved": "2026-09-26 20:58:27"
      },
      {
        "order": 2,
        "earth": "1지구",
        "name": "JINDOL 2차 캐릭터",
        "status": "사망",
        "kills": 0,
        "survivalHours": 0.0,
        "survivalTime": "0.00시간 (0.0일)",
        "occupation": "무직 (Unemployed)",
        "traits": [],
        "location": "X: 14307.0, Y: 2820.0, Z: 0.0 (사망 지점)",
        "lastSaved": "2026-09-26 21:03:58"
      },
      {
        "order": 3,
        "earth": "1지구",
        "name": "에이브 내시",
        "status": "생존",
        "kills": 16,
        "survivalHours": 19.57,
        "survivalTime": "19.57시간 (0.8일)",
        "occupation": "무직 (Unemployed)",
        "traits": [
          {
            "name": "얇은 피부 (Thin Skinned)",
            "type": "neg"
          },
          {
            "name": "빠른 휴식 [ETW]",
            "type": "mod"
          }
        ],
        "location": "X: 13314.6, Y: 1447.7, Z: 0.0",
        "lastSaved": "2026-09-26 23:15:09"
      }
    ]
  },
  {
    "id": 3,
    "earth": "1지구",
    "account": "prove",
    "steamId": "76561198318530720",
    "totalKills": 15,
    "deathCount": 0,
    "totalSurvivalHours": 19.84,
    "totalSurvivalTime": "19.8시간 (0.8일)",
    "characterCount": 1,
    "characters": [
      {
        "order": 1,
        "earth": "1지구",
        "name": "해롤드 바움가드너",
        "status": "생존",
        "kills": 15,
        "survivalHours": 19.84,
        "survivalTime": "19.84시간 (0.8일)",
        "occupation": "무직 (Unemployed)",
        "traits": [
          {
            "name": "더위에 민감 [SW]",
            "type": "neg"
          },
          {
            "name": "아침형 인간 [SOTO]",
            "type": "mod"
          },
          {
            "name": "행복감 [ETW]",
            "type": "mod"
          },
          {
            "name": "바운서 [SW]",
            "type": "mod"
          },
          {
            "name": "예민한 청각 (Keen Hearing)",
            "type": "pos"
          }
        ],
        "location": "X: 13966.4, Y: 3237.0, Z: 0.0",
        "lastSaved": "2026-09-26 23:15:09"
      }
    ]
  },
  {
    "id": 4,
    "earth": "1지구",
    "account": "Jan",
    "steamId": "76561198163443416",
    "totalKills": 11,
    "deathCount": 0,
    "totalSurvivalHours": 16.71,
    "totalSurvivalTime": "16.7시간 (0.7일)",
    "characterCount": 1,
    "characters": [
      {
        "order": 1,
        "earth": "1지구",
        "name": "캐서린 앤더스",
        "status": "생존",
        "kills": 11,
        "survivalHours": 16.71,
        "survivalTime": "16.71시간 (0.7일)",
        "occupation": "무직 (Unemployed)",
        "traits": [
          {
            "name": "추위에 약함 [ETW]",
            "type": "mod"
          },
          {
            "name": "근시 (Short Sighted)",
            "type": "neg"
          },
          {
            "name": "난독증 (Slow Reader)",
            "type": "neg"
          },
          {
            "name": "봉술가 [ETW]",
            "type": "mod"
          },
          {
            "name": "체조선수 (Gymnast)",
            "type": "pos"
          }
        ],
        "location": "X: 13113.8, Y: 1802.3, Z: 0.0",
        "lastSaved": "2026-09-26 23:15:09"
      }
    ]
  },
  {
    "id": 5,
    "earth": "1지구",
    "account": "ANTE",
    "steamId": "76561198119863420",
    "totalKills": 8,
    "deathCount": 1,
    "totalSurvivalHours": 17.18,
    "totalSurvivalTime": "17.2시간 (0.7일)",
    "characterCount": 2,
    "characters": [
      {
        "order": 1,
        "earth": "1지구",
        "name": "ANTE 1차 캐릭터",
        "status": "사망",
        "kills": 0,
        "survivalHours": 0.0,
        "survivalTime": "0.00시간 (0.0일)",
        "occupation": "무직 (Unemployed)",
        "traits": [],
        "location": "X: 14166.0, Y: 2853.0, Z: 0.0 (사망 지점)",
        "lastSaved": "2026-09-26 19:38:25"
      },
      {
        "order": 2,
        "earth": "1지구",
        "name": "호세 윅스",
        "status": "생존",
        "kills": 8,
        "survivalHours": 17.18,
        "survivalTime": "17.18시간 (0.7일)",
        "occupation": "무직 (Unemployed)",
        "traits": [
          {
            "name": "난독증 (Slow Reader)",
            "type": "neg"
          },
          {
            "name": "발전기 전문가 [SOTO]",
            "type": "mod"
          },
          {
            "name": "눈에 띄지 않음 (Inconspicuous)",
            "type": "pos"
          }
        ],
        "location": "X: 13748.3, Y: 3002.7, Z: 0.0",
        "lastSaved": "2026-09-26 23:15:09"
      }
    ]
  },
  {
    "id": 6,
    "earth": "1지구",
    "account": "TIGER",
    "steamId": "76561198366619616",
    "totalKills": 5,
    "deathCount": 1,
    "totalSurvivalHours": 19.54,
    "totalSurvivalTime": "19.5시간 (0.8일)",
    "characterCount": 2,
    "characters": [
      {
        "order": 1,
        "earth": "1지구",
        "name": "랑이 대단한",
        "status": "사망",
        "kills": 4,
        "survivalHours": 3.65,
        "survivalTime": "3.65시간 (0.2일)",
        "occupation": "무직 (Unemployed)",
        "traits": [
          {
            "name": "폭식가 [SW]",
            "type": "neg"
          }
        ],
        "location": "X: 13192.0, Y: 1411.0, Z: 0.0 (사망 지점)",
        "lastSaved": "2026-09-26 19:50:24"
      },
      {
        "order": 2,
        "earth": "1지구",
        "name": "랑이2호 대단한",
        "status": "생존",
        "kills": 1,
        "survivalHours": 15.89,
        "survivalTime": "15.89시간 (0.7일)",
        "occupation": "무직 (Unemployed)",
        "traits": [
          {
            "name": "느린 학습 (Slow Learner)",
            "type": "pos"
          }
        ],
        "location": "X: 12586.2, Y: 1990.5, Z: 0.0",
        "lastSaved": "2026-09-26 23:15:09"
      }
    ]
  },
  {
    "id": 7,
    "earth": "1지구",
    "account": "gyear",
    "steamId": "76561198856221583",
    "totalKills": 2,
    "deathCount": 1,
    "totalSurvivalHours": 16.69,
    "totalSurvivalTime": "16.7시간 (0.7일)",
    "characterCount": 2,
    "characters": [
      {
        "order": 1,
        "earth": "1지구",
        "name": "벌 트렘블레이",
        "status": "사망",
        "kills": 0,
        "survivalHours": 3.37,
        "survivalTime": "3.37시간 (0.1일)",
        "occupation": "무직 (Unemployed)",
        "traits": [
          {
            "name": "박탈감 [ETW]",
            "type": "neg"
          },
          {
            "name": "골다공증 [SW]",
            "type": "neg"
          },
          {
            "name": "행복감 [ETW]",
            "type": "mod"
          },
          {
            "name": "짐꾼 [ETW] (Pack Mule)",
            "type": "mod"
          },
          {
            "name": "현자의 가르침 (Fast Learner)",
            "type": "pos"
          }
        ],
        "location": "X: 13529.0, Y: 1590.0, Z: 1.0 (사망 지점)",
        "lastSaved": "2026-09-26 20:02:01"
      },
      {
        "order": 2,
        "earth": "1지구",
        "name": "노리스 레이니",
        "status": "생존",
        "kills": 2,
        "survivalHours": 13.32,
        "survivalTime": "13.32시간 (0.6일)",
        "occupation": "무직 (Unemployed)",
        "traits": [
          {
            "name": "애주가 [SW]",
            "type": "neg"
          },
          {
            "name": "석공 기술 [SOTO]",
            "type": "mod"
          },
          {
            "name": "은신 전문가 [ETW]",
            "type": "mod"
          },
          {
            "name": "예민한 청각 (Keen Hearing)",
            "type": "pos"
          },
          {
            "name": "연약함 (Feeble)",
            "type": "neg"
          }
        ],
        "location": "X: 13413.6, Y: 1674.9, Z: 1.0",
        "lastSaved": "2026-09-26 23:15:09"
      }
    ]
  },
  {
    "id": 8,
    "earth": "1지구",
    "account": "bradley02",
    "steamId": "76561199146671877",
    "totalKills": 0,
    "deathCount": 1,
    "totalSurvivalHours": 3.23,
    "totalSurvivalTime": "3.2시간 (0.1일)",
    "characterCount": 2,
    "characters": [
      {
        "order": 1,
        "earth": "1지구",
        "name": "빌 제이머스 (1차)",
        "status": "사망",
        "kills": 0,
        "survivalHours": 0.0,
        "survivalTime": "0.00시간 (0.0일)",
        "occupation": "무직 (Unemployed)",
        "traits": [
          {
            "name": "추위에 민감 [SW]",
            "type": "neg"
          },
          {
            "name": "속독 (Fast Reader)",
            "type": "pos"
          }
        ],
        "location": "X: 14169.0, Y: 2720.0, Z: 0.0 (사망 지점)",
        "lastSaved": "2026-09-26 20:41:45"
      },
      {
        "order": 2,
        "earth": "1지구",
        "name": "빌 제이머스 (2차)",
        "status": "생존",
        "kills": 0,
        "survivalHours": 3.23,
        "survivalTime": "3.23시간 (0.1일)",
        "occupation": "무직 (Unemployed)",
        "traits": [
          {
            "name": "추위에 민감 [SW]",
            "type": "neg"
          },
          {
            "name": "속독 (Fast Reader)",
            "type": "pos"
          }
        ],
        "location": "X: 14112.0, Y: 2880.5, Z: 0.0",
        "lastSaved": "2026-09-26 23:15:09"
      }
    ]
  }
];
