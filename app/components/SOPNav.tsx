"use client";

import React from 'react'
import Link from 'next/link';

const SOPNav = () => {

  return (
    <div>
       <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-gray-800">Project Development SOP</span>
                        </div>
                        <nav className="hidden md:flex space-x-4 lg:space-x-6">
                            <Link href="overview" className={`nav-link px-3 py-2 text-sm font-medium text-gray-600`}>Overview</Link>
                            <Link href="intake" className={`nav-link px-3 py-2 text-sm font-medium text-gray-600`}>Intake & Planning</Link>
                            <Link href="design" className={`nav-link px-3 py-2 text-sm font-medium text-gray-600`}>Design</Link>
                            <Link href="development" className={`nav-link px-3 py-2 text-sm font-medium text-gray-600`}>Development</Link>
                            <Link href="testing" className={`nav-link px-3 py-2 text-sm font-medium text-gray-600`}>Testing</Link>
                            <Link href="oversight" className={`nav-link px-3 py-2 text-sm font-medium text-gray-600`}>Oversight</Link>
                        </nav>
                    </div>
                </div>
            </header>

    </div>
  )
}

export default SOPNav
