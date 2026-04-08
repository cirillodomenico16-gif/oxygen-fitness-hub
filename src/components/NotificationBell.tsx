import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotifications, Notification } from '../lib/llm';

const MEMBER_ID = '1';

const NotificationBell: React.FC<{ onOpenPlan?: (type: 'scheda' | 'dieta') => void }> = ({ onOpenPlan }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>(() => getNotifications(MEMBER_ID));
  const ref = useRef<HTMLDivElement>(null);

  const refresh = () => setItems(getNotifications(MEMBER_ID));

  useEffect(() => {
    refresh();
    const onStorage = () => refresh();
    const onFocus = () => refresh();
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    refresh();
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const unread = items.filter((n) => !n.read).length;

  const markAllRead = () => {
    const updated = items.map((n) => ({ ...n, read: true }));
    try { localStorage.setItem(`oxy_notif_${MEMBER_ID}`, JSON.stringify(updated)); } catch {}
    setItems(updated);
  };

  const openNotification = (n: Notification) => {
    const updated = items.map((x) => (x.id === n.id ? { ...x, read: true } : x));
    try { localStorage.setItem(`oxy_notif_${MEMBER_ID}`, JSON.stringify(updated)); } catch {}
    setItems(updated);
    setOpen(false);
    if (n.type === 'scheda') {
      if (onOpenPlan) onOpenPlan('scheda'); else navigate('/scheda?show=1');
    } else if (n.type === 'dieta') {
      if (onOpenPlan) onOpenPlan('dieta'); else navigate('/dieta?show=1');
    }
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        aria-label="Notifiche"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(239,68,68,0.35)',
          color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          boxShadow: unread ? '0 0 14px rgba(239,68,68,0.45)' : 'none',
          transition: 'all .2s ease',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        {unread > 0 && (
          <span style={{
            position: 'absolute', top: -3, right: -3,
            minWidth: 18, height: 18, padding: '0 5px',
            borderRadius: 999,
            background: 'linear-gradient(135deg,#ef4444,#b71c1c)',
            border: '2px solid #000',
            color: '#fff', fontSize: 10, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            lineHeight: 1,
          }}>{unread > 9 ? '9+' : unread}</span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute', top: 48, right: 0,
            width: 312, maxWidth: 'calc(100vw - 32px)',
            background: 'rgba(10,10,10,0.98)',
            border: '1px solid rgba(239,68,68,0.35)',
            borderRadius: 16,
            boxShadow: '0 18px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
            backdropFilter: 'blur(18px)',
            zIndex: 120,
            overflow: 'hidden',
            animation: 'oxy-fade-up .2s ease-out',
          }}
        >
          <div style={{
            padding: '12px 14px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.02em' }}>Notifiche</div>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                style={{
                  background: 'none', border: 'none',
                  color: '#fca5a5', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  minHeight: 'auto',
                }}
              >Segna come lette</button>
            )}
          </div>

          <div style={{ maxHeight: 380, overflowY: 'auto' }}>
            {items.length === 0 && (
              <div style={{
                padding: '24px 16px', textAlign: 'center',
                color: 'rgba(255,255,255,0.5)', fontSize: 12,
              }}>
                Nessuna notifica
              </div>
            )}
            {items.map((n) => (
              <button
                key={n.id}
                onClick={() => openNotification(n)}
                style={{
                  width: '100%', textAlign: 'left',
                  background: n.read ? 'transparent' : 'rgba(239,68,68,0.07)',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  color: '#fff',
                  fontFamily: 'inherit',
                  minHeight: 44,
                }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  marginTop: 6, flexShrink: 0,
                  background: n.read ? 'rgba(255,255,255,0.2)' : '#ef4444',
                  boxShadow: n.read ? 'none' : '0 0 8px rgba(239,68,68,0.7)',
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 2 }}>{n.title}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>{n.body}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{n.date}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
