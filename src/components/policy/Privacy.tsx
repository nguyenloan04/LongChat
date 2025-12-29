export default function Privacy() {
    return (
        <div className="bg-white-700">
            <div className="lg:max-w-4xl mx-auto lg:px-3 py-10 px-10">
                <h1 className="lg:text-4xl font-bold mb-2 text-2xl">Chính sách quyền riêng tư</h1>
                <p className="text-sm text-gray-500 mb-3">
                    Cập nhật lần cuối: <span className="italic">23/12/2025</span>
                </p>
                <hr className="border-gray-300 mb-8"/>

                <p>
                    Ứng dụng <strong>LongChat</strong> (“chúng tôi”) cam kết tôn trọng và bảo vệ
                    quyền riêng tư của người dùng. Chính sách này mô tả cách chúng tôi thu thập,
                    sử dụng và bảo vệ thông tin cá nhân khi bạn sử dụng ứng dụng.
                </p>
                <nav className="bg-white border rounded-lg p-4 my-8 shadow-sm">
                    <h2 className="font-semibold mb-2">Mục lục</h2>
                    <ul className="space-y-1 text-blue-700">
                        <li><a href="#collect-user-data" className="hover:underline">1. Thông tin chúng tôi thu thập</a></li>
                        <li><a href="#use-user-data" className="hover:underline">2. Cách chúng tôi sử dụng thông tin</a>
                        </li>
                        <li><a href="#security-user-data" className="hover:underline">3. Bảo mật thông tin</a></li>
                        <li><a href="#share-user-date" className="hover:underline">4. Chia sẻ thông tin</a></li>
                        <li><a href="#permission-user" className="hover:underline">5. Quyền của người dùng</a></li>
                        <li><a href="#minor-user" className="hover:underline">6. Dữ liệu trẻ vị thành niên</a></li>
                        <li><a href="#change-policy" className="hover:underline">7. Thay đổi chính sách</a></li>
                        <li><a href="#contact-us" className="hover:underline">8. Liên hệ</a></li>
                    </ul>
                </nav>

                <div id="collect-user-data">
                    <h2 className="lg:text-xl text-lg font-semibold mb-2">1. Thông tin chúng tôi thu thập</h2>
                    <h3 className="font-medium mt-3">1.1. Thông tin bạn cung cấp</h3>
                    <ul className="list-disc list-inside ml-4">
                        <li>Tên người dùng (username)</li>
                        <li>Email hoặc số điện thoại (nếu có)</li>
                        <li>Ảnh đại diện (avatar)</li>
                        <li>Nội dung tin nhắn trong ứng dụng</li>
                    </ul>

                    <h3 className="font-medium mt-3">1.2. Thông tin thu thập tự động</h3>
                    <ul className="list-disc list-inside ml-4">
                        <li>Địa chỉ IP</li>
                        <li>Thông tin thiết bị (loại thiết bị, hệ điều hành)</li>
                        <li>Thời gian đăng nhập và hoạt động</li>
                    </ul>
                </div>

                <div id="use-user-data">
                    <h2 className="text-lg lg:text-xl font-semibold mb-2 mt-3">2. Cách chúng tôi sử dụng thông tin</h2>
                    <ul className="list-disc list-inside ml-4">
                        <li>Cung cấp và duy trì chức năng chat</li>
                        <li>Xác thực tài khoản và bảo mật hệ thống</li>
                        <li>Cải thiện trải nghiệm người dùng</li>
                        <li>Phát hiện và ngăn chặn hành vi vi phạm</li>
                    </ul>
                </div>

                <div id="security-user-data">
                    <h2 className="text-lg lg:text-xl font-semibold mb-2 mt-3">3. Bảo mật thông tin</h2>
                    <p>
                        Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức hợp lý để bảo vệ dữ liệu,
                        bao gồm mã hóa khi truyền tải và kiểm soát truy cập hệ thống. Tuy nhiên,
                        không có hệ thống nào an toàn tuyệt đối.
                    </p>
                </div>

                <div id="share-user-date">
                    <h2 className="text-lg lg:text-xl font-semibold mb-2 mt-3">4. Chia sẻ thông tin</h2>
                    <p>
                        Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân cho bên thứ ba,
                        trừ khi có yêu cầu hợp pháp từ cơ quan chức năng hoặc nhằm bảo vệ quyền lợi
                        và an toàn của hệ thống.
                    </p>
                </div>

                <div id="permission-user">
                    <h2 className="text-lg lg:text-xl font-semibold mb-2 mt-3">5. Quyền của người dùng</h2>
                    <ul className="list-disc list-inside ml-4">
                        <li>Xem, chỉnh sửa hoặc xóa thông tin cá nhân</li>
                        <li>Yêu cầu xóa tài khoản và dữ liệu liên quan</li>
                        <li>Ngừng sử dụng ứng dụng bất kỳ lúc nào</li>
                    </ul>
                </div>

                <div id="minor-user">
                    <h2 className="text-lg lg:text-xl font-semibold mb-2 mt-3">6. Dữ liệu của trẻ vị thành niên</h2>
                    <p>
                        Ứng dụng không chủ đích thu thập dữ liệu cá nhân của trẻ em dưới 13 tuổi.
                        Nếu phát hiện, chúng tôi sẽ xóa dữ liệu ngay khi có yêu cầu.
                    </p>
                </div>

                <div id="change-policy">
                    <h2 className="text-lg lg:text-xl font-semibold mb-2 mt-3">7. Thay đổi chính sách</h2>
                    <p>
                        Chính sách này có thể được cập nhật theo thời gian. Mọi thay đổi sẽ được
                        thông báo trong ứng dụng hoặc trên website chính thức.
                    </p>
                </div>

                <div id="contact-us">
                    <h2 className="text-lg lg:text-xl font-semibold mb-2 mt-3">8. Liên hệ</h2>
                    <p>Nếu bạn có câu hỏi, vui lòng liên hệ:</p>
                    <ul className="list-none mt-2">
                        <li>Email: <span className="italic">laptrinhfrontend@gmail.com</span></li>
                        <li>Hotline: <span className="italic">0123456789</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}