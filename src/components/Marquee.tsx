import React from 'react';
import { MARQUEE_ITEMS } from '../constants';

export default function Marquee() {
  return (
    <div className="marquee-banner">
      <div className="marquee-content">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <span key={idx} className="marquee-item">
            {item}
            <span className="marquee-star">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="marquee-diamond">
                <path d="M2.7 10.3a2.4 2.4 0 0 0 0 3.4l7.6 7.6a2.4 2.4 0 0 0 3.4 0l7.6-7.6a2.4 2.4 0 0 0 0-3.4L13.7 2.7a2.4 2.4 0 0 0-3.4 0z"/>
              </svg>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
