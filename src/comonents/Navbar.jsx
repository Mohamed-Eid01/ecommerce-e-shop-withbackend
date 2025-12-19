import {  useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { setSearchTerm } from "../redux/productSlice";
import { toast } from "react-toastify";

function Navbar() {
  const products = useSelector((state) => state.cart.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  function openSignUp() {
    setIsLogin(false);
    setIsModalOpen(true);
  }

  function openLogin() {
    setIsLogin(true);
    setIsModalOpen(true);
  }

    function handleLogout() {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
      navigate("/");
    }




  function handelSearch(e) {
    e.preventDefault();
    if (!search || search.trim() === "") return;
    dispatch(setSearchTerm(search));
    navigate("/filter-data");
  }

  return (
    <nav className="bg-white shadow-md z-1000">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link
            to="/"
            className="hover:text-red-600 transition-colors duration-300"
          >
            e-SHOP
          </Link>
        </div>

        <div className="relative flex-1 mx-4">
          <form onSubmit={handelSearch}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search Product"
              className="w-full rounded-md border-2 border-gray-300 focus:border-red-600 focus:outline-none shadow-md py-2 px-4 transition-colors duration-300"
            />
            <FaSearch className="absolute top-3 right-3 hover:text-red-600 cursor-pointer" />
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/cart"
            className="relative hover:text-red-600 transition-colors duration-300"
          >
            <FaShoppingCart className="text-lg" />
            <span className="absolute bottom-2.5 text-xs w-3 left-3 bg-red-600 rounded-full flex justify-center items-center text-white">
              {products.length > 0 && products.length}
            </span>
          </Link>

          {!isLoggedIn ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:inline-block px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-colors duration-300"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition-colors duration-300"
            >
              Logout
            </button>
          )}

          <button
            className="block md:hidden hover:text-red-600 transition-colors duration-300 "
            onClick={() => setIsModalOpen(true)}
          >
            <FaUser />
          </button>
        </div>
      </div>

      {/* Navbar links */}
      <div className="flex items-center justify-center space-x-10 py-4 text-sm font-bold">
        <Link
          to="/"
          className="text-gray-800 hover:text-red-600 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="text-gray-800 hover:text-red-600 transition-colors duration-300"
        >
          Shop
        </Link>
        <Link
          to="/contact"
          className="text-gray-800 hover:text-red-600 transition-colors duration-300"
        >
          Contact
        </Link>
        <Link
          to="/about"
          className="text-gray-800 hover:text-red-600 transition-colors duration-300"
        >
          About
        </Link>
      </div>

      <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        {isLogin ? (
          <Login
            openSignUp={openSignUp}
            onLoginSuccess={() => {
              setIsModalOpen(false);
              setIsLoggedIn(true);
            }}
          />
        ) : (
          <Register
            openLogin={openLogin}
            onRegisterSuccess={() => {
              setIsLoggedIn(true);
              setIsModalOpen(false);
            }}
          />
        )}
      </Modal>
    </nav>
  );
}

export default Navbar;
