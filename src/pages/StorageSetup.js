import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '../components/Motion';

const STEPS = {
  CHOOSE: 'choose',
  SETTING_UP: 'setting_up',
  DONE: 'done',
};

export default function StorageSetup() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.CHOOSE);
  const [chosen, setChosen] = useState(null);
  const [folderPath, setFolderPath] = useState('');
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState('');

  const brandName = user?.brand?.name || 'Your Brand';

  /* ── Choose Google Drive ── */
  const handleGoogleDrive = async () => {
    setChosen('google_drive');
    setStep(STEPS.SETTING_UP);
    setProgressMsg('Saving your preference…');
    setProgress(30);
    try {
      await api.post('/storage/choose', { type: 'google_drive' });
      setProgress(80);
      setProgressMsg('Almost there…');
      await refreshUser();
      setProgress(100);
      setProgressMsg('Done! Redirecting to Drive setup…');
      setTimeout(() => navigate('/drive-setup'), 1000);
    } catch {
      toast.error('Failed to save preference. Please try again.');
      setStep(STEPS.CHOOSE);
    }
  };

  /* ── Choose Local Excel ── */
  const handleLocalExcel = async () => {
    setChosen('local_excel');
    setStep(STEPS.SETTING_UP);
    setProgress(10);
    setProgressMsg('Creating your LibasTrack folder…');

    try {
      // Step 1: Create folder + xlsx files
      await new Promise(r => setTimeout(r, 400));
      setProgress(30);
      setProgressMsg('Setting up Products.xlsx…');

      const res = await api.post('/storage/setup-local');
      setFolderPath(res.data.folderPath);

      setProgress(65);
      setProgressMsg('Creating Orders, Customers sheets…');
      await new Promise(r => setTimeout(r, 500));

      setProgress(82);
      setProgressMsg('Syncing existing data to Excel…');

      // Step 2: Sync current data
      await api.post('/storage/sync-excel').catch(() => {}); // Non-fatal

      setProgress(95);
      setProgressMsg('Finalizing…');
      await new Promise(r => setTimeout(r, 400));

      await refreshUser();
      setProgress(100);
      setStep(STEPS.DONE);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Setup failed. Please try again.');
      setStep(STEPS.CHOOSE);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-base)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '32px 16px',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Ambient orbs */}
      <motion.div style={{ position:'fixed', top:'-10%', left:'-5%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(212,117,107,0.1) 0%, transparent 70%)', filter:'blur(40px)', pointerEvents:'none' }}
        animate={{ x:[0,25,0], y:[0,20,0] }} transition={{ duration:14, repeat:Infinity, ease:'easeInOut' }} />
      <motion.div style={{ position:'fixed', bottom:'5%', right:'-5%', width:340, height:340, borderRadius:'50%', background:'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)', filter:'blur(35px)', pointerEvents:'none' }}
        animate={{ x:[0,-20,0], y:[0,-15,0] }} transition={{ duration:18, repeat:Infinity, ease:'easeInOut', delay:4 }} />

      {/* Top stripe */}
      <div style={{ position:'fixed', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#D4756B,#E8A89A,#F2C5BF,#C9A96E,#E8A89A,#D4756B)', backgroundSize:'300%', animation:'roseSweep 5s linear infinite', zIndex:10 }} />

      <AnimatePresence mode="wait">

        {/* ── STEP 1: CHOOSE ── */}
        {step === STEPS.CHOOSE && (
          <motion.div
            key="choose"
            initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }}
            transition={{ duration:0.5, ease: ease.out }}
            style={{ width:'100%', maxWidth:680, position:'relative', zIndex:1 }}
          >
            {/* Logo */}
            <motion.div
              style={{ display:'flex', alignItems:'center', gap:12, justifyContent:'center', marginBottom:36 }}
              initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.5 }}
            >
              <motion.div
                style={{ width:40, height:40, borderRadius:'50%', background:'var(--rose)', display:'flex', alignItems:'center', justifyContent:'center' }}
                animate={{ scale:[1,1.06,1], boxShadow:['0 0 0 0 rgba(212,117,107,0.4)','0 0 0 12px rgba(212,117,107,0)','0 0 0 0 rgba(212,117,107,0.4)'] }}
                transition={{ duration:3.5, repeat:Infinity }}
              >
                <svg width="19" height="19" viewBox="0 0 16 16" fill="none"><path d="M2 13L5 3h1.5L8 9l1.5-6H11l3 10h-1.8l-2-7-1.7 7H7.5L5.8 6l-2 7H2z" fill="white"/></svg>
              </motion.div>
              <div>
                <div style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:'1.3rem', fontStyle:'italic', fontWeight:500, color:'var(--text-primary)' }}>LibasTrack</div>
                <div style={{ fontSize:'0.55rem', color:'var(--rose)', letterSpacing:'0.2em', textTransform:'uppercase' }}>Rose Edition</div>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              style={{ textAlign:'center', marginBottom:40 }}
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.5 }}
            >
              <h1 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:'2.4rem', fontWeight:400, fontStyle:'italic', color:'var(--text-primary)', marginBottom:10, lineHeight:1.1 }}>
                Where should we store<br/>
                <em style={{ color:'var(--rose)' }}>{brandName}&apos;s</em> data?
              </h1>
              <p style={{ color:'var(--text-muted)', fontSize:'0.88rem', maxWidth:460, margin:'0 auto' }}>
                Choose how and where LibasTrack saves your orders, products, and customer data.
                You can always change this later in settings.
              </p>
            </motion.div>

            {/* Two option cards */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>

              {/* ── Google Drive card ── */}
              <motion.div
                initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.5, ease: ease.out }}
              >
                <motion.button
                  onClick={handleGoogleDrive}
                  whileHover={{ y:-6, boxShadow:'0 20px 48px rgba(212,117,107,0.2)' }}
                  whileTap={{ scale:0.98 }}
                  style={{
                    width:'100%', background:'var(--bg-layer1)', border:'1px solid var(--border-subtle)',
                    borderRadius:16, padding:'32px 24px', cursor:'pointer',
                    textAlign:'left', transition:'border-color 0.2s',
                    position:'relative', overflow:'hidden', boxShadow:'var(--shadow-md)',
                    fontFamily:'Outfit, sans-serif',
                  }}
                  className="storage-card-btn"
                >
                  {/* Gradient top border */}
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg, #4285F4, #34A853, #FBBC05, #EA4335)', borderRadius:'16px 16px 0 0' }} />

                  {/* Google icon */}
                  <div style={{ width:52, height:52, borderRadius:12, background:'rgba(66,133,244,0.08)', border:'1px solid rgba(66,133,244,0.15)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                    <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>

                  <div style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:'1.4rem', fontStyle:'italic', color:'var(--text-primary)', marginBottom:8 }}>Google Drive</div>

                  <div style={{ fontSize:'0.8rem', color:'var(--text-muted)', lineHeight:1.7, marginBottom:20 }}>
                    Sync all data live to Google Sheets. Access from any device — phone, laptop, tablet.
                  </div>

                  {/* Feature list */}
                  <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                    {[
                      ['🌐', 'Access from any device'],
                      ['🔄', 'Real-time cloud sync'],
                      ['📊', 'Google Sheets integration'],
                      ['📱', 'Works on mobile'],
                    ].map(([icon, text]) => (
                      <div key={text} style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.75rem', color:'var(--text-secondary)' }}>
                        <span style={{ width:22, height:22, borderRadius:6, background:'rgba(66,133,244,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', flexShrink:0 }}>{icon}</span>
                        {text}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop:24, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontSize:'0.68rem', color:'var(--text-faint)', letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:700 }}>Cloud storage</span>
                    <span style={{ fontSize:'0.9rem', color:'#4285F4' }}>→</span>
                  </div>
                </motion.button>
              </motion.div>

              {/* ── Local Excel card ── */}
              <motion.div
                initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.38, duration:0.5, ease: ease.out }}
              >
                <motion.button
                  onClick={handleLocalExcel}
                  whileHover={{ y:-6, boxShadow:'0 20px 48px rgba(212,117,107,0.2)' }}
                  whileTap={{ scale:0.98 }}
                  style={{
                    width:'100%', background:'var(--bg-layer1)', border:'1px solid var(--border-subtle)',
                    borderRadius:16, padding:'32px 24px', cursor:'pointer',
                    textAlign:'left', transition:'border-color 0.2s',
                    position:'relative', overflow:'hidden', boxShadow:'var(--shadow-md)',
                    fontFamily:'Outfit, sans-serif',
                  }}
                  className="storage-card-btn"
                >
                  {/* Rose gradient top border */}
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#D4756B,#E8A89A,#F2C5BF,#D4756B)', borderRadius:'16px 16px 0 0' }} />

                  {/* Excel icon */}
                  <div style={{ width:52, height:52, borderRadius:12, background:'var(--rose-soft)', border:'1px solid var(--rose-border)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                    <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
                      <rect x="2" y="3" width="20" height="18" rx="2" fill="var(--rose-soft)" stroke="var(--rose)" strokeWidth="1.5"/>
                      <path d="M7 8l3.5 4L7 16M12 8h5M12 12h4M12 16h3" stroke="var(--rose)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>

                  <div style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:'1.4rem', fontStyle:'italic', color:'var(--text-primary)', marginBottom:8 }}>Local Excel</div>

                  <div style={{ fontSize:'0.8rem', color:'var(--text-muted)', lineHeight:1.7, marginBottom:20 }}>
                    Store everything on this PC. Your data stays private — no cloud, no internet needed after login.
                  </div>

                  {/* Feature list */}
                  {[
                    ['💻', 'Saved on your PC'],
                    ['📁', 'Beautiful Excel workbooks'],
                    ['🔒', 'Fully private & offline'],
                    ['🖼️', 'Images saved locally'],
                  ].map(([icon, text]) => (
                    <div key={text} style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.75rem', color:'var(--text-secondary)', marginBottom:7 }}>
                      <span style={{ width:22, height:22, borderRadius:6, background:'var(--rose-soft)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', flexShrink:0 }}>{icon}</span>
                      {text}
                    </div>
                  ))}

                  <div style={{ marginTop:24, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontSize:'0.68rem', color:'var(--text-faint)', letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:700 }}>Local storage</span>
                    <span style={{ fontSize:'0.9rem', color:'var(--rose)' }}>→</span>
                  </div>
                </motion.button>
              </motion.div>
            </div>

            {/* Footer note */}
            <motion.p
              style={{ textAlign:'center', marginTop:24, fontSize:'0.72rem', color:'var(--text-faint)' }}
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
            >
              Google login is required for authentication regardless of storage choice.
            </motion.p>
          </motion.div>
        )}

        {/* ── STEP 2: SETTING UP ── */}
        {step === STEPS.SETTING_UP && (
          <motion.div
            key="setup"
            initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.4, ease: ease.out }}
            style={{ textAlign:'center', maxWidth:440, position:'relative', zIndex:1 }}
          >
            {/* Animated ring */}
            <div style={{ position:'relative', width:100, height:100, margin:'0 auto 32px' }}>
              <motion.div
                style={{ position:'absolute', inset:0, borderRadius:'50%', border:'3px solid var(--rose-soft)' }}
              />
              <motion.div
                style={{ position:'absolute', inset:0, borderRadius:'50%', border:'3px solid transparent', borderTopColor:'var(--rose)' }}
                animate={{ rotate:360 }}
                transition={{ duration:1, repeat:Infinity, ease:'linear' }}
              />
              {/* Icon inside */}
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem' }}>
                {chosen === 'local_excel' ? '📁' : '🌐'}
              </div>
            </div>

            <h2 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:'1.8rem', fontStyle:'italic', color:'var(--text-primary)', marginBottom:12 }}>
              {chosen === 'local_excel' ? 'Creating your workspace…' : 'Connecting to Google…'}
            </h2>

            <p style={{ color:'var(--text-muted)', fontSize:'0.85rem', marginBottom:28 }}>
              {progressMsg}
            </p>

            {/* Progress bar */}
            <div style={{ background:'var(--bg-layer3)', borderRadius:999, height:6, overflow:'hidden', maxWidth:320, margin:'0 auto' }}>
              <motion.div
                style={{ height:'100%', background:'linear-gradient(90deg, var(--rose), var(--rose-muted))', borderRadius:999 }}
                animate={{ width:`${progress}%` }}
                transition={{ duration:0.6, ease:'easeOut' }}
              />
            </div>
            <div style={{ fontSize:'0.72rem', color:'var(--text-faint)', marginTop:10 }}>{progress}%</div>

            {chosen === 'local_excel' && (
              <motion.div
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
                style={{ marginTop:24, padding:'12px 16px', background:'var(--rose-soft)', border:'1px solid var(--rose-border)', borderRadius:10, fontSize:'0.78rem', color:'var(--text-secondary)', textAlign:'left' }}
              >
                <div style={{ fontWeight:700, color:'var(--rose)', marginBottom:6 }}>📂 Creating files:</div>
                {['Products.xlsx', 'Orders.xlsx', 'Customers.xlsx', 'Financial.xlsx', 'Suppliers.xlsx', 'Returns.xlsx', 'Images/'].map((f, i) => (
                  <motion.div
                    key={f} initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
                    transition={{ delay: 0.9 + i * 0.12 }}
                    style={{ padding:'1px 0', color:'var(--text-muted)', fontSize:'0.74rem' }}
                  >
                    ✓ {f}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── STEP 3: DONE (Local Excel only) ── */}
        {step === STEPS.DONE && (
          <motion.div
            key="done"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease: ease.out }}
            style={{ textAlign:'center', maxWidth:500, position:'relative', zIndex:1 }}
          >
            {/* Success animation */}
            <motion.div
              initial={{ scale:0 }} animate={{ scale:1 }}
              transition={{ type:'spring', stiffness:300, damping:18, delay:0.1 }}
              style={{ width:88, height:88, borderRadius:'50%', background:'var(--rose-soft)', border:'2px solid var(--rose-border-mid)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 28px', fontSize:'2.2rem' }}
            >
              🌹
            </motion.div>

            <motion.h2
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25 }}
              style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:'2rem', fontStyle:'italic', color:'var(--text-primary)', marginBottom:12 }}
            >
              Your workspace is ready
            </motion.h2>

            <motion.p
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.38 }}
              style={{ color:'var(--text-muted)', fontSize:'0.88rem', marginBottom:24, lineHeight:1.7 }}
            >
              LibasTrack has created your personal Excel workspace on this PC.
              All your data will be saved there automatically.
            </motion.p>

            {/* Folder path box */}
            {folderPath && (
              <motion.div
                initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.48 }}
                style={{ background:'var(--bg-layer2)', border:'1px solid var(--border-subtle)', borderRadius:10, padding:'14px 18px', marginBottom:24, textAlign:'left' }}
              >
                <div style={{ fontSize:'0.6rem', color:'var(--rose)', textTransform:'uppercase', letterSpacing:'0.15em', fontWeight:700, marginBottom:6 }}>📂 Your Folder</div>
                <div style={{ fontFamily:'monospace', fontSize:'0.8rem', color:'var(--text-primary)', wordBreak:'break-all', letterSpacing:'0.02em' }}>{folderPath}</div>
              </motion.div>
            )}

            {/* Files created */}
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55 }}
              style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:28 }}
            >
              {[
                { icon:'📦', label:'Products.xlsx' },
                { icon:'📋', label:'Orders.xlsx' },
                { icon:'👤', label:'Customers.xlsx' },
                { icon:'💰', label:'Financial.xlsx' },
                { icon:'🏭', label:'Suppliers.xlsx' },
                { icon:'↩️', label:'Returns.xlsx' },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                  transition={{ delay:0.6 + i * 0.06, type:'spring', stiffness:260, damping:18 }}
                  style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 12px', background:'var(--bg-layer1)', border:'1px solid var(--border-faint)', borderRadius:8, fontSize:'0.75rem', color:'var(--text-secondary)' }}
                >
                  <span style={{ fontSize:'1rem' }}>{f.icon}</span>
                  {f.label}
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.75 }}
              onClick={() => navigate('/dashboard')}
              whileHover={{ y:-3, boxShadow:'0 12px 32px rgba(212,117,107,0.28)' }}
              whileTap={{ scale:0.98 }}
              style={{ background:'var(--rose)', color:'white', border:'none', borderRadius:6, padding:'13px 40px', fontSize:'0.88rem', fontWeight:600, fontFamily:'Outfit,sans-serif', letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', boxShadow:'0 4px 20px rgba(212,117,107,0.3)' }}
            >
              Open Dashboard →
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>

      <style>{`
        @keyframes roseSweep { 0%{background-position:0%} 100%{background-position:300%} }
        .storage-card-btn:hover { border-color: var(--rose-border-mid) !important; }
      `}</style>
    </div>
  );
}
