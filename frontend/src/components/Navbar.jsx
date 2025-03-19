import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBowlFood } from "react-icons/fa6";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Function to update login state
  const updateAuthState = () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    setIsLogin(!!token); // Convert token existence to boolean
    setUser(userData ? JSON.parse(userData) : null);
  };

  // ✅ Load auth state when component mounts
  useEffect(() => {
    updateAuthState();
  }, []);

  // ✅ Listen for login/logout changes
  useEffect(() => {
    window.addEventListener("storage", updateAuthState);
    return () => window.removeEventListener("storage", updateAuthState);
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    updateAuthState(); // Update state immediately
  };

  return (
    <>
      <motion.header
        className="navbar"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 className="logo" whileHover={{ scale: 1.1 }}>
        <FaBowlFood />ungry Hive
        </motion.h2>

        <ul className="nav-links">
          <motion.li whileHover={{ scale: 1.1 }}>
            <NavLink to="/">Home</NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} onClick={() => !isLogin && setIsOpen(true)}>
            <NavLink to={isLogin ? "/myRecipe" : "#"}>My Recipe</NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} onClick={() => !isLogin && setIsOpen(true)}>
            <NavLink to={isLogin ? "/favRecipe" : "#"}>Favourites</NavLink>
          </motion.li>
        </ul>

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

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <InputForm 
              setIsLogin={setIsLogin} 
              setUser={setUser} 
              setIsOpen={setIsOpen} 
            />
          </motion.div>
        </Modal>
      )}

      {isSignupOpen && (
        <Modal onClose={() => setIsSignupOpen(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <InputForm 
              setIsLogin={setIsLogin} 
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
