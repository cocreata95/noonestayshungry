"use client";
import React, { useState } from 'react';

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState('all');
  
  const networkData = [
    { id: 1, type: 'donor', name: 'Fresh Bites Restaurant', stat: '850 meals donated', icon: 'fa-store', badge: 'Verified Donor', role: 'Restaurant' },
    { id: 2, type: 'receiver', name: 'Hope Shelter', stat: 'Serves 200/day', icon: 'fa-building-ngo', badge: 'Verified Partner', role: 'NGO' },
    { id: 3, type: 'logistics', name: 'Rahul V.', stat: '45 deliveries', icon: 'fa-motorcycle', badge: 'Top Volunteer', role: 'Delivery Volunteer' },
    { id: 4, type: 'donor', name: 'City Bakery', stat: '320 meals donated', icon: 'fa-store', badge: 'Verified Donor', role: 'Bakery' },
    { id: 5, type: 'receiver', name: 'Downtown Community Kitchen', stat: 'Serves 500/day', icon: 'fa-building-ngo', badge: 'Verified Partner', role: 'Community Kitchen' },
    { id: 6, type: 'logistics', name: 'Sarah K.', stat: '12 deliveries', icon: 'fa-motorcycle', badge: 'Volunteer', role: 'Delivery Volunteer' },
  ];

  const filtered = activeTab === 'all' ? networkData : networkData.filter(d => d.type === activeTab);

  return (
    <>
      <main className="main-content network-grid">
        <div className="mobile-header">
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <i className="fa-solid fa-hand-holding-heart" style={{color: 'var(--primary)', fontSize: '1.5rem'}}></i>
                <span style={{fontWeight: 700, fontSize: '1.25rem'}}>Network</span>
            </div>
        </div>

        <section className="section-header" style={{marginBottom: 16}}>
          <div>
            <h2 style={{fontSize: '1.75rem', fontWeight: 800}}>Community Network</h2>
            <p style={{color: 'var(--text-medium)'}}>The people and organizations driving hyperlocal impact.</p>
          </div>
        </section>

        <div className="view-toggle" style={{width: 'fit-content', marginBottom: 24}}>
            <button className={`toggle-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All</button>
            <button className={`toggle-btn ${activeTab === 'donor' ? 'active' : ''}`} onClick={() => setActiveTab('donor')}>Donors</button>
            <button className={`toggle-btn ${activeTab === 'receiver' ? 'active' : ''}`} onClick={() => setActiveTab('receiver')}>Receivers</button>
            <button className={`toggle-btn ${activeTab === 'logistics' ? 'active' : ''}`} onClick={() => setActiveTab('logistics')}>Volunteers</button>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px'}}>
            {filtered.map(item => (
                <div key={item.id} style={{background: 'var(--surface)', padding: 24, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 16}}>
                    <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
                        <div style={{width: 56, height: 56, borderRadius: 'var(--radius-md)', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--primary)'}}>
                            <i className={`fa-solid ${item.icon}`}></i>
                        </div>
                        <div>
                            <h3 style={{fontWeight: 700, fontSize: '1.1rem'}}>{item.name}</h3>
                            <div style={{fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 500, marginBottom: 2}}>{item.role}</div>
                            <div style={{fontSize: '0.85rem', color: 'var(--text-medium)'}}><i className="fa-solid fa-check-circle" style={{color: 'var(--secondary)'}}></i> {item.badge}</div>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border)'}}>
                        <span style={{fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.95rem'}}>{item.stat}</span>
                        <button className="btn-small accept" style={{padding: '8px 16px'}}>View</button>
                    </div>
                </div>
            ))}
        </div>
      </main>
    </>
  );
}
