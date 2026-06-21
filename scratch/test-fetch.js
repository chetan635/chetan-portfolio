import fs from 'fs';
import path from 'path';

// Helper to manually load .env.local variables FIRST
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

// NOW import notion.ts
const { getPostBySlug } = await import('../src/lib/notion.ts');

async function run() {
  try {
    const slug = 'caching-blog-template';
    console.log(`Calling getPostBySlug("${slug}")...`);
    const data = await getPostBySlug(slug);
    
    if (!data) {
      console.log('❌ Result: null (Post not found or status not Published)');
      return;
    }

    const { post, blocks } = data;
    console.log('✅ Result found!');
    console.log('Post Metadata:', JSON.stringify(post, null, 2));
    console.log(`Fetched ${blocks.length} blocks.`);
    
    if (blocks.length > 0) {
      const typeCounts = {};
      const unsupportedTypes = new Set();
      const supportedTypes = new Set([
        'paragraph',
        'heading_1',
        'heading_2',
        'heading_3',
        'quote',
        'code',
        'image',
        'table',
        'divider',
        'bulleted_list_item',
        'numbered_list_item'
      ]);

      blocks.forEach(b => {
        typeCounts[b.type] = (typeCounts[b.type] || 0) + 1;
        if (!supportedTypes.has(b.type)) {
          unsupportedTypes.add(b.type);
        }
      });

      console.log('Block Type Counts:', typeCounts);
      if (unsupportedTypes.size > 0) {
        console.log('⚠️ Unsupported Block Types found:', Array.from(unsupportedTypes));
        console.log('Sample of unsupported blocks:');
        blocks.forEach((b) => {
          if (unsupportedTypes.has(b.type)) {
            console.log(`- Type: "${b.type}", ID: ${b.id}`);
          }
        });
      } else {
        console.log('✅ All block types are supported!');
      }
    }
  } catch (error) {
    console.error('❌ Error executing getPostBySlug:', error);
  }
}

run();
