"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = ({ setCurrentView }: { setCurrentView: (view: string) => void }) => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar toggle

  return (
    <div className={`bg-gray-800 text-white w-64 ${isOpen ? "block" : "hidden"} md:block`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <nav className="p-4 space-y-4">
        <button
          onClick={() => setCurrentView("dashboard")}
          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
        >
          Dashboard
        </button>

        <button
          onClick={() => setCurrentView("appointments")}
          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
        >
          Appointments
        </button>

        {/* You can add more links here */}
        <button className="block w-full text-left hover:bg-gray-700 p-2 rounded">Doctors</button>
        <button className="block w-full text-left hover:bg-gray-700 p-2 rounded">Chats</button>
        <button className="block w-full text-left hover:bg-gray-700 p-2 rounded">Account</button>
        <button className="block w-full text-left hover:bg-gray-700 p-2 rounded">Settings</button>
        <button className="block w-full text-left hover:bg-gray-700 p-2 rounded">Logout</button>
      </nav>
    </div>
  );
};

export default Sidebar;
