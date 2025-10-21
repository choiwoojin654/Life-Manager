document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const loginFrame = document.getElementById('login-frame');
    const mainAppFrame = document.getElementById('main-app-frame');
    
    if (loginFrame) {
        const loginButton = loginFrame.querySelector('.btn-primary');
        if(loginButton) {
            loginButton.addEventListener('click', () => {
                loginFrame.style.display = 'none';
                mainAppFrame.style.display = 'flex';
            });
        }
    }

    const pages = mainAppFrame.querySelectorAll(".app-content .page");
    const hamburgerButton = mainAppFrame.querySelector("#hamburger-button");
    const sidebar = mainAppFrame.querySelector("#sidebar");
    const overlay = mainAppFrame.querySelector("#overlay");
    const mainNav = mainAppFrame.querySelector("#main-nav");
    const customizeButton = mainAppFrame.querySelector("#customize-button");
    const customizeModal = mainAppFrame.querySelector("#customize-modal");
    const modalSaveButton = mainAppFrame.querySelector("#modal-save-button");
    const customizeList = mainAppFrame.querySelector("#customize-list");
    const sidebarMenuItems = mainAppFrame.querySelectorAll(".sidebar-menu-item");
    const sidebarMenu = mainAppFrame.querySelector('.sidebar-menu');
    

    // --- Data ---
    const allNavItems = {
        home: { name: '홈', emoji: '🏠', icon: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>' },
        messenger: { name: '메신저', emoji: '💬', icon: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' },
        weather: { name: '날씨', emoji: '☀️', icon: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.758A3.75 3.75 0 0013.5 4.5h-2.25A3.75 3.75 0 007.5 8.25v.75" /></svg>' },
        calendar: { name: '캘린더', emoji: '📅', icon: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M6.75 3v2.25m10.5-2.25v2.25M6.75 21V5.25h10.5V21M3 10.5h18M3 5.25a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25v13.5a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25V5.25z" /></svg>' },
        map: { name: '지도', emoji: '🗺️', icon: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>' },
        life: { name: '생활', emoji: '🏠', icon: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75l.008-.008H12v.008z" /></svg>' },
        shopping: { name: '쇼핑', emoji: '🛒', icon: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.087-.835l1.823-6.423a.75.75 0 00-.67-1.038H6.75a.75.75 0 00-.75.75v10.5a.75.75 0 00.75.75z" /></svg>'},
        news: { name: '뉴스', emoji: '📰', icon: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg>'},
        sports: { name: '스포츠', emoji: '⚽', icon: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M11.25 4.5l7.5 7.5-7.5 7.5M11.25 4.5l-7.5 7.5 7.5 7.5" /></svg>'},
        bank: { name: '은행', emoji: '🏦', icon: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3.375m-3.375 2.25h13.5m0-13.5V21A2.25 2.25 0 0118 23.25H6a2.25 2.25 0 01-2.25-2.25V7.5A2.25 2.25 0 016 5.25h12A2.25 2.25 0 0120.25 7.5v0-1.5z" /></svg>'},
        stocks: { name: '증권', emoji: '📈', icon: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.976 5.197M21 18H2.25" /></svg>'},
        translate: { name: '번역', emoji: '🌐', icon: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.061 14.122 7.5 15 7.5h0c.878 0 1.82-.439 2.666-1.136m0 0V3m0 2.364a48.458 48.458 0 01-2.666.475" /></svg>'},
        settings: { name: '설정', icon: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>' }
    };
    let currentNavIds = ['home', 'messenger', 'weather', 'calendar', 'settings'];

    // --- Functions ---
    function showPage(targetPageId) {
        pages.forEach(page => page.classList.remove("active"));
        const targetPage = mainAppFrame.querySelector(`#page-${targetPageId}`);
        if(targetPage) {
            targetPage.classList.add("active");
        }
        mainAppFrame.querySelectorAll("#main-nav .nav-button").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.target === targetPageId);
        });
    }

    function rebindNavButtons() {
         mainAppFrame.querySelectorAll("#main-nav .nav-button").forEach(button => {
            button.addEventListener("click", () => {
                showPage(button.dataset.target);
            });
        });
    }

    function buildNavBar(ids) {
        mainNav.innerHTML = ids.map(id => {
            const item = allNavItems[id];
            return `
                <button class="nav-button" data-target="${id}">
                    <span class="icon">${item.icon}</span>
                    <span>${item.name}</span>
                </button>
            `;
        }).join('');
        rebindNavButtons();
        showPage(ids.includes('home') ? 'home' : ids[0]);
    }

    function closeSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }

    // --- Event Listeners ---
    hamburgerButton.addEventListener("click", () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    });

    overlay.addEventListener("click", () => {
        closeSidebar();
        customizeModal.classList.remove("active");
    });

    sidebarMenuItems.forEach(item => {
        item.addEventListener("click", () => {
            const pageId = item.dataset.page;
            if(pageId) {
                showPage(pageId);
                closeSidebar();
            }
        });
    });

    customizeButton.addEventListener("click", () => {
        overlay.classList.add("active");
        customizeModal.classList.add("active");
        
        customizeList.innerHTML = Object.keys(allNavItems).map(id => {
            const item = allNavItems[id];
            const isChecked = currentNavIds.includes(id);
            const isDisabled = id === 'home' || id === 'settings';
            return `
                <label>
                    <input type="checkbox" value="${id}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
                    <span>${item.emoji || '⚙️'} ${item.name}</span>
                </label>
            `;
        }).join('');
    });

    modalSaveButton.addEventListener("click", () => {
        const selectedItems = [];
        customizeList.querySelectorAll('input:checked:not(:disabled)').forEach(input => {
            selectedItems.push(input.value);
        });

        if (selectedItems.length > 3) {
            alert('홈과 설정을 제외하고 최대 3개까지만 선택할 수 있습니다.');
            return;
        }

        currentNavIds = ['home', ...selectedItems, 'settings'];
        buildNavBar(currentNavIds);
        overlay.classList.remove("active");
        customizeModal.classList.remove("active");
    });

    // --- Initial Build ---
    buildNavBar(currentNavIds);
});
