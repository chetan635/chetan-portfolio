import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY?.trim(),
  notionVersion: '2022-06-28',
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID?.trim();
let cachedDataSourceId: string | null = null;

export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  cover: string;
  readingTime: string;
}

export function calculateReadingTime(blocks: any[]): string {
  let text = '';
  const extractText = (richTextArray: any[]) => {
    return richTextArray?.map((t: any) => t.plain_text).join('') || '';
  };

  blocks.forEach((block) => {
    const type = block.type;
    const content = block[type];
    if (content && content.rich_text) {
      text += ' ' + extractText(content.rich_text);
    }
  });

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const wpm = 200;
  const minutes = Math.ceil(wordCount / wpm);
  return `${minutes || 1} min read`;
}

function parseCover(page: any): string {
  if (page.cover) {
    if (page.cover.type === 'external') {
      return page.cover.external.url;
    } else if (page.cover.type === 'file') {
      return page.cover.file.url;
    }
  }

  // Check if cover is in properties (e.g., 'Cover Image' or 'Cover')
  const propCover = page.properties['Cover Image'] || page.properties['Cover'];
  if (propCover && propCover.type === 'files' && propCover.files.length > 0) {
    const file = propCover.files[0];
    if (file.type === 'external') return file.external.url;
    if (file.type === 'file') return file.file.url;
  }

  // High-quality fallback tech image
  return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop';
}

function parsePost(page: any): Post {
  const props = page.properties;

  const title = props.Title?.title?.[0]?.plain_text || 'Untitled';
  const slug = props.Slug?.rich_text?.[0]?.plain_text || '';
  const description = props.Description?.rich_text?.[0]?.plain_text || '';
  const date = props['Published Date']?.date?.start || page.created_time.split('T')[0];
  const tags = props.Tags?.multi_select?.map((t: any) => t.name) || [];
  const cover = parseCover(page);

  return {
    id: page.id,
    title,
    slug,
    description,
    date,
    tags,
    cover,
    readingTime: '1 min read', // Updated dynamically
  };
}

export async function getPublishedPosts(): Promise<Post[]> {
  if (!DATABASE_ID) {
    console.error('NOTION_DATABASE_ID environment variable is missing');
    return [];
  }
  try {
    const response = await notion.request<any>({
      path: `databases/${DATABASE_ID}/query`,
      method: 'post',
      body: {
        filter: {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
        sorts: [
          {
            property: 'Published Date',
            direction: 'descending',
          },
        ],
      },
    });

    const posts = response.results.map(parsePost);

    // Fill reading times
    for (const post of posts) {
      try {
        const blocks = await getPageBlocks(post.id);
        post.readingTime = calculateReadingTime(blocks);
      } catch (err) {
        console.error(`Failed to calculate reading time for post ID ${post.id}:`, err);
      }
    }

    return posts;
  } catch (error) {
    console.error('Error fetching posts from Notion database:', error);
    return [];
  }
}

export async function getDataSourceId(): Promise<string> {
  if (cachedDataSourceId) return cachedDataSourceId;
  if (!DATABASE_ID) {
    throw new Error('NOTION_DATABASE_ID environment variable is missing');
  }
  console.log('[notion.ts] Retrieving metadata for database ID:', DATABASE_ID);
  const dbMetadata = await notion.databases.retrieve({ database_id: DATABASE_ID });
  const dataSources = (dbMetadata as any).data_sources || [];
  if (dataSources.length === 0) {
    throw new Error(`No data sources found associated with Notion database ${DATABASE_ID}`);
  }
  cachedDataSourceId = dataSources[0].id;
  console.log('[notion.ts] Resolved data source ID:', cachedDataSourceId);
  return cachedDataSourceId;
}

export async function getPostBySlug(slug: string): Promise<{ post: Post; blocks: any[] } | null> {
  if (!DATABASE_ID) {
    console.error('NOTION_DATABASE_ID environment variable is missing');
    return null;
  }
  try {
    const response = await notion.request<any>({
      path: `databases/${DATABASE_ID}/query`,
      method: 'post',
      body: {
        filter: {
          and: [
            {
              property: 'Slug',
              rich_text: {
                equals: slug,
              },
            },
            {
              property: 'Status',
              select: {
                equals: 'Published',
              },
            },
          ],
        },
      },
    });

    if (response.results.length === 0) return null;
    const page = response.results[0];

    const post = parsePost(page);
    const status = (page as any).properties.Status?.select?.name;
    if (status !== 'Published') return null;

    const blocks = await getPageBlocks(page.id);
    post.readingTime = calculateReadingTime(blocks);

    return {
      post,
      blocks,
    };
  } catch (error) {
    console.error(`Error querying post with slug ${slug}:`, error);
    return null;
  }
}

export async function getPageBlocks(pageId: string): Promise<any[]> {
  const blocks: any[] = [];
  let cursor: string | undefined = undefined;

  try {
    while (true) {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      });
      blocks.push(...response.results);
      if (!response.next_cursor) break;
      cursor = response.next_cursor;
    }

    // Load nested table row children or nested list children
    for (const block of blocks) {
      if (block.has_children) {
        if (block.type === 'table' || block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
          block.children = await getPageBlocks(block.id);
        }
      }
    }

    return blocks;
  } catch (error) {
    console.error(`Failed to load child blocks for parent ${pageId}:`, error);
    return [];
  }
}
