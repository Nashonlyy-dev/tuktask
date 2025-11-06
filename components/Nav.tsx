"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  LogOut,
  Settings,
  User,
  Home,
  ClipboardList,
  PlusCircle,
} from "lucide-react";
import Image from "next/image";

const Nav = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const user = session?.user;

  return (
    <>
      {/* 🔹 NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-gray-800 shadow-md">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-800 rounded-xl transition"
          >
            <Menu className="text-gray-300 w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold bg-linear-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
            TukTask
          </h1>
        </div>

        {/* Right: Profile */}
        <div className="relative z-100">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 hover:bg-gray-800 px-2 py-1 rounded-xl transition"
          >
            <Image
              src={
                user?.image ||
                `https://api.dicebear.com/7.x/initials/png?seed=${user?.name || "guest"}`
              }
              alt="profile"
              width={36}
              height={36}
              className="rounded-full border border-gray-700"
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-56 bg-[#121212] border border-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-3 border-b border-gray-800">
                  <p className="text-sm font-medium text-gray-200">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
                <div className="flex flex-col text-sm">
                  <button className="flex items-center gap-2 px-4 py-3 hover:bg-gray-800 text-gray-300">
                    <User size={16} /> Profile
                  </button>
                  <button className="flex items-center gap-2 px-4 py-3 hover:bg-gray-800 text-gray-300">
                    <Settings size={16} /> Settings
                  </button>
                  <button
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-red-700 text-red-400 border-t border-gray-800"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* 🔹 SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={toggleSidebar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar Panel */}
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="fixed top-0 left-0 w-64 h-screen bg-[#111] border-r border-gray-800 z-50 flex flex-col p-6"
            >
              <h2 className="text-lg font-bold mb-6 text-gray-100">
                TukTask Menu
              </h2>
               <nav className="flex flex-col gap-4">
                <SidebarItem icon={<Home size={18} />} label="Dashboard" href="/dashboard" />
                <SidebarItem icon={<ClipboardList size={18} />} label="My Tasks" href="/dashboard/tasks" />
                <SidebarItem icon={<PlusCircle size={18} />} label="Create Task" href="/dashboard/task" />
                <SidebarItem icon={<Settings size={18} />} label="Settings" href="/settings" />
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// 🔹 Sidebar item subcomponent
function SidebarItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
   href: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg px-3 py-2 transition">
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default Nav;
