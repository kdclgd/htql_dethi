document.addEventListener("DOMContentLoaded", function () {
    // 1. TỰ ĐỘNG BƠM CSS SIDEBAR VÀO TRANG (CSS-in-JS)
    const style = document.createElement('style');
    style.innerHTML = `
        /* Khung chính của Sidebar */
        .sidebar { width: 180px; background: #111827; color: #f3f4f6; display: flex; flex-direction: column; height: 100vh; z-index: 100; font-family: 'Segoe UI', system-ui, sans-serif; box-shadow: 2px 0 10px rgba(0,0,0,0.1); }
        
        /* Header Sidebar: Bố cục ngang sang trọng */
        .sidebar-header { padding: 20px 15px; display: flex; align-items: center; gap: 12px; background: #0f172a; border-bottom: 1px solid rgba(255,255,255,0.05); flex-shrink: 0; }
        .sidebar-header img { width: 34px; height: 34px; border-radius: 8px; object-fit: cover; }
        .sidebar-header .brand { font-size: 15px; font-weight: 700; letter-spacing: 0.5px; color: #ffffff; }
        
        /* Menu chính - Đảm bảo min-height: 0 để không bị tràn màn hình */
        .menu { list-style: none; flex: 1; overflow-y: auto; margin: 0; padding: 10px 5px; min-height: 0; display: flex; flex-direction: column; gap: 2px; }
        
        /* Tiêu đề nhóm */
        .menu-category { padding: 10px 10px 6px; font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; }
        
        /* Nút menu */
        .menu-item a { 
            color: #cbd5e1; 
            text-decoration: none; 
            padding: 5px 12px; 
            display: flex; 
            align-items: center; 
            gap: 12px; 
            font-size: 13.5px; 
            border-radius: 8px; 
            transition: all 0.15s ease; 
        }
        .menu-item a:hover { background: rgba(255,255,255,0.08); color: #ffffff; }
        .menu-item.active a { background: #3b82f6; color: #ffffff; font-weight: 500; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }
        
        /* Footer chứa nút đăng xuất & Chữ ký */
        .sidebar-footer { padding: 20px 15px; background: #0f172a; border-top: 1px solid rgba(255,255,255,0.05); flex-shrink: 0; }
        
        .btn-logout { display: flex; justify-content: center; align-items: center; gap: 8px; padding: 5px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 13px; transition: all 0.2s; }
        .btn-logout:hover { background: #ef4444; color: #ffffff; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); }

        .watermark { margin-top: 18px; font-size: 11px; color: #475569; text-align: center; line-height: 1.6; }
        .watermark b { color: #94a3b8; }

        /* Scrollbar tàng hình, mượt mà */
        .menu::-webkit-scrollbar { width: 4px; }
        .menu::-webkit-scrollbar-track { background: transparent; }
        .menu::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .menu::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
    `;
    document.head.appendChild(style);

    // 2. CHỨA MÃ HTML CỦA SIDEBAR
    const sidebarHTML = `
        <div class="sidebar-header">
            <a href="start.html" style="display:flex;">
                <img src="img/logo.jpg" alt="Logo">
            </a>
            <div class="brand">NV-SMART</div>
        </div>
        
        <ul class="menu">
            <li class="menu-item" data-page="dashboard.html"><a href="dashboard.html">📊 Tổng quan</a></li>
            
            <div class="menu-category">Trắc Nghiệm</div>
            <li class="menu-item" data-page="de_tnkq.html"><a href="de_tnkq.html">📝 Kho câu hỏi</a></li>
            <li class="menu-item" data-page="tao-de-tnkq.html"><a href="tao-de-tnkq.html">🖨️ Tạo đề thi</a></li>
            
            <div class="menu-category">Tự Luận</div>
            <li class="menu-item" data-page="de_tuluan.html"><a href="de_tuluan.html">✍️ Kho câu hỏi</a></li>
            <li class="menu-item" data-page="tao-de-tuluan.html"><a href="tao-de-tuluan.html">🖨️ Tạo đề thi</a></li>

            <div class="menu-category">Hệ Thống</div>
            <li class="menu-item" data-page="settings.html"><a href="settings.html">⚙️ Cài đặt chung</a></li>
        </ul>

        <div class="sidebar-footer">
            <div onclick="handleLogout()" class="btn-logout">🚪 Đăng xuất</div>
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