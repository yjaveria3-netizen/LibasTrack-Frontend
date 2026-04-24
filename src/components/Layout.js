import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import { NAV_GROUPS } from '../utils/navItems';
import { motion, AnimatePresence } from 'framer-motion';
import { CursorFollower, ScrollProgress, ease } from './Motion';

export default function Layout() {
  const { user, logout, storageType } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 992 : false
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 992;
      setIsMobile(mobile);
      if (!mobile) {
        setOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out');
    navigate('/');
  };

  // Only show storage badge for Google Drive (not local mode)
  const StorageBadge = () => {
    if (storageType === 'google_drive' && user?.driveConnected) {
      return (
        <div className="sync-badge-mini">
          <div className="sync-pulse" />
          <span>LIVE SYNC</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="app-shell">
      {/* ... noise and grid ... */}
      <div className="vibe-noise" aria-hidden="true" />
      <div className="vibe-grid" aria-hidden="true" />
      <CursorFollower />
      <ScrollProgress />

      {/* ... accent stripe ... */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 1002,
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* ... mobile overlay ... */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-overlay"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        id="main-navigation"
        className={`sidebar glass${open ? ' open' : ''}`}
        initial={false}
        animate={isMobile ? { x: open ? 0 : '-100%' } : { x: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="sidebar-header">
          <div className="brand-mark">
            <motion.div className="tm-logo-mark" whileHover={{ scale: 1.08 }}>
              <div className="tm-logo-sq"><div className="tm-logo-inner" /></div>
            </motion.div>
            <div>
              <div className="brand-name">LibasTrack</div>
              <div className="brand-tagline">Brand OS</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_GROUPS.map((group) => (
            <div className="nav-section" key={group.section}>
              <div className="nav-section-label">{group.section}</div>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <motion.span className="nav-icon" whileHover={{ scale: 1.18 }}>{item.icon}</motion.span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="identity-cluster">
            <StorageBadge />
            <div className="identity-card">
              <div className="user-avatar-premium">
                {user?.avatar
                  ? <img src={user.avatar} alt={user.name} />
                  : (user?.brand?.name || user?.name)?.[0]?.toUpperCase()}
              </div>
              <div className="user-info">
                <div className="user-name">{user?.name}</div>
                <div className="user-role">{user?.email}</div>
              </div>
              <button
                className="btn-ctrl"
                onClick={handleLogout}
                title="Sign out"
              >
                ↩
              </button>
            </div>
          </div>

          <div className="theme-switch-row">
            <div className="theme-label">{isDark ? 'Midnight' : 'Daylight'}</div>
            <button
              className="theme-toggle-compact"
              onClick={toggle}
              aria-label="Toggle theme"
            >
              {isDark ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MAIN CONTENT */}
      <main className="main-content" role="main" id="main-content">
        {/* Mobile top bar */}
        <header className="mobile-top-bar glass" role="banner">
          <button
            className="menu-trigger"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="main-navigation"
          >
            ☰
          </button>
          <div className="mobile-logo-text">LibasTrack</div>
          <button
            className="mobile-theme-btn"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </header>

        {/* Page transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="page-transition-wrapper"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
