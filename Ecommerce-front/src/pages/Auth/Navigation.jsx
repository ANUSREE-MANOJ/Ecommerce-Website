import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShopping
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import { useLogoutMutation } from "../../redux/api/userSlice";
import "./Navigation.css";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoginPage || isRegisterPage) {
    return (
      <div className="flex justify-between items-center p-4 text-white bg-[#000] fixed w-full h-[60px] top-0">
        <Link to="/" className="flex items-center text-white">
          <AiOutlineHome size={26} />
        </Link>
        {isLoginPage && (
          <Link to="/register" className="text-white">
            <AiOutlineUserAdd size={26} />
            <span className="ml-2">Register</span>
          </Link>
        )}
        {isRegisterPage && (
          <Link to="/login" className="text-white">
            <AiOutlineLogin size={26} />
            <span className="ml-2">Login</span>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div
      style={{ zIndex: 9999 }}
      className="flex justify-between items-center p-4 text-white bg-[#000] fixed w-full h-[60px] top-0"
    >
      {/* Left side - Home Link */}
      <Link
        to="/"
        className="flex items-center transition-transform transform hover:translate-x-2"
      >
        <AiOutlineHome size={26} />
        <span className="ml-2 hidden md:inline">Home</span>
      </Link>

      {/* Center - Category, Favorites, and Cart Links */}
      <div className="flex-grow flex justify-center space-x-4">
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
              <AiOutlineShopping size={20} />

          <span className="ml-2 hidden md:inline">Shop</span>
        </Link>
        <Link
          to="/favourite"
          className="flex items-center relative transition-transform transform hover:translate-x-2"
        >
          <FaHeart size={20} />
          <span className="ml-2 hidden md:inline">Favorites</span>
          <FavoritesCount />
        </Link>
        <Link
          to="/cart"
          className="flex items-center relative transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart size={26} />
          <span className="ml-2 hidden md:inline">Cart</span>
          {cartItems.length > 0 && (
            <div className="absolute bottom-3 right-15 bg-pink-500 text-white text-sm rounded-full px-1 py-0">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </div>
          )}
        </Link>
      </div>

      {/* Right side - User/Agent/Admin Links in Dropdown */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <>
              <span className="text-white">{userInfo.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center text-white"
              >
                <AiOutlineLogin size={26} />
                <span className="ml-2 hidden md:inline">Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center text-white"
              >
                <AiOutlineUserAdd size={26} />
                <span className="ml-2 hidden md:inline">Register</span>
              </Link>
            </>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul className="absolute top-14 right-0 bg-white text-gray-600 rounded shadow-lg w-48">
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            {userInfo.isAgent && (
              <>
                <li>
                  <Link
                    to="/agent/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Agent Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agent/package-list"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Manage Packages
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {/* Dropdown menu for mobile view */}
      <div className="md:hidden">
        {dropdownOpen && (
          <ul className="absolute top-12 right-0 bg-white text-gray-600 rounded shadow-lg w-48">
            {/* <li>
              <Link
                to="/categories"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/favourite"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Cart
              </Link>
            </li> */}
            {userInfo && userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;

