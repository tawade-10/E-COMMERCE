import React, { useState } from "react";
import { FaSignInAlt, FaStore } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux'; // Import useSelector hook

const NavBar = () => {
  const path = useLocation().pathname;
  const [navbarOpen, setNavBarOpen] = useState(false);
  const {cart} = useSelector((state) => state.carts); 
  // const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0); // Calculate total quantity

  return (
    <div>
      <div className="h-[70px] bg-slate-900 text-white z-50 flex items-center sticky top-0">
        <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
          <Link to="/" className="flex items-center text-2xl font-bold">
            <FaStore className="mr-2 text-3xl" />
            <span className="font-[Poppins]">E-Shop</span>
          </Link>
          <ul className={`flex sm:gap-10 gap-4 sm:items-center text-slate-800 sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md ${
              navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
            } transition-all duration-100 sm:h-fit sm:bg-none bg-slate-900 text text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}>
            <li className="font-[500] transition-all duration-200">
              <Link
                className={`${
                  path === "/" ? "text-white font-semibold" : "text-gray-200"
                }`}
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="font-[500] transition-all duration-200">
              <Link
                className={`${
                  path === "/products"
                    ? "text-white font-semibold"
                    : "text-gray-200"
                }`}
                to="/products"
              >
                Products
              </Link>
            </li>

            <li className="font-[500] transition-all duration-200">
              <Link
                className={`${
                  path === "/about"
                    ? "text-white font-semibold"
                    : "text-gray-200"
                }`}
                to="/about"
              >
                About
              </Link>
            </li>

            <li className="font-[500] transition-all duration-200">
              <Link
                className={`${
                  path === "/contact"
                    ? "text-white font-semibold"
                    : "text-gray-200"
                }`}
                to="/contact"
              >
                Contact
              </Link>
            </li>

            <li className="font-[500] transition-all duration-200 relative">
              <Link
                to="/cart"
                className={`relative ${path === "/cart" ? "text-white font-semibold" : "text-gray-200"}`}
              >
                <FaCartShopping size={25} />
                {/* <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span> */}
              </Link>
            </li>

            <li className="font-[500] transition-all duration-200">
              <Link
                className={`${"flex items-center space-x-2 px-4 py-[6px] bg-gradient-to-r from-purple-600 to-red-500 text-white font-semibold rounded-md shadow-lg hover:from-purple-500 hover:from-purple-500 hover:to-red-400 transition duration-300 ease-in-out transform"}`}
                to="/login"
              >
                <FaSignInAlt/>
                <span>Login</span>
              </Link>
            </li>
          </ul>
          <button
            onClick={() => setNavBarOpen(!navbarOpen)}
            className="sm:hidden flex items-center sm:mt-0 mt-2"
          >
            {navbarOpen ? (
              <RxCross2 className="text-white text-3xl"/>
            ) : (
              <IoIosMenu className="text-white text-3xl"/>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;