import React from 'react';
import Terminal from '../components/Terminal';
import { getPublishedPosts } from '../lib/notion';

export default async function Page() {
  // Server-side fetch from Notion database to display in terminal commands
  let latestPosts = [];
  try {
    const posts = await getPublishedPosts();
    latestPosts = posts.slice(0, 3);
  } catch (error) {
    console.error('Failed to load latest posts in home page:', error);
  }

  return (
    <div className="terminal-page-container">
      <Terminal latestPosts={latestPosts} />
    </div>
  );
}
