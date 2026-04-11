import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { QUICK_ACTIONS } from '../utils/navItems';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, Legend
} from 'recharts';
import {
  Reveal, StaggerContainer, StaggerItem, SplitText,
  MagneticButton, TiltCard, GlowCard, AnimatedCounter, ease,
} from '../components/Motion';

const getHour = () => new Date().getHours();
const greeting = () => getHour() < 12 ? 'Good morning' : getHour() < 17 ? 'Good afternoon' : 'Good evening';

/* Custom rose-themed recharts tooltip */
const RoseTooltip = ({ active, payload, label, formatCurrency }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity:0, y:6, scale:0.96 }}
        animate={{ opacity:1, y:0, scale:1 }}
        style={{
          background:'#fff', border:'1px solid rgba(212,117,107,0.2)',
          borderRadius:10, padding:'10px 14px',
          boxShadow:'0 8px 24px rgba(212,117,107,0.16)',
          fontFamily:'Outfit, sans-serif',
        }}
      >
        <div style={{ fontSize:'0.68rem', color:'var(--text-muted)', marginBottom:4, letterSpacing:'0.08em', textTransform:'uppercase' }}>{label}</div>
        <div style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-primary)' }}>
          {formatCurrency ? formatCurrency(payload[0].value) : payload[0].value?.toLocaleString()}
        </div>
      </motion.div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { user, formatCurrency } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const brand = user?.brand || {};

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, orders, customers, financial, suppliers] = await Promise.all([
          api.get('/products/stats/summary').catch(() => ({ data: {} })),
          api.get('/orders/stats/summary').catch(() => ({ data: {} })),
          api.get('/customers/stats/summary').catch(() => ({ data: {} })),
          api.get('/financial/stats/summary').catch(() => ({ data: {} })),
          api.get('/suppliers/stats/summary').catch(() => ({ data: {} })),
        ]);
        setStats({
          products: products.data, orders: orders.data,
          customers: customers.data, financial: financial.data, suppliers: suppliers.data
        });
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const sparkData = [
    { m:'Jan', v:320000 }, { m:'Feb', v:290000 }, { m:'Mar', v:480000 },
    { m:'Apr', v:410000 }, { m:'May', v:560000 }, { m:'Jun', v:500000 },
    { m:'Jul', v:680000 },
  ];

  const today = new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

  const modules = [
    { num:'01 · Orders', title:'Order Pipeline', desc:'13 statuses, channels, priority flags', sub: stats?.orders?.pending > 0 ? `${stats.orders.pending} pending` : null, to:'/orders' },
    { num:'02 · Inventory', title:'Products', desc:`${stats?.products?.total || 0} items · ${stats?.products?.categories || 0} categories`, sub: stats?.products?.lowStock > 0 ? `${stats.products.lowStock} low stock` : null, to:'/products' },
    { num:'03 · CRM', title:'Customers', desc:'VIP · Loyal · At-Risk segments', sub:`${stats?.customers?.total || 0} clients`, to:'/customers' },
    { num:'04 · Finance', title:'Financial', desc:'Multi-method payments', sub:`${formatCurrency(stats?.financial?.pendingRevenue || 0)} pending`, to:'/financial' },
    { num:'05 · Returns', title:'Returns', desc:'Full lifecycle tracking', to:'/returns' },
    { num:'06 · Suppliers', title:'Supply Chain', desc:`${stats?.suppliers?.active || 0} active vendors`, to:'/suppliers' },
  ];

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-inner">
          <div>
            <Reveal delay={0.05} direction="none">
              <div style={{ fontSize:'0.62rem', color:'var(--rose-muted)', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:5, fontWeight:700 }}>
                {greeting()}, {user?.name?.split(' ')[0]}
              </div>
            </Reveal>

            <SplitText
              text={brand.name || 'Dashboard'}
              tag="h1"
              style={{
                fontFamily:'Cormorant Garamond, Georgia, serif',
                fontSize:'2.2rem', fontWeight:400, fontStyle:'italic',
                color:'var(--text-primary)', lineHeight:1.1,
              }}
              delay={0.1}
              stagger={0.05}
            />

            <Reveal delay={0.3} direction="up">
              <p className="page-subtitle">
                {brand.category && (
                  <span style={{ background:'var(--rose-soft)', color:'var(--rose)', padding:'2px 8px', borderRadius:20, fontSize:'0.62rem', fontWeight:700, marginRight:8, border:'1px solid var(--rose-border)' }}>
                    {brand.category}
                  </span>
                )}
                Your brand is performing beautifully — {today}
                {user?.storageType === 'google_drive' && user?.driveConnected && (
                  <>
                    <motion.span
                      className="sync-dot rose"
                      style={{ marginLeft:10 }}
                      animate={{ scale:[1,1.6,1], opacity:[1,0.4,1] }}
                      transition={{ duration:2, repeat:Infinity }}
                    />
                    Google Sheets syncing
                  </>
                )}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.35} direction="left">
            <div style={{ display:'flex', gap:10 }}>
              <MagneticButton className="btn btn-primary" onClick={() => navigate('/orders')}>
                + New Order
              </MagneticButton>
              <MagneticButton className="btn btn-secondary" onClick={() => navigate('/products')}>
                Add Product
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="page-body">

        {/* Drive banner */}
        {user?.storageType === 'google_drive' && !user?.driveConnected && (
          <Reveal delay={0.1}>
            <div className="drive-banner">
              <span className="drive-banner-icon">⤴</span>
              <div className="drive-banner-text">
                <h4>Connect Google Drive to enable live sync</h4>
                <p>Every entry will sync instantly to your Google Sheets.</p>
              </div>
              <MagneticButton className="btn btn-primary btn-sm" onClick={() => navigate('/drive-setup')}>
                Setup Now
              </MagneticButton>
            </div>
          </Reveal>
        )}

        {loading ? (
          <div className="page-loader">
            <motion.div
              style={{ width:32, height:32, borderRadius:'50%', border:'2px solid rgba(212,117,107,0.2)', borderTop:'2px solid var(--rose)' }}
              animate={{ rotate:360 }}
              transition={{ duration:0.8, repeat:Infinity, ease:'linear' }}
            />
          </div>
        ) : (
          <>
            {/* ── STAT CARDS with counting numbers ── */}
            <StaggerContainer staggerDelay={0.07} delayStart={0.05} style={{ marginBottom:28 }}>
              <div className="stats-grid">
                {[
                  { label:'Revenue', value: stats?.financial?.completedRevenue || 0, prefix:'', isCurrency:true, sub:'↑ 18% vs last month', subColor:'var(--emerald)' },
                  { label:'Orders', value: stats?.orders?.total || 0, sub: stats?.orders?.pending > 0 ? `${stats.orders.pending} pending →` : '↑ 12% this month', subColor:'var(--rose)' },
                  { label:'Customers', value: stats?.customers?.total || 0, sub: stats?.customers?.thisMonth > 0 ? `↑ ${stats.customers.thisMonth} new this month` : 'Growing steadily', subColor:'var(--emerald)' },
                  { label:'Returns', value: stats?.orders?.returned || 0, sub:'↓ 2% rate', subColor:'var(--amber)', valueColor:'var(--rose)' },
                ].map((s, i) => (
                  <StaggerItem key={i}>
                    <GlowCard className="stat-card" onClick={() => {}}>
                      <div className="stat-label">{s.label}</div>
                      <div className="stat-value" style={{ color: s.valueColor || 'var(--text-primary)', fontSize: s.isCurrency ? '1.4rem' : undefined }}>
                        {s.isCurrency
                          ? formatCurrency(s.value)
                          : <AnimatedCounter value={s.value} delay={0.3 + i * 0.1} />
                        }
                      </div>
                      {s.sub && <div className="stat-change" style={{ color:s.subColor }}>{s.sub}</div>}
                    </GlowCard>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

            {/* ── TWO-COLUMN BODY ── */}
            <div style={{ display:'grid', gridTemplateColumns:'1.55fr 1fr', gap:20, marginBottom:28 }}>

              {/* Module TiltCards 2×3 grid */}
              <StaggerContainer staggerDelay={0.06} delayStart={0.1}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  {modules.map((mod, i) => (
                    <StaggerItem key={i} direction="up">
                      <TiltCard
                        onClick={() => navigate(mod.to)}
                        style={{
                          background:'#fff', border:'1px solid var(--border-faint)',
                          borderRadius:12, padding:'18px',
                          boxShadow:'var(--shadow-sm)', cursor:'pointer',
                          position:'relative', overflow:'hidden',
                        }}
                      >
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                          <div style={{ fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(212,117,107,0.5)' }}>
                            {mod.num}
                          </div>
                          <motion.div
                            style={{ width:6, height:6, borderRadius:'50%', background:'rgba(212,117,107,0.25)' }}
                            whileHover={{ background:'var(--rose)', boxShadow:'0 0 8px var(--rose-glow)' }}
                          />
                        </div>
                        <div style={{ fontSize:'0.95rem', fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>{mod.title}</div>
                        <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', lineHeight:1.4 }}>{mod.desc}</div>
                        {mod.sub && (
                          <div style={{ marginTop:10, fontSize:'0.7rem', fontWeight:600, color:'var(--rose)' }}>{mod.sub}</div>
                        )}
                      </TiltCard>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>

              {/* Right column: mini panels */}
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {[
                  { label:'Delivery Rate', value:'94%', fill:0.94, color:'var(--rose)', fillClass:'', extra:'Excellent · 94 / 100 orders', delay:0.6 },
                  { label:'Inventory Value', value: formatCurrency(stats?.products?.totalValue || 0), fill:0.72, color:'var(--amber)', fillClass:'amber', extra:`Well stocked · ${stats?.products?.categories || 0} categories`, delay:0.7 },
                  { label:'Launch Checklist', value:'78% done', fill:0.78, color:'var(--sky)', fillClass:'sky', extra:'7 / 10 phases', delay:0.8, to:'/checklist' },
                  { label:'Active Suppliers', value:`${stats?.suppliers?.active || 0} partners`, fill: (stats?.suppliers?.active || 0) / Math.max(stats?.suppliers?.total || 1, 1), color:'var(--rose)', fillClass:'', extra:`${stats?.suppliers?.total || 0} total vendors`, delay:0.9, to:'/suppliers' },
                ].map((item, i) => (
                  <Reveal key={i} delay={item.delay} direction="left">
                    <GlowCard
                      className="card"
                      style={{ padding:'16px 18px' }}
                      onClick={item.to ? () => navigate(item.to) : undefined}
                    >
                      <div style={{ fontSize:'0.58rem', color:'var(--rose-muted)', textTransform:'uppercase', letterSpacing:'0.16em', fontWeight:700, marginBottom:8 }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily:'Cormorant Garamond, Georgia, serif', fontSize:'1.6rem', fontWeight:300, color:'var(--text-primary)' }}>
                        {item.value}
                      </div>
                      <div className="progress-bar" style={{ marginTop:10 }}>
                        <motion.div
                          className={`progress-fill ${item.fillClass}`}
                          style={{ height:'100%', background:item.color, borderRadius:4 }}
                          initial={{ scaleX:0 }}
                          animate={{ scaleX: item.fill }}
                          transition={{ duration:1.2, delay: item.delay + 0.3, ease: ease.out }}
                        />
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', marginTop:5, fontSize:'0.65rem', color:'var(--text-muted)' }}>
                        <span>{item.extra}</span>
                      </div>
                    </GlowCard>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* ── CHARTS ROW ── */}
            <StaggerContainer staggerDelay={0.1} delayStart={0.05}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(340px, 1fr))', gap:20, marginBottom:28 }}>

                {/* Revenue Area Chart */}
                <StaggerItem direction="up">
                  <div className="card" style={{ padding:'20px 20px 10px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:18 }}>
                      <motion.div
                        style={{ width:4, height:18, background:'var(--rose)', borderRadius:4 }}
                        animate={{ opacity:[0.5,1,0.5] }}
                        transition={{ duration:3, repeat:Infinity }}
                      />
                      <div className="card-title" style={{ margin:0 }}>Revenue trajectory</div>
                    </div>
                    <div style={{ height:220 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sparkData}>
                          <defs>
                            <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#D4756B" stopOpacity={0.16}/>
                              <stop offset="95%" stopColor="#D4756B" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(212,117,107,0.08)" />
                          <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill:'#C9A8A4', fontSize:11 }} />
                          <Tooltip content={<RoseTooltip formatCurrency={formatCurrency} />} />
                          <Area type="monotone" dataKey="v" stroke="#D4756B" strokeWidth={2.5} fill="url(#roseGrad)" isAnimationActive animationDuration={1600} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </StaggerItem>

                {/* Payment Methods */}
                {stats?.financial?.byMethod?.length > 0 && (
                  <StaggerItem direction="up">
                    <div className="card" style={{ padding:'20px 20px 10px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:18 }}>
                        <motion.div style={{ width:4, height:18, background:'var(--emerald)', borderRadius:4 }} animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:3, repeat:Infinity, delay:1 }} />
                        <div className="card-title" style={{ margin:0 }}>Payment methods</div>
                      </div>
                      <div style={{ height:220 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={stats.financial.byMethod}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(212,117,107,0.08)" />
                            <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill:'#C9A8A4', fontSize:11 }} />
                            <Tooltip content={<RoseTooltip formatCurrency={formatCurrency} />} cursor={{ fill:'rgba(212,117,107,0.04)' }} />
                            <Bar dataKey="total" fill="#D4756B" radius={[4,4,0,0]} barSize={26} isAnimationActive animationDuration={1400} animationBegin={300} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </StaggerItem>
                )}

                {/* Order Status Donut */}
                {stats?.orders?.total > 0 && (
                  <StaggerItem direction="up">
                    <div className="card" style={{ padding:'20px 20px 10px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:18 }}>
                        <motion.div style={{ width:4, height:18, background:'var(--sky)', borderRadius:4 }} animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:3, repeat:Infinity, delay:2 }} />
                        <div className="card-title" style={{ margin:0 }}>Order completion</div>
                      </div>
                      <div style={{ height:220 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name:'Pending', value: stats.orders.pending || 0, color:'#E8A89A' },
                                { name:'Delivered', value: stats.orders.delivered || 0, color:'#4A8C68' },
                                { name:'Other', value: Math.max(0, stats.orders.total - ((stats.orders.pending||0) + (stats.orders.delivered||0))), color:'#C9A0A0' }
                              ].filter(d => d.value > 0)}
                              cx="50%" cy="50%" innerRadius={60} outerRadius={82}
                              paddingAngle={5} dataKey="value" stroke="none"
                              isAnimationActive animationDuration={1500} animationBegin={800}
                            >
                              {['#E8A89A','#4A8C68','#C9A0A0'].map((c, i) => <Cell key={i} fill={c} />)}
                            </Pie>
                            <Tooltip content={<RoseTooltip />} />
                            <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize:'0.72rem', fontFamily:'Outfit', color:'var(--text-muted)' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </StaggerItem>
                )}
              </div>
            </StaggerContainer>

            {/* ── QUICK ACTIONS ── */}
            <Reveal delay={0.05}>
              <div className="section-label">Quick Actions</div>
            </Reveal>
            <StaggerContainer staggerDelay={0.05} delayStart={0.05}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:10, marginBottom:32 }}>
                {QUICK_ACTIONS.map((a, i) => (
                  <StaggerItem key={a.label} direction="up">
                    <MagneticButton
                      onClick={() => navigate(a.to)}
                      strength={0.25}
                      style={{
                        background:'#fff', border:'1px solid var(--border-faint)',
                        borderRadius:10, padding:'16px', textAlign:'left',
                        transition:'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                        display:'flex', flexDirection:'column', gap:6,
                        width:'100%', fontFamily:'Outfit, sans-serif',
                        cursor:'pointer',
                      }}
                      className="quick-action-btn"
                    >
                      <span style={{ fontSize:'1.2rem', color:'var(--rose)' }}>{a.icon}</span>
                      <div style={{ fontSize:'0.88rem', fontWeight:600, color:'var(--text-primary)' }}>{a.label}</div>
                      <div style={{ fontSize:'0.7rem', color:'var(--text-muted)' }}>{a.desc}</div>
                    </MagneticButton>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

          </>
        )}
      </div>
    </div>
  );
}
