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

// 브리핑 카드 생성 함수
function createBriefingCard(cluster) {
    // 총 출처 수 계산
    const totalSources = cluster.sources.reduce((sum, source) => sum + source.count, 0);

    return `
        <div class="briefing-card ${window.appState.selectedCluster === cluster.id ? 'selected' : ''}" 
             data-cluster="${cluster.id}">
            <img src="${cluster.image}" alt="${cluster.title}" class="card-image" loading="lazy">
            <div class="card-content">
                <h3 class="card-title">${cluster.title}</h3>
                <p class="card-summary">${cluster.summary}</p>
                <div class="card-footer">
                    <div class="card-sources">
                        ${cluster.sources.slice(0, 3).map(source => `
                            <img src="${source.icon}" alt="${source.name}" class="source-icon" title="${source.name}">
                        `).join('')}
                        <span class="source-count">${totalSources}개 출처</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 브리핑 카드 렌더링 (한개-두개-한개 패턴)
function renderBriefingCards(clusters) {
    const container = document.getElementById('briefingCards');
    if (!container) return;

    if (!clusters || clusters.length === 0) {
        // 하이라이트 섹션은 유지하고 카드만 빈 상태로 표시
        const existingSummary = container.querySelector('.daily-summary');
        if (existingSummary) {
            container.innerHTML = '';
            container.appendChild(existingSummary);
        }
        const emptyDiv = document.createElement('div');
        emptyDiv.innerHTML = '<div class="empty-state"><p>브리핑 데이터를 불러오는 중입니다...</p></div>';
        container.appendChild(emptyDiv);

        // 빈 상태일 때 플로팅 버튼 숨김
        hideFloatingSourcesButton();
        return;
    }

    // 기존 하이라이트 섹션 보존
    const existingSummary = container.querySelector('.daily-summary');
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';

    // 한개-두개-한개 패턴으로 배열
    for (let i = 0; i < clusters.length; i += 3) {
        // 첫 번째 카드 (단독)
        if (i < clusters.length) {
            const row = document.createElement('div');
            row.className = 'card-row single';
            row.innerHTML = createBriefingCard(clusters[i]);
            cardsContainer.appendChild(row);
        }

        // 두 번째, 세 번째 카드 (나란히)
        if (i + 1 < clusters.length || i + 2 < clusters.length) {
            const row = document.createElement('div');
            row.className = 'card-row double';

            let rowHTML = '';
            if (i + 1 < clusters.length) {
                rowHTML += createBriefingCard(clusters[i + 1]);
            }
            if (i + 2 < clusters.length) {
                rowHTML += createBriefingCard(clusters[i + 2]);
            }

            row.innerHTML = rowHTML;
            cardsContainer.appendChild(row);
        }
    }

    // 컨테이너 재구성 (하이라이트 섹션 + 카드들)
    container.innerHTML = '';
    if (existingSummary) {
        container.appendChild(existingSummary);
    }
    container.appendChild(cardsContainer);

    // 카드 클릭 이벤트 리스너 추가
    attachCardEventListeners();
}

// 카드 클릭 이벤트 리스너 추가
function attachCardEventListeners() {
    document.querySelectorAll('.briefing-card').forEach(card => {
        card.addEventListener('click', function () {
            const clusterId = this.dataset.cluster;
            if (clusterId) {
                selectCluster(clusterId);
            }
        });
    });
}

// 이슈 클러스터 렌더링 (기존 함수 - 호환성 유지)
function renderIssueClusters(clusters) {
    // 새로운 카드 뷰 렌더링으로 리다이렉트
    renderBriefingCards(clusters || window.issueClusters);
}

// 클러스터 선택 함수
function selectCluster(clusterId) {
    console.log('🎯 클러스터 선택 시도:', clusterId);

    // 기존 선택 해제
    document.querySelectorAll('.briefing-card.selected').forEach(card => {
        card.classList.remove('selected');
    });

    // 새로운 선택
    const selectedCard = document.querySelector(`[data-cluster="${clusterId}"]`);
    console.log('🔍 선택된 카드:', selectedCard);

    if (selectedCard) {
        selectedCard.classList.add('selected');
        console.log('✅ 카드 선택 스타일 적용됨');
    }

    // 앱 상태 업데이트
    window.appState.selectedCluster = clusterId;
    console.log('🔄 앱 상태 업데이트:', window.appState.selectedCluster);

    // 분석 패널 업데이트
    const cluster = window.issueClusters.find(c => c.id === clusterId);
    console.log('🔍 찾은 클러스터:', cluster ? cluster.title : '없음');

    if (cluster) {
        updateAnalysisContent(cluster);
        showFloatingSourcesButton(cluster);
    } else {
        // 클러스터를 찾을 수 없을 때
        console.warn('⚠️ 클러스터를 찾을 수 없음:', clusterId);
        hideFloatingSourcesButton();
        resetAnalysisContent();
    }
}

// 간단한 마크다운 -> HTML 변환 함수
function markdownToHtml(markdown) {
    if (!markdown) return '';

    // 먼저 줄바꿈을 정리
    let html = markdown.trim();

    // 헤더 변환 (### → h3, ## → h2, # → h1)
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // 강조 표시 (** → strong)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 리스트 항목 변환
    html = html.replace(/^- (.*$)/gm, '<li>$1</li>');

    // 연속된 리스트 항목들을 ul로 감싸기
    html = html.replace(/(<li>.*?<\/li>)(?:\s*<li>.*?<\/li>)*/g, function (match) {
        return '<ul>' + match + '</ul>';
    });

    // 빈 줄을 기준으로 문단 나누기
    html = html.split('\n\n').map(paragraph => {
        paragraph = paragraph.trim();
        if (!paragraph) return '';

        // 이미 태그가 있는 경우는 그대로
        if (paragraph.startsWith('<') && paragraph.endsWith('>')) {
            return paragraph;
        }

        // 일반 문단은 p 태그로 감싸기
        return '<p>' + paragraph.replace(/\n/g, '<br>') + '</p>';
    }).join('\n');

    return html;
}

// 분석 콘텐츠 업데이트 (새로운 구조)
function updateAnalysisContent(cluster) {
    const titleElement = document.getElementById('analysisTitle');
    const subtitleElement = document.getElementById('analysisSubtitle');
    const contentElement = document.getElementById('analysisContent');

    if (titleElement) titleElement.textContent = cluster.title;
    if (subtitleElement) {
        const totalSources = cluster.sources.reduce((sum, source) => sum + source.count, 0);
        subtitleElement.textContent = `${totalSources}개 출처 • ${window.utils.formatDate(cluster.lastUpdated)}`;
    }

    if (contentElement) {
        const summaryHtml = markdownToHtml(cluster.detailedSummary);
        const sourcesHtml = cluster.sources.map(source =>
            `<img src="${source.icon}" alt="${source.name}" class="content-source-icon" title="${source.name} (${source.count}개 기사)">`
        ).join('');

        contentElement.innerHTML = `
            <div class="issue-content">
                <div class="issue-content-header">
                    <h1 class="issue-content-title">${cluster.title}</h1>
                    <div class="issue-content-sources">
                        <div class="content-sources-icons">
                            ${sourcesHtml}
                        </div>
                        <span class="content-sources-text">${cluster.articleCount}개 기사</span>
                    </div>
                </div>
                <img src="${cluster.image}" alt="${cluster.title}" class="issue-thumbnail">
                <div class="issue-summary">
                    ${summaryHtml}
                </div>
            </div>
        `;
    }
}

// 플로팅 출처 버튼 표시
function showFloatingSourcesButton(cluster) {
    const floatingBtn = document.getElementById('floatingSourcesBtn');
    console.log('🔍 플로팅 버튼 찾기:', floatingBtn);

    if (floatingBtn) {
        const totalSources = cluster.sources.reduce((sum, source) => sum + source.count, 0);
        const sourcesTextElement = floatingBtn.querySelector('.sources-text');

        console.log('🔍 출처 텍스트 요소:', sourcesTextElement);
        console.log('🔍 총 출처 수:', totalSources);

        if (sourcesTextElement) {
            sourcesTextElement.textContent = `${totalSources} 출처`;
        }

        floatingBtn.style.display = 'flex';
        console.log('✅ 플로팅 버튼 표시됨');

        // 클릭 이벤트 업데이트
        floatingBtn.onclick = () => {
            console.log('🔍 플로팅 버튼 클릭');
            openSourcesSidebar(cluster);
        };
    } else {
        console.warn('⚠️ 플로팅 버튼을 찾을 수 없습니다');
    }
}

// 플로팅 출처 버튼 숨김
function hideFloatingSourcesButton() {
    const floatingBtn = document.getElementById('floatingSourcesBtn');
    if (floatingBtn) {
        floatingBtn.style.display = 'none';
    }
}

// 분석 콘텐츠 초기화
function resetAnalysisContent() {
    const titleElement = document.getElementById('analysisTitle');
    const subtitleElement = document.getElementById('analysisSubtitle');
    const contentElement = document.getElementById('analysisContent');

    if (titleElement) titleElement.textContent = '이슈를 선택해주세요';
    if (subtitleElement) subtitleElement.textContent = '좌측에서 관심 있는 이슈를 클릭하면 상세 정보가 표시됩니다';
    if (contentElement) {
        contentElement.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🎯</div>
                <h3>분석할 이슈를 선택해주세요</h3>
                <p>좌측 브리핑에서 이슈를 클릭하면<br>상세 정보가 표시됩니다</p>
            </div>
        `;
    }
}

