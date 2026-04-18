// js/main.js

// 1. Khởi tạo Database cho Hệ thống (Giữ nguyên của bạn)
const sysDB = localforage.createInstance({ name: "AppHệThống", storeName: "settings" });

// 2. Hàm khởi tạo hệ thống (Set pass mặc định nếu chưa có)
async function initSystemSettings() {
    const currentPass = await sysDB.getItem('admin_pass');
    if (!currentPass) {
        await sysDB.setItem('admin_pass', '123456'); // Pass mặc định
    }
}

// 3. Hàm kiểm tra quyền truy cập (Đã cập nhật theo yêu cầu mới)
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';

    if (isLoggedIn !== 'true') {
        // Nếu chưa đăng nhập:
        if (currentPage !== 'index.html' && currentPage !== '') {
            // Nếu đang ở trang khác (khoi-n.html, tao-de-n.html...) -> Đá về index
            window.location.href = 'index.html';
        } else {
            // Nếu đang ở index.html -> Hiện màn hình Login, ẩn màn hình chính
            const loginScreen = document.getElementById('login-screen');
            const appScreen = document.getElementById('app-screen');
            if (loginScreen) loginScreen.style.display = 'flex';
            if (appScreen) appScreen.style.display = 'none';
        }
    } else {
        // Nếu đã đăng nhập:
        if (currentPage === 'index.html' || currentPage === '') {
            // Hiện màn hình chính, ẩn màn hình Login
            const loginScreen = document.getElementById('login-screen');
            const appScreen = document.getElementById('app-screen');
            if (loginScreen) loginScreen.style.display = 'none';
            if (appScreen) appScreen.style.display = 'flex';
        }
    }
}

// 4. Hàm Đăng Xuất (Sửa lại trỏ về index)
function handleLogout() {
    if(confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = 'start.html?logout=true';
    }
}

// 5. Hàm tự động tô sáng Menu (Giữ nguyên của bạn)
function setActiveMenu() {
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '' || currentPath === 'app.html') {
        currentPath = 'index.html'; 
    }

    document.querySelectorAll('.menu-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            const topbarTitle = document.getElementById('topbar-title');
            if(topbarTitle) {
                topbarTitle.innerText = link.innerText.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]\s?/g, ''); 
            }
        } else {
            link.classList.remove('active');
        }
    });
}

// 6. Tự động chạy (Thêm checkLogin vào đây)
document.addEventListener('DOMContentLoaded', () => {
    initSystemSettings();
    checkLogin();
    setActiveMenu();
});

