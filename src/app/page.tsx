"use client";

import React, { useState, useEffect } from 'react';

type PostType = 'surplus' | 'need';
type ViewMode = 'list' | 'map';

interface FeedItem {
  id: string;
  type: 'surplus' | 'need' | 'logistics' | 'success';
  titlePrimary: string;
  titleSecondary: string;
  source: string;
  distance: string;
  time?: string;
  x: number;
  y: number;
}

export default function Home() {
  const [postType, setPostType] = useState<PostType>('surplus');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [meals, setMeals] = useState('');
  const [locationName, setLocationName] = useState('');
  const [area, setArea] = useState('');
  
  // Mobile specific state
  const [isMobilePostOpen, setIsMobilePostOpen] = useState(false);

  // Prevent body scroll when mobile modal is open
  useEffect(() => {
    if (isMobilePostOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobilePostOpen]);

  const [feed, setFeed] = useState<FeedItem[]>([
    { id: '1', type: 'surplus', titlePrimary: '35 meals', titleSecondary: 'available', source: 'Restaurant A', distance: '0.7 km away', time: 'Just now', x: 35, y: 40 },
    { id: '2', type: 'need', titlePrimary: '120 meals', titleSecondary: 'required', source: 'Community Kitchen B', distance: '1.3 km away', time: '10m ago', x: 65, y: 30 },
    { id: '3', type: 'logistics', titlePrimary: 'Pickup', titleSecondary: '50 meals', source: '2 km route', distance: 'Est. 18 mins', time: '12m ago', x: 50, y: 65 }
  ]);

  const [metrics, setMetrics] = useState({ needed: 1240, secured: 980, gap: 260 });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meals || !locationName) return;

    const numMeals = parseInt(meals, 10) || 0;
    const randomX = Math.floor(Math.random() * 70) + 15;
    const randomY = Math.floor(Math.random() * 70) + 15;

    const newItem: FeedItem = {
      id: Date.now().toString(),
      type: postType,
      titlePrimary: `${meals} meals`,
      titleSecondary: postType === 'surplus' ? 'available' : 'required',
      source: locationName,
      distance: area || 'Nearby', 
      time: 'Just now',
      x: randomX,
      y: randomY
    };

    setFeed([newItem, ...feed]);

    if (postType === 'surplus') {
      setMetrics(prev => ({ ...prev, secured: prev.secured + numMeals, gap: Math.max(0, prev.gap - numMeals) }));
    } else {
      setMetrics(prev => ({ ...prev, needed: prev.needed + numMeals, gap: prev.gap + numMeals }));
    }

    if (viewMode === 'list') setViewMode('map');

    setMeals('');
    setLocationName('');
    setArea('');
    setIsMobilePostOpen(false); // Close mobile modal on submit
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'surplus': return <i className="fa-solid fa-box-open"></i>;
      case 'need': return <i className="fa-solid fa-bell"></i>;
      case 'logistics': return <i className="fa-solid fa-motorcycle"></i>;
      case 'success': return <i className="fa-solid fa-check-circle"></i>;
      default: return <i className="fa-solid fa-circle"></i>;
    }
  };

  return (
    <div className="app-container">
      
      {/* 1. Left Sidebar Navigation (Desktop Only) */}
      <aside className="desktop-sidebar">
        <div className="brand">
          <i className="fa-solid fa-hand-holding-heart"></i>
          <span>Human Needs</span>
        </div>
        <nav className="nav-menu">
          <a href="#" className="nav-item active"><i className="fa-solid fa-house"></i><span>Dashboard</span></a>
          <a href="#" className="nav-item"><i className="fa-solid fa-users"></i><span>Network</span></a>
          <a href="#" className="nav-item"><i className="fa-solid fa-chart-line"></i><span>Impact</span></a>
        </nav>
        
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="https://ui-avatars.com/api/?name=User&background=FF8A65&color=fff&rounded=true" alt="Profile" style={{width: 48, borderRadius: 999}} />
          <div>
            <div style={{fontWeight: 600}}>My Profile</div>
            <div style={{fontSize: '0.85rem', color: 'var(--text-medium)'}}>Community Member</div>
          </div>
        </div>
      </aside>

      {/* 2. Center Feed Column */}
      <main className="main-content">
        
        {/* Mobile App Header (Visible only on mobile) */}
        <div className="mobile-header">
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <i className="fa-solid fa-hand-holding-heart" style={{color: 'var(--primary)', fontSize: '1.5rem'}}></i>
                <span style={{fontWeight: 700, fontSize: '1.25rem'}}>Human Needs</span>
            </div>
        </div>

        {/* Status Card */}
        <section className="status-card">
          <div>
            <div className="status-header">
              <h2>Tonight's Hyperlocal Impact</h2>
              <span className="live-badge"><i className="fa-solid fa-circle"></i> Live in Thane West</span>
            </div>
            <div style={{color: 'var(--text-medium)'}}>Tracking the gap between food needed and food secured.</div>
          </div>
          
          <div className="status-metrics">
            <div className="metric">
              <span className="metric-value">{metrics.needed.toLocaleString()}</span>
              <span className="metric-label">Needed</span>
            </div>
            <div className="metric highlight">
              <span className="metric-value">{metrics.secured.toLocaleString()}</span>
              <span className="metric-label">Secured</span>
            </div>
            <div className="metric alert">
              <span className="metric-value">{metrics.gap.toLocaleString()}</span>
              <span className="metric-label">Gap</span>
            </div>
          </div>
        </section>

        {/* Dynamic Feed / Map Toggle Area */}
        <section className="feed-section">
          <div className="section-header">
            <h3>Local Activity</h3>
            
            <div className="view-toggle">
              <button className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                <i className="fa-solid fa-list" style={{marginRight: 6}}></i> List
              </button>
              <button className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`} onClick={() => setViewMode('map')}>
                <i className="fa-solid fa-map-location-dot" style={{marginRight: 6}}></i> Map
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="feed-list">
              {feed.map(item => (
                <div key={item.id} className={`feed-card ${item.type}`}>
                  <div className="feed-icon">{renderIcon(item.type)}</div>
                  <div className="feed-content">
                    <div className="feed-title"><strong>{item.titlePrimary}</strong> {item.titleSecondary}</div>
                    <div className="feed-meta">
                      <span><i className="fa-regular fa-building"></i> {item.source}</span><span>•</span>
                      <span><i className="fa-solid fa-location-dot"></i> {item.distance}</span><span>•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                  {item.type === 'surplus' && <button className="btn-small accept">Transport</button>}
                  {item.type === 'need' && <button className="btn-small action">Help</button>}
                  {item.type === 'logistics' && <button className="btn-small accept">Accept</button>}
                </div>
              ))}
              <div className="feed-card success">
                <div className="feed-icon"><i className="fa-solid fa-check-circle"></i></div>
                <div className="feed-content">
                  <div className="feed-title"><strong>482 meals</strong> distributed completely</div>
                  <div className="feed-meta">Tonight's local impact milestone</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="map-container">
              <div className="map-bg"></div>
              {feed.map((item) => (
                <div key={item.id} className={`map-marker ${item.type}`} style={{ left: `${item.x}%`, top: `${item.y}%` }}>
                  {renderIcon(item.type)}
                  <div className="marker-tooltip">
                    <div className="tooltip-title">{item.titlePrimary} {item.titleSecondary}</div>
                    <div className="tooltip-meta"><i className="fa-regular fa-building"></i> {item.source}</div>
                  </div>
                </div>
              ))}
              
              <div style={{position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 12, background: 'rgba(255,255,255,0.8)', padding: '8px 16px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 600}}>
                <span style={{display: 'flex', alignItems: 'center', gap: 6}}><i className="fa-solid fa-circle" style={{color: 'var(--secondary)'}}></i> Surplus</span>
                <span style={{display: 'flex', alignItems: 'center', gap: 6}}><i className="fa-solid fa-circle" style={{color: 'var(--urgent)'}}></i> Need</span>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Mobile Overlay Background */}
      <div className={`mobile-overlay ${isMobilePostOpen ? 'active' : ''}`} onClick={() => setIsMobilePostOpen(false)}></div>

      {/* 3. Right Action Panel (Posting Feature) - Slides up on Mobile */}
      <aside className={`action-panel ${isMobilePostOpen ? 'mobile-open' : ''}`}>
        <button className="mobile-close-btn" onClick={() => setIsMobilePostOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
        </button>

        <h3 className="panel-title">Post to the Network</h3>
        
        <form onSubmit={handlePost} className="post-form">
          <div className="type-selector">
            <button type="button" className={`type-btn surplus ${postType === 'surplus' ? 'active' : ''}`} onClick={() => setPostType('surplus')}>Have Surplus</button>
            <button type="button" className={`type-btn need ${postType === 'need' ? 'active' : ''}`} onClick={() => setPostType('need')}>Need Food</button>
          </div>

          <div className="form-group" style={{marginTop: 8}}>
            <label>Quantity (Meals)</label>
            <input type="number" className="form-control" placeholder="e.g. 50" value={meals} onChange={(e) => setMeals(e.target.value)} required min="1"/>
          </div>

          <div className="form-group">
            <label>Organization / Name</label>
            <input type="text" className="form-control" placeholder="e.g. Restaurant A" value={locationName} onChange={(e) => setLocationName(e.target.value)} required/>
          </div>

          <div className="form-group">
            <label>Location / Area</label>
            <input type="text" className="form-control" placeholder="e.g. Thane West" value={area} onChange={(e) => setArea(e.target.value)} required/>
          </div>
          
          {postType === 'surplus' && (
            <div className="form-group">
              <label>Pickup Deadline</label>
              <input type="time" className="form-control" defaultValue="22:00" />
            </div>
          )}

          <button type="submit" className="btn-primary huge-action">
            <span className="action-icon">
              {postType === 'surplus' ? <i className="fa-solid fa-camera"></i> : <i className="fa-solid fa-bullhorn"></i>}
            </span>
            <span className="action-text">
              {postType === 'surplus' ? 'Post Surplus' : 'Broadcast Need'}
            </span>
          </button>
          
          {postType === 'surplus' && (
            <div style={{textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-medium)', marginTop: 8}}>
              <i className="fa-solid fa-robot"></i> AI will verify quantity via photo
            </div>
          )}
        </form>
      </aside>

      {/* Mobile Floating Action Button (FAB) */}
      <button className="mobile-fab" onClick={() => setIsMobilePostOpen(true)}>
        <i className="fa-solid fa-plus"></i>
      </button>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav">
        <a href="#" className="nav-item active"><i className="fa-solid fa-house"></i><span>Home</span></a>
        <a href="#" className="nav-item"><i className="fa-solid fa-users"></i><span>Network</span></a>
        <a href="#" className="nav-item"><i className="fa-solid fa-chart-line"></i><span>Impact</span></a>
        <a href="#" className="nav-item"><i className="fa-solid fa-user"></i><span>Profile</span></a>
      </nav>

    </div>
  );
}
