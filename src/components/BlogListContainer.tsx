'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Post } from '../lib/notion';

interface BlogListContainerProps {
  initialPosts: Post[];
}

export default function BlogListContainer({ initialPosts }: BlogListContainerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags from initial posts
  const uniqueTags = Array.from(
    new Set(initialPosts.flatMap((post) => post.tags))
  );

  // Filter posts based on search query and selected tag
  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null); // Deselect if clicked again
    } else {
      setSelectedTag(tag);
    }
  };

  return (
    <div className="blogs-page-container">
      <header className="blogs-page-header">
        <h1 className="blogs-page-title reveal-on-scroll reveal-slide-up">Technical Blog</h1>
        <p className="blogs-page-subtitle reveal-on-scroll reveal-slide-up">
          Insights, tutorials, and deep-dives on full-stack development, AI integration, and software engineering.
        </p>

        {/* Search and Tag filters */}
        <div className="blogs-search-container reveal-on-scroll reveal-fade">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search posts by title, tag, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {uniqueTags.length > 0 && (
            <div className="blogs-filter-tags">
              <button
                className={`filter-tag-pill ${selectedTag === null ? 'active' : ''}`}
                onClick={() => setSelectedTag(null)}
              >
                All Posts
              </button>
              {uniqueTags.map((tag) => (
                <button
                  key={tag}
                  className={`filter-tag-pill ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Grid of filtered blogs */}
      {filteredPosts.length > 0 ? (
        <div className="blogs-grid stagger-children">
          {filteredPosts.map((post) => (
            <Link href={`/blogs/${post.slug}`} key={post.id}>
              <article className="blog-card reveal-on-scroll reveal-scale border-capsule">
                <div className="blog-card-cover">
                  <img
                    src={post.cover}
                    alt={post.title}
                    loading="lazy"
                  />
                </div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span>{post.date}</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-desc">{post.description}</p>
                  <div className="blog-card-tags">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="blog-tag"
                        onClick={(e) => {
                          e.preventDefault(); // Stop redirection to detail page
                          handleTagClick(tag);
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="blogs-empty reveal-on-scroll reveal-fade">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
          <p>No matching blog posts found. Try adjusting your query or filters.</p>
        </div>
      )}
    </div>
  );
}
