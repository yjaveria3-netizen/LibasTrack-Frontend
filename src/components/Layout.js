import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import { NAV_GROUPS } from '../utils/navItems';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import {
  AmbientOrbs, CursorFollower, ScrollProgress,
  FloatingPetals, MagneticButton, ease,
} from './Motion';

export default function Layout() {
  const { user, logout, storageType, localPath } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const brandName = user?.brand?.name || 'LibasTrack';

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out');
    navigate('/login');
  };

  return (
    <div className="app-layout">

      {/* ── Global Atmosphere ── */}
      <AmbientOrbs />
      <FloatingPetals count={4} />
      <CursorFollower />
      <ScrollProgress />

      {/* Animated top stripe */}
      <div className="rose-stripe" />

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(61,26,20,0.38)', zIndex: 199, backdropFilter: 'blur(4px)' }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── SIDEBAR ── */}
      <motion.nav
        className={`sidebar ${open ? 'open' : ''}`}
        initial={{ x: -240 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.55, ease: ease.out }}
      >
        {/* Brand */}
        <div className="sidebar-logo">
          <div className="brand-wordmark">
            <motion.div
              className="brand-icon"
              animate={{
                scale: [1, 1.06, 1],
                boxShadow: [
                  '0 0 0 0 rgba(212,117,107,0.35)',
                  '0 0 0 10px rgba(212,117,107,0)',
                  '0 0 0 0 rgba(212,117,107,0.35)',
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
                <path d="M2 13L5 3h1.5L8 9l1.5-6H11l3 10h-1.8l-2-7-1.7 7H7.5L5.8 6l-2 7H2z" fill="white"/>
              </svg>
            </motion.div>
            <div>
              <div className="brand-name">LibasTrack</div>
              <div className="brand-edition">Rose Edition</div>
            </div>
          </div>
          <div className="brand-tagline">{brandName}</div>
        </div>

        {/* Nav */}
        <div className="sidebar-nav">
          {NAV_GROUPS.map((group, gi) => (
            <div className="nav-section" key={group.section}>
              <motion.div
                className="nav-section-label"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + gi * 0.05 }}
              >
                {group.section}
              </motion.div>
              {group.items.map((item, ii) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + gi * 0.06 + ii * 0.045, ease: ease.out, duration: 0.4 }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="nav-icon-box">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <motion.div
          className="sidebar-footer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.4 }}
        >
          {/* Sync status badge (Google Drive only) */}
          {storageType === 'google_drive' && user?.driveConnected && (
            <div className="sync-badge" title="Syncing to Google Drive">
              <span style={{ fontSize: '0.8rem' }}>🌐</span>
              <span>Google Drive</span>
              <motion.span
                className="sync-dot"
                style={{ marginLeft: 'auto' }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          )}

          {/* Dark mode toggle */}
          <motion.button
            className="sidebar-theme-btn"
            onClick={toggle}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isDark ? 'dark' : 'light'}
                initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.22 }}
                style={{ fontSize: '1rem' }}
              >
                {isDark ? '☾' : '☀'}
              </motion.span>
            </AnimatePresence>
            <span>{isDark ? 'Dark mode' : 'Light mode'}</span>
          </motion.button>

          {/* User pill */}
          {user && (
            <div className="user-pill">
              {user.avatar
                ? <img src={user.avatar} alt="" className="user-av" />
                : <div className="user-av-init">{(user.brand?.name || user.name)?.[0]?.toUpperCase()}</div>
              }
              <div className="user-info-wrap">
                <div className="user-info-name">{user.name}</div>
                <div className="user-info-email">{user.email}</div>
              </div>
              <button className="logout-btn" onClick={handleLogout} title="Sign out">✕</button>
            </div>
          )}
        </motion.div>
      </motion.nav>

      {/* ── Main Content ── */}
      <main className="main-content">
        {/* Mobile topbar */}
        <div className="mobile-header">
          <MagneticButton
            onClick={() => setOpen(true)}
            style={{
              background: 'var(--rose-soft)', border: '1px solid var(--rose-border-mid)',
              color: 'var(--rose)', borderRadius: 20, padding: '6px 14px',
              fontSize: '0.78rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600,
            }}
          >
            ☰ Menu
          </MagneticButton>
          <span style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 500, color: 'var(--text-primary)'
          }}>
            LibasTrack
          </span>
          <MagneticButton
            onClick={toggle}
            style={{
              background: 'var(--rose-soft)', border: '1px solid var(--rose-border)',
              color: 'var(--rose)', borderRadius: '50%', width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem'
            }}
          >
            {isDark ? '☾' : '☀'}
          </MagneticButton>
        </div>

        {/* Page transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
            transition={{ duration: 0.38, ease: ease.out }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
