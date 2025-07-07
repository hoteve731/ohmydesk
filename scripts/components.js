// 컴포넌트 생성 함수들

// 전역 선택 이슈 id
let selectedIssueId = 1;

// 이슈 카드 생성
function createIssueCard(issue) {
    return `
        <div class="issue-card" data-issue="${issue.id}">
            <div class="issue-header">
                <span class="status-icon">${issue.icon}</span>
                <span class="issue-title">${issue.title}</span>
            </div>
            <div class="issue-meta">
                <span>${issue.articleCount}개 기사</span>
                <span>${issue.categories.join(' • ')}</span>
            </div>
            <div class="issue-preview">
                ${issue.preview}
            </div>
        </div>
    `;
}

// 분석 카드 생성
function createAnalysisCard(card) {
    if (card.type === 'perspective') {
        return `
            <div class="analysis-card">
                <div class="ai-badge">
                    <span>✨</span>
                    AI Analysis
                </div>
                <div class="card-title">${card.title}</div>
                <div class="comparison-chart">
                    ${card.chartData.map(item => `
                        <div class="chart-bar" style="height: ${item.value}%; background: ${item.color}" data-value="${item.label} ${item.value}%"></div>
                    `).join('')}
                </div>
                <div style="font-size: 13px; color: #6B6B6B;">
                    ${card.description}
                </div>
            </div>
        `;
    } else if (card.type === 'keywords') {
        return `
            <div class="analysis-card">
                <div class="ai-badge">
                    <span>✨</span>
                    AI Analysis
                </div>
                <div class="card-title">${card.title}</div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                    ${card.keywords.map(keyword => `
                        <span style="background: #E8F4FD; color: #0A84FF; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${keyword}</span>
                    `).join('')}
                </div>
                <div style="font-size: 13px; color: #6B6B6B;">
                    ${card.description}
                </div>
            </div>
        `;
    }
}

// 기사 카드 생성
function createArticleCard(article) {
    return `
        <div class="article-card" onclick="openReader('${article.id}')">
            <div class="article-header">
                <span class="source-tag">${article.source}</span>
                <span style="font-size: 12px; color: #6B6B6B;">${article.time}</span>
            </div>
            <div class="article-title">${article.title}</div>
            <div class="article-excerpt">
                ${article.excerpt}
            </div>
            <div class="article-meta">${article.author} • 조회 ${article.views.toLocaleString()}</div>
        </div>
    `;
}

// 노트 섹션 생성
function createNoteSection(section) {
    return `
        <div class="note-section">
            <div class="section-header">
                <div class="category-dot ${section.color}"></div>
                <div class="section-subtitle">${section.title}</div>
            </div>
            <div class="drop-indicator"></div>
            ${section.quotes.map(quote => `
                <div class="quote-card ${section.color}" draggable="true">
                    <div class="quote-text">
                        "${quote.text}"
                    </div>
                    <div class="quote-source">
                        ${quote.source} • 🔗 원문 보기
                    </div>
                </div>
            `).join('')}
            <div class="drop-indicator"></div>
        </div>
    `;
}

// 이슈 목록 렌더링
function renderIssueList(selectedId = 1) {
    const issueList = document.getElementById('issueList');
    issueList.innerHTML = '';
    APP_DATA.issues.forEach(issue => {
        const selectedClass = (issue.id === selectedId) ? 'selected' : '';
        const card = document.createElement('div');
        card.className = `issue-card ${selectedClass}`;
        card.dataset.issue = issue.id;
        card.innerHTML = `
            <div class="issue-header">
                <span class="status-icon">${issue.icon}</span>
                <span class="issue-title">${issue.title}</span>
            </div>
            <div class="issue-meta">
                <span>${issue.articleCount}개 기사</span>
                <span>${issue.categories.join(' • ')}</span>
            </div>
            <div class="issue-preview">
                ${issue.preview}
            </div>
        `;
        card.addEventListener('click', function () {
            if (selectedIssueId !== issue.id) {
                selectedIssueId = issue.id;
                renderIssueList(selectedIssueId);
                renderAnalysisPanel(selectedIssueId);
                renderArticlesList(selectedIssueId);
            }
        });
        issueList.appendChild(card);
    });
}

// 분석 패널 렌더링
function renderAnalysisPanel(issueId = 1) {
    const analysisData = APP_DATA.analysis[issueId];
    if (!analysisData) return;
    document.getElementById('analysisTitle').textContent = analysisData.title;
    document.getElementById('analysisSubtitle').textContent = analysisData.subtitle;
    const analysisCards = document.getElementById('analysisCards');
    const cardsHTML = analysisData.cards.map(card => createAnalysisCard(card)).join('');
    analysisCards.innerHTML = cardsHTML;
}

// 기사 목록 렌더링
function renderArticlesList(issueId = 1) {
    const articles = APP_DATA.articles[issueId];
    if (!articles) return;
    const articlesList = document.getElementById('articlesList');
    const articlesHTML = articles.map(article => createArticleCard(article)).join('');
    articlesList.innerHTML = articlesHTML;
}

// 노트 섹션 렌더링
function renderNotesSections() {
    const notesSections = document.getElementById('notesSections');
    const sectionsHTML = APP_DATA.noteSections.map(section => createNoteSection(section)).join('');
    notesSections.innerHTML = sectionsHTML;
}

