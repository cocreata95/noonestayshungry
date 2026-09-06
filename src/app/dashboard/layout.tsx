"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-container">
      {/* 1. Left Sidebar Navigation (Desktop Only) */}
      <aside className="desktop-sidebar">
        <Link href="/" className="brand" style={{textDecoration: 'none', color: 'inherit'}}>
          <i className="fa-solid fa-hand-holding-heart"></i>
          <span>Human Needs</span>
        </Link>
        <nav className="nav-menu">
          <Link href="/dashboard" className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`}>
            <i className="fa-solid fa-house"></i><span>Dashboard</span>
          </Link>
          <Link href="/dashboard/network" className={`nav-item ${pathname === '/dashboard/network' ? 'active' : ''}`}>
            <i className="fa-solid fa-users"></i><span>Network</span>
          </Link>
          <Link href="#" className="nav-item">
            <i className="fa-solid fa-chart-line"></i><span>Impact</span>
          </Link>
        </nav>
        
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="https://ui-avatars.com/api/?name=User&background=3B82F6&color=fff&rounded=true" alt="Profile" style={{width: 48, borderRadius: 999}} />
          <div>
            <div style={{fontWeight: 600}}>My Profile</div>
            <div style={{fontSize: '0.85rem', color: 'var(--text-medium)'}}>Community Member</div>
          </div>
        </div>
      </aside>

      {/* 2. Main Children Content */}
      {children}

      {/* 3. Mobile Bottom Navigation */}
      <nav className="mobile-nav">
        <Link href="/dashboard" className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`}>
          <i className="fa-solid fa-house"></i><span>Home</span>
        </Link>
        <Link href="/dashboard/network" className={`nav-item ${pathname === '/dashboard/network' ? 'active' : ''}`}>
          <i className="fa-solid fa-users"></i><span>Network</span>
        </Link>
        <Link href="#" className="nav-item">
          <i className="fa-solid fa-chart-line"></i><span>Impact</span>
        </Link>
        <Link href="#" className="nav-item">
          <i className="fa-solid fa-user"></i><span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}
