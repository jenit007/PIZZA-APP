import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiSun, FiMoon, FiUser, FiLogOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Navbar = ({ theme, toggleTheme }) => {
  const { cart, user, logout } = useContext(AppContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (user) {
      setShowProfileMenu(!showProfileMenu);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };
  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      zIndex: 1000
    }}>
      <Link to="/" style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>
        Pizza<span style={{ color: 'var(--text-main)' }}>Artistry</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/builder" style={{ fontWeight: '500', transition: 'color 0.2s' }} className="nav-link">
          Menu
        </Link>
        <Link to="/orders" style={{ fontWeight: '500', transition: 'color 0.2s' }} className="nav-link">
          My Orders
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '20px' }}>
          <button onClick={toggleTheme} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)', fontSize: '20px'
          }}>
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
          
          <Link to="/checkout" style={{ position: 'relative', color: 'var(--text-main)', fontSize: '20px' }}>
            <FiShoppingCart />
            <AnimatePresence>
              {cart && cart.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  style={{
                    position: 'absolute', top: '-8px', right: '-10px',
                    background: 'var(--primary)', color: 'white',
                    fontSize: '12px', padding: '2px 6px', borderRadius: '50%', fontWeight: 'bold'
                  }}
                >
                  {cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <div style={{ position: 'relative' }}>
            <div 
              onClick={handleProfileClick} 
              style={{ color: 'var(--text-main)', fontSize: '20px', marginLeft: '10px', cursor: 'pointer' }}
            >
              <FiUser />
            </div>
            
            <AnimatePresence>
              {showProfileMenu && user && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  style={{
                    position: 'absolute',
                    top: '40px',
                    right: 0,
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    padding: '10px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    minWidth: '150px',
                    zIndex: 1000
                  }}
                >
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--glass-border)', marginBottom: '8px' }}>
                    <strong>{user.name || 'User'}</strong>
                  </div>
                  <button 
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-main)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      borderRadius: '8px',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(230, 57, 70, 0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <FiLogOut /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