// 출처 목록 사이드바 열기
function openSourcesSidebar(cluster) {
    console.log('📋 출처 사이드바 열기 시도:', cluster.title);

    const sidebar = document.getElementById('sourcesSidebar');
    const sourcesContent = document.getElementById('sourcesContent');

    console.log('🔍 사이드바 요소:', sidebar);
    console.log('🔍 콘텐츠 요소:', sourcesContent);

    if (sidebar && sourcesContent) {
        // 출처 목록 생성
        const sourcesHtml = cluster.sources.map(source => `
            <div class="source-item">
                <img src="${source.icon}" alt="${source.name}" class="source-item-icon">
                <div class="source-item-info">
                    <div class="source-item-name">${source.name}</div>
                    <div class="source-item-count">${source.count}개 기사</div>
                </div>
            </div>
        `).join('');

        sourcesContent.innerHTML = sourcesHtml;
        sidebar.classList.add('open');
        console.log('✅ 출처 사이드바 열림');
    } else {
        console.warn('⚠️ 사이드바 요소를 찾을 수 없습니다');
    }
}

// 출처 목록 사이드바 닫기
function closeSourcesSidebar() {
    const sidebar = document.getElementById('sourcesSidebar');
    if (sidebar) {
        sidebar.classList.remove('open');
    }
}

