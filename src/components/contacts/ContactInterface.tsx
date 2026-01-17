import { Search, User } from "lucide-react";
import { useSelector } from "react-redux";
import type { ReduxState } from "@/constants/ReduxState";
import { useState } from "react";

export function ContactInterface() {
    const userList = useSelector((state: ReduxState) => state.chatState.userList);
    const currentUser = useSelector((state: ReduxState) => state.currentUser.user);
    const [searchTerm, setSearchTerm] = useState("");

    // 1. Lọc user theo ô tìm kiếm & Loại bỏ chính mình
    const filteredUsers = userList.filter(user =>
        user.name !== currentUser?.username &&
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Gom nhóm theo chữ cái đầu (A, B, C...)
    const groupedUsers = filteredUsers.reduce((groups, user) => {
        const firstLetter = user.name.charAt(0).toUpperCase();
        // Nếu là ký tự đặc biệt hoặc số thì gom vào nhóm '#'
        const key = /^[A-Z]/.test(firstLetter) ? firstLetter : "#";

        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(user);
        return groups;
    }, {} as Record<string, typeof userList>);

    // 3. Sắp xếp danh sách các nhóm (A -> Z -> #)
    const sortedKeys = Object.keys(groupedUsers).sort((a, b) => {
        if (a === "#") return 1;
        if (b === "#") return -1;
        return a.localeCompare(b);
    });

    return (
        <div className="flex flex-col h-full bg-white w-full">
            {/* Header Danh bạ */}
            <div className="h-16 flex items-center px-4 border-b bg-white">
                <User className="mr-3" />
                <span className="font-semibold text-lg">Danh bạ</span>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Cột Danh sách (Main Content) */}
                <div className="flex-1 flex flex-col h-full">
                    {/* Search Bar Contact */}
                    <div className="p-4 bg-white z-10">
                        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                            <Search size={18} className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                placeholder="Tìm bạn bè..."
                                className="bg-transparent border-none outline-none w-full text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* List Content */}
                    <div className="flex-1 overflow-y-auto px-4 pb-4">
                        {sortedKeys.length === 0 ? (
                            <div className="text-center text-gray-500 mt-10">Không tìm thấy bạn bè nào</div>
                        ) : (
                            sortedKeys.map(letter => (
                                <div key={letter} className="mb-4">
                                    {/* Header chữ cái (A, B, C...) */}
                                    <div className="sticky top-0 bg-white py-2 font-semibold text-sm text-indigo-600 border-b mb-2 z-0">
                                        {letter}
                                    </div>

                                    {/* Danh sách user trong nhóm đó */}
                                    <div className="flex flex-col gap-2">
                                        {groupedUsers[letter].map(user => (
                                            <div key={user.name} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-default transition-colors">
                                                {/* Avatar */}
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 border-b border-gray-100 pb-2">
                                                    <p className="font-medium text-gray-900">{user.name}</p>
                                                    {/* Bạn có thể thêm status ở đây nếu muốn */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}