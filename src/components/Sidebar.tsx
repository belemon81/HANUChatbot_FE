import React from "react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = ({ currentPage, clearChat }) => {
    return (
        <div className="max-md:hidden bg-gray-900 w-1/5 flex flex-col justify-center items-center">
            <Image src="/logo.png" width={100} height={100} alt={"logo"}></Image>
            <h1 className="text-white py-4 text-2xl font-semibold mb-6">HanuGPT</h1>
            <div className="p-4">
                <Link href="/education">
                    <div className={`rounded-lg p-4 text-white cursor-pointer transition duration-300 hover:bg-gray-800 font-semibold mb-4 ${currentPage === "/education" ? "bg-gray-500" : "bg-slate-600"}`}>Chương trình đào tạo</div>
                </Link>
                <Link href="/services">
                    <div className={`rounded-lg p-4 text-white cursor-pointer transition duration-300 hover:bg-gray-800 font-semibold ${currentPage === "/services" ? "bg-gray-500" : "bg-slate-600"}`}>Hành chính công vụ</div>
                </Link>
                <div className="mt-4">
                    <button onClick={clearChat} className="bg-red-700 hover:bg-rose-500 text-white px-4 py-2 rounded-full w-full flex items-center justify-center focus:outline-none">
                        <Image src="/trash.png" width={15} height={15} alt="trash" />
                        <span className="ml-2">Xóa hội thoại</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
