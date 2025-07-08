// 오마이데스크 - 데이터 모듈

console.log('📊 데이터 모듈 로딩 시작...');

// 이슈 클러스터 데이터 (단순화된 버전)
window.issueClusters = [
    {
        id: 'cluster-1',
        title: '윤석열 대통령 구속영장 청구',
        summary: '검찰총장 출신 대통령에 대한 첫 구속영장 청구로 헌정사상 초유의 상황이 전개되고 있습니다.',
        badges: ['hot', 'conflict'],
        articleCount: 47,
        conflictLevel: 'high',
        lastUpdated: '2024-12-19T10:30:00Z',
        image: 'images/img1.jpg',
        sources: [
            { name: '네이버', icon: 'sources/naver.png', count: 15 },
            { name: '구글', icon: 'sources/google.png', count: 12 },
            { name: 'X', icon: 'sources/x.png', count: 8 }
        ]
    },
    {
        id: 'cluster-2',
        title: '한국 경제성장률 전망 하향 조정',
        summary: 'IMF와 OECD가 연이어 한국 경제성장률 전망을 하향 조정하며 경기 침체 우려가 커지고 있습니다.',
        badges: ['trending'],
        articleCount: 23,
        conflictLevel: 'medium',
        lastUpdated: '2024-12-19T08:45:00Z',
        image: 'images/img2.jpg',
        sources: [
            { name: '네이버', icon: 'sources/naver.png', count: 10 },
            { name: '구글', icon: 'sources/google.png', count: 8 },
            { name: '페이스북', icon: 'sources/facebook.png', count: 5 }
        ]
    },
    {
        id: 'cluster-3',
        title: '러시아-우크라이나 전쟁 1000일',
        summary: '러시아의 우크라이나 침공 1000일을 맞아 국제사회의 지원 방안과 평화 협상 가능성이 주목받고 있습니다.',
        badges: ['trending'],
        articleCount: 31,
        conflictLevel: 'low',
        lastUpdated: '2024-12-19T07:20:00Z',
        image: 'images/img3.jpg',
        sources: [
            { name: '네이버', icon: 'sources/naver.png', count: 12 },
            { name: 'X', icon: 'sources/x.png', count: 10 },
            { name: '구글', icon: 'sources/google.png', count: 9 }
        ]
    },
    {
        id: 'cluster-4',
        title: '트럼프 차세대 엔비디아 목표가 190달러로 상향',
        summary: '분석가들은 정부들이 국가 인프라를 구축하기 위해 경쟁하면서 AI 역량에 대한 "글로벌 골드러시"가 일어나고 있다고 지적합니다.',
        badges: ['trending'],
        articleCount: 20,
        conflictLevel: 'low',
        lastUpdated: '2024-12-19T09:15:00Z',
        image: 'images/img4.jpg',
        sources: [
            { name: '네이버', icon: 'sources/naver.png', count: 8 },
            { name: '구글', icon: 'sources/google.png', count: 7 },
            { name: 'X', icon: 'sources/x.png', count: 5 }
        ]
    },
    {
        id: 'cluster-5',
        title: '트럼프가 2,600제곱마일을 새로운 석탄 채굴에 개방한다',
        summary: '내무부는 바이든의 기후 정책을 뒤집고 몬태나와 와이오밍의 파우더 리버 베이신에서 석탄 채굴을 재개할 것으로 보입니다.',
        badges: ['hot'],
        articleCount: 20,
        conflictLevel: 'medium',
        lastUpdated: '2024-12-19T11:00:00Z',
        image: 'images/img5.png',
        sources: [
            { name: '네이버', icon: 'sources/naver.png', count: 9 },
            { name: '구글', icon: 'sources/google.png', count: 6 },
            { name: '페이스북', icon: 'sources/facebook.png', count: 5 }
        ]
    },
    {
        id: 'cluster-6',
        title: '글로벌 AI 경쟁 가속화',
        summary: '미국과 중국을 중심으로 한 AI 기술 패권 경쟁이 치열해지면서 각국이 AI 정책 강화에 나서고 있습니다.',
        badges: ['trending'],
        articleCount: 18,
        conflictLevel: 'medium',
        lastUpdated: '2024-12-19T06:30:00Z',
        image: 'images/img6.jpg',
        sources: [
            { name: '네이버', icon: 'sources/naver.png', count: 7 },
            { name: 'X', icon: 'sources/x.png', count: 6 },
            { name: '구글', icon: 'sources/google.png', count: 5 }
        ]
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

console.log('✅ 오마이데스크 데이터 모듈 로드 완료:', {
    issueClusters: window.issueClusters?.length || 0,
    projectTemplates: Object.keys(window.projectTemplates || {}).length,
    utils: !!window.utils,
    storage: !!window.storage,
    appState: !!window.appState
}); 