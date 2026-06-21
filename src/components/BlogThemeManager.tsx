'use client';

import { useEffect } from 'react';

export default function BlogThemeManager() {
  useEffect(() => {
    // Add class to body to handle specific blog page styles (e.g. removing grid background)
    document.body.classList.add('is-blog-detail');

    return () => {
      document.body.classList.remove('is-blog-detail');
    };
  }, []);

  return null;
}
