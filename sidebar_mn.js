document.addEventListener("DOMContentLoaded", function () {
    // 1. TỰ ĐỘNG BƠM CSS SIDEBAR VÀO TRANG (CSS-in-JS - GIAO DIỆN SÁNG MÀU)
    const style = document.createElement('style');
    style.innerHTML = `
        /* Khung chính của Sidebar (Sáng, đổ bóng mềm) */
        .sidebar { width: 180px; background: #ffffff; color: #4b5563; display: flex; flex-direction: column; height: 100vh; z-index: 100; font-family: 'Segoe UI', system-ui, sans-serif; box-shadow: 4px 0 15px rgba(0,0,0,0.03); border-right: 1px solid #f1f5f9; }
        
        /* Header Sidebar: Bố cục ngang sang trọng */
        .sidebar-header { padding: 15px 12px; display: flex; align-items: center; gap: 12px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; flex-shrink: 0; }
        .sidebar-header img { width: 38px; height: 38px; border-radius: 10px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.08); transition: transform 0.3s; }
        .sidebar-header a:hover img { transform: scale(1.05); }
        .sidebar-header .brand { font-size: 14px; font-weight: 800; letter-spacing: 0.5px; line-height: 1.3; background: linear-gradient(45deg, #8b5cf6, #d946ef); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        /* Menu chính */
        .menu { list-style: none; flex: 1; overflow-y: auto; margin: 0; padding: 5px 8px; min-height: 0; display: flex; flex-direction: column; gap: 4px; }
        
        /* Tiêu đề nhóm */
        .menu-category { padding: 5px 10px 4px; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; }
        
        /* Nút menu */
        .menu-item a { 
            color: #64748b; 
            text-decoration: none; 
            padding: 5px 12px; 
            display: flex; 
            align-items: center; 
            gap: 12px; 
            font-size: 13.5px; 
            border-radius: 8px; 
            transition: all 0.2s ease; 
            font-weight: 500;
        }
        .menu-item a:hover { background: #f1f5f9; color: #8b5cf6; transform: translateX(3px); }
        .menu-item.active a { background: linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%); color: #7c3aed; font-weight: 700; box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15); border-left: 3px solid #8b5cf6; }
        
        /* Footer chứa nút đăng xuất & Chữ ký */
        .sidebar-footer { padding: 20px 15px; background: #f8fafc; border-top: 1px solid #e2e8f0; flex-shrink: 0; }
        
        /* Nhóm nút hành động ở Footer */
        .btn-action-group { display: flex; gap: 10px; margin-bottom: 15px; }
        .btn-lock, .btn-logout { flex: 1; padding: 8px 5px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 12px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 5px; }
        
        .btn-lock { background: rgba(245, 158, 11, 0.1); color: #d97706; }
        .btn-lock:hover { background: #f59e0b; color: #ffffff; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.2); }
        
        .btn-logout { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .btn-logout:hover { background: #ef4444; color: #ffffff; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.2); }

        .watermark { font-size: 11px; color: #cbd5e1; text-align: center; line-height: 1.5; font-weight: 500; }
        .watermark b { color: #94a3b8; }

        /* Scrollbar tàng hình, mượt mà */
        .menu::-webkit-scrollbar { width: 4px; }
        .menu::-webkit-scrollbar-track { background: transparent; }
        .menu::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .menu::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    `;
    document.head.appendChild(style);

    // 2. CHỨA MÃ HTML CỦA SIDEBAR
    const sidebarHTML = `
        <div class="sidebar-header">
            <a href="start.html" style="display:flex;" title="Về trang khởi động">
                <img src="img/logo.jpg" alt="Logo">
            </a>
            <div class="brand">NV-SMART <br> Khối M & N</div>
        </div>
        
        <ul class="menu">
            <li class="menu-item" data-page="dashboard.html"><a href="dashboard.html">🎨 Tổng quan</a></li>
            
            <div class="menu-category">Khối M</div>
            <li class="menu-item" data-page="khoi-m.html"><a href="khoi-m.html">📖 Kho đề</a></li>
            <li class="menu-item" data-page="tao-de-m.html"><a href="tao-de-m.html">🎟️ Tạo đề thi</a></li>
            
            <div class="menu-category">Khối N</div>
            <li class="menu-item" data-page="khoi-n.html"><a href="khoi-n.html">🎼 Kho mẫu nhạc</a></li>
            <li class="menu-item" data-page="tao-de-n.html"><a href="tao-de-n.html">🎤 Tạo đề thi</a></li>

            <div class="menu-category">Hệ Thống</div>
            <li class="menu-item" data-page="settings.html"><a href="settings.html">⚙️ Cài đặt chung</a></li>
        </ul>

        <div class="sidebar-footer">
            <div class="btn-action-group">
                <button onclick="handleLock()" class="btn-lock" title="Tạm khóa ứng dụng">
                    🔒 Khóa
                </button>
                <button onclick="handleLogout()" class="btn-logout" title="Thoát hoàn toàn">
                    🚪 Thoát
                </button>
            </div>
            <div class="watermark">
                Developed by <br>
                <b>NV-SMART-EDU</b><br>
                &copy; 2026
            </div>
        </div>
    `;

    // 3. TÌM KHUNG CHỨA VÀ BƠM HTML VÀO
    const sidebarElement = document.getElementById("shared-sidebar");
    if (sidebarElement) {
        sidebarElement.innerHTML = sidebarHTML;

        // 4. THUẬT TOÁN TỰ ĐỘNG BÔI MÀU (ACTIVE) NÚT ĐANG CHỌN
        const currentPage = window.location.pathname.split("/").pop() || "start.html";
        const menuItems = sidebarElement.querySelectorAll(".menu-item");

        menuItems.forEach(item => {
            if (item.getAttribute("data-page") === currentPage) {
                item.classList.add("active");
            }
        });
    }
});

// 5. HÀM ĐĂNG XUẤT DÙNG CHUNG CHO TOÀN BỘ HỆ THỐNG
window.handleLogout = function () {
    if (confirm("Bạn có chắc chắn muốn thoát khỏi hệ thống?")) {
        sessionStorage.removeItem("isLoggedIn");
        window.location.href = "start.html?logout=true";
    }
};

// 6. HÀM KHÓA ỨNG DỤNG TẠM THỜI (Giả lập theo y/c của cụ)
window.handleLock = function () {
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "start.html";
};