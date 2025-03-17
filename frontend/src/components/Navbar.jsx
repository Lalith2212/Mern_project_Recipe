import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink } from 'react-router-dom';
import{motion} from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(!token);
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setIsLogin(!token);
  }, [token]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setIsOpen(true);
    }
  };

  const getProfileImage = () => {
    if (user?.email) {
      const usernameInitial = user.email.charAt(0).toUpperCase();
      return `https://api.dicebear.com/7.x/initials/svg?seed=${usernameInitial}`;
    }
    return "https://api.dicebear.com/7.x/initials/svg?seed=U"; // Default avatar
  };

  return (
    <>
      {/* Navbar with fade-in animation */}
      <motion.header
        className="navbar"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="logo"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          Hungry Hive
        </motion.h2>

        {/* Navigation Links with smooth hover effects */}
        <ul className="nav-links">
          <motion.li whileHover={{ scale: 1.1 }}>
            <NavLink to="/">Home</NavLink>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            onClick={() => isLogin && setIsOpen(true)}
          >
            <NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            onClick={() => isLogin && setIsOpen(true)}
          >
            <NavLink to={!isLogin ? "/favRecipe" : "/"}>Favourites</NavLink>
          </motion.li>
        </ul>

        {/* Authentication Buttons */}
        <div className="auth-buttons">
          {isLogin ? (
            <>
              <motion.button
                className="login-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
              >
                Login
              </motion.button>
              <motion.button
                className="signup-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSignupOpen(true)}
              >
                Signup
              </motion.button>
            </>
          ) : (
            <motion.div
              className="user-info"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="user-initial"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {user?.email.charAt(0).toUpperCase()}
              </motion.div>
              <motion.button
                className="logout-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => localStorage.clear()}
              >
                Logout
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Animated Login Modal */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <InputForm setIsOpen={() => setIsOpen(false)} />
          </motion.div>
        </Modal>
      )}

      {/* Animated Signup Modal */}
      {isSignupOpen && (
        <Modal onClose={() => setIsSignupOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <InputForm setIsOpen={() => setIsSignupOpen(false)} isSignup={true} />
          </motion.div>
        </Modal>
      )}
    </>
  );
}
