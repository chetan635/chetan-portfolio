import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="not-found-wrapper">
      <div className="not-found-container">
        <div className="not-found-code">404</div>
        <div className="not-found-glyph" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <line x1="11" y1="8" x2="11" y2="12" />
            <line x1="11" y1="16" x2="11.01" y2="16" />
          </svg>
        </div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-body">
          Looks like this page wandered off into the void. It may have been moved, deleted, or never existed in the first place.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn btn-primary">
            ← Back to Home
          </Link>
          <Link href="/blogs" className="btn btn-secondary">
            Browse Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
