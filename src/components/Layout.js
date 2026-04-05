import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const NAV = [
  { section: 'Overview', items: [
    { to: '/dashboard', icon: '▦', label: 'Dashboard' },
  ]},
  { section: 'Commerce', items: [
    { to: '/orders', icon: '◫', label: 'Orders' },
    { to: '/products', icon: '▣', label: 'Products' },
    { to: '/customers', icon: '⊕', label: 'Customers' },
    { to: '/collections', icon: '▤', label: 'Collections' },
  ]},
  { section: 'Operations', items: [
    { to: '/financial', icon: '$', label: 'Financial' },
    { to: '/suppliers', icon: '⊞', label: 'Suppliers' },
    { to: '/returns', icon: '↩', label: 'Returns' },
  ]},
  { section: 'Planning', items: [
    { to: '/checklist', icon: '✓', label: 'Launch Checklist' },
  ]},
  { section: 'Settings', items: [
    { to: '/drive-setup', icon: '⤴', label: 'Drive & Sync' },
    { to: '/brand-settings', icon: '◈', label: 'Brand Settings' },
  ]},
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const brandName = user?.brand?.name || 'Your Brand';
  const brandInitial = brandName[0]?.toUpperCase() || 'B';

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out');
    navigate('/login');
  };

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <div
          style={{ position:'fixed', inset:0, background:'rgba(8,12,15,0.7)', zIndex:199, backdropFilter:'blur(4px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Brand logo area */}
        <div className="sidebar-logo">
          <div className="brand-pill">
            <span className="brand-dot" />
            <span className="brand-pill-label">Brand Active</span>
          </div>
          <div className="brand-name-display">{brandName}</div>
          {user?.brand?.tagline && <div className="brand-sub">{user.brand.tagline}</div>}
          {!user?.brand?.tagline && <div className="brand-sub">Fashion Brand Platform</div>}
        </div>

        {/* Nav */}
        <div className="sidebar-nav">
          {NAV.map(group => (
            <div key={group.section}>
              <div className="nav-group-label">{group.section}</div>
              {group.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="nav-icon-wrap">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          {user && (
            <div className="user-card">
              {user.avatar
                ? <img src={user.avatar} alt={user.name} className="user-avatar" />
                : <div className="user-avatar-placeholder">{brandInitial}</div>
              }
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
              <button className="logout-btn" onClick={handleLogout} title="Sign out">✕</button>
            </div>
          )}
          {user?.driveConnected && (
            <div className="drive-status-pill">
              <span className="sync-dot" />
              Syncing to Google Sheets
            </div>
          )}
        </div>
      </nav>

      <main className="main-content">
        {/* Mobile header */}
        <div style={{ display:'none' }} className="mobile-header">
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background:'var(--bg-raised)', border:'1px solid var(--border)', color:'var(--text-primary)', borderRadius:'var(--radius-sm)', padding:'7px 12px', fontSize:'0.8rem' }}
          >
            Menu
          </button>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', color:'var(--text-primary)', letterSpacing:'0.08em' }}>
            {brandName.toUpperCase()}
          </span>
          <div style={{ width:60 }} />
        </div>

        <Outlet />
      </main>
    </div>
  );
}