import fs from 'fs';
import path from 'path';

// Load .env.local variables
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

import { Client } from '@notionhq/client';

async function checkSlugResults() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;
  
  if (!DATABASE_ID) {
    console.error('NOTION_DATABASE_ID is missing from process.env');
    return;
  }

  console.log(`Querying database ${DATABASE_ID} for slug "caching-blog-template"...`);
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: 'caching-blog-template',
      },
    },
  });

  console.log(`Found ${response.results.length} total results:`);
  response.results.forEach((page, index) => {
    console.log(`\nResult ${index + 1}:`);
    console.log(`  ID: ${page.id}`);
    console.log(`  Status: ${page.properties.Status?.select?.name}`);
    console.log(`  Title: ${page.properties.Title?.title?.[0]?.plain_text}`);
  });
}

checkSlugResults().catch(console.error);
