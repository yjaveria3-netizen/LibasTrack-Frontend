import React from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { MagneticButton, AmbientOrbs, FloatingPetals, CursorFollower, ease } from '../components/Motion';

export default function Login() {
  const { loginWithGoogle } = useAuth();

  const handleLogin = async () => {
    try { await loginWithGoogle(); }
    catch { toast.error('Failed to initiate Google login'); }
  };

  return (
    <div style={{ minHeight:'100vh', background:'#FFF7F5', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
      <AmbientOrbs />
      <FloatingPetals count={4} />
      <CursorFollower />

      {/* Animated top stripe */}
      <div style={{
        height:3,
        background:'linear-gradient(90deg, #D4756B, #E8A89A, #F2C5BF, #C9A96E, #E8A89A, #D4756B)',
        backgroundSize:'300%', animation:'roseSweep 5s linear infinite',
        position:'relative', zIndex:10,
      }} />

      <style>{`
        @keyframes roseSweep { 0%{background-position:0%} 100%{background-position:300%} }
        .login-feat:hover { background:rgba(212,117,107,0.05) !important; border-color:rgba(212,117,107,0.2) !important; }
      `}</style>

      <div style={{ flex:1, display:'flex', position:'relative', zIndex:5 }}>

        {/* ── Left: Brand Panel ── */}
        <motion.div
          initial={{ opacity:0, x:-40 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:0.7, ease: ease.out }}
          style={{
            flex:'0 0 54%', display:'flex', flexDirection:'column',
            justifyContent:'flex-end', padding:'52px 56px',
            borderRight:'1px solid rgba(212,117,107,0.1)',
            position:'relative', overflow:'hidden',
            background:'linear-gradient(160deg, #FFF7F5 0%, #FFF0ED 100%)',
          }}
        >
          {/* Giant decorative "L" */}
          <div style={{
            position:'absolute', top:'-60px', left:'-30px',
            fontFamily:'Cormorant Garamond, Georgia, serif',
            fontSize:'28rem', fontWeight:300,
            color:'rgba(212,117,107,0.055)', lineHeight:1,
            userSelect:'none', pointerEvents:'none',
          }}>L</div>

          {/* Floating decorative circles */}
          <motion.div
            style={{ position:'absolute', top:60, right:80, width:120, height:120, borderRadius:'50%', border:'1px solid rgba(212,117,107,0.1)' }}
            animate={{ scale:[1,1.05,1], rotate:[0,5,0] }}
            transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}
          />
          <motion.div
            style={{ position:'absolute', top:80, right:100, width:80, height:80, borderRadius:'50%', border:'1px solid rgba(212,117,107,0.08)' }}
            animate={{ scale:[1,1.08,1], rotate:[0,-8,0] }}
            transition={{ duration:10, repeat:Infinity, ease:'easeInOut', delay:1 }}
          />
          <motion.div
            style={{ position:'absolute', bottom:120, right:40, width:60, height:60, borderRadius:'50%', background:'rgba(242,197,191,0.2)' }}
            animate={{ y:[0,-15,0], opacity:[0.8,1,0.8] }}
            transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
          />

          <div style={{ position:'relative', zIndex:1 }}>
            {/* Logo */}
            <motion.div
              style={{ display:'flex', alignItems:'center', gap:14, marginBottom:40 }}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.2, duration:0.6, ease: ease.out }}
            >
              <motion.div
                style={{
                  width:42, height:42, borderRadius:'50%', background:'#D4756B',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}
                animate={{ scale:[1,1.06,1], boxShadow:['0 0 0 0 rgba(212,117,107,0.3)','0 0 0 12px rgba(212,117,107,0)','0 0 0 0 rgba(212,117,107,0.3)'] }}
                transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M2 13L5 3h1.5L8 9l1.5-6H11l3 10h-1.8l-2-7-1.7 7H7.5L5.8 6l-2 7H2z" fill="white"/>
                </svg>
              </motion.div>
              <div>
                <div style={{ fontFamily:'Cormorant Garamond, Georgia, serif', fontSize:'1.3rem', fontStyle:'italic', fontWeight:500, color:'#3D1A14', letterSpacing:'0.02em' }}>LibasTrack</div>
                <div style={{ fontSize:'0.6rem', color:'#D4756B', letterSpacing:'0.2em', textTransform:'uppercase', marginTop:1 }}>Rose Edition</div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.35, duration:0.7, ease: ease.out }}
              style={{
                fontFamily:'Cormorant Garamond, Georgia, serif',
                fontSize:'3rem', fontWeight:400, color:'#3D1A14',
                lineHeight:1.12, letterSpacing:'-0.01em', marginBottom:16,
              }}
            >
              Manage your<br/>
              <em style={{ color:'#D4756B' }}>fashion brand</em><br/>
              with grace.
            </motion.h1>

            <motion.p
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.5, duration:0.6, ease: ease.out }}
              style={{ color:'#9A6E6A', fontSize:'0.88rem', lineHeight:1.75, maxWidth:360, marginBottom:36 }}
            >
              Orders, products, customers, suppliers, collections, returns — all in one beautiful place.
              Live sync to Google Sheets. Works for any clothing brand, anywhere in the world.
            </motion.p>

            {/* Feature list with staggered reveal */}
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {[
                ['◫', 'Full order pipeline with 13 statuses'],
                ['▣', 'Inventory with cost price & margin tracking'],
                ['◎', 'CRM with VIP / Loyal / At-Risk segments'],
                ['◈', 'Supplier management & ratings'],
                ['↩', 'Returns & refunds lifecycle tracking'],
                ['✓', 'Custom editable launch checklist'],
              ].map(([icon, text], i) => (
                <motion.div
                  key={text}
                  className="login-feat"
                  initial={{ opacity:0, x:-16 }}
                  animate={{ opacity:1, x:0 }}
                  transition={{ delay: 0.55 + i * 0.07, duration:0.5, ease: ease.out }}
                  style={{
                    display:'flex', alignItems:'center', gap:10,
                    fontSize:'0.8rem', color:'#7A4A42', padding:'6px 10px',
                    borderRadius:8, transition:'all 0.2s',
                    border:'1px solid transparent', cursor:'default',
                  }}
                >
                  <span style={{
                    width:22, height:22, borderRadius:6,
                    background:'rgba(212,117,107,0.09)',
                    border:'1px solid rgba(212,117,107,0.18)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'0.65rem', color:'#D4756B', flexShrink:0,
                  }}>{icon}</span>
                  {text}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Right: Login Panel ── */}
        <motion.div
          initial={{ opacity:0, x:40 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:0.7, delay:0.1, ease: ease.out }}
          style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 32px', background:'#fff' }}
        >
          <div style={{ width:'100%', maxWidth:360 }}>

            {/* Header */}
            <motion.div
              style={{ marginBottom:32 }}
              initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.4, duration:0.6, ease: ease.out }}
            >
              <h2 style={{
                fontFamily:'Cormorant Garamond, Georgia, serif',
                fontSize:'2rem', fontWeight:400, fontStyle:'italic',
                color:'#3D1A14', marginBottom:8, letterSpacing:'-0.01em'
              }}>Sign in</h2>
              <p style={{ fontSize:'0.82rem', color:'#9A6E6A', lineHeight:1.65 }}>
                New user? We'll walk you through setting up your brand in 2 minutes.
              </p>
            </motion.div>

            {/* Google Button — Magnetic */}
            <motion.div
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.55, duration:0.5, ease: ease.out }}
            >
              <MagneticButton
                onClick={handleLogin}
                strength={0.2}
                style={{
                  display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                  width:'100%', padding:'13px 20px',
                  background:'#fff', border:'1px solid rgba(212,117,107,0.3)',
                  borderRadius:4, cursor:'pointer', fontFamily:'Outfit, sans-serif',
                  fontSize:'0.88rem', fontWeight:500, color:'#3D1A14',
                  boxShadow:'0 2px 10px rgba(212,117,107,0.1)',
                  letterSpacing:'0.02em',
                  transition:'all 0.2s',
                }}
                className="google-login-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ delay:0.7, duration:0.5 }}
            >
              <div style={{ margin:'22px 0', height:1, background:'rgba(212,117,107,0.08)' }} />

              <div style={{ padding:'14px 16px', background:'rgba(212,117,107,0.05)', border:'1px solid rgba(212,117,107,0.12)', borderRadius:8 }}>
                <p style={{ fontSize:'0.76rem', color:'#9A6E6A', lineHeight:1.7 }}>
                  We request access to Google Drive & Sheets to sync your brand data automatically.
                  Your data stays in your own Drive — we never store files.
                </p>
              </div>

              <p style={{ marginTop:18, fontSize:'0.68rem', color:'#C9A8A4', textAlign:'center' }}>
                Works for any fashion brand · Any currency · Any country
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
