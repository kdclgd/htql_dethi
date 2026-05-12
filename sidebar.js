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

// =======================================================
// HỆ THỐNG THÔNG BÁO TÙY CHỈNH (OFFLINE 100%)
// =======================================================
function showCustomAlert(title, message, type = 'error') {
    return new Promise((resolve) => {
        // 1. Tạo lớp phủ (Overlay) làm mờ nền
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
            display: flex; justify-content: center; align-items: center;
            z-index: 10000; opacity: 0; transition: opacity 0.2s ease;
        `;

        // 2. Thiết lập màu sắc và icon theo loại thông báo
        const isError = type === 'error';
        const color = isError ? '#e74c3c' : '#27ae60'; // Đỏ lỗi, Xanh thành công
        const icon = isError ? '⚠️' : '✅';

        // 3. Tạo hộp thoại (Modal Box)
        const box = document.createElement('div');
        box.style.cssText = `
            background: white; padding: 30px; border-radius: 12px;
            box-shadow: 0 15px 30px rgba(0,0,0,0.2); max-width: 400px; width: 90%;
            text-align: center; transform: scale(0.8); transition: transform 0.2s ease;
            border-top: 5px solid ${color}; font-family: 'Segoe UI', Tahoma, sans-serif;
        `;

        box.innerHTML = `
            <div style="font-size: 45px; margin-bottom: 10px;">${icon}</div>
            <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 20px;">${title}</h3>
            <p style="color: #64748b; font-size: 14.5px; line-height: 1.6; margin-bottom: 25px; white-space: pre-wrap;">${message}</p>
            <button id="btn-custom-ok" style="
                background: ${color}; color: white; border: none; padding: 10px 30px;
                border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer;
                transition: 0.2s; box-shadow: 0 4px 10px ${color}40;
            ">Đã hiểu</button>
        `;

        overlay.appendChild(box);
        document.body.appendChild(overlay);

        // Hiệu ứng hiện ra mượt mà
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            box.style.transform = 'scale(1)';
        });

        // Xử lý khi bấm nút (Đóng hộp thoại và chạy tiếp code)
        const closeAlert = () => {
            overlay.style.opacity = '0';
            box.style.transform = 'scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(overlay);
                resolve(); // Báo hiệu đã đóng xong
            }, 200);
        };

        box.querySelector('#btn-custom-ok').addEventListener('click', closeAlert);
    });
}

// =======================================================
// HỘP THOẠI XÁC NHẬN TÙY CHỈNH (CÓ 2 NÚT)
// =======================================================
function showCustomConfirm(title, message, type = 'warning') {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
                    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                    background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
                    display: flex; justify-content: center; align-items: center;
                    z-index: 10000; opacity: 0; transition: opacity 0.2s ease;
                `;

        const isDanger = type === 'danger';
        const color = isDanger ? '#e74c3c' : '#f39c12'; // Đỏ (nguy hiểm) hoặc Cam (cảnh báo)
        const icon = isDanger ? '🚨' : '⚠️';

        const box = document.createElement('div');
        box.style.cssText = `
                    background: white; padding: 30px; border-radius: 12px;
                    box-shadow: 0 15px 30px rgba(0,0,0,0.2); max-width: 450px; width: 90%;
                    text-align: center; transform: scale(0.8); transition: transform 0.2s ease;
                    border-top: 5px solid ${color}; font-family: 'Segoe UI', Tahoma, sans-serif;
                `;

        box.innerHTML = `
                    <div style="font-size: 45px; margin-bottom: 10px;">${icon}</div>
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 20px;">${title}</h3>
                    <p style="color: #64748b; font-size: 14.5px; line-height: 1.6; margin-bottom: 25px; white-space: pre-wrap;">${message}</p>
                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <button id="btn-custom-cancel" style="
                            background: #f1f5f9; color: #64748b; border: none; padding: 10px 20px;
                            border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer;
                            transition: 0.2s;
                        ">Hủy bỏ</button>
                        <button id="btn-custom-confirm" style="
                            background: ${color}; color: white; border: none; padding: 10px 20px;
                            border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer;
                            transition: 0.2s; box-shadow: 0 4px 10px ${color}40;
                        ">Xác nhận Xóa</button>
                    </div>
                `;

        overlay.appendChild(box);
        document.body.appendChild(overlay);

        // Hiệu ứng popup mượt mà
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            box.style.transform = 'scale(1)';
        });

        // Xử lý khi bấm nút
        const closeConfirm = (result) => {
            overlay.style.opacity = '0';
            box.style.transform = 'scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(overlay);
                resolve(result); // Trả về true hoặc false
            }, 200);
        };

        // Bắt sự kiện 2 nút
        box.querySelector('#btn-custom-cancel').addEventListener('click', () => closeConfirm(false));
        box.querySelector('#btn-custom-confirm').addEventListener('click', () => closeConfirm(true));
    });
}