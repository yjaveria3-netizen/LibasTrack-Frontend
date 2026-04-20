import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton, CursorFollower } from '../components/Motion';

const WORDS = [
  'Perfectly managed.',
  'Beautifully tracked.',
  'Always in sync.',
  'Simply powerful.',
  'Built to scale.',
];

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [wordIdx, setWordIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [counts, setCounts] = useState({ brands: 0, currencies: 0 });

  /* Show error from OAuth failure redirect */
  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'oauth_failed') {
      toast.error('Google authentication failed. Please try again.');
    }
  }, [searchParams]);

  useEffect(() => {
    const wordTimer = setInterval(() => setWordIdx(p => (p + 1) % WORDS.length), 3000);
    const countTimer = setTimeout(() => setCounts({ brands: 12, currencies: 50 }), 500);
    return () => { clearInterval(wordTimer); clearTimeout(countTimer); };
  }, []);

  const handleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch {
      toast.error('Failed to initiate Google login. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Atmosphere */}
      <div className="vibe-noise" aria-hidden="true" />
      <div className="vibe-grid" aria-hidden="true" />
      <CursorFollower />

      {/* Animated accent stripe */}
      <div
        className="login-top-stripe"
        aria-hidden="true"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 1001 }}
      />

      <div className="login-container">
        {/* ── LEFT: Brand panel ── */}
        <motion.div
          initial={{ opacity: 0, x: -60, filter: 'blur(20px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="login-brand-panel glass"
          aria-hidden="true"   /* decorative — content duplicated in form panel */
        >
          {/* Background letter */}
          <div className="ornament brand-letter-bg" style={{ fontSize: '30rem', opacity: 0.018, color: 'var(--accent)' }}>
            L
          </div>

          <div className="login-brand-content">
            {/* Back link */}
            <button
              className="login-back-btn"
              onClick={() => navigate('/')}
              style={{ marginBottom: 44 }}
              tabIndex={-1}   /* skip on keyboard — same link is in form panel */
            >
              ← Back to Home
            </button>

            {/* Logo */}
            <div className="login-logo-row">
              <div className="tm-logo-mark">
                <div className="tm-logo-sq">
                  <div className="tm-logo-inner" />
                </div>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: '1.2rem', color: 'var(--text-primary)',
                }}
              >
                LibasTrack
              </span>
            </div>

            {/* Animated headline */}
            <h1
              style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)',
                color: 'var(--text-primary)', lineHeight: 1.1, marginTop: 32,
                fontWeight: 400,
              }}
            >
              <span style={{ display: 'block' }}>Your brand.</span>
              <span style={{ display: 'block', minHeight: '1.2em' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45 }}
                    style={{ display: 'inline-block', color: 'var(--accent)' }}
                  >
                    {WORDS[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span style={{ display: 'block' }}>in one place.</span>
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.8, maxWidth: 400, marginTop: 20 }}>
              LibasTrack gives fashion brands the complete toolkit — orders, inventory, CRM,
              suppliers, returns, checklist — with live Google Sheets sync.
            </p>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 28, marginTop: 52, flexWrap: 'wrap' }}>
              {[
                { value: `${counts.brands}K+`, label: 'Fashion brands' },
                { value: `${counts.currencies}+`, label: 'Currencies' },
                { value: 'LIVE', label: 'Sheets Sync', color: '#34D399' },
              ].map((stat, i) => (
                <React.Fragment key={stat.label}>
                  {i > 0 && (
                    <div
                      aria-hidden="true"
                      style={{ width: 1, background: 'var(--accent-soft)', alignSelf: 'stretch' }}
                    />
                  )}
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: stat.color || 'var(--accent)' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.70rem', color: 'var(--text-faint)', fontWeight: 600, marginTop: 2 }}>
                      {stat.label}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT: Form panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="login-form-panel"
        >
          <div className="login-form-content">
            {/* Back link — visible on mobile when brand panel is hidden */}
            <button
              className="login-back-btn"
              onClick={() => navigate('/')}
              aria-label="Go back to home page"
              style={{ marginBottom: 28, display: 'flex' }}
            >
              ← Back to Home
            </button>

            {/* Header */}
            <motion.div
              className="login-form-header"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55 }}
            >
              <h1 className="login-form-title">Sign in</h1>
              <p className="login-form-subtitle">
                Elevate your boutique management with a suite designed for the modern fashion house.
              </p>
            </motion.div>

            {/* Google sign-in button */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              <button
                className="google-login-btn"
                onClick={handleLogin}
                disabled={isLoading}
                aria-label={isLoading ? 'Redirecting to Google…' : 'Continue with Google'}
                aria-busy={isLoading}
                aria-disabled={isLoading}
                style={{ opacity: isLoading ? 0.75 : 1 }}
              >
                {isLoading ? (
                  /* Loading spinner */
                  <div
                    style={{
                      width: 20, height: 20, borderRadius: '50%',
                      border: '2px solid #e5e7eb',
                      borderTopColor: '#374151',
                      animation: 'spin 0.7s linear infinite',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                ) : (
                  /* Google logo */
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                <span>{isLoading ? 'Redirecting to Google…' : 'Continue with Google'}</span>
              </button>
            </motion.div>

            {/* Footer info */}
            <motion.div
              className="login-footer-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.7 }}
            >
              <div className="divider" role="separator" />
              <div className="info-box">
                <p>
                  We request access to Google Drive &amp; Sheets to sync your brand data automatically.
                  Your business logic stays in your own Drive — we never store your files.
                </p>
              </div>
              <p className="footer-tagline">LibasTrack — The Fashion Brand OS</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}