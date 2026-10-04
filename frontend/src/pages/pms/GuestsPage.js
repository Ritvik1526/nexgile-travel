import React, { useState, useEffect } from 'react';
import { AppLayout } from '../../layouts/AppLayout';
import { Card, Button, Spinner, SearchInput, SectionHeader, TierBadge, Badge, Avatar, Modal } from '../../components/ui';
import { guestsService } from '../../services/guestsService';

export const GuestsPage = ({ onNavigate }) => {
  const [guests, setGuests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [guestDetail, setGuestDetail] = useState(null);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    guestsService.getAll({ tier: tierFilter }).then(r => { setGuests(r.data || []); setLoading(false); });
  }, [tierFilter]);

  const openGuest = async (g) => {
    setSelected(g);
    const detail = await guestsService.getById(g.id);
    setGuestDetail(detail.data);
  };

  const filtered = guests.filter(g =>
    !search || `${g.firstName} ${g.lastName}`.toLowerCase().includes(search.toLowerCase()) || g.email.toLowerCase().includes(search.toLowerCase())
  );

  const tierColors = { Platinum: '#7c3aed', Gold: '#d97706', Silver: '#64748b', Member: '#374151' };

  return (
    <AppLayout activePage="guests" onNavigate={onNavigate} title="Guest Profiles" subtitle="Loyalty members, preferences, and stay history">
      {/* Loyalty Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { tier: 'Platinum', count: 1, color: '#7c3aed', icon: '💎' },
          { tier: 'Gold', count: 1, color: '#d97706', icon: '🥇' },
          { tier: 'Silver', count: 1, color: '#64748b', icon: '🥈' },
          { tier: 'Member', count: 1, color: '#374151', icon: '🎫' }
        ].map(t => (
          <Card key={t.tier} onClick={() => setTierFilter(tierFilter === t.tier ? '' : t.tier)} style={{ textAlign: 'center', cursor: 'pointer', border: tierFilter === t.tier ? `2px solid ${t.color}` : '1px solid var(--border)' }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{t.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.color }}>{t.count}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>{t.tier}</div>
          </Card>
        ))}
      </div>

      <Card>
        <SectionHeader title="Guest Directory" actions={<Button size="sm" icon="➕">Add Guest</Button>} />
        <div style={{ marginBottom: 16 }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name or email…" />
        </div>

        {loading ? <Spinner /> : (
          <div style={{ display: 'grid', gap: 12 }}>
            {filtered.map(g => (
              <div key={g.id} onClick={() => openGuest(g)} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto auto', gap: 16, alignItems: 'center', padding: '14px 16px', background: 'var(--surface-alt)', borderRadius: 14, border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '4px 4px 12px var(--shadow-dark)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <Avatar initials={`${g.firstName[0]}${g.lastName[0]}`} color={tierColors[g.loyaltyTier] || '#6366f1'} size={44} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>{g.firstName} {g.lastName}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{g.email} · {g.phone}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                    {g.tags?.map(t => <span key={t} style={{ marginRight: 6, padding: '1px 7px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 99, fontSize: 11 }}>{t}</span>)}
                  </div>
                </div>
                <TierBadge tier={g.loyaltyTier} />
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#6366f1' }}>{(g.loyaltyPoints || 0).toLocaleString()} pts</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{g.totalStays} stays</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>₹{(g.totalSpend || 0).toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>lifetime spend</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Guest Detail Modal */}
      <Modal open={!!selected} onClose={() => { setSelected(null); setGuestDetail(null); }} title={`${selected?.firstName} ${selected?.lastName}`} width={720}>
        {guestDetail ? (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, color: 'var(--text-muted)' }}>GUEST INFO</div>
                {[['Nationality', guestDetail.nationality], ['Email', guestDetail.email], ['Phone', guestDetail.phone], ['Total Stays', guestDetail.totalStays], ['Lifetime Spend', `₹${(guestDetail.totalSpend || 0).toLocaleString()}`]].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{l}</span><span style={{ fontWeight: 700 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, color: 'var(--text-muted)' }}>PREFERENCES</div>
                {Object.entries(guestDetail.preferences || {}).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{k}</span><span style={{ fontWeight: 700 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Loyalty */}
            <div style={{ padding: 16, background: `${tierColors[guestDetail.loyaltyTier] || '#6366f1'}12`, borderRadius: 14, border: `1px solid ${tierColors[guestDetail.loyaltyTier] || '#6366f1'}30`, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <TierBadge tier={guestDetail.loyaltyTier} />
                  <div style={{ fontSize: 24, fontWeight: 900, marginTop: 8, color: tierColors[guestDetail.loyaltyTier] }}>{(guestDetail.loyaltyPoints || 0).toLocaleString()} pts</div>
                </div>
                <Button size="sm" variant="secondary">Award Points</Button>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>
                Perks: {guestDetail.tierInfo?.perks?.join(' · ')}
              </div>
            </div>
            {/* Recent Reservations */}
            {guestDetail.reservations?.length > 0 && (
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10, color: 'var(--text-muted)' }}>RECENT STAYS</div>
                {guestDetail.reservations.map(r => (
                  <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--surface-alt)', borderRadius: 10, marginBottom: 6, border: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{r.id}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.checkIn} → {r.checkOut} · Room {r.roomNo}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Badge status={r.status} label={r.status} size="sm" />
                      <div style={{ fontSize: 13, fontWeight: 800, marginTop: 4 }}>₹{r.totalAmount.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : <Spinner />}
      </Modal>
    </AppLayout>
  );
};
