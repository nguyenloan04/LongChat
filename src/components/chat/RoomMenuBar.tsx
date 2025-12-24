import { Link, User, Users } from "lucide-react";

export function RoomMenuBar() {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-center flex-col gap-1 p-4">
                <div className="w-12 h-12 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center">
                    <User size={'1.5rem'} />
                </div>
                <p className="text-lg font-semibold">Group 77</p>
            </div>
            {/* Temp */}
            {/* Member */}
            <hr />
            <div className="p-2 py-4">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                        <Link />
                        <div>
                            <p className="mb-1">Link tham gia nhóm</p>
                            <a href="https://localhost:5713/g/group77">
                                <p className="underline text-blue-500 text-sm">https://localhost:5713/g/group77</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="p-2 py-4">
                <h5 className="font-semibold mb-4">Ảnh & Video</h5>
                <div className="flex flex-col gap-3">

                </div>
            </div>
            <hr />
            <div className="p-2 py-4">
                <h5 className="font-semibold mb-4">Thành viên nhóm</h5>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        <Users />
                        3 thành viên
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center">
                            <div className="w-8 h-8 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center">
                                <User size={'1rem'} />
                            </div>
                            <p>Người dùng 0</p>
                        </div>

                        <div className="flex gap-2 items-center">
                            <div className="w-8 h-8 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center">
                                <User size={'1rem'} />
                            </div>
                            <p>Người dùng 1</p>
                        </div>

                        <div className="flex gap-2 items-center">
                            <div className="w-8 h-8 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center">
                                <User size={'1rem'} />
                            </div>
                            <p>Người dùng 2</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="w-8 h-8 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center">
                                <User size={'1rem'} />
                            </div>
                            <p>Người dùng 3</p>
                        </div>
                        <div className="flex justify-center mt-4 mb-2">
                            <button className="border px-3 py-2 bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400 rounded">Xem thêm</button>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}