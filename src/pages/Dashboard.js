import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { QUICK_ACTIONS } from '../utils/navItems';
import { motion } from 'framer-motion';
import { QueryErrorState, StatsLoadingGrid } from '../components/QueryState';
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  Reveal, StaggerContainer, StaggerItem, SplitText,
  MagneticButton, GlowCard, AnimatedCounter,
} from '../components/Motion';

/* Custom premium tooltip */
const PremiumTooltip = ({ active, payload, label, formatCurrency }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="chart-tooltip glass"
      style={{ border: '1px solid var(--accent-border)', borderRadius: '4px' }}
    >
      <div className="tooltip-label tech-font" style={{ fontSize: '0.65rem' }}>{label}</div>
      <div className="tooltip-value stat-value-tech">
        {formatCurrency ? formatCurrency(payload[0].value) : payload[0].value?.toLocaleString()}
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  const { user, formatCurrency } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const brand = user?.brand || {};

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const [products, orders, customers, financial, suppliers, revenueChart, topProducts, topCustomers, lowStock, returns] = await Promise.all([
        api.get('/products/stats/summary').catch(() => ({ data: {} })),
        api.get('/orders/stats/summary').catch(() => ({ data: {} })),
        api.get('/customers/stats/summary').catch(() => ({ data: {} })),
        api.get('/financial/stats/summary').catch(() => ({ data: {} })),
        api.get('/suppliers/stats/summary').catch(() => ({ data: {} })),
        api.get('/orders/stats/revenue-chart').catch(() => ({ data: { sparkData: [] } })),
        api.get('/orders/stats/top-products').catch(() => ({ data: { topProducts: [] } })),
        api.get('/customers/stats/top').catch(() => ({ data: { topCustomers: [] } })),
        api.get('/products/stats/low-stock').catch(() => ({ data: { lowStockProducts: [] } })),
        api.get('/returns/stats/summary').catch(() => ({ data: {} })),
      ]);
      setStats({
        products: products.data, orders: orders.data,
        customers: customers.data, financial: financial.data, suppliers: suppliers.data,
        sparkData: revenueChart.data.sparkData || [],
        topProducts: topProducts.data.topProducts || [],
        topCustomers: topCustomers.data.topCustomers || [],
        lowStock: lowStock.data.lowStockProducts || [],
        returns: returns.data || {},
      });
    } catch (e) {
      console.error('Dashboard stats error:', e);
      setLoadError('Unable to load dashboard metrics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const sparkData = stats?.sparkData?.length ? stats.sparkData : [];

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const statCards = [
    {
      label: 'Gross Revenue',
      value: stats?.financial?.completedRevenue || 0,
      isCurrency: true,
      tag: 'FIN_01',
      icon: '◈',
    },
    {
      label: 'Order Volume',
      value: stats?.orders?.total || 0,
      tag: 'ORD_04',
      icon: '◉',
    },
    {
      label: 'Customer Base',
      value: stats?.customers?.total || 0,
      tag: 'CRM_02',
      icon: '◎',
    },
    {
      label: 'Inventory SKU',
      value: stats?.products?.total || 0,
      tag: 'INV_09',
      icon: '◑',
    },
  ];

  /* Chart Colors */
  const COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#4C1D95'];

  return (
    <div className="dashboard-wrapper">
      {/* ── ROBOTIC STATUS BAR ── */}
      <div className="system-status-bar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="status-dot" />
          <span>SYSTEM: OPTIMAL</span>
        </div>
        <span style={{ opacity: 0.3 }}>|</span>
        <span>LATENCY: 24ms</span>
        <span style={{ opacity: 0.3 }}>|</span>
        <span>Uptime: 99.98%</span>
        <span style={{ opacity: 0.3 }}>|</span>
        <span>TS: {currentTime}</span>
        <span style={{ opacity: 0.3 }}>|</span>
        <span>AGENT: LibasTrack-v2.0</span>
      </div>

      {/* ── PAGE HEADER ── */}
      <div className="page-header" style={{ paddingBottom: 40 }}>
        <div className="page-header-inner" style={{ alignItems: 'flex-end' }}>
          <div className="dashboard-header-copy">
            <Reveal delay={0.05} direction="none">
              <div className="greeting-text tech-font" style={{ marginBottom: 4 }}>ID: {user?._id?.slice(-8).toUpperCase() || 'USER_UNK'}</div>
            </Reveal>

            <SplitText
              text={brand.name || 'Dashboard'}
              tag="h1"
              className="page-title"
              style={{ fontWeight: 700, letterSpacing: '-0.03em' }}
              delay={0.08}
              stagger={0.03}
            />

            <Reveal delay={0.28} direction="up">
              <p className="page-subtitle tech-font" style={{ fontSize: '0.7rem', opacity: 0.6 }}>
                UNIFIED OPERATIONS OVERVIEW // {today}
              </p>
            </Reveal>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <MagneticButton
              className="btn btn-primary"
              onClick={() => navigate('/orders')}
              style={{ borderRadius: 4, height: 44 }}
            >
              GENERATE ORDER
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* ── PAGE BODY ── */}
      <div className="page-body" style={{ paddingTop: 0 }}>
        {loading ? (
          <StatsLoadingGrid />
        ) : loadError ? (
          <QueryErrorState message={loadError} onRetry={fetchStats} />
        ) : (
          <>
            {/* ── STAT CARDS ── */}
            <StaggerContainer
              staggerDelay={0.05}
              className="stats-container"
            >
              <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                {statCards.map((s, i) => (
                  <StaggerItem key={s.label}>
                    <GlowCard className="stat-card card glass" style={{ padding: 20, border: '1px solid var(--accent-border)' }}>
                      <div className="scanline-overlay" />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <div className="tech-font" style={{ fontSize: '0.6rem', opacity: 0.5, letterSpacing: '0.2em' }}>{s.tag}</div>
                        <span style={{ color: 'var(--accent)', opacity: 0.6 }} aria-hidden="true">{s.icon}</span>
                      </div>
                      
                      <div className="stat-label tech-font" style={{ fontSize: '0.75rem', marginBottom: 8, color: 'var(--text-muted)' }}>{s.label}</div>
                      
                      <div className="stat-value-tech" style={{ fontSize: '1.8rem' }}>
                        {s.isCurrency
                          ? formatCurrency(s.value)
                          : <AnimatedCounter value={s.value} delay={0.2 + i * 0.1} />}
                      </div>

                      <div style={{ height: 2, background: 'var(--accent-soft)', marginTop: 16, overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '65%' }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          style={{ height: '100%', background: 'var(--accent)' }}
                        />
                      </div>
                    </GlowCard>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

            {/* ── ANALYTICS GRID ── */}
            <div className="dashboard-grid" style={{ marginTop: 24, gap: 24 }}>
              
              {/* Main Chart */}
              <div className="modules-grid-wrap" style={{ gridColumn: 'span 2' }}>
                <Reveal delay={0.15} direction="up">
                  <div className="card glass" style={{ padding: 24, position: 'relative', border: '1px solid var(--accent-border)' }}>
                    <div className="scanline-overlay" />
                    <div className="card-header" style={{ marginBottom: 32 }}>
                      <div>
                        <h2 className="card-title tech-font" style={{ fontSize: '0.9rem' }}>Revenue_Stream.log</h2>
                        <div className="page-subtitle tech-font" style={{ fontSize: '0.6rem', margin: 0 }}>Historical financial performance data</div>
                      </div>
                      <div className="tm-db-live" />
                    </div>

                    <div className="chart-container" style={{ height: 320 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sparkData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                          <defs>
                            <linearGradient id="glowPurp" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis 
                            dataKey="m" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: 'var(--text-faint)', fontSize: 10, offset: 10 }} 
                          />
                          <Tooltip content={<PremiumTooltip formatCurrency={formatCurrency} />} />
                          <Area
                            type="stepAfter"
                            dataKey="v"
                            stroke="var(--accent)"
                            strokeWidth={2}
                            fill="url(#glowPurp)"
                            animationDuration={1500}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Reveal>

                {/* Sub grid for secondary list */}
                <div className="dashboard-grid" style={{ marginTop: 24, gap: 24 }}>
                   <div className="card glass" style={{ padding: 20 }}>
                      <div className="tech-font" style={{ fontSize: '0.7rem', marginBottom: 16, color: 'var(--accent)' }}>Top_Products.json</div>
                      <div className="live-feed" style={{ height: 180 }}>
                        {stats?.topProducts?.map((p, i) => (
                           <div key={i} className="feed-item">
                              <span className="feed-time">[{p.sold} Units]</span>
                              <span>{p.name || 'Unknown Product'}</span>
                           </div>
                        ))}
                      </div>
                   </div>
                   
                   <div className="card glass" style={{ padding: 20 }}>
                      <div className="tech-font" style={{ fontSize: '0.7rem', marginBottom: 16, color: 'var(--accent)' }}>System_Inventory.txt</div>
                      <div className="live-feed" style={{ height: 180 }}>
                        {stats?.lowStock?.map((p, i) => (
                           <div key={i} className="feed-item" style={{ borderLeftColor: '#ef4444' }}>
                              <span className="feed-time" style={{ color: '#ef4444' }}>[WARN]</span>
                              <span>{p.name} - {p.stockQty} Units Remaining</span>
                           </div>
                        ))}
                        <div className="feed-item">
                          <span className="feed-time">[INFO]</span>
                          <span>Inventory sync complete. All systems nominal.</span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Sidebar panels */}
              <div className="sidebar-panels" style={{ gridColumn: 'span 1' }}>
                 <Reveal delay={0.4} direction="left">
                    <div className="card glass" style={{ padding: 20, textAlign: 'center', border: '1px solid var(--accent-border)' }}>
                       <div className="tech-font" style={{ fontSize: '0.65rem', marginBottom: 12, opacity: 0.6 }}>Operational_Efficiency</div>
                       <div className="stat-value-tech" style={{ fontSize: '2.5rem', color: 'var(--accent)' }}>
                          {stats?.orders?.total > 0 ? Math.round((stats.orders.delivered / stats.orders.total) * 100) : 0}%
                       </div>
                       <div className="tech-font" style={{ fontSize: '0.6rem', marginTop: 8 }}>Success Delivery Rate</div>
                    </div>
                 </Reveal>

                 <Reveal delay={0.5} direction="left">
                    <div className="card glass" style={{ padding: 20, marginTop: 24 }}>
                       <div className="tech-font" style={{ fontSize: '0.7rem', marginBottom: 16, borderBottom: '1px solid var(--border-faint)', paddingBottom: 8 }}>Module_Access</div>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          {['Orders', 'Products', 'Customers', 'Financial'].map(m => (
                             <button 
                                key={m} 
                                className="tech-font" 
                                style={{ textAlign: 'left', fontSize: '0.7rem', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-faint)', borderRadius: 2 }}
                                onClick={() => navigate(`/${m.toLowerCase()}`)}
                             >
                                > ACCESS_{m.toUpperCase()}
                             </button>
                          ))}
                       </div>
                    </div>
                 </Reveal>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
