import React from 'react';

export default function Loading() {
  return (
    <div className="blogs-loading-wrapper">
      <div className="blogs-loader-spinner">
        <div className="blogs-loader-circle"></div>
        <div className="blogs-loader-circle-inner"></div>
        <div className="blogs-loader-dot"></div>
      </div>
      <div className="blogs-loader-text">
        <span>INITIALIZING PORTFOLIO...</span>
      </div>
      <div className="blogs-loader-terminal">
        <div className="blogs-loader-terminal-line">
          $ query --target ChetanChinchulkar
        </div>
      </div>
    </div>
  );
}
