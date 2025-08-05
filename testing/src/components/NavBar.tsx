"use client";
import React from "react";

import LoginModal from "@/components/LoginModal";

const NavBar = () => {
    return (
        <>
            {/* Navigation bar with logo, links, and login button */}
            <nav className="w-full flex items-center justify-between px-4 py-4 bg-white shadow-md">
                <div className="text-xl font-bold">Beauty Supply</div>
                <div className="flex items-center space-x-4">
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        Home
                    </a>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        Shop
                    </a>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        About
                    </a>
                    {/* Login button opens a modal using Shadcn's Dialog component */}

                    <LoginModal />
                </div>
            </nav>
        </>
    );
};

export default NavBar;
