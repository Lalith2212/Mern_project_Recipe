import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBowlFood } from "react-icons/fa6"; // ✅ Correct import for FaBowlFood
import { FaSearch } from "react-icons/fa";  // FaSearch remains the same
import toast from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // 🆕 Search state

  // ✅ Function to update login state
  const updateAuthState = () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    const wasLoggedIn = isLogin;
    setIsLogin(!!token);
    setUser(userData ? JSON.parse(userData) : null);

    if (!wasLoggedIn && token) {
      toast.success("Successfully logged in!");
    } else if (wasLoggedIn && !token) {
      toast.success("Logged out successfully!");
    }
  };

  useEffect(() => {
    updateAuthState();
  }, []);

  useEffect(() => {
    window.addEventListener("storage", updateAuthState);
    return () => window.removeEventListener("storage", updateAuthState);
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
    setUser(null);
    toast.success("Logged out successfully!");
  };

  // ✅ Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log("Searching for:", e.target.value);
  };

  return (
    <>
      <motion.header
        className="navbar"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.h2 className="logo" whileHover={{ scale: 1.1 }} style={{ color: "black" }}>
  <FaBowlFood /> Hungry Hive
</motion.h2>


        {/* Navigation Links */}
        <ul className="nav-links">
          <motion.li whileHover={{ scale: 1.1 }}>
            <NavLink to="/">Home</NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
          <NavLink to="/about">About Us</NavLink> {/* ✅ Aboutus */}
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} onClick={() => !isLogin && setIsOpen(true)}>
            <NavLink to={isLogin ? "/myRecipe" : "#"}>My Recipe</NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} onClick={() => !isLogin && setIsOpen(true)}>
            <NavLink to={isLogin ? "/favRecipe" : "#"}>Favourites</NavLink>
          </motion.li>
        </ul>

        {/* Search Bar */}
       

        {/* Auth Buttons */}
        <div className="auth-buttons">
          {!isLogin ? (
            <>
              <motion.button className="login-btn m-5" onClick={() => setIsOpen(true)}>
                Login
              </motion.button>
              <motion.button className="signup-btn" onClick={() => setIsSignupOpen(true)}>
                Signup
              </motion.button>
            </>
          ) : (
            <motion.div className="user-info" whileHover={{ scale: 1.1 }}>
              <motion.div className="user-initial">
                {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
              </motion.div>
              <motion.button className="logout-btn" onClick={handleLogout}>
                Logout
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Login Modal */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <InputForm
              setIsLogin={(status) => {
                setIsLogin(status);
                if (status) {
                  toast.success("Logged in successfully!");
                  updateAuthState();
                }
              }}
              setUser={setUser}
              setIsOpen={setIsOpen}
            />
          </motion.div>
        </Modal>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <Modal onClose={() => setIsSignupOpen(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <InputForm
              setIsLogin={(status) => {
                setIsLogin(status);
                if (status) {
                  toast.success("Signup successful! Logged in.");
                  updateAuthState();
                }
              }}
              setUser={setUser}
              setIsOpen={setIsSignupOpen}
              isSignup={true}
            />
          </motion.div>
        </Modal>
      )}
    </>
  );
}