// 전체 앱 초기화
function initializeApp() {
    renderIssueList(selectedIssueId);
    renderAnalysisPanel(selectedIssueId);
    renderArticlesList(selectedIssueId);
    renderNotesSections && renderNotesSections();
    setTimeout(() => {
        const cards = document.querySelectorAll('.issue-card, .analysis-card, .article-card, .quote-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }, 100);
}

// 오마이데스크 - 컴포넌트 렌더링

// 이슈 클러스터 렌더링
function renderIssueClusters(clusters) {
    const container = document.getElementById('issueClusters');
    if (!container) return;

    // 간단한 하드코딩된 데이터 사용
    const defaultClusters = [
        {
            id: 'cluster-1',
            title: '윤석열 대통령 구속영장 청구',
            summary: '검찰총장 출신 대통령에 대한 첫 구속영장 청구로 헌정사상 초유의 상황이 전개되고 있습니다.',
            badges: ['hot', 'conflict'],
            articleCount: 47,
            conflictLevel: 'high',
            lastUpdated: '2시간 전'
        },
        {
            id: 'cluster-2',
            title: '한국 경제성장률 전망 하향 조정',
            summary: 'IMF와 OECD가 연이어 한국 경제성장률 전망을 하향 조정하며 경기 침체 우려가 커지고 있습니다.',
            badges: ['trending'],
            articleCount: 23,
            conflictLevel: 'medium',
            lastUpdated: '4시간 전'
        },
        {
            id: 'cluster-3',
            title: '러시아-우크라이나 전쟁 1000일',
            summary: '러시아의 우크라이나 침공 1000일을 맞아 국제사회의 지원 방안과 평화 협상 가능성이 주목받고 있습니다.',
            badges: ['trending'],
            articleCount: 31,
            conflictLevel: 'low',
            lastUpdated: '6시간 전'
        }
    ];

    const clustersToRender = clusters || defaultClusters;

    const html = clustersToRender.map(cluster => `
        <div class="issue-cluster" data-cluster-id="${cluster.id}">
            <div class="cluster-header">
                <div class="cluster-badges">
                    ${cluster.badges.map(badge => {
        const icons = { 'hot': '🔥', 'conflict': '💥', 'trending': '📈' };
        return `<span class="cluster-badge ${badge}">${icons[badge] || '📌'}</span>`;
    }).join('')}
                </div>
                <div class="cluster-time">${cluster.lastUpdated}</div>
            </div>
            <div class="cluster-title">${cluster.title}</div>
            <div class="cluster-summary">${cluster.summary}</div>
            <div class="cluster-stats">
                <div class="cluster-sources">
                    <span>관련 기사 ${cluster.articleCount}건</span>
                </div>
                <div class="cluster-count">${cluster.conflictLevel}</div>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;

    // 클러스터 클릭 이벤트 추가
    container.querySelectorAll('.issue-cluster').forEach(element => {
        element.addEventListener('click', () => {
            // 기존 active 클래스 제거
            container.querySelectorAll('.issue-cluster').forEach(el => el.classList.remove('active'));
            // 현재 요소에 active 클래스 추가
            element.classList.add('active');

            const clusterId = element.dataset.clusterId;
            const cluster = clustersToRender.find(c => c.id === clusterId);

            if (cluster) {
                // 중앙 패널 업데이트
                updateAnalysisContent(cluster);
            }
        });
    });
}

// 분석 콘텐츠 업데이트 (간단 버전)
function updateAnalysisContent(cluster) {
    const titleElement = document.getElementById('analysisTitle');
    const subtitleElement = document.getElementById('analysisSubtitle');
    const contentElement = document.getElementById('analysisContent');

    if (titleElement) titleElement.textContent = cluster.title;
    if (subtitleElement) subtitleElement.textContent = `${cluster.articleCount}개 기사 분석 • ${cluster.lastUpdated}`;

    if (contentElement) {
        contentElement.innerHTML = `
            <div class="analysis-section">
                <h3 class="section-title">
                    <span class="section-title-icon">📊</span>
                    AI 분석 결과
                </h3>
                <div class="analysis-summary">
                    <p>${cluster.summary}</p>
                    <p>이 이슈는 현재 <strong>${cluster.conflictLevel}</strong> 수준의 논란을 보이고 있으며, 
                    총 <strong>${cluster.articleCount}개</strong>의 관련 기사가 발견되었습니다.</p>
                </div>
            </div>
            
            <div class="analysis-section">
                <h3 class="section-title">
                    <span class="section-title-icon">📰</span>
                    주요 기사
                </h3>
                <div class="article-list">
                    <div class="article-card">
                        <div class="article-header">
                            <span class="article-source">연합뉴스</span>
                            <span class="article-time">2시간 전</span>
                        </div>
                        <h3 class="article-title">주요 기사 제목 예시</h3>
                        <p class="article-summary">기사 요약 내용이 여기에 표시됩니다...</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// 프로젝트 노트 렌더링 (간단 버전)
function renderProjectNotes() {
    const container = document.getElementById('notesContent');
    if (!container) return;

    // 이미 HTML에 있는 카테고리 섹션들을 그대로 유지
    console.log('📝 프로젝트 노트 렌더링 완료');
}

// 초기 렌더링 (매우 간단한 버전)
function initializeComponents() {
    console.log('🚀 간단한 초기화 시작...');

    try {
        renderIssueClusters();
        renderProjectNotes();

        console.log('✅ 초기화 완료!');

    } catch (error) {
        console.error('❌ 초기화 오류:', error);
    }
}

// 전역 함수로 등록
window.renderIssueClusters = renderIssueClusters;
window.initializeComponents = initializeComponents;
window.updateAnalysisContent = updateAnalysisContent; 