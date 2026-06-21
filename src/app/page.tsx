import React from 'react';
import Link from 'next/link';
import Hero from '../sections/Hero';
import Marquee from '../components/Marquee';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Contact from '../sections/Contact';
import { portfolioData } from '../data/portfolioData';
import { getPublishedPosts } from '../lib/notion';

export default async function Page() {
  const { personalInfo, skills, projects, experience } = portfolioData;

  // Server-side fetch from Notion database
  let latestPosts = [];
  try {
    const posts = await getPublishedPosts();
    latestPosts = posts.slice(0, 3);
  } catch (error) {
    console.error('Failed to load latest posts in home page:', error);
  }

  return (
    <>
      <Hero personalInfo={personalInfo} />
      <Marquee />
      <About personalInfo={personalInfo} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      
      {/* Latest Blogs Section */}
      <section id="blogs" className="blogs-section timeline-purple">
        <div className="section-timeline-layout">
          <div className="section-timeline-left">
            <div className="section-timeline-dot"></div>
            <div className="section-timeline-line"></div>
          </div>
          
          <div className="section-timeline-right">
            <div className="section-header reveal-on-scroll reveal-slide-up">
              <p className="section-subtitle">Writing & Sharing</p>
              <h2 className="section-title">Latest Blogs</h2>
            </div>
            
            {latestPosts.length > 0 ? (
              <>
                <div className="blogs-grid stagger-children">
                  {latestPosts.map((post) => (
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
                              <span key={tag} className="blog-tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
                <div className="blogs-more-link reveal-on-scroll reveal-fade">
                  <Link href="/blogs" className="btn btn-primary">
                    View All Blogs
                  </Link>
                </div>
              </>
            ) : (
              <div className="blogs-empty reveal-on-scroll reveal-fade">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <line x1="10" y1="9" x2="8" y2="9"/>
                </svg>
                <p>No published blog posts found. Stay tuned for updates!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Contact personalInfo={personalInfo} />
    </>
  );
}
