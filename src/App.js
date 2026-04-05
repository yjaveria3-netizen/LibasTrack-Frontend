import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import BrandOnboarding from './pages/BrandOnboarding';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Financial from './pages/Financial';
import Suppliers from './pages/Suppliers';
import Checklist from './pages/Checklist';
import DriveSetup from './pages/DriveSetup';
import BrandSettings from './pages/BrandSettings';
import Layout from './components/Layout';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'var(--bg-void)' }}>
      <div className="spinner" />
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

// Stub pages for routes we haven't built yet
const Stub = ({ title }) => (
  <div>
    <div className="page-header"><h1 className="page-title">{title}</h1><p className="page-subtitle">Coming soon</p></div>
    <div className="page-body"><div className="empty-state"><div className="empty-state-icon">▤</div><h3>{title}</h3><p>This module is in development.</p></div></div>
  </div>
);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/onboarding" element={<ProtectedRoute><BrandOnboarding /></ProtectedRoute>} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="financial" element={<Financial />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="collections" element={<Stub title="Collections" />} />
        <Route path="returns" element={<Stub title="Returns & Refunds" />} />
        <Route path="checklist" element={<Checklist />} />
        <Route path="drive-setup" element={<DriveSetup />} />
        <Route path="brand-settings" element={<BrandSettings />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--bg-raised)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-mid)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              borderRadius: '8px',
            },
            success: { iconTheme: { primary: '#00D4B4', secondary: '#080C0F' } },
            error: { iconTheme: { primary: '#FF5E5E', secondary: '#080C0F' } },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;