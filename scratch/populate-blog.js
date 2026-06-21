import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';

// Helper to manually load .env.local variables
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value.trim();
    }
  });
}

const apiKey = process.env.NOTION_API_KEY;
const databaseId = process.env.NOTION_DATABASE_ID;

if (!apiKey || !databaseId) {
  console.error('❌ Error: NOTION_API_KEY or NOTION_DATABASE_ID is missing from .env.local');
  process.exit(1);
}

const notion = new Client({ auth: apiKey });

async function run() {
  try {
    console.log('Retrieving database container metadata...');
    const dbMetadata = await notion.databases.retrieve({ database_id: databaseId });
    const dataSources = dbMetadata.data_sources || [];
    if (dataSources.length === 0) {
      throw new Error('No data sources found associated with the database container.');
    }

    const dataSourceId = dataSources[0].id;
    console.log('Found associated Data Source ID:', dataSourceId);

    // 1. Update the database schema properties dynamically
    console.log('\nStep 1: Aligning database columns & types in Notion...');
    await notion.request({
      path: `data_sources/${dataSourceId}`,
      method: 'patch',
      body: {
        properties: {
          "Title": { "title": {} },
          "Slug": { "rich_text": {} },
          "Description": { "rich_text": {} },
          "Published Date": { "date": {} },
          "Tags": {
            "multi_select": {}
          },
          "Status": {
            "select": {}
          }
        }
      }
    });
    console.log('✅ Columns created/aligned successfully!');

    // 2. Add a fully formatted blog post
    console.log('\nStep 2: Creating a new blog page inside the database...');
    const today = new Date().toISOString().split('T')[0];

    const newPage = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: 'Getting Started with Next.js 15 & React 19'
              }
            }
          ]
        },
        Slug: {
          rich_text: [
            {
              text: {
                content: 'getting-started-with-nextjs-15'
              }
            }
          ]
        },
        Description: {
          rich_text: [
            {
              text: {
                content: 'A comprehensive guide to building responsive developer websites using Next.js App Router and managing posts through Notion CMS.'
              }
            }
          ]
        },
        'Published Date': {
          date: {
            start: today
          }
        },
        Tags: {
          multi_select: [
            { name: 'Next.js' },
            { name: 'React' },
            { name: 'TypeScript' }
          ]
        },
        Status: {
          select: {
            name: 'Published'
          }
        }
      },
      children: [
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{ text: { content: 'Introduction to Next.js App Router' } }]
          }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: 'Next.js is a full-featured React framework designed for high-performance production workloads. The modern App Router introduces React Server Components, client-side hydration optimizations, and Incremental Static Regeneration (ISR) out-of-the-box.'
                }
              }
            ]
          }
        },
        {
          object: 'block',
          type: 'quote',
          quote: {
            rich_text: [
              {
                text: {
                  content: 'Writing code is not about wrapping everything in client components. Leverage Server Components to render metadata, fetch database inputs, and ensure super-fast initial load times.'
                }
              }
            ]
          }
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{ text: { content: 'Sample Code Block' } }]
          }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: 'Here is a quick TypeScript example demonstrating how you can instantiate a Client component:'
                }
              }
            ]
          }
        },
        {
          object: 'block',
          type: 'code',
          code: {
            language: 'typescript',
            rich_text: [
              {
                text: {
                  content: `import React, { useState } from 'react';\n\nexport default function ClickCounter() {\n  const [count, setCount] = useState<number>(0);\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicks: {count}\n    </button>\n  );\n}`
                }
              }
            ]
          }
        },
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [{ text: { content: 'Key Framework Features' } }]
          }
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{ text: { content: 'Dynamic routing based on folder layouts' } }]
          }
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{ text: { content: 'Zero configuration typescript compilation support' } }]
          }
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{ text: { content: 'Built-in SEO sitemaps and metadata generators' } }]
          }
        }
      ]
    });

    console.log('✅ Blog Page published successfully in Notion!');
    console.log('Title:', 'Getting Started with Next.js 15 & React 19');
    console.log('Page ID:', newPage.id);
    console.log('\nYou can now start your local server (npm run dev) and visit http://localhost:3000/blogs to view it live!');

  } catch (error) {
    console.error('❌ Failed to align database or create page:', error.body || error.message || error);
  }
}

run();
