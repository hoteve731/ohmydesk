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

        // 빈 상태일 때 출처 버튼 숨김
        hideSourcesToggleButton();
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
        showSourcesToggleButton(cluster);
        updateTableOfContents(cluster);
    } else {
        // 클러스터를 찾을 수 없을 때
        console.warn('⚠️ 클러스터를 찾을 수 없음:', clusterId);
        hideSourcesToggleButton();
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

    // 헤더 부분 업데이트 (제목과 출처를 여기로 이동)
    if (titleElement) titleElement.textContent = cluster.title;
    if (subtitleElement) {
        const sourcesHtml = cluster.sources.map(source =>
            `<img src="${source.icon}" alt="${source.name}" class="header-source-icon" title="${source.name} (${source.count}개 기사)">`
        ).join('');
        subtitleElement.innerHTML = `
            <div class="header-sources">
                ${sourcesHtml}
                <span class="header-sources-text">${cluster.articleCount}개 출처</span>
            </div>
        `;
    }

    // 콘텐츠 부분 (제목과 출처 제거, 이미지와 요약만 표시)
    if (contentElement) {
        const summaryHtml = markdownToHtml(cluster.detailedSummary);

        contentElement.innerHTML = `
            <div class="issue-content">
                <img src="${cluster.image}" alt="${cluster.title}" class="issue-thumbnail">
                <div class="issue-summary">
                    ${summaryHtml}
                </div>
            </div>
        `;
    }
}

// 우측 사이드바 출처 버튼 표시
function showSourcesToggleButton(cluster) {
    const toggleBtn = document.getElementById('sourcesToggleBtn');
    const sourcesCount = document.getElementById('sourcesCount');

    console.log('🔍 출처 토글 버튼 찾기:', toggleBtn);

    if (toggleBtn && sourcesCount) {
        const totalSources = cluster.sources.reduce((sum, source) => sum + source.count, 0);
        sourcesCount.textContent = totalSources;

        toggleBtn.style.display = 'flex';
        console.log('✅ 출처 토글 버튼 표시됨:', totalSources + '개 출처');

        // 클릭 이벤트 업데이트
        toggleBtn.onclick = () => {
            console.log('🔍 출처 토글 버튼 클릭');
            openSourcesPanel(cluster);
        };
    } else {
        console.warn('⚠️ 출처 토글 버튼을 찾을 수 없습니다');
    }
}

// 우측 사이드바 출처 버튼 숨김
function hideSourcesToggleButton() {
    const toggleBtn = document.getElementById('sourcesToggleBtn');
    if (toggleBtn) {
        toggleBtn.style.display = 'none';
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

// 출처 패널 열기
function openSourcesPanel(cluster) {
    console.log('📋 출처 패널 열기 시도:', cluster.title);

    const panel = document.getElementById('sourcesPanel');
    const panelContent = document.getElementById('sourcesPanelContent');

    console.log('🔍 패널 요소:', panel);
    console.log('🔍 콘텐츠 요소:', panelContent);

    if (panel && panelContent) {
        // 상세한 출처 목록 생성 (플랫폼-제목-by 작성자 형태)
        const sourcesHtml = generateDetailedSourcesList(cluster);
        panelContent.innerHTML = sourcesHtml;
        panel.classList.add('open');
        console.log('✅ 출처 패널 열림');
    } else {
        console.warn('⚠️ 패널 요소를 찾을 수 없습니다');
    }
}

// 출처 패널 닫기
function closeSourcesPanel() {
    const panel = document.getElementById('sourcesPanel');
    if (panel) {
        panel.classList.remove('open');
    }
}

// 상세 출처 목록 생성
function generateDetailedSourcesList(cluster) {
    // 샘플 상세 출처 데이터 생성
    const detailedSources = [];

    cluster.sources.forEach(source => {
        const platformName = source.name;
        const platformIcon = source.icon; // 실제 이미지 파일 경로 사용

        // 각 플랫폼별로 가상의 기사들 생성
        for (let i = 0; i < Math.min(source.count, 5); i++) {
            detailedSources.push({
                platform: platformName,
                platformIcon: platformIcon,
                title: generateSampleTitle(cluster.title, i),
                author: generateSampleAuthor(platformName),
                time: generateSampleTime(i)
            });
        }
    });

    return detailedSources.map(source => `
        <div class="source-detail-item" style="cursor: pointer;" onclick="openReaderModal()">
            <img src="${source.platformIcon}" alt="${source.platform}" class="source-platform-icon">
            <div class="source-detail-content">
                <div class="source-detail-title">${source.title}</div>
                <div class="source-detail-meta">
                    <span class="source-detail-platform">${source.platform}</span>
                    <span>•</span>
                    <span class="source-detail-author">${source.author}</span>
                   
                </div>
            </div>
        </div>
    `).join('');
}

// 플랫폼별 클래스 반환 (더 이상 사용하지 않음)
// function getPlatformClass(platformName) {
//     switch (platformName.toLowerCase()) {
//         case 'x': return 'twitter';
//         case '네이버': return 'naver';
//         case '구글': return 'google';
//         case '페이스북': return 'facebook';
//         default: return 'naver';
//     }
// }

// 플랫폼별 아이콘 반환 (더 이상 사용하지 않음)
// function getPlatformIcon(platformName) {
//     switch (platformName.toLowerCase()) {
//         case 'x': return '𝕏';
//         case '네이버': return 'N';
//         case '구글': return 'G';
//         case '페이스북': return 'f';
//         default: return 'N';
//     }
// }

// 샘플 제목 생성
function generateSampleTitle(clusterTitle, index) {
    const titleVariations = [
        `${clusterTitle}에 대한 전문가 분석`,
        `${clusterTitle} 관련 최신 동향`,
        `${clusterTitle} 이슈 심층 분석`,
        `${clusterTitle}의 경제적 파급효과`,
        `${clusterTitle} 상황 점검과 전망`
    ];
    return titleVariations[index] || `${clusterTitle} 관련 뉴스`;
}

// 샘플 작성자 생성
function generateSampleAuthor(platformName) {
    const authors = {
        'x': ['@economist_kim', '@news_analyst', '@policy_expert'],
        '네이버': ['김기자', '이분석가', '박전문가'],
        '구글': ['경제팀', '정책연구소', '시사분석'],
        '페이스북': ['뉴스데스크', '분석팀', '리포터']
    };

    const authorList = authors[platformName.toLowerCase()] || authors['네이버'];
    return authorList[Math.floor(Math.random() * authorList.length)];
}

// 샘플 시간 생성
function generateSampleTime(index) {
    const times = ['1시간 전', '3시간 전', '5시간 전', '8시간 전', '12시간 전'];
    return times[index] || '1일 전';
}

// 출처 패널 이벤트 리스너 추가
function initializeSourcesPanel() {
    const closeBtn = document.getElementById('sourcesPanelClose');
    if (closeBtn) {
        closeBtn.onclick = closeSourcesPanel;
    }

    // 패널 외부 클릭 시 닫기 (우측 사이드바 내에서는 닫히지 않음)
    // 단, 리더 모달이 열려있을 때는 출처 패널을 닫지 않음
    document.addEventListener('click', (e) => {
        const panel = document.getElementById('sourcesPanel');
        const toggleBtn = document.getElementById('sourcesToggleBtn');
        const rightSidebar = document.querySelector('.right-sidebar');
        const readerModal = document.getElementById('readerModal');

        // 리더 모달이 열려있으면 출처 패널을 자동으로 닫지 않음
        if (readerModal && readerModal.classList.contains('show')) {
            return;
        }

        if (panel && panel.classList.contains('open')) {
            if (!rightSidebar.contains(e.target)) {
                closeSourcesPanel();
            }
        }
    });
}

// 목차(TOC) 생성 및 업데이트
function updateTableOfContents(cluster) {
    const tocContent = document.getElementById('tocContent');
    if (!tocContent) return;

    // 마크다운에서 헤딩 추출
    const headings = extractHeadingsFromMarkdown(cluster.detailedSummary);

    if (headings.length > 0) {
        const tocHtml = headings.map((heading, index) => `
            <div class="toc-item" data-heading="${index}">
                ${heading.text}
            </div>
        `).join('');

        tocContent.innerHTML = tocHtml;

        // TOC 클릭 이벤트 추가
        tocContent.querySelectorAll('.toc-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                scrollToHeading(index);
                // 활성화 상태 변경
                tocContent.querySelectorAll('.toc-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    } else {
        tocContent.innerHTML = '<div class="toc-empty"><span>목차가 없습니다</span></div>';
    }
}

// 마크다운에서 헤딩 추출
function extractHeadingsFromMarkdown(markdown) {
    const headings = [];
    const lines = markdown.split('\n');

    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('###')) {
            headings.push({ level: 3, text: trimmed.replace(/^###\s*/, '') });
        } else if (trimmed.startsWith('##')) {
            headings.push({ level: 2, text: trimmed.replace(/^##\s*/, '') });
        } else if (trimmed.startsWith('#')) {
            headings.push({ level: 1, text: trimmed.replace(/^#\s*/, '') });
        }
    });

    return headings;
}

// 특정 헤딩으로 스크롤
function scrollToHeading(index) {
    const analysisContent = document.getElementById('analysisContent');
    if (!analysisContent) return;

    const headings = analysisContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings[index]) {
        headings[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 프로젝트 노트 렌더링 (간단 버전)
function renderProjectNotes() {
    const container = document.getElementById('projectsContent');
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
        initializeSourcesPanel();

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

// 리더 모달 렌더링
function renderReaderModal(article) {
    // 가짜 샘플 기사 데이터 (실제로는 article 파라미터 사용)
    const sampleArticle = {
        source: 'X (트위터)',
        title: '윤석열 대통령 긴급 국정담화 발표 관련 사회적 논란',
        author: '@NewsAnalyst_KR',
        date: '2024-12-19',
        time: '3시간 전',
        content: `
            <p>윤석열 대통령이 어제 밤 국가적 위기 상황에 대한 긴급 담화를 발표했습니다. 이번 담화는 정치권과 국민들 사이에서 큰 파장을 일으키고 있으며, 향후 정국 운영에 미칠 영향에 대한 관심이 집중되고 있습니다.</p>

            <h2>주요 발표 내용</h2>
            
            <p>대통령의 담화에서는 다음과 같은 주요 내용들이 언급되었습니다:</p>
            
            <ul>
                <li><strong>국가 안보 상황</strong>에 대한 현황 브리핑</li>
                <li><strong>경제 정책</strong> 방향성 재정립</li>
                <li><strong>사회 갈등 해소</strong>를 위한 정부의 노력</li>
                <li><strong>국정 운영</strong>의 투명성 강화 방안</li>
            </ul>

            <blockquote>
                "국민 여러분께서 가지고 계신 우려와 불안을 충분히 이해하고 있으며, 정부는 이러한 상황을 슬기롭게 극복하기 위해 모든 노력을 기울이겠습니다."
            </blockquote>

            <h3>정치권 반응</h3>
            
            <p>여당에서는 대통령의 담화가 <em>"시의적절하고 필요한 결단"</em>이라고 평가하며 전폭적인 지지 의사를 표명했습니다. 반면 야당에서는 <em>"구체적인 해결책 없는 선언적 수준"</em>이라며 비판적 입장을 견지하고 있습니다.</p>

            <p>특히 시민사회에서는 이번 담화가 실질적인 정책 변화로 이어질지에 대한 의문을 제기하고 있으며, 향후 정부의 구체적인 행동 계획을 주시하고 있다고 밝혔습니다.</p>

            <h3>경제계 우려</h3>
            
            <p>경제계에서는 정치적 불확실성이 지속될 경우 투자 심리 위축과 경제 성장 둔화가 우려된다는 입장을 표명했습니다. 주요 경제 단체들은 정치권의 대화와 타협을 통한 빠른 사태 수습을 촉구하고 있습니다.</p>

            <p>한국은행 관계자는 <em>"현재 상황이 금융시장에 미치는 영향을 면밀히 모니터링하고 있으며, 필요시 적절한 대응책을 마련할 것"</em>이라고 언급했습니다.</p>

            <h2>국제사회 반응</h2>
            
            <p>주요 우방국들은 한국의 정치적 상황을 예의주시하고 있으며, 안정적인 해결을 기대한다는 입장을 표명했습니다. 특히 미국과 일본은 양국 관계에 미칠 영향을 최소화하기 위해 외교적 노력을 기울이고 있다고 전해집니다.</p>

            <blockquote>
                "민주주의 국가로서 한국이 이번 어려움을 슬기롭게 극복할 것이라 확신하며, 지속적인 협력 관계를 유지해 나가겠습니다." - 주한 미국 대사
            </blockquote>

            <h3>향후 전망</h3>
            
            <p>전문가들은 이번 사태가 향후 몇 주간 정치권의 주요 이슈가 될 것으로 전망하고 있습니다. 특히 다가오는 국정감사와 예산안 심의 과정에서 이번 담화가 어떤 영향을 미칠지 주목받고 있습니다.</p>

            <p>정치학자 김○○ 교수는 <em>"현재 상황은 단순한 정치적 이벤트를 넘어 한국 민주주의의 성숙도를 보여주는 시금석이 될 것"</em>이라고 분석했습니다.</p>

            <p>국민들의 관심과 참여를 통해 이번 위기가 한국 사회 발전의 기회가 되기를 기대해 봅니다.</p>
        `
    };

    // 리더 모달 HTML 업데이트
    const readerSource = document.getElementById('readerSource');
    const readerTitle = document.getElementById('readerTitle');
    const readerMeta = document.getElementById('readerMeta');
    const readerBody = document.getElementById('readerBody');

    if (readerSource) readerSource.textContent = sampleArticle.source;
    if (readerTitle) readerTitle.textContent = sampleArticle.title;

    if (readerMeta) {
        readerMeta.innerHTML = `
            <span class="reader-date">${sampleArticle.time}</span>
            <span class="reader-author">${sampleArticle.author}</span>
        `;
    }

    if (readerBody) {
        // 기사 내용을 직접 삽입 (reader-article 래퍼 제거)
        readerBody.innerHTML = sampleArticle.content;
    }
}

// 전역 함수로 등록
window.renderIssueClusters = renderIssueClusters;
window.renderBriefingCards = renderBriefingCards;
window.attachCardEventListeners = attachCardEventListeners;
window.selectCluster = selectCluster;
window.showSourcesToggleButton = showSourcesToggleButton;
window.hideSourcesToggleButton = hideSourcesToggleButton;
window.resetAnalysisContent = resetAnalysisContent;
window.openSourcesPanel = openSourcesPanel;
window.closeSourcesPanel = closeSourcesPanel;
window.initializeSourcesPanel = initializeSourcesPanel;
window.updateTableOfContents = updateTableOfContents;
window.initializeComponents = initializeComponents;
window.updateAnalysisContent = updateAnalysisContent;
window.renderReaderModal = renderReaderModal; 
