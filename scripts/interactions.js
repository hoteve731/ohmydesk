// 전역 변수
let selectedText = '';
let selectedRange = null;
let draggedElement = null;
let dragStartIndex = null;

// 오마이데스크 - 인터랙션 및 이벤트 처리

// 모달 관리
class ModalManager {
    constructor() {
        this.currentModal = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // ESC 키로 모달 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal();
            }
        });

        // 오버레이 클릭으로 모달 닫기
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal();
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        this.currentModal = modal;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        window.appState.currentModal = modalId;
    }

    closeModal() {
        if (this.currentModal) {
            this.currentModal.classList.remove('show');
            this.currentModal = null;
            document.body.style.overflow = '';
            window.appState.currentModal = null;
        }
    }
}

// 하이라이트 관리
class HighlightManager {
    constructor() {
        this.selectedText = '';
        this.selectedElement = null;
        this.menuPosition = { x: 0, y: 0 };
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('mouseup', (e) => {
            this.handleTextSelection(e);
        });

        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            if (selection.rangeCount === 0 || selection.toString().trim() === '') {
                this.hideHighlightMenu();
            }
        });
    }

    handleTextSelection(event) {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (selectedText.length > 0 && this.isValidSelectionTarget(event.target)) {
            this.selectedText = selectedText;
            this.selectedElement = event.target;
            this.showHighlightMenu(event);
        } else {
            this.hideHighlightMenu();
        }
    }

    isValidSelectionTarget(element) {
        // 리더 모달 내의 텍스트만 하이라이트 가능
        return element.closest('.reader-body') !== null;
    }

    showHighlightMenu(event) {
        const menu = document.getElementById('highlightMenu');
        if (!menu) return;

        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        this.menuPosition.x = rect.left + (rect.width / 2);
        this.menuPosition.y = rect.bottom + 10;

        menu.style.left = this.menuPosition.x + 'px';
        menu.style.top = this.menuPosition.y + 'px';
        menu.classList.add('show');
    }

    hideHighlightMenu() {
        const menu = document.getElementById('highlightMenu');
        if (menu) {
            menu.classList.remove('show');
        }
        this.selectedText = '';
        this.selectedElement = null;
    }

    addHighlight(category) {
        if (!this.selectedText) return;

        const source = this.getSourceFromContext();
        const item = window.addHighlightItem(this.selectedText, source, category);

        if (item) {
            this.applyHighlightStyle(category);
            this.hideHighlightMenu();
            this.showFeedback(`"${category}" 카테고리에 추가되었습니다`);
        }
    }

    getSourceFromContext() {
        const readerSource = document.getElementById('readerSource');
        const readerTitle = document.getElementById('readerTitle');

        if (readerSource && readerTitle) {
            return `${readerSource.textContent} - ${readerTitle.textContent}`;
        }
        return '출처 불명';
    }

    applyHighlightStyle(category) {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.className = `highlighted ${category}`;
        span.title = `${category} 카테고리로 하이라이트됨`;

        try {
            range.surroundContents(span);
            selection.removeAllRanges();
        } catch (error) {
            console.warn('하이라이트 적용 실패:', error);
        }
    }

    showFeedback(message) {
        // 간단한 토스트 메시지 표시
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-blue);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            font-size: 14px;
        `;

        document.body.appendChild(toast);

        setTimeout(() => toast.style.opacity = '1', 10);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }
}

// 드래그 앤 드롭 관리
class DragDropManager {
    constructor() {
        this.draggedElement = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('note-item')) {
                this.draggedElement = e.target;
                e.target.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('note-item')) {
                e.target.classList.remove('dragging');
                this.draggedElement = null;
            }
        });

        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dropTarget = e.target.closest('.category-items');
            if (dropTarget && this.draggedElement) {
                e.dataTransfer.dropEffect = 'move';
                dropTarget.classList.add('drag-over');
            }
        });

        document.addEventListener('dragleave', (e) => {
            const dropTarget = e.target.closest('.category-items');
            if (dropTarget) {
                dropTarget.classList.remove('drag-over');
            }
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            const dropTarget = e.target.closest('.category-items');
            if (dropTarget && this.draggedElement) {
                this.handleDrop(dropTarget);
                dropTarget.classList.remove('drag-over');
            }
        });
    }

    handleDrop(dropTarget) {
        const targetCategoryId = dropTarget.id.replace('Items', '');
        const draggedItemId = this.draggedElement.dataset.itemId;

        // 아이템을 새 카테고리로 이동
        this.moveItemToCategory(draggedItemId, targetCategoryId);
    }

    moveItemToCategory(itemId, targetCategoryId) {
        const template = window.projectTemplates[window.appState.selectedProject];
        if (!template) return;

        let sourceCategory = null;
        let item = null;

        // 소스 카테고리와 아이템 찾기
        for (const category of template.categories) {
            const foundItem = category.items.find(i => i.id === itemId);
            if (foundItem) {
                sourceCategory = category;
                item = foundItem;
                break;
            }
        }

        if (!sourceCategory || !item) return;

        const targetCategory = template.categories.find(c => c.id === targetCategoryId);
        if (!targetCategory || sourceCategory === targetCategory) return;

        // 아이템 이동
        sourceCategory.items = sourceCategory.items.filter(i => i.id !== itemId);
        targetCategory.items.push(item);

        // UI 업데이트
        window.renderProjectNotes();
        window.storage.save('projectTemplates', window.projectTemplates);

        // 피드백 표시
        this.showMoveFeedback(item, sourceCategory.name, targetCategory.name);
    }

    showMoveFeedback(item, fromCategory, toCategory) {
        const feedback = `"${window.utils.truncateText(item.content, 30)}"을(를) ${fromCategory}에서 ${toCategory}로 이동했습니다.`;

        // 기존 하이라이트 매니저의 피드백 기능 재사용
        if (window.highlightManager) {
            window.highlightManager.showFeedback(feedback);
        }
    }
}

// 키보드 단축키 관리
class KeyboardManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            // Cmd/Ctrl + K: 검색 포커스
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.focusSearch();
            }

            // Cmd/Ctrl + E: 내보내기
            if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
                e.preventDefault();
                this.triggerExport();
            }

            // Cmd/Ctrl + N: 새 노트 추가
            if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
                e.preventDefault();
                this.addNewNote();
            }

            // 숫자 키 1-4: 분석 뷰 변경
            if (e.key >= '1' && e.key <= '3' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                const views = ['timeline', 'comparison', 'data'];
                const view = views[parseInt(e.key) - 1];
                if (view) {
                    window.changeAnalysisView(view);
                }
            }
        });
    }

    focusSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }

    triggerExport() {
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.click();
        }
    }

    addNewNote() {
        const addNoteBtn = document.getElementById('addNoteBtn');
        if (addNoteBtn) {
            addNoteBtn.click();
        }
    }
}

// 메인 이벤트 리스너 설정
function setupEventListeners() {
    // 분석 컨트롤 버튼
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            if (view) {
                window.changeAnalysisView(view);
            }
        });
    });

    // 프로젝트 선택
    const projectSelect = document.getElementById('projectSelect');
    if (projectSelect) {
        projectSelect.addEventListener('change', (e) => {
            window.changeProject(e.target.value);
        });
    }

    // 내보내기 버튼
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExport);
    }

    // 설정 버튼
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            console.log('설정 모달 열기 (추후 구현)');
        });
    }

    // 리더 모달 닫기 버튼
    const readerClose = document.getElementById('readerClose');
    if (readerClose) {
        readerClose.addEventListener('click', () => {
            window.modalManager.closeModal();
        });
    }

    // 하이라이트 버튼들
    document.querySelectorAll('.highlight-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            if (category && window.highlightManager) {
                window.highlightManager.addHighlight(category);
            }
        });
    });

    // 노트 추가 버튼
    const addNoteBtn = document.getElementById('addNoteBtn');
    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', handleAddNote);
    }

    // 날짜 선택기
    const dateInput = document.getElementById('dateInput');
    if (dateInput) {
        dateInput.addEventListener('change', (e) => {
            console.log('날짜 변경:', e.target.value);
            // 추후 날짜별 데이터 로딩 구현
        });
    }

    console.log('이벤트 리스너 설정 완료');
}

// 이벤트 핸들러 함수들
function handleExport() {
    const template = window.projectTemplates[window.appState.selectedProject];
    if (!template) return;

    const markdown = window.exportManager.generateMarkdown(template);
    const filename = `${template.name}_${new Date().toISOString().split('T')[0]}.md`;

    window.exportManager.downloadFile(markdown, filename);

    // 피드백 표시
    if (window.highlightManager) {
        window.highlightManager.showFeedback('마크다운 파일이 다운로드되었습니다');
    }
}

function handleAddNote() {
    const content = prompt('새 노트 내용을 입력하세요:');
    if (!content || !content.trim()) return;

    const template = window.projectTemplates[window.appState.selectedProject];
    if (!template) return;

    const item = {
        id: Date.now().toString(),
        content: content.trim(),
        source: '사용자 작성',
        timestamp: new Date().toISOString(),
        type: 'user'
    };

    // 첫 번째 카테고리에 추가
    template.categories[0].items.push(item);
    window.renderProjectNotes();
    window.storage.save('projectTemplates', window.projectTemplates);

    if (window.highlightManager) {
        window.highlightManager.showFeedback('새 노트가 추가되었습니다');
    }
}

// 리더 모달 열기
function openReaderModal(article) {
    window.renderReaderModal(article);
    window.modalManager.openModal('readerModal');
}

// 검색 기능 (추후 확장용)
function setupSearchFunction() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const term = e.target.value.trim();
            handleSearch(term);
        }, 300);
    });
}

function handleSearch(term) {
    if (!term) {
        window.renderIssueClusters();
        return;
    }

    const filtered = window.searchFilter.filterClusters(
        window.issueClusters,
        term,
        window.searchFilter.activeFilters
    );

    window.renderIssueClusters(filtered);
}

// 초기화 함수
function initializeInteractions() {
    // 매니저 인스턴스 생성
    window.modalManager = new ModalManager();
    window.highlightManager = new HighlightManager();
    window.dragDropManager = new DragDropManager();
    window.keyboardManager = new KeyboardManager();

    // 기본 이벤트 리스너 설정
    setupEventListeners();
    setupSearchFunction();

    // 반응형 관리 초기화
    window.responsiveManager.init();

    console.log('인터랙션 초기화 완료');
}

// 전역 함수 등록
window.openReaderModal = openReaderModal;
window.handleExport = handleExport;
window.handleAddNote = handleAddNote;
window.initializeInteractions = initializeInteractions;

// 유틸리티 함수 추가
window.utils.debounce = function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

window.utils.throttle = function (func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}; 