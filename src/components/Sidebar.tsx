import React from "react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = ({ currentPage, clearChat }) => {
    return (
        <div className="max-md:hidden bg-gray-800 w-1/5 flex flex-col justify-between items-center relative flex-shrink-0">
            <div className="flex flex-col justify-center items-center absolute top-1/2 transform -translate-y-1/2">
            <Image src="/logo.png" priority width={100} height={100} alt="logo" style={{ width: "auto", height: "auto" }} />
                <h1 className="text-white py-4 text-2xl font-semibold mb-6">HanuGPT</h1>
                <div className="p-4">
                    <Link href="/education">
                        <div className={`rounded-lg p-4 text-white cursor-pointer transition duration-300 hover:bg-gray-500 font-semibold mb-4 ${currentPage === "/education" ? "bg-gray-500" : "bg-slate-600"}`}>Chương trình đào tạo</div>
                    </Link>
                    <Link href="/services">
                        <div className={`rounded-lg p-4 text-white cursor-pointer transition duration-300 hover:bg-gray-500 font-semibold ${currentPage === "/services" ? "bg-gray-500" : "bg-slate-600"}`}>Hành chính công vụ</div>
                    </Link>
                    <div className="mt-4">
                        <button onClick={clearChat} className="bg-red-700 hover:bg-rose-500 text-white px-4 py-2 rounded-full w-full flex items-center justify-center focus:outline-none">
                            <Image src="/trash.png" width={15} height={15} alt="trash" />
                            <span className="ml-2">Xóa hội thoại</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-around w-full p-4 absolute bottom-0">
                <Link href="https://www.hanu.edu.vn/" target="_blank"><Image src="/browser.png" width={30} height={30} alt="Browser" /></Link>
                <Link href="mailto:hanu@hanu.edu.vn" target="_blank"><Image src="/gmail.png" width={30} height={30} alt="Gmail" /></Link>
                <Link href="https://www.facebook.com/daihochanoi/" target="_blank"><Image src="/facebook.svg" width={30} height={30} alt="Facebook" /></Link>
            </div>
        </div>
    );
};

export default Sidebar;
