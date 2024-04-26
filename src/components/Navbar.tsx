// Navbar.tsx
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ currentPage, clearChat }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };


    return (
        <nav className="flex items-center justify-between bg-gray-800 p-4 md:hidden">
            <div className="relative">
                <button className="text-white font-semibold focus:outline-none" onClick={toggleDropdown}>
                    HanuGPT
                    <svg className="h-5 w-5 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z" clipRule="evenodd" />
                    </svg>
                </button>
                {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-52 bg-white rounded-lg shadow-lg z-10">
                        <div className="py-1">
                            <Link href="/education">
                                <div className={`block px-4 py-2 ${currentPage === "/education" ? "text-blue-500" : "text-gray-800"} hover:bg-gray-200`}>Chương trình đào tạo</div>
                            </Link>
                            <Link href="/services">
                                <div className={`block px-4 py-2 ${currentPage === "/services" ? "text-blue-500" : "text-gray-800"} hover:bg-gray-200`}>Hành chính công vụ</div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <button onClick={clearChat} className="flex items-center bg-red-700 hover:bg-rose-500 text-white font-semibold px-2 py-2 rounded-lg focus:outline-none">
                    <Image src="/trash.png" width={20} height={20} alt="trash" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
