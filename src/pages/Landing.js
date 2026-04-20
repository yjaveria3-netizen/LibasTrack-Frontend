import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const WORDS = ['Beautifully.', 'Effortlessly.', 'Intelligently.', 'Seamlessly.'];

const FEATURES = [
  {
    icon: '📦',
    title: 'Inventory & Products',
    desc: 'Track every SKU, fabric, collection, and season with full stock visibility in real time.',
    color: '#A78BFA',
  },
  {
    icon: '🛍️',
    title: 'Orders & Customers',
    desc: 'Manage orders from intake to delivery. Full CRM with loyalty tracking and customer segmentation.',
    color: '#34D399',
  },
  {
    icon: '☁️',
    title: 'Cloud or Local Storage',
    desc: 'Sync to Google Drive/Sheets or keep everything offline in Excel. Your data, your rules.',
    color: '#60A5FA',
  },
  {
    icon: '💰',
    title: 'Financial & Returns',
    desc: 'Revenue, payments, and return management in one unified dashboard with multi-currency support.',
    color: '#FBBF24',
  },
];

const STEPS = [
  { num: '01', title: 'Sign In with Google', desc: 'One click. No passwords. Secure OAuth authentication.' },
  { num: '02', title: 'Choose Your Mode', desc: 'Local Excel for offline privacy, or Google Drive for cloud sync.' },
  { num: '03', title: 'Run Your Brand', desc: 'Products, orders, customers, suppliers — all in one place.' },
];

const STATS = [
  { value: '12K+', label: 'Fashion Brands' },
  { value: '50+', label: 'Currencies Supported' },
  { value: '100%', label: 'Data Ownership' },
  { value: '0', label: 'Setup Fees' },
];

export default function Landing() {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const [wordIdx, setWordIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(p => (p + 1) % WORDS.length), 2800);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearInterval(t); window.removeEventListener('scroll', onScroll); };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-root">
      {/* Atmosphere */}
      <div className="vibe-noise" aria-hidden="true" />
      <div className="vibe-grid" aria-hidden="true" />
      <div className="landing-orb landing-orb-1" aria-hidden="true" />
      <div className="landing-orb landing-orb-2" aria-hidden="true" />

      {/* ── NAVBAR ── */}
      <motion.nav
        className={`landing-nav${scrolled ? ' landing-nav-scrolled' : ''}`}
        initial={{ y: -68, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="landing-nav-inner">
          {/* Logo */}
          <div className="landing-logo">
            <div className="tm-logo-sq">
              <div className="tm-logo-inner" />
            </div>
            <span className="landing-logo-name">LibasTrack</span>
          </div>

          {/* Actions */}
          <div className="landing-nav-actions">
            <button
              className="landing-theme-btn"
              onClick={toggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              className="landing-signin-btn"
              onClick={() => navigate('/login')}
              aria-label="Sign in to LibasTrack"
            >
              Sign In
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section className="landing-hero" id="hero" aria-labelledby="hero-heading">
        <motion.div
          className="landing-hero-content"
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Tag pill */}
          <motion.div
            className="landing-tag-pill"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.38, duration: 0.5 }}
          >
            <span className="landing-tag-dot" aria-hidden="true" />
            <span>Fashion Brand OS — Built for Growth</span>
          </motion.div>

          {/* Headline */}
          <h1 className="landing-headline" id="hero-heading">
            <span className="landing-headline-line1">Run your boutique</span>
            <span className="landing-headline-morph" aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                  transition={{ duration: 0.52 }}
                  className="landing-morph-word"
                >
                  {WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="landing-subtext">
            LibasTrack is the complete management suite for fashion brands — inventory, orders,
            customers, suppliers, financials, and returns — with Google Drive or local Excel storage.
          </p>

          {/* CTA Row */}
          <div className="landing-cta-row">
            <motion.button
              className="landing-cta-primary"
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Get started with LibasTrack for free"
            >
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true" focusable="false">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white" opacity="0.8" />
              </svg>
              Get Started Free
            </motion.button>

            <button
              className="landing-cta-secondary"
              onClick={() => scrollToSection('how-it-works')}
              aria-label="Learn how LibasTrack works"
            >
              See How It Works →
            </button>
          </div>

          {/* Stats bar */}
          <motion.div
            className="landing-stats-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            role="list"
            aria-label="Key statistics"
          >
            {STATS.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="landing-stat" role="listitem">
                  <div className="landing-stat-value">{s.value}</div>
                  <div className="landing-stat-label">{s.label}</div>
                </div>
                {i < STATS.length - 1 && (
                  <div className="landing-stat-divider" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero visual — mock dashboard */}
        <motion.div
          className="landing-hero-visual"
          initial={{ opacity: 0, x: 60, filter: 'blur(20px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          aria-hidden="true"
        >
          <div className="landing-dashboard-preview glass">
            {/* Window chrome */}
            <div className="ldp-topbar">
              <div className="ldp-dots">
                <span className="ldp-dot ldp-dot-red" />
                <span className="ldp-dot ldp-dot-yellow" />
                <span className="ldp-dot ldp-dot-green" />
              </div>
              <div className="ldp-title">LibasTrack — Dashboard</div>
            </div>

            <div className="ldp-body">
              {/* Mock sidebar */}
              <div className="ldp-sidebar">
                {['Dashboard', 'Products', 'Orders', 'Customers', 'Financial', 'Returns'].map((item, i) => (
                  <div key={item} className={`ldp-nav-item${i === 0 ? ' ldp-active' : ''}`}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Mock main content */}
              <div className="ldp-main">
                <div className="ldp-stat-row">
                  {[
                    { label: 'Revenue', value: 'PKR 2.4M' },
                    { label: 'Orders', value: '142' },
                    { label: 'Products', value: '89' },
                  ].map(s => (
                    <div key={s.label} className="ldp-stat-card glass">
                      <div className="ldp-stat-label">{s.label}</div>
                      <div className="ldp-stat-val">{s.value}</div>
                    </div>
                  ))}
                </div>

                <div className="ldp-chart-area glass">
                  <div className="ldp-chart-label">Revenue Trend</div>
                  <div className="ldp-chart-bars">
                    {[40, 65, 45, 80, 60, 90, 70].map((h, i) => (
                      <motion.div
                        key={i}
                        className="ldp-bar"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.55 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                        style={{ height: `${h}%`, transformOrigin: 'bottom' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            className="landing-float-badge landing-float-badge-1 glass"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#34D399', boxShadow: '0 0 8px #34D399',
                display: 'inline-block', flexShrink: 0,
              }}
            />
            <span>Live Sync Active</span>
          </motion.div>

          <motion.div
            className="landing-float-badge landing-float-badge-2 glass"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <span>📊</span>
            <span>89 Products Tracked</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="landing-features" id="features" aria-labelledby="features-heading">
        <motion.div
          className="landing-section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
        >
          <div className="landing-section-tag" aria-hidden="true">Everything You Need</div>
          <h2 className="landing-section-title" id="features-heading">
            Built for fashion. Designed for growth.
          </h2>
          <p className="landing-section-sub">Every module your boutique needs, in one cohesive platform.</p>
        </motion.div>

        <div className="landing-features-grid" role="list">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              className="landing-feature-card glass"
              role="listitem"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.10 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              aria-label={f.title}
            >
              <div
                className="lfc-icon"
                style={{ background: `${f.color}18`, border: `1px solid ${f.color}28` }}
                aria-hidden="true"
              >
                <span>{f.icon}</span>
              </div>
              <h3 className="lfc-title" style={{ color: f.color }}>{f.title}</h3>
              <p className="lfc-desc">{f.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="landing-how" id="how-it-works" aria-labelledby="how-heading">
        <motion.div
          className="landing-section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
        >
          <div className="landing-section-tag" aria-hidden="true">Simple Setup</div>
          <h2 className="landing-section-title" id="how-heading">Up and running in 3 steps.</h2>
        </motion.div>

        <div className="landing-steps" role="list">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              className="landing-step"
              role="listitem"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.16 }}
            >
              <div className="landing-step-num" aria-hidden="true">{s.num}</div>
              <div className="landing-step-content">
                <h3 className="landing-step-title">{s.title}</h3>
                <p className="landing-step-desc">{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="landing-step-connector" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STORAGE MODES ── */}
      <section className="landing-storage" id="storage" aria-labelledby="storage-heading">
        <motion.div
          className="landing-storage-inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75 }}
        >
          <div className="landing-section-tag" style={{ textAlign: 'left' }} aria-hidden="true">
            Flexible Storage
          </div>
          <h2 className="landing-section-title" id="storage-heading" style={{ textAlign: 'left', maxWidth: 540 }}>
            Your data. Your choice.
          </h2>
          <p className="landing-section-sub" style={{ textAlign: 'left' }}>
            LibasTrack adapts to your workflow — no vendor lock-in.
          </p>

          <div className="landing-storage-modes">
            {/* Local Excel */}
            <div className="landing-mode-card glass" role="article" aria-label="Local Excel storage option">
              <div className="lmc-icon" aria-hidden="true">💾</div>
              <h3 className="lmc-title">Local Excel</h3>
              <p className="lmc-desc">All data saved directly on your PC as branded Excel workbooks. Works offline. 100% private.</p>
              <ul className="lmc-features" aria-label="Local Excel features">
                <li>✓ Standard .xlsx format</li>
                <li>✓ Saved to Documents/LibasTrack/</li>
                <li>✓ No internet required</li>
                <li>✓ Zero subscription cost</li>
              </ul>
              <div className="lmc-badge">Local First</div>
            </div>

            <div className="landing-mode-divider" aria-hidden="true">
              <div className="lmd-line" />
              <div className="lmd-or glass">or</div>
              <div className="lmd-line" />
            </div>

            {/* Google Drive */}
            <div className="landing-mode-card glass landing-mode-card-featured" role="article" aria-label="Google Drive storage option">
              <div className="lmc-icon" aria-hidden="true">☁️</div>
              <h3 className="lmc-title">Google Drive Sync</h3>
              <p className="lmc-desc">Live sync to Google Sheets. Access your brand data from any device, anywhere in the world.</p>
              <ul className="lmc-features" aria-label="Google Drive features">
                <li>✓ Real-time Google Sheets</li>
                <li>✓ Multi-device access</li>
                <li>✓ Team collaboration</li>
                <li>✓ Automatic backups</li>
              </ul>
              <div className="lmc-badge lmc-badge-cloud">Cloud Hybrid</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="landing-cta-banner" aria-labelledby="cta-heading">
        <motion.div
          className="landing-cta-banner-inner glass"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75 }}
        >
          <div className="landing-cta-banner-orb" aria-hidden="true" />
          <h2 className="landing-cta-banner-title" id="cta-heading">
            Ready to elevate your brand?
          </h2>
          <p className="landing-cta-banner-sub">
            Join thousands of fashion entrepreneurs managing their empire with LibasTrack.
          </p>
          <motion.button
            className="landing-cta-primary"
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ marginTop: 8 }}
            aria-label="Start using LibasTrack for free"
          >
            Start For Free →
          </motion.button>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="landing-footer" role="contentinfo">
        <div className="landing-footer-inner">
          <div className="landing-logo" aria-label="LibasTrack logo">
            <div className="tm-logo-sq" style={{ width: 22, height: 22 }}>
              <div className="tm-logo-inner" style={{ width: 9, height: 9 }} />
            </div>
            <span className="landing-logo-name" style={{ fontSize: '0.95rem' }}>LibasTrack</span>
          </div>

          <p className="landing-footer-copy">
            © {new Date().getFullYear()} LibasTrack — The Fashion Brand OS
          </p>

          <nav className="landing-footer-links" aria-label="Footer navigation">
            <button className="landing-footer-link" onClick={() => navigate('/login')}>
              Sign In
            </button>
          </nav>
        </div>
      </footer>
    </div>
  );
}