import React from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const handleLogin = async () => {
    try { await loginWithGoogle(); }
    catch { toast.error('Failed to initiate Google login'); }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-void)',
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Left panel — branding */}
      <div style={{
        flex: '0 0 55%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '56px 64px',
        position: 'relative',
        borderRight: '1px solid var(--border)',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,212,180,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,180,0.03) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        {/* Teal glow top-right */}
        <div style={{ position:'absolute', top:0, right:0, width:400, height:400, background:'radial-gradient(circle at top right,rgba(0,212,180,0.08),transparent 65%)', pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:1 }}>
          {/* Platform badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--teal-soft)', border:'1px solid var(--border-bright)', borderRadius:999, padding:'4px 14px', marginBottom:40 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--teal)', boxShadow:'0 0 8px var(--teal)', display:'inline-block', animation:'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontSize:'0.6rem', color:'var(--teal)', letterSpacing:'0.18em', textTransform:'uppercase', fontWeight:600 }}>Fashion Brand Platform</span>
          </div>

          {/* Big headline */}
          <div style={{ fontFamily:'var(--font-display)', fontSize:'6rem', lineHeight:0.92, color:'var(--text-primary)', letterSpacing:'0.04em', textTransform:'uppercase', marginBottom:28 }}>
            <div>Run Your</div>
            <div style={{ color:'var(--teal)' }}>Brand.</div>
            <div>Not</div>
            <div>Spreadsheets.</div>
          </div>

          <p style={{ color:'var(--text-muted)', fontSize:'0.9rem', maxWidth:380, lineHeight:1.7, marginBottom:40 }}>
            The complete management platform for fashion brands. Inventory, orders, customers, suppliers, collections — all synced live to Google Sheets.
          </p>

          {/* Feature pills */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {['Multi-brand','Google Sheets Sync','Order Tracking','Customer CRM','Supplier Management','Collections','Analytics'].map(f => (
              <span key={f} style={{
                display:'inline-flex', alignItems:'center', gap:5,
                background:'var(--bg-surface)', border:'1px solid var(--border)',
                borderRadius:999, padding:'4px 12px',
                fontSize:'0.68rem', color:'var(--text-secondary)',
              }}>
                <span style={{ color:'var(--teal)', fontSize:'0.6rem' }}>✓</span> {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — login */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}>
        <div style={{ width:'100%', maxWidth:380 }}>

          <div style={{ marginBottom:36 }}>
            <div style={{ fontFamily:'var(--font-heading)', fontSize:'1.7rem', color:'var(--text-primary)', marginBottom:8 }}>
              Sign in to your workspace
            </div>
            <p style={{ fontSize:'0.82rem', color:'var(--text-muted)', lineHeight:1.6 }}>
              Sign in with Google to access your brand dashboard. New? We'll set up your brand in under 2 minutes.
            </p>
          </div>

          <button className="google-btn" onClick={handleLogin} style={{ width:'100%', justifyContent:'center', padding:'14px 22px', fontSize:'0.88rem' }}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ marginTop:22, padding:'14px 18px', background:'var(--teal-soft)', border:'1px solid rgba(0,212,180,0.18)', borderRadius:'var(--radius)' }}>
            <p style={{ fontSize:'0.74rem', color:'var(--text-secondary)', lineHeight:1.6 }}>
              We request access to Google Drive and Sheets to sync your brand data automatically. Your data stays in your own Drive.
            </p>
          </div>

          <p style={{ marginTop:20, fontSize:'0.68rem', color:'var(--text-muted)', textAlign:'center' }}>
            Works for any clothing brand, anywhere in the world
          </p>
        </div>
      </div>
    </div>
  );
}