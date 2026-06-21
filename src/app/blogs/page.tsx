import React from 'react';
import { getPublishedPosts } from '../../lib/notion';
import BlogListContainer from '../../components/BlogListContainer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical articles, tutorials, and insights regarding modern web technologies, full stack system engineering, and artificial intelligence.',
};

export default async function Page() {
  const posts = await getPublishedPosts();

  return <BlogListContainer initialPosts={posts} />;
}
export const revalidate = 60; // Revalidate the database query cache every 60 seconds (ISR)