// 출처 목록 사이드바 이벤트 리스너 추가
function initializeSourcesSidebar() {
    const closeBtn = document.getElementById('sourcesClose');
    if (closeBtn) {
        closeBtn.onclick = closeSourcesSidebar;
    }

    // 사이드바 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('sourcesSidebar');
        const floatingBtn = document.getElementById('floatingSourcesBtn');

        if (sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !floatingBtn.contains(e.target)) {
                closeSourcesSidebar();
            }
        }
    });
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
        initializeSourcesSidebar();

        // 첫 번째 클러스터 자동 선택
        setTimeout(() => {
            if (window.issueClusters && window.issueClusters.length > 0 && !window.appState.selectedCluster) {
                const firstCluster = window.issueClusters[0];
                selectCluster(firstCluster.id);
                console.log('🎯 첫 번째 클러스터 자동 선택:', firstCluster.title);
            }
        }, 100);

        console.log('✅ 초기화 완료!');

    } catch (error) {
        console.error('❌ 초기화 오류:', error);
    }
}

// 전역 함수로 등록
window.renderIssueClusters = renderIssueClusters;
window.renderBriefingCards = renderBriefingCards;
window.attachCardEventListeners = attachCardEventListeners;
window.selectCluster = selectCluster;
window.showFloatingSourcesButton = showFloatingSourcesButton;
window.hideFloatingSourcesButton = hideFloatingSourcesButton;
window.resetAnalysisContent = resetAnalysisContent;
window.openSourcesSidebar = openSourcesSidebar;
window.closeSourcesSidebar = closeSourcesSidebar;
window.initializeSourcesSidebar = initializeSourcesSidebar;
window.initializeComponents = initializeComponents;
window.updateAnalysisContent = updateAnalysisContent; 
