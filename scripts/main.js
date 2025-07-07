// 오마이데스크 - 메인 애플리케이션

// DOM 로드 완료 대기
document.addEventListener('DOMContentLoaded', function () {
    console.log('🌟 DOM 로드 완료, 앱 초기화 시작...');
    initializeApp();
});

// 앱 초기화
function initializeApp() {
    console.log('🚀 오마이데스크 초기화 시작...');

    try {
        // 0. 필수 데이터 확인
        console.log('📊 데이터 확인:', {
            clusters: window.issueClusters?.length || 0,
            templates: Object.keys(window.projectTemplates || {}).length,
            utils: !!window.utils,
            storage: !!window.storage,
            appState: !!window.appState
        });

        // 필수 데이터가 없는 경우 경고
        if (!window.issueClusters || window.issueClusters.length === 0) {
            console.warn('⚠️ issueClusters 데이터가 없습니다!');
        }

        if (!window.projectTemplates || Object.keys(window.projectTemplates).length === 0) {
            console.warn('⚠️ projectTemplates 데이터가 없습니다!');
        }

        // 1. 반응형 체크 및 경고 표시
        initializeResponsive();

        // 2. 로컬 스토리지에서 기존 데이터 복원
        restoreFromStorage();

        // 3. 컴포넌트 초기화
        if (window.initializeComponents) {
            window.initializeComponents();
        } else {
            console.error('❌ initializeComponents 함수를 찾을 수 없습니다.');
        }

        // 4. 인터랙션 초기화  
        if (window.initializeInteractions) {
            window.initializeInteractions();
        } else {
            console.warn('⚠️ initializeInteractions 함수를 찾을 수 없습니다.');
        }

        // 5. 첫 번째 클러스터 자동 선택 (옵션)
        autoSelectFirstCluster();

        // 6. 이벤트 리스너 설정
        setupEventListeners();

        // 7. 개발 도구 설정
        setupDevelopmentUtils();

        console.log('✅ 오마이데스크 초기화 완료');

        // 초기화 완료 이벤트 발생
        dispatchInitializationComplete();

    } catch (error) {
        console.error('❌ 오마이데스크 초기화 실패:', error);
        showInitializationError(error);
    }
}

// 반응형 체크 초기화
function initializeResponsive() {
    // responsiveManager가 없다면 간단한 버전으로 대체
    if (!window.responsiveManager) {
        window.responsiveManager = {
            checkViewport: () => {
                const warning = document.getElementById('responsiveWarning');
                const appContainer = document.getElementById('appContainer');

                if (window.innerWidth < 1200) {
                    if (warning) warning.style.display = 'flex';
                    if (appContainer) appContainer.style.display = 'none';
                } else {
                    if (warning) warning.style.display = 'none';
                    if (appContainer) appContainer.style.display = 'grid';
                }
            },
            init: function () {
                window.addEventListener('resize', this.checkViewport);
                this.checkViewport();
            }
        };
    }

    window.responsiveManager.init();

    // 화면 크기 변경 감지
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            window.responsiveManager.checkViewport();
        }, 100);
    });
}

// 로컬 스토리지에서 기존 데이터 복원
function restoreFromStorage() {
    try {
        // storage 객체 존재 확인
        if (!window.storage) {
            console.warn('⚠️ storage 객체가 없습니다. 데이터 복원을 건너뜁니다.');
            return;
        }

        // 프로젝트 템플릿 복원
        const savedTemplates = window.storage.load('projectTemplates');
        if (savedTemplates) {
            Object.assign(window.projectTemplates, savedTemplates);
            console.log('📦 저장된 프로젝트 템플릿 복원됨');
        }

        // 앱 상태 복원
        const savedState = window.storage.load('appState');
        if (savedState) {
            Object.assign(window.appState, savedState);
            console.log('⚙️ 저장된 앱 상태 복원됨');
        }

        // 사용자 설정 복원 (추후 구현)
        const savedSettings = window.storage.load('userSettings');
        if (savedSettings) {
            // applyUserSettings(savedSettings);
            console.log('🎛️ 사용자 설정 복원됨');
        }

    } catch (error) {
        console.warn('⚠️ 데이터 복원 중 오류:', error);
        // 복원 실패시 기본값 유지
    }
}

// 첫 번째 클러스터 자동 선택
function autoSelectFirstCluster() {
    // appState가 정의되지 않은 경우 안전하게 처리
    if (!window.appState) {
        console.warn('⚠️ appState가 아직 정의되지 않았습니다.');
        return;
    }

    if (!window.appState.selectedCluster && window.issueClusters && window.issueClusters.length > 0) {
        // 가장 최근 업데이트된 클러스터 선택
        const latestCluster = window.issueClusters
            .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))[0];

        if (latestCluster) {
            selectCluster(latestCluster);
            console.log('🎯 첫 번째 클러스터 자동 선택:', latestCluster.title);
        }
    }
}

