import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, getPublishedPosts } from '../../../lib/notion';
import CodeBlock from '../../../components/CodeBlock';
import ReadingProgressBar from '../../../components/ReadingProgressBar';
import BlogThemeManager from '../../../components/BlogThemeManager';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (err) {
    console.error('Failed to generate static params for blogs:', err);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await getPostBySlug(slug);
    if (!data) {
      return {
        title: 'Post Not Found',
      };
    }
    return {
      title: data.post.title,
      description: data.post.description,
      openGraph: {
        title: data.post.title,
        description: data.post.description,
        images: [{ url: data.post.cover }],
        type: 'article',
        publishedTime: data.post.date,
      },
      twitter: {
        card: 'summary_large_image',
        title: data.post.title,
        description: data.post.description,
        images: [data.post.cover],
      }
    };
  } catch (err) {
    return {
      title: 'Blog Post',
    };
  }
}

function renderRichText(richTextArray: any[]) {
  if (!richTextArray) return null;
  return richTextArray.map((textObj: any, index: number) => {
    const { annotations, text, href, plain_text } = textObj;
    if (!plain_text) return null;

    let element: React.ReactNode = plain_text;

    // Apply annotations
    if (annotations.bold) {
      element = <strong key={index}>{element}</strong>;
    }
    if (annotations.italic) {
      element = <em key={index}>{element}</em>;
    }
    if (annotations.strikethrough) {
      element = <span key={index} style={{ textDecoration: 'line-through' }}>{element}</span>;
    }
    if (annotations.underline) {
      element = <span key={index} style={{ textDecoration: 'underline' }}>{element}</span>;
    }
    if (annotations.code) {
      element = <code key={index} className="blog-inline-code">{element}</code>;
    }

    // Apply links
    if (href) {
      element = (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}
        >
          {element}
        </a>
      );
    }

    return <React.Fragment key={index}>{element}</React.Fragment>;
  });
}

function renderBlock(block: any) {
  const { type, id } = block;
  const content = block[type];

  switch (type) {
    case 'paragraph':
      return <p key={id}>{renderRichText(content.rich_text)}</p>;

    case 'heading_1':
      return <h1 key={id}>{renderRichText(content.rich_text)}</h1>;

    case 'heading_2':
      return <h2 key={id}>{renderRichText(content.rich_text)}</h2>;

    case 'heading_3':
      return <h3 key={id}>{renderRichText(content.rich_text)}</h3>;

    case 'quote':
      return (
        <blockquote key={id} className="blog-blockquote">
          {renderRichText(content.rich_text)}
        </blockquote>
      );

    case 'code':
      const codeText = content.rich_text?.map((t: any) => t.plain_text).join('') || '';
      return (
        <CodeBlock
          key={id}
          code={codeText}
          language={content.language}
        />
      );

    case 'image':
      const imageUrl = content.type === 'external' ? content.external.url : content.file.url;
      const caption = content.caption?.map((t: any) => t.plain_text).join('') || '';
      return (
        <div key={id} className="blog-image reveal-on-scroll reveal-scale">
          <div className="blog-image-wrapper">
            <img src={imageUrl} alt={caption || 'Blog image'} loading="lazy" />
          </div>
          {caption && <p className="blog-image-caption">{caption}</p>}
        </div>
      );

    case 'table':
      return (
        <div key={id} className="blog-table-container reveal-on-scroll reveal-fade">
          <table className="blog-table">
            <tbody>
              {block.children?.map((rowBlock: any, rIdx: number) => {
                const isHeader = content.has_column_header && rIdx === 0;
                return (
                  <tr key={rowBlock.id || rIdx}>
                    {rowBlock.table_row?.cells?.map((cell: any, cIdx: number) => {
                      const CellTag = isHeader ? 'th' : 'td';
                      return <CellTag key={cIdx}>{renderRichText(cell)}</CellTag>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );

    case 'divider':
      return <hr key={id} style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />;

    case 'bulleted_list':
      return (
        <ul key={id}>
          {block.items.map((item: any) => (
            <li key={item.id}>
              {renderRichText(item.bulleted_list_item.rich_text)}
            </li>
          ))}
        </ul>
      );

    case 'numbered_list':
      return (
        <ol key={id}>
          {block.items.map((item: any) => (
            <li key={item.id}>
              {renderRichText(item.numbered_list_item.rich_text)}
            </li>
          ))}
        </ol>
      );

    default:
      return null;
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);

  if (!data) {
    notFound();
  }

  const { post, blocks } = data;

  // Group consecutive bulleted and numbered lists for structural rendering
  const groupedBlocks: any[] = [];
  let currentGroup: { type: string; id: string; items: any[] } | null = null;

  blocks.forEach((block) => {
    if (block.type === 'bulleted_list_item') {
      if (currentGroup && currentGroup.type === 'bulleted_list') {
        currentGroup.items.push(block);
      } else {
        if (currentGroup) groupedBlocks.push(currentGroup);
        currentGroup = { type: 'bulleted_list', id: block.id, items: [block] };
      }
    } else if (block.type === 'numbered_list_item') {
      if (currentGroup && currentGroup.type === 'numbered_list') {
        currentGroup.items.push(block);
      } else {
        if (currentGroup) groupedBlocks.push(currentGroup);
        currentGroup = { type: 'numbered_list', id: block.id, items: [block] };
      }
    } else {
      if (currentGroup) {
        groupedBlocks.push(currentGroup);
        currentGroup = null;
      }
      groupedBlocks.push(block);
    }
  });
  if (currentGroup) groupedBlocks.push(currentGroup);

  return (
    <div className="blog-detail-page-wrapper">
      <BlogThemeManager />
      <article className="blog-detail-container">
        <ReadingProgressBar />

        <Link href="/blogs" className="blog-back-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Blogs
        </Link>

        <header className="blog-header reveal-on-scroll reveal-slide-up">
          <div className="blog-header-meta">
            <span>{post.date}</span>
            <span>&bull;</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="blog-header-title">{post.title}</h1>
          <div className="blog-header-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
        </header>

        <div className="blog-banner reveal-on-scroll reveal-fade">
          <img src={post.cover} alt={post.title} />
        </div>

        <div className="blog-content">
          {groupedBlocks.map(renderBlock)}
        </div>
      </article>
    </div>
  );
}

export const revalidate = 60; // ISR validation time
