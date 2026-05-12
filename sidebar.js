document.addEventListener("DOMContentLoaded", function () {
    // 1. TỰ ĐỘNG BƠM CSS SIDEBAR VÀO TRANG (CSS-in-JS)
    const style = document.createElement('style');
    style.innerHTML = `
        .sidebar { width: 210px; background: #2c3e50; color: white; display: flex; flex-direction: column; height: 100vh; z-index: 100; }
        .sidebar-header { padding: 10px; background: #1a252f; text-align: center; font-weight: bold; }
        .menu { list-style: none; flex: 1; overflow-y: auto; margin: 0; padding: 0; }
        .menu-item a { color: white; text-decoration: none; padding: 8px 10px; display: block; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); transition: 0.2s; }
        .menu-item a:hover, .menu-item.active a { background: #34495e; border-left: 4px solid #3498db; }
        .menu-category { padding: 15px 20px 5px; font-size: 12px; color: #7f8c8d; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; }
        .menu-title { padding: 15px 20px 5px; font-size: 12px; color: #95a5a6; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; }
        .sidebar-footer { padding: 15px; text-align: center; margin-top: auto; border-top: 1px solid #34495e; }
        
        .btn-logout { display: inline-block; padding: 8px 20px; background: rgba(231, 76, 60, 0.1); color: #e74c3c; border-radius: 5px; cursor: pointer; font-weight: bold; text-decoration: none; transition: 0.3s; width: 100%; box-sizing: border-box; }
        .btn-logout:hover { background: #e74c3c; color: white; transform: translateY(-2px); }

        /* Làm đẹp thanh cuộn của riêng menu */
        .menu::-webkit-scrollbar { width: 5px; }
        .menu::-webkit-scrollbar-track { background: #2c3e50; }
        .menu::-webkit-scrollbar-thumb { background: #34495e; border-radius: 5px; }
        .menu::-webkit-scrollbar-thumb:hover { background: #7f8c8d; }
    `;
    document.head.appendChild(style);

    // 2. CHỨA MÃ HTML CỦA SIDEBAR
    const sidebarHTML = `
        <div class="sidebar-header">
            <a href="start.html">
            <img src="img/logo.jpg" alt="Logo" style="width: 50px; border-radius: 50%;">
            </a>
            <div style="margin-top: 10px;">NV-SMART-EDU</div>
        </div>
        
        <ul class="menu">
            <li class="menu-item" data-page="dashboard.html"><a href="dashboard.html">📊 Tổng quan</a></li>
            <div class="menu-category">Trắc Nghiệm</div>
            <li class="menu-item" data-page="de_tnkq.html"><a href="de_tnkq.html">📝 Ngân hàng TNKQ</a></li>
            <li class="menu-item" data-page="tao-de-tnkq.html"><a href="tao-de-tnkq.html">🖨️ Tổ chức Thi TNKQ</a></li>
            
            <div class="menu-category">Tự Luận</div>
            <li class="menu-item" data-page="de_tuluan.html"><a href="de_tuluan.html">✍️ Ngân hàng Tự luận</a></li>
            <li class="menu-item" data-page="tao-de-tuluan.html"><a href="tao-de-tuluan.html">🖨️ Tổ chức Thi Tự luận</a></li>

            <div class="menu-title">Hệ Thống</div>
            <li class="menu-item" data-page="settings.html"><a href="settings.html">⚙️ Cấu hình & Bảo mật</a></li>
        </ul>

        <div class="sidebar-footer">
            <a onclick="handleLogout()" class="btn-logout">🚪 Đăng xuất</a>
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
        // Xóa trạng thái đăng nhập
        sessionStorage.removeItem("isLoggedIn");
        // Chuyển hướng về cổng chính kèm theo biến báo hiệu đã đăng xuất an toàn
        window.location.href = "start.html?logout=true";
    }
};