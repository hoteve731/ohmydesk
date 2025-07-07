// 앱 데이터 정의
const APP_DATA = {
    // 이슈 데이터
    issues: [
        {
            id: 1,
            icon: '🔥',
            title: '반도체 수출 규제 완화',
            articleCount: 8,
            categories: ['정치', '경제'],
            preview: '정부가 반도체 수출 규제를 단계적으로 완화하기로 결정했다. 업계에서는 긍정적 반응을 보이고 있으나...',
            aiSummary: '8개 언론사 중 75%가 긍정적 관점에서 보도. 주요 키워드: 경쟁력 회복, 수출 증대, 글로벌 공급망'
        },
        {
            id: 2,
            icon: '💥',
            title: '교육개혁 법안 논란',
            articleCount: 12,
            categories: ['정치', '사회'],
            preview: '새로운 교육개혁 법안을 두고 여야 간 첨예한 대립이 계속되고 있다. 교육계는 혼란스러운 상황...',
            aiSummary: '12개 언론사 간 의견 분분. 여당 지지 매체 vs 야당 지지 매체 간 뚜렷한 차이'
        },
        {
            id: 3,
            icon: '📊',
            title: '인공지능 규제 방안',
            articleCount: 6,
            categories: ['기술', '정책'],
            preview: '정부가 인공지능 기술의 윤리적 사용을 위한 규제 방안을 마련 중이다. 기술업계에서는 신중한 접근을...',
            aiSummary: '6개 언론사 모두 신중한 접근 필요성 강조. 윤리적 고려사항과 기술 발전의 균형점 모색'
        },
        {
            id: 4,
            icon: '🌱',
            title: '탄소중립 정책 발표',
            articleCount: 5,
            categories: ['환경', '정책'],
            preview: '2050 탄소중립 달성을 위한 구체적인 로드맵이 공개되었다. 재생에너지 확대와 산업구조 전환이...',
            aiSummary: '5개 언론사 중 4개가 정책 방향성에 동의. 구체적 실행 방안에 대한 논의 필요'
        }
    ],

    // 분석 데이터
    analysis: {
        1: {
            title: '반도체 수출 규제 완화',
            subtitle: '8개 언론사 보도 분석 • 2024년 7월 7일',
            cards: [
                {
                    type: 'perspective',
                    title: '보도 관점 분석',
                    chartData: [
                        { label: '긍정', value: 60, color: '#34C759' },
                        { label: '중립', value: 25, color: '#8E8E93' },
                        { label: '부정', value: 15, color: '#FF3B30' }
                    ],
                    description: '대부분의 언론사가 긍정적 관점에서 보도하고 있으나, 일부 우려의 목소리도 존재'
                },
                {
                    type: 'keywords',
                    title: '핵심 키워드',
                    keywords: ['수출 회복', '글로벌 경쟁력', '기술 패권', '안보 고려'],
                    description: '경제적 효과와 안보적 측면을 모두 고려한 균형잡힌 접근이 필요'
                }
            ]
        },
        2: {
            title: '교육개혁 법안 논란',
            subtitle: '12개 언론사 보도 분석 • 2024년 7월 7일',
            cards: [
                {
                    type: 'perspective',
                    title: '보도 관점 분석',
                    chartData: [
                        { label: '긍정', value: 40, color: '#34C759' },
                        { label: '중립', value: 20, color: '#8E8E93' },
                        { label: '부정', value: 40, color: '#FF3B30' }
                    ],
                    description: '여야 간 뚜렷한 입장 차이로 인해 언론사별 보도 관점이 크게 분화됨'
                },
                {
                    type: 'keywords',
                    title: '핵심 키워드',
                    keywords: ['교육 정상화', '사교육 확대', '공정성 논란', '정치적 대립'],
                    description: '교육의 본질과 정치적 이해관계 사이의 균형점 모색이 필요'
                }
            ]
        },
        3: {
            title: '인공지능 규제 방안',
            subtitle: '6개 언론사 보도 분석 • 2024년 7월 7일',
            cards: [
                {
                    type: 'perspective',
                    title: '보도 관점 분석',
                    chartData: [
                        { label: '긍정', value: 20, color: '#34C759' },
                        { label: '중립', value: 60, color: '#8E8E93' },
                        { label: '부정', value: 20, color: '#FF3B30' }
                    ],
                    description: '대부분의 언론사가 신중한 접근을 강조하며 균형잡힌 시각으로 보도'
                },
                {
                    type: 'keywords',
                    title: '핵심 키워드',
                    keywords: ['윤리적 AI', '기술 발전', '규제 필요성', '혁신 저해'],
                    description: '기술 발전과 윤리적 고려사항 사이의 균형점을 찾는 것이 핵심 과제'
                }
            ]
        },
        4: {
            title: '탄소중립 정책 발표',
            subtitle: '5개 언론사 보도 분석 • 2024년 7월 7일',
            cards: [
                {
                    type: 'perspective',
                    title: '보도 관점 분석',
                    chartData: [
                        { label: '긍정', value: 80, color: '#34C759' },
                        { label: '중립', value: 15, color: '#8E8E93' },
                        { label: '부정', value: 5, color: '#FF3B30' }
                    ],
                    description: '대부분의 언론사가 정책 방향성에 동의하나 구체적 실행 방안에 대한 우려 제기'
                },
                {
                    type: 'keywords',
                    title: '핵심 키워드',
                    keywords: ['재생에너지', '산업 전환', '2050 목표', '실행 방안'],
                    description: '장기적 비전과 구체적 실행 방안의 조화가 성공의 핵심'
                }
            ]
        }
    },

    // 기사 데이터
    articles: {
        1: [
            {
                id: 'article1',
                source: '조선일보',
                time: '오전 9:12',
                title: '반도체 수출규제 완화, \'K-반도체\' 경쟁력 회복 기대',
                excerpt: '정부가 반도체 수출 규제를 단계적으로 완화하기로 결정하면서 국내 반도체 업계에 새로운 활력이 불어넣어질 것으로 전망된다. 업계 관계자들은 이번 조치가 글로벌 공급망에서의 경쟁력 회복에 중요한 전환점이 될 것이라고 분석했다.',
                author: '경제부 김기자',
                views: 1247,
                content: `
                    <p>정부가 반도체 수출 규제를 단계적으로 완화하기로 결정하면서 국내 반도체 업계에 새로운 활력이 불어넣어질 것으로 전망된다. 업계 관계자들은 이번 조치가 글로벌 공급망에서의 경쟁력 회복에 중요한 전환점이 될 것이라고 분석했다.</p>
                    
                    <p>산업통상자원부는 7일 "반도체 수출 규제를 3단계에 걸쳐 점진적으로 완화할 계획"이라고 발표했다. 1단계에서는 기존 규제 품목 중 30%를 완화하고, 2단계에서는 50%, 3단계에서는 70%까지 완화할 예정이다.</p>
                    
                    <p>이번 조치로 가장 큰 혜택을 받을 것으로 예상되는 기업은 삼성전자와 SK하이닉스다. 두 회사는 그동안 수출 규제로 인해 해외 시장에서 어려움을 겪어왔다. 특히 중국 시장에서의 점유율 하락이 두드러졌다.</p>
                    
                    <p>삼성전자 관계자는 "이번 규제 완화를 통해 글로벌 경쟁력을 회복할 수 있을 것"이라며 "특히 메모리 반도체 부문에서 상당한 효과를 기대한다"고 말했다.</p>
                    
                    <p>하지만 일부 전문가들은 신중한 접근을 주문했다. 한국반도체산업협회의 김모 회장은 "경제적 효과도 중요하지만 핵심 기술 보호와 국가 안보 측면도 함께 고려해야 한다"고 강조했다.</p>
                    
                    <p>증권가에서는 이번 소식에 긍정적인 반응을 보이고 있다. 대신증권은 삼성전자의 목표주가를 기존 8만원에서 8만5천원으로 상향 조정했다고 발표했다.</p>
                `
            },
            {
                id: 'article2',
                source: '한겨레',
                time: '오전 10:34',
                title: '반도체 규제 완화, 신중한 접근 필요하다',
                excerpt: '반도체 수출 규제 완화가 경제적 효과를 가져올 것으로 예상되지만, 국가 안보와 기술 유출 방지를 위한 신중한 접근이 필요하다는 전문가들의 지적이 나오고 있다. 특히 핵심 기술 보호 방안에 대한 구체적인 대책 마련이 시급하다.',
                author: '정치부 박기자',
                views: 892,
                content: `
                    <p>반도체 수출 규제 완화가 경제적 효과를 가져올 것으로 예상되지만, 국가 안보와 기술 유출 방지를 위한 신중한 접근이 필요하다는 전문가들의 지적이 나오고 있다.</p>
                    
                    <p>정부가 7일 발표한 반도체 수출 규제 완화 방안은 경제적 측면에서는 분명 긍정적이다. 하지만 기술 패권 경쟁이 치열해지고 있는 현 시점에서 핵심 기술 보호 방안에 대한 구체적인 대책 마련이 시급하다.</p>
                    
                    <p>특히 중국과의 기술 격차가 빠르게 좁혀지고 있는 상황에서 무분별한 규제 완화는 오히려 국가 경쟁력을 약화시킬 수 있다는 우려가 제기된다.</p>
                    
                    <p>서울대 경제학과 박모 교수는 "단기적인 경제적 이익을 위해 장기적인 기술 우위를 포기하는 것은 바람직하지 않다"며 "선별적이고 단계적인 접근이 필요하다"고 말했다.</p>
                    
                    <p>또한 미국과 중국 사이에서 균형잡힌 외교 정책이 필요하다는 지적도 나온다. 한 외교 전문가는 "반도체 규제 완화가 미중 관계에 미칠 영향을 신중히 검토해야 한다"고 강조했다.</p>
                    
                    <p>그럼에도 불구하고 업계에서는 이번 조치를 전반적으로 환영하는 분위기다. 다만 정부가 약속한 기술 보호 장치들이 실제로 효과적으로 작동할지는 지켜봐야 할 것으로 보인다.</p>
                `
            },
            {
                id: 'article3',
                source: '매일경제',
                time: '오전 11:15',
                title: '삼성·SK하이닉스 주가 상승... 투자자들 \'환영\'',
                excerpt: '반도체 수출 규제 완화 소식에 삼성전자와 SK하이닉스 주가가 일제히 상승했다. 투자자들은 이번 조치가 반도체 업계의 실적 개선으로 이어질 것으로 기대하고 있다. 증권가에서는 목표주가 상향 조정 움직임도 나타나고 있다.',
                author: '증권부 이기자',
                views: 2156,
                content: `
                    <p>반도체 수출 규제 완화 소식에 삼성전자와 SK하이닉스 주가가 일제히 상승했다. 투자자들은 이번 조치가 반도체 업계의 실적 개선으로 이어질 것으로 기대하고 있다.</p>
                    
                    <p>7일 코스피 시장에서 삼성전자는 전일 대비 3.2% 상승한 7만8천원에 거래를 마쳤다. SK하이닉스는 4.1% 오른 13만2천원을 기록했다.</p>
                    
                    <p>증권가에서는 목표주가 상향 조정 움직임도 나타나고 있다. 대신증권은 삼성전자의 목표주가를 8만원에서 8만5천원으로, SK하이닉스는 14만원에서 15만원으로 각각 상향 조정했다.</p>
                    
                    <p>한국투자증권의 김모 애널리스트는 "규제 완화로 인한 수출 증가와 시장 점유율 회복이 실적에 긍정적 영향을 미칠 것"이라고 전망했다.</p>
                    
                    <p>특히 메모리 반도체 시장에서의 회복세가 두드러질 것으로 예상된다. 삼성전자의 경우 DRAM과 NAND 플래시 메모리 부문에서 상당한 매출 증가가 기대된다.</p>
                    
                    <p>하지만 일부 전문가들은 과도한 기대는 금물이라고 조언했다. 미래에셋증권의 이모 애널리스트는 "규제 완화 효과가 실적에 반영되기까지는 시간이 필요하다"며 "장기적 관점에서 접근해야 한다"고 말했다.</p>
                    
                    <p>외국인 투자자들도 이번 소식에 긍정적인 반응을 보이고 있다. 7일 코스피 시장에서 외국인들은 삼성전자와 SK하이닉스를 중심으로 1,200억원을 순매수했다.</p>
                `
            }
        ]
    },

    // 노트 섹션 데이터
    noteSections: [
        {
            id: 'core-issues',
            title: '핵심 쟁점',
            color: 'red',
            quotes: [
                {
                    text: '삼성전자와 SK하이닉스 주가가 일제히 상승, 목표주가 상향 조정 움직임',
                    source: '매일경제',
                    type: 'existing'
                },
                {
                    text: '수출 규제 완화가 경제적 효과를 가져올 것으로 예상되지만, 국가 안보 측면에서 신중한 접근이 필요하다',
                    source: '한겨레',
                    type: 'existing'
                }
            ]
        },
        {
            id: 'expert-analysis',
            title: '전문가 분석',
            color: 'blue',
            quotes: [
                {
                    text: '글로벌 공급망에서의 경쟁력 회복에 중요한 전환점이 될 것',
                    source: '조선일보',
                    type: 'existing'
                },
                {
                    text: '반도체 업계의 실적 개선으로 이어질 것으로 기대',
                    source: '매일경제',
                    type: 'existing'
                }
            ]
        },
        {
            id: 'solutions',
            title: '해결 방안',
            color: 'green',
            quotes: [
                {
                    text: '단계적 완화를 통해 경제적 효과와 안보적 고려를 균형있게 추진',
                    source: '정부 발표',
                    type: 'existing'
                }
            ]
        },
        {
            id: 'other-info',
            title: '기타 정보',
            color: 'gray',
            quotes: []
        }
    ]
};

// 오마이데스크 - 샘플 데이터

// 이슈 클러스터 데이터
window.issueClusters = [
    {
        id: 'cluster-1',
        title: '윤석열 대통령 구속영장 청구',
        summary: '검찰총장 출신 대통령에 대한 첫 구속영장 청구로 헌정사상 초유의 상황이 전개되고 있습니다.',
        badges: ['hot', 'conflict'],
        articleCount: 47,
        conflictLevel: 'high',
        lastUpdated: '2024-12-19T10:30:00Z',
        articles: [
            {
                id: 'article-1',
                title: '검찰, 윤석열 대통령 구속영장 청구..."내란 혐의 등"',
                source: '연합뉴스',
                time: '2024-12-19 09:15',
                summary: '검찰이 내란 혐의 등을 적용해 윤석열 대통령에 대한 구속영장을 법원에 청구했다고 발표했습니다. 검찰총장 출신 대통령에 대한 구속영장 청구는 헌정사상 처음입니다.',
                content: `검찰이 윤석열 대통령에 대한 구속영장을 법원에 청구했다고 19일 발표했습니다.

서울중앙지검 특수수사1부는 이날 오전 "내란 및 권력남용 혐의로 윤석열 대통령에 대한 구속영장을 신청했다"고 밝혔습니다.

검찰 관계자는 "수사 과정에서 확보한 증거들을 종합한 결과, 구속의 필요성이 인정된다고 판단했다"고 설명했습니다.

주요 혐의는 다음과 같습니다:
- 내란죄 
- 권력남용 및 직권남용
- 공무상 비밀누설

검찰은 "대통령이라는 지위에도 불구하고 헌법과 법률을 위반한 중대한 범죄"라고 판단했다고 밝혔습니다.

구속영장 심사는 빠르면 내일부터 진행될 예정입니다.`
            },
            {
                id: 'article-2',
                title: '"대통령 구속은 과도"...여당, 강력 반발',
                source: '조선일보',
                time: '2024-12-19 10:20',
                summary: '국민의힘은 대통령 구속영장 청구에 대해 "과도한 수사"라며 강력히 반발하고 나섰습니다.',
                content: `국민의힘이 윤석열 대통령에 대한 구속영장 청구에 강력히 반발했습니다.

한동훈 대표는 긴급 기자회견을 열고 "현직 대통령에 대한 구속은 매우 신중해야 할 사안"이라며 "과도한 수사권 남용"이라고 비판했습니다.

주요 반박 논리:
- 대통령의 정치적 결정에 대한 사법부 개입
- 헌법상 대통령의 불체포특권 문제
- 정치적 보복 수사 가능성

한 대표는 "민주주의의 근간을 흔드는 처사"라며 "국민들께서 현명한 판단을 해주실 것"이라고 말했습니다.

당내에서는 대통령 탄핵 논의와 별개로 구속에는 반대한다는 입장을 정리했습니다.`
            }
        ],
        aiAnalysis: {
            wordingComparison: {
                progressive: {
                    label: '진보 언론',
                    keywords: ['내란죄', '헌정 유린', '법치주의 확립'],
                    sources: '한겨레, 경향신문, 오마이뉴스'
                },
                conservative: {
                    label: '보수 언론',
                    keywords: ['과도한 수사', '정치 보복', '헌법적 논란'],
                    sources: '조선일보, 중앙일보, 동아일보'
                }
            },
            dataPoints: [
                { label: '대통령 지지율', value: '19%', change: '-8%', source: '리얼미터' },
                { label: '국민의힘 지지율', value: '22%', change: '-5%', source: '갤럽' },
                { label: '민주당 지지율', value: '46%', change: '+3%', source: '갤럽' }
            ]
        }
    },
    {
        id: 'cluster-2',
        title: '한국 경제성장률 전망 하향 조정',
        summary: 'IMF와 OECD가 연이어 한국 경제성장률 전망을 하향 조정하며 경기 침체 우려가 커지고 있습니다.',
        badges: ['trending'],
        articleCount: 23,
        conflictLevel: 'medium',
        lastUpdated: '2024-12-19T08:45:00Z',
        articles: [
            {
                id: 'article-3',
                title: 'OECD, 한국 성장률 전망 2.1%로 하향...'소비 부진'',
                source: '매일경제',
                time: '2024-12-19 08:30',
                summary: 'OECD가 한국의 2024년 경제성장률 전망을 2.1%로 0.2%p 하향 조정했다고 발표했습니다.',
                content: 'OECD 경제성장률 하향 조정 관련 상세 내용...'
            }
        ],
        aiAnalysis: {
            wordingComparison: {
                economic: {
                    label: '경제 전문지',
                    keywords: ['구조적 문제', '생산성 저하', '혁신 부족'],
                    sources: '매일경제, 한국경제, 헤럴드경제'
                },
                political: {
                    label: '정치 언론',
                    keywords: ['정부 정책 실패', '대안 모색', '민생 경제'],
                    sources: '연합뉴스, KBS, MBC'
                }
            },
            dataPoints: [
                { label: '2024년 성장률 전망', value: '2.1%', change: '-0.2%p', source: 'OECD' },
                { label: '소비자신뢰지수', value: '102.8', change: '-3.2', source: '한국은행' },
                { label: '실업률', value: '2.8%', change: '+0.1%p', source: '통계청' }
            ]
        }
    },
    {
        id: 'cluster-3',
        title: '러시아-우크라이나 전쟁 1000일',
        summary: '러시아의 우크라이나 침공 1000일을 맞아 국제사회의 지원 방안과 평화 협상 가능성이 주목받고 있습니다.',
        badges: ['trending'],
        articleCount: 31,
        conflictLevel: 'low',
        lastUpdated: '2024-12-19T07:20:00Z',
        articles: [],
        aiAnalysis: {
            wordingComparison: {
                western: {
                    label: '서방 관점',
                    keywords: ['러시아 침략', '우크라이나 지원', '국제법 위반'],
                    sources: 'CNN, BBC, 연합뉴스'
                },
                neutral: {
                    label: '중립적 시각',
                    keywords: ['평화 협상', '인도적 지원', '외교적 해결'],
                    sources: 'AP, 로이터, NHK'
                }
            },
            dataPoints: [
                { label: '전쟁 지속일', value: '1000일', change: '', source: '' },
                { label: '난민 수', value: '610만명', change: '', source: 'UNHCR' },
                { label: '국제 지원금', value: '1500억달러', change: '', source: 'EU' }
            ]
        }
    }
];

// 프로젝트 템플릿 데이터
window.projectTemplates = {
    'slowletter-1219': {
        name: '12/19 슬로우레터',
        categories: [
            { id: 'issues', name: '쟁점과 현안', icon: '🔴', items: [] },
            { id: 'deep', name: '더 깊게 읽기', icon: '🔵', items: [] },
            { id: 'different', name: '다르게 읽기', icon: '🟢', items: [] },
            { id: 'tmi', name: '오늘의 TMI', icon: '⚫', items: [] }
        ]
    },
    'analysis-report': {
        name: '분석 리포트',
        categories: [
            { id: 'summary', name: '핵심 요약', icon: '📋', items: [] },
            { id: 'analysis', name: '심층 분석', icon: '🔍', items: [] },
            { id: 'implications', name: '향후 전망', icon: '🎯', items: [] },
            { id: 'references', name: '참고 자료', icon: '📚', items: [] }
        ]
    },
    'draft-column': {
        name: '칼럼 초안',
        categories: [
            { id: 'intro', name: '도입부', icon: '🎪', items: [] },
            { id: 'body', name: '본론', icon: '📝', items: [] },
            { id: 'conclusion', name: '결론', icon: '🎯', items: [] },
            { id: 'quotes', name: '인용구', icon: '💬', items: [] }
        ]
    }
};

// 현재 상태 관리
window.appState = {
    selectedCluster: null,
    selectedProject: 'slowletter-1219',
    selectedView: 'timeline', // timeline, comparison, data
    highlightedItems: [],
    currentModal: null
};

// 유틸리티 함수들
window.utils = {
    formatDate: (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));

        if (diffInMinutes < 60) {
            return `${diffInMinutes}분 전`;
        } else if (diffInMinutes < 1440) {
            return `${Math.floor(diffInMinutes / 60)}시간 전`;
        } else {
            return date.toLocaleDateString('ko-KR', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    },

    formatNumber: (num) => {
        return new Intl.NumberFormat('ko-KR').format(num);
    },

    truncateText: (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    getBadgeIcon: (badge) => {
        const icons = {
            'hot': '🔥',
            'conflict': '💥',
            'trending': '📈',
            'breaking': '⚡'
        };
        return icons[badge] || '📌';
    },

    getCategoryColor: (category) => {
        const colors = {
            'issues': '#E53E3E',
            'deep': '#3182CE',
            'different': '#38A169',
            'tmi': '#718096'
        };
        return colors[category] || '#718096';
    }
};

// 반응형 관리
window.responsiveManager = {
    checkViewport: () => {
        const warning = document.getElementById('responsiveWarning');
        const appContainer = document.getElementById('appContainer');

        if (window.innerWidth < 1200) {
            warning.style.display = 'flex';
            appContainer.style.display = 'none';
        } else {
            warning.style.display = 'none';
            appContainer.style.display = 'grid';
        }
    },

    init: () => {
        window.addEventListener('resize', window.responsiveManager.checkViewport);
        window.responsiveManager.checkViewport();
    }
};

// 검색 및 필터링
window.searchFilter = {
    searchTerm: '',
    activeFilters: [],

    filterClusters: (clusters, term, filters) => {
        let filtered = clusters;

        if (term) {
            filtered = filtered.filter(cluster =>
                cluster.title.toLowerCase().includes(term.toLowerCase()) ||
                cluster.summary.toLowerCase().includes(term.toLowerCase())
            );
        }

        if (filters.length > 0) {
            filtered = filtered.filter(cluster =>
                filters.some(filter => cluster.badges.includes(filter))
            );
        }

        return filtered;
    }
};

// 로컬 스토리지 관리
window.storage = {
    save: (key, data) => {
        try {
            localStorage.setItem(`ohmydesk_${key}`, JSON.stringify(data));
        } catch (error) {
            console.warn('로컬 스토리지 저장 실패:', error);
        }
    },

    load: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(`ohmydesk_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.warn('로컬 스토리지 로드 실패:', error);
            return defaultValue;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(`ohmydesk_${key}`);
        } catch (error) {
            console.warn('로컬 스토리지 삭제 실패:', error);
        }
    }
};

// 내보내기 기능
window.exportManager = {
    generateMarkdown: (projectData) => {
        let markdown = `# ${projectData.name}\n\n`;
        markdown += `> 생성일: ${new Date().toLocaleDateString('ko-KR')}\n\n`;

        projectData.categories.forEach(category => {
            if (category.items.length > 0) {
                markdown += `## ${category.icon} ${category.name}\n\n`;

                category.items.forEach(item => {
                    markdown += `### ${item.title || '하이라이트'}\n\n`;
                    markdown += `${item.content}\n\n`;
                    if (item.source) {
                        markdown += `*출처: ${item.source}*\n\n`;
                    }
                });
            }
        });

        return markdown;
    },

    downloadFile: (content, filename, type = 'text/markdown') => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};

console.log('📊 오마이데스크 데이터 모듈이 로드되었습니다.', {
    issueClusters: window.issueClusters?.length || 0,
    projectTemplates: Object.keys(window.projectTemplates || {}).length,
    utils: !!window.utils,
    storage: !!window.storage,
    appState: !!window.appState
}); 