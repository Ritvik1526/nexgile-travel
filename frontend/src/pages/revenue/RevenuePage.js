import React, { useState, useEffect } from 'react';
import { AppLayout } from '../../layouts/AppLayout';
import { Card, Button, Spinner, SectionHeader, StatCard } from '../../components/ui';
import { revenueService } from '../../services/revenueService';
import { BarChart, Bar, LineChart, Line, ComposedChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export const RevenuePage = ({ onNavigate }) => {
  const [dashboard, setDashboard] = useState(null);
  const [pricing, setPricing] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [tab, setTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([revenueService.getDashboard(), revenueService.getPricing(), revenueService.getMonthly()])
      .then(([d, p, m]) => { setDashboard(d.data); setPricing(p.data || []); setMonthly(m.data || []); })
      .finally(() => setLoading(false));
  }, []);

  const tabs = ['overview', 'forecast', 'pricing', 'competitors'];

  if (loading) return <AppLayout activePage="revenue" onNavigate={onNavigate} title="Revenue Management"><Spinner size={48} /></AppLayout>;

  return (
    <AppLayout activePage="revenue" onNavigate={onNavigate} title="Revenue Management" subtitle="AI-powered pricing, forecasting, and performance analytics">
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Occupancy', value: `${dashboard?.occupancy || 0}%`, change: 3.2, icon: '🏨', color: '#6366f1' },
          { label: 'ADR', value: `₹${(dashboard?.adr || 0).toLocaleString()}`, change: 8.7, icon: '💰', color: '#0ea5e9' },
          { label: 'RevPAR', value: `₹${(dashboard?.revpar || 0).toLocaleString()}`, change: 11.1, icon: '📈', color: '#10b981' },
          { label: 'Total Revenue', value: `₹${((dashboard?.totalRevenue || 0)/100000).toFixed(1)}L`, change: 14.5, icon: '💎', color: '#f59e0b' }
        ].map(k => <StatCard key={k.label} {...k} />)}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, padding: 4, background: 'var(--surface-alt)', borderRadius: 14, width: 'fit-content', boxShadow: 'inset 2px 2px 6px var(--shadow-dark)' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', borderRadius: 10, border: 'none', background: tab === t ? 'var(--surface)' : 'transparent', color: tab === t ? '#6366f1' : 'var(--text-muted)', fontWeight: tab === t ? 700 : 500, cursor: 'pointer', fontSize: 13, boxShadow: tab === t ? '3px 3px 8px var(--shadow-dark), -2px -2px 6px var(--shadow-light)' : 'none', transition: 'all 0.2s' }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          <Card>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Monthly Performance (₹)</div>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }} />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" name="Revenue (₹)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="occupancy" name="Occupancy %" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* AI Insights */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>AI Insights</div>
                <span style={{ background: 'linear-gradient(135deg, #6366f1, #0ea5e9)', color: '#fff', padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 700 }}>✦ AI</span>
              </div>
              {(dashboard?.aiInsights || []).map((ins, i) => (
                <div key={i} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', marginBottom: 8, background: 'var(--surface-alt)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: ins.type === 'alert' ? '#dc2626' : ins.type === 'opportunity' ? '#16a34a' : '#6366f1' }}>
                      {ins.type === 'alert' ? '⚡' : ins.type === 'opportunity' ? '💡' : '🎯'} {ins.type.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{ins.confidence}% confidence</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text)', marginBottom: 4 }}>{ins.message}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#6366f1' }}>{ins.impact}</span>
                </div>
              ))}
            </Card>

            {/* Revenue Mix */}
            <Card>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Revenue Mix</div>
              {[
                { label: 'Room Revenue', pct: 85, amt: '₹36.5L', color: '#6366f1' },
                { label: 'F&B', pct: 9, amt: '₹3.8L', color: '#0ea5e9' },
                { label: 'Spa & Activities', pct: 4, amt: '₹1.7L', color: '#10b981' },
                { label: 'Other', pct: 2, amt: '₹0.9L', color: '#f59e0b' }
              ].map(r => (
                <div key={r.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>{r.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{r.amt}</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--surface-alt)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${r.pct}%`, background: r.color, borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}

      {tab === 'forecast' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Card>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>7-Day Demand Forecast</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>AI analysis of historical data, events, market trends</div>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={dashboard?.forecast || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} tickFormatter={d => d?.slice(5)} />
                <YAxis yAxisId="left" domain={[60, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickFormatter={v => `${v}%`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }} />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="occupancy" name="Occupancy %" fill="#6366f118" stroke="#6366f1" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="adr" name="ADR (₹)" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Demand Signal</div>
            {(dashboard?.forecast || []).map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{d.date}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{d.occupancy}%</span>
                  <span style={{ padding: '2px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, background: d.demand === 'peak' ? '#fee2e2' : d.demand === 'high' ? '#dcfce7' : '#fef9c3', color: d.demand === 'peak' ? '#dc2626' : d.demand === 'high' ? '#15803d' : '#a16207' }}>
                    {d.demand?.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {tab === 'pricing' && (
        <Card>
          <SectionHeader title="Dynamic Pricing" subtitle="AI rate recommendations with guardrails" actions={<Button size="sm">Apply All Suggestions</Button>} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pricing.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto', gap: 12, alignItems: 'center', padding: '14px 16px', background: 'var(--surface-alt)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{p.roomType}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{p.basis}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Current</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>₹{p.currentRate.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>AI Suggested</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: p.suggestedRate > p.currentRate ? '#16a34a' : '#dc2626' }}>₹{p.suggestedRate.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Range</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>₹{p.minRate.toLocaleString()} – ₹{p.maxRate.toLocaleString()}</div>
                </div>
                <span style={{ padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, background: p.status === 'approved' ? '#dcfce7' : p.status === 'current' ? '#f3f4f6' : '#fef9c3', color: p.status === 'approved' ? '#15803d' : p.status === 'current' ? '#374151' : '#a16207' }}>
                  {p.status}
                </span>
                {p.status === 'pending-approval' && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Button size="sm" variant="success">✓</Button>
                    <Button size="sm" variant="danger">✗</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'competitors' && (
        <Card>
          <SectionHeader title="Competitor Rate Monitoring" subtitle="Live market intelligence — refreshed every 4 hours" />
          {[
            { hotel: 'Grand Hyatt Mumbai', stars: 5, rate: 11200, change: -8, occ: '82%' },
            { hotel: 'JW Marriott Marine Drive', stars: 5, rate: 13500, change: +3, occ: '91%' },
            { hotel: 'Taj Lands End', stars: 5, rate: 12000, change: 0, occ: '89%' },
            { hotel: 'ITC Maratha', stars: 5, rate: 9800, change: -5, occ: '76%' },
            { hotel: 'Trident Nariman Point', stars: 5, rate: 10500, change: +1, occ: '84%' }
          ].map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{c.hotel}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>₹{c.rate.toLocaleString()}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: c.change > 0 ? '#16a34a' : c.change < 0 ? '#dc2626' : 'var(--text-muted)' }}>
                {c.change > 0 ? '↑' : c.change < 0 ? '↓' : '—'} {Math.abs(c.change)}%
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Occ: {c.occ}</div>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: 14, background: '#6366f108', borderRadius: 12, border: '1px solid #6366f120' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6366f1' }}>Our rate: ₹12,485</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8 }}>— positioned above market average by 8.4% | Rate parity: ✓</span>
          </div>
        </Card>
      )}
    </AppLayout>
  );
};
