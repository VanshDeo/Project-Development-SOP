"use client";

import React from "react";
import { Open_Sans } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
});

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Items for the navbar
  const items = [
    { name: "Home", path: "/" },
    { name: "SOP", path: "/sop" },
    // { name: "SOP1", path: "/sop1" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="w-full bg-white shadow-lg">
      <div className={`${openSans.className}`}>
        <ul className="flex gap-6 justify-center">
          {items.map((item, index) => (
            <li
              key={index}
              className={`py-5 cursor-pointer hover:text-blue-500 transition-all duration-300 ${
                pathname === `${item.path}`
                  ? "text-blue-500"
                  : "text-black hover:text-blue-500"
              }`}
              onClick={() => router.push(`${item.path}`)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
