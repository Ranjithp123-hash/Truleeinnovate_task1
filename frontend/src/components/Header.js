import React, { useState } from "react";
import { FiHome } from "react-icons/fi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FaRegBell,FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


const Header = ({ onShowPositions }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="flex justify-between items-center bg-white shadow p-8">
      <div className="text-3xl font-bold">Logo</div>
      <nav className="flex space-x-6">
        <a href="#" className="text-gray-600 hover:text-blue-500">
          Interviews   <span>⯆</span>
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-500">
          Assignments   <span>⯆</span>
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-500">
          Analytics   <span>⯆</span>
        </a>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-gray-600 hover:text-blue-500 space-x-1"
          >
            <span>More</span>
            <span>⯆</span>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded border">
             <Link to ="candidate-details"> <button
             
             onClick={() => {
                  toggleDropdown();
                  // onShowPositions();
                }}
                className="block px-4 py-2 text-gray-600 hover:bg-blue-100 w-full text-left"
              >
                Positions
              </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div className="flex space-x-4 items-center">
        <input
          type="text"
          placeholder="Search Setup"
          className="border px-2 py-1 rounded"
        />
        <span className="text-lg cursor-pointer  p-1 border-2 text-cyan-400 rounded-md border-blue-500"><FiHome /></span>
        <span className="text-lg cursor-pointer  p-1 border-2 text-cyan-400 rounded-md border-blue-500"><FaRegCircleQuestion /></span>
        <span className="text-lg cursor-pointer  p-1 border-2 text-cyan-400 rounded-md border-blue-500"><FaRegBell /></span>
        <span className="text-lg cursor-pointer  p-1 border-2 text-cyan-400 rounded-md border-blue-500"><FaRegUserCircle /></span>
      </div>
    </header>
  );
};

export default Header;