// 클러스터 선택 함수 정의
function selectCluster(cluster) {
    if (!window.appState) {
        console.warn('⚠️ appState가 정의되지 않았습니다.');
        return;
    }

    window.appState.selectedCluster = cluster;

    // 분석 콘텐츠 업데이트
    if (window.updateAnalysisContent) {
        window.updateAnalysisContent(cluster);
    }

    console.log('📊 클러스터 선택됨:', cluster.title);
}

// 주기적 업데이트 설정 (추후 실시간 데이터용)
function setupPeriodicUpdates() {
    // 30초마다 데이터 새로고침 체크
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            checkForUpdates();
        }
    }, 30000);

    // 페이지 포커스시 즉시 업데이트 체크
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            checkForUpdates();
        }
    });
}

// 업데이트 체크 (추후 API 연동용)
function checkForUpdates() {
    // 실제 구현시 서버 API 호출
    console.log('🔄 업데이트 체크...');

    // 모의 업데이트 체크
    const lastCheck = window.storage.load('lastUpdateCheck', 0);
    const now = Date.now();

    if (now - lastCheck > 300000) { // 5분마다
        window.storage.save('lastUpdateCheck', now);
        // fetchLatestData(); // 실제 API 호출
    }
}

// 초기화 완료 이벤트
function dispatchInitializationComplete() {
    // 안전하게 데이터 접근
    const clustersLength = window.issueClusters?.length || 0;
    const selectedProject = window.appState?.selectedProject || 'default';

    const event = new CustomEvent('ohmydeskReady', {
        detail: {
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            clusters: clustersLength,
            selectedProject: selectedProject
        }
    });

    window.dispatchEvent(event);
    console.log('🎉 초기화 완료 이벤트 발생:', { clusters: clustersLength, selectedProject });
}

// 초기화 오류 표시
function showInitializationError(error) {
    const errorOverlay = document.createElement('div');
    errorOverlay.className = 'error-overlay';
    errorOverlay.innerHTML = `
        <div class="error-content">
            <div class="error-icon">⚠️</div>
            <h3>초기화 오류</h3>
            <p>오마이데스크를 초기화하는 중 오류가 발생했습니다.</p>
            <details>
                <summary>오류 세부사항</summary>
                <pre>${error.message || error}</pre>
            </details>
            <button onclick="location.reload()" class="retry-btn">다시 시도</button>
        </div>
    `;

    errorOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
    `;

    document.body.appendChild(errorOverlay);
}

// 앱 종료 및 정리
function cleanupApp() {
    console.log('🧹 앱 정리 중...');

    // 현재 상태 저장
    window.storage.save('appState', window.appState);
    window.storage.save('projectTemplates', window.projectTemplates);

    // 이벤트 리스너 정리
    window.removeEventListener('beforeunload', handleBeforeUnload);

    console.log('✅ 앱 정리 완료');
}

// 페이지 언로드 전 처리
function handleBeforeUnload(event) {
    // 저장되지 않은 변경사항이 있는지 확인
    const hasUnsavedChanges = checkForUnsavedChanges();

    if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = '저장되지 않은 변경사항이 있습니다. 정말 나가시겠습니까?';
        return event.returnValue;
    }

    // 정리 작업 수행
    cleanupApp();
}

// 저장되지 않은 변경사항 체크
function checkForUnsavedChanges() {
    // 실제 구현시 더 정교한 체크 로직 필요
    const currentTemplates = JSON.stringify(window.projectTemplates);
    const savedTemplates = JSON.stringify(window.storage.load('projectTemplates', {}));

    return currentTemplates !== savedTemplates;
}

// 성능 모니터링
function setupPerformanceMonitoring() {
    // 렌더링 성능 측정
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
            if (entry.duration > 100) { // 100ms 이상 걸리는 작업 로깅
                console.warn('⚡ 느린 렌더링 감지:', entry.name, entry.duration + 'ms');
            }
        });
    });

    observer.observe({ entryTypes: ['measure'] });

    // 메모리 사용량 모니터링 (Chrome 환경)
    if (performance.memory) {
        setInterval(() => {
            const memory = performance.memory;
            const used = Math.round(memory.usedJSHeapSize / 1048576); // MB
            const total = Math.round(memory.totalJSHeapSize / 1048576); // MB

            if (used > 50) { // 50MB 이상시 경고
                console.warn('🧠 높은 메모리 사용량:', used + 'MB / ' + total + 'MB');
            }
        }, 60000); // 1분마다 체크
    }
}

// 개발 모드 유틸리티
function setupDevelopmentUtils() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // 개발 환경에서만 활성화
        window.ohmydesk = {
            // 디버깅용 전역 객체 노출
            data: {
                clusters: window.issueClusters,
                templates: window.projectTemplates,
                state: window.appState
            },

            // 유틸리티 함수들
            utils: window.utils,

            // 강제 상태 리셋
            reset: () => {
                localStorage.clear();
                location.reload();
            },

            // 샘플 데이터 추가
            addSampleData: () => {
                // 샘플 하이라이트 추가
                const categories = ['issues', 'deep', 'different', 'tmi'];
                categories.forEach(category => {
                    window.addHighlightItem(
                        `샘플 ${category} 하이라이트 텍스트`,
                        '샘플 출처',
                        category
                    );
                });
                console.log('📝 샘플 데이터 추가됨');
            }
        };

        console.log('🔧 개발 모드 활성화 - window.ohmydesk 사용 가능');
    }
}

// 키보드 단축키 도움말 표시
function showKeyboardShortcuts() {
    const shortcuts = [
        { key: 'Cmd/Ctrl + K', description: '검색 포커스' },
        { key: 'Cmd/Ctrl + E', description: '내보내기' },
        { key: 'Cmd/Ctrl + N', description: '새 노트 추가' },
        { key: '1, 2, 3', description: '분석 뷰 변경' },
        { key: 'Esc', description: '모달 닫기' },
        { key: 'Cmd/Ctrl + Shift + ?', description: '단축키 도움말' }
    ];

    const helpContent = shortcuts.map(s =>
        `<div class="shortcut-item">
            <kbd>${s.key}</kbd>
            <span>${s.description}</span>
        </div>`
    ).join('');

    // 모달이나 툴팁으로 표시
    if (window.highlightManager) {
        window.highlightManager.showFeedback('키보드 단축키 정보가 콘솔에 출력되었습니다');
    }

    console.table(shortcuts);
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 분석 뷰 변경 버튼
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            if (view && window.changeAnalysisView) {
                window.changeAnalysisView(view);
            }
        });
    });

    // 프로젝트 선택 드롭다운
    const projectSelect = document.getElementById('projectSelect');
    if (projectSelect) {
        projectSelect.addEventListener('change', (e) => {
            if (window.changeProject) {
                window.changeProject(e.target.value);
            }
        });
    }

    // 내보내기 버튼
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            if (window.modalManager) {
                window.modalManager.openModal('exportModal');
            } else {
                console.log('내보내기 기능 (모달 미구현)');
            }
        });
    }

    // 설정 버튼
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            if (window.modalManager) {
                window.modalManager.openModal('settingsModal');
            } else {
                console.log('설정 기능 (모달 미구현)');
            }
        });
    }

    // 날짜 선택기
    const dateInput = document.getElementById('dateInput');
    if (dateInput) {
        dateInput.addEventListener('change', (e) => {
            console.log('날짜 변경:', e.target.value);
            // 향후 날짜별 데이터 로딩 구현
        });
    }

    // 키보드 단축키
    document.addEventListener('keydown', (e) => {
        // ESC: 모달 닫기
        if (e.key === 'Escape' && window.modalManager) {
            window.modalManager.closeModal();
        }

        // Cmd/Ctrl + K: 검색 (추후 구현)
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            console.log('검색 기능 (미구현)');
        }

        // Cmd/Ctrl + E: 내보내기
        if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
            e.preventDefault();
            exportBtn?.click();
        }

        // 숫자 키로 뷰 변경
        if (['1', '2', '3'].includes(e.key)) {
            const views = ['timeline', 'comparison', 'data'];
            const view = views[parseInt(e.key) - 1];
            if (view && window.changeAnalysisView) {
                window.changeAnalysisView(view);
            }
        }

        // Cmd/Ctrl + Shift + ?: 도움말
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === '?') {
            e.preventDefault();
            showKeyboardShortcuts();
        }
    });

    // 페이지 언로드 처리
    window.addEventListener('beforeunload', handleBeforeUnload);

    console.log('🎯 이벤트 리스너 설정 완료');
}

// 전역 함수 등록
window.initializeApp = initializeApp;
window.cleanupApp = cleanupApp;
window.selectCluster = selectCluster;

// 오류 처리
window.addEventListener('error', (event) => {
    console.error('💥 전역 오류:', event.error);

    // 중요한 오류만 사용자에게 표시
    if (event.error?.name === 'ChunkLoadError' || event.error?.name === 'TypeError') {
        if (window.highlightManager) {
            window.highlightManager.showFeedback('일시적인 오류가 발생했습니다. 새로고침을 시도해보세요.');
        }
    }
});

// 미처리 Promise 거부 처리
window.addEventListener('unhandledrejection', (event) => {
    console.warn('🔄 처리되지 않은 Promise 거부:', event.reason);
    event.preventDefault(); // 콘솔 오류 방지
});

console.log('🎯 오마이데스크 메인 스크립트 로드 완료'); 