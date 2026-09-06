"use client";

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-hero">
        <div className="hero-icon">
          <i className="fa-solid fa-hand-holding-heart"></i>
        </div>
        <h1 className="hero-title">No one stays hungry when a community connects.</h1>
        <p className="hero-subtitle">
          A hyperlocal network ensuring surplus resources reliably reach the people who need them most, without the friction of traditional logistics.
        </p>
        
        <Link href="/dashboard" style={{textDecoration: 'none'}}>
          <button className="btn-primary huge-action" style={{maxWidth: 400, margin: '0 auto', marginTop: 40}}>
            <span className="action-text">See how our vision works</span>
            <span className="action-icon"><i className="fa-solid fa-arrow-right"></i></span>
          </button>
        </Link>
      </div>

      <div className="landing-steps">
        <div className="step-card">
          <div className="step-icon surplus"><i className="fa-solid fa-box-open"></i></div>
          <h3>1. Surplus Captured</h3>
          <p>Restaurants snap a photo of surplus food. AI verifies the quantity instantly.</p>
        </div>
        <div className="step-arrow"><i className="fa-solid fa-chevron-right"></i></div>
        
        <div className="step-card">
          <div className="step-icon logistics"><i className="fa-solid fa-motorcycle"></i></div>
          <h3>2. Volunteer Matched</h3>
          <p>Local volunteers are instantly routed to transport the food across short distances.</p>
        </div>
        <div className="step-arrow"><i className="fa-solid fa-chevron-right"></i></div>
        
        <div className="step-card">
          <div className="step-icon need"><i className="fa-solid fa-bell"></i></div>
          <h3>3. Needs Met</h3>
          <p>NGOs receive the food seamlessly, bridging the gap between waste and hunger.</p>
        </div>
      </div>
    </div>
  );
}
