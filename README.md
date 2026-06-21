# 🌌 AI Portfolio & Blog

A premium, high-performance developer portfolio and CMS-powered blog built using **Next.js 16 (App Router)**, **TypeScript**, **React 19**, and **Notion API**. 

Features dynamic blogs served directly from Notion, instant response times optimized with Next.js caching, dynamic sitemaps, and seamless client communication using EmailJS.

---

## 🚀 Key Features

*   **⚡ Next.js App Router & Turbopack:** Utilizes Next.js 16 for high-speed builds, modern bundling, server components, and responsive layouts.
*   **📝 Notion-Powered CMS:** Write and manage your articles directly inside Notion. Your website fetches, parses, and renders database entries including text, lists, and code snippets dynamically.
*   **🏎️ Advanced Next.js Caching (`unstable_cache`):** Notion API calls are cached natively with a 5-minute Time-to-Live (TTL). Page generation is optimized from **~28 seconds down to <200ms**, with automatic revalidation and stale fallbacks.
*   **✉️ Direct Messaging via EmailJS:** Send contact form responses directly to your email inbox from the frontend without setting up a backend server.
*   **🎨 Premium CSS Design:** Smooth glassmorphism accents, hover effects, reading progress indicators, dark/light theme options, and custom syntax highlighting for code segments.
*   **🗺️ Automated SEO:** Generates dynamic `sitemap.xml` (`sitemap.ts`) and `robots.txt` based on published blog posts to maximize search engine indexing.

---

## 📁 Project Architecture

```text
├── next.config.js       # Next.js & Turbopack configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
├── public/              # Static assets (favicons, images)
└── src/
    ├── app/             # Next.js App Router (Layouts & Pages)
    │   ├── blogs/       # Blog listing & dynamic article route ([slug])
    │   ├── layout.tsx   # Global wrapper and meta tags
    │   ├── page.tsx     # Homepage (Main Portfolio)
    │   ├── sitemap.ts   # Dynamic SEO sitemap generator
    │   └── robots.ts    # SEO crawler rules
    ├── components/      # Shared React components (Navbar, Footer, CodeBlock, etc.)
    ├── data/            # Static data structures (portfolioData.ts)
    ├── lib/             # Third-party service clients
    │   └── notion.ts    # Notion Client & cache wrapper
    ├── sections/        # Homepage layout sections (Hero, About, Skills, Projects, etc.)
    └── styles/          # Modular CSS sheets
```

---

## 🛠️ Setup & Installation

### 1. Clone & Install Dependencies
```bash
# Install dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# Notion CMS Configuration
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id

# EmailJS Client Configuration (Optional)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3003
```

---

## 📝 Notion Database Configuration

To use Notion as your blog CMS, set up a database in Notion and share it with your Integration Token. The database must have the following schema:

| Property Name | Property Type | Description |
| :--- | :--- | :--- |
| **`Title`** | `Title` | Title of the blog post |
| **`Slug`** | `Rich text` | URL slug (e.g., `getting-started-with-nextjs`) |
| **`Description`** | `Rich text` | Brief summary of the article |
| **`Published Date`** | `Date` | Article publication date |
| **`Tags`** | `Multi-select`| Categories/Tags (e.g., `React`, `CSS`, `AI`) |
| **`Status`** | `Select` | Set to `Published` for posts to go live on the site |
| **`Cover`** | `Files & media` | (Optional) Page cover image. Falls back to Unsplash if missing. |

---

## 🏎️ Caching & Optimization

Notion API requests are slow (~2-10 seconds per database query due to nested children listings). This project leverages **Next.js Data Caching (`unstable_cache`)** inside `src/lib/notion.ts`:

1.  **Request Cache:** Caches results of `getPublishedPosts` and `getPostBySlug(slug)` under the `published-posts` and `post-by-slug` cache keys.
2.  **Background Revalidation (ISR):** Data is cached for **5 minutes** (`revalidate: 300`). On request, stale cached data is served instantly while a background fetch refreshes the cache for subsequent users.
3.  **Resilience:** If the client experiences network timeout or Notion is down, the caching layers ensure the application stays online by falling back to the last successfully cached copy.

---

## ✉️ EmailJS Contact Form

The contact section uses **EmailJS** for form submissions:
*   Make sure to register on [EmailJS](https://www.emailjs.com/).
*   Create a contact email template matching the fields: `user_name`, `user_email`, `subject`, and `message`.
*   Provide your credentials in `.env.local` to enable it. (It automatically falls back to default staging credentials if left empty).

---

## 💻 Available Scripts

*   `npm run dev` – Starts the development server with Turbopack (defaults to port `3000`, use `-- -p 3003` to override port).
*   `npm run build` – Builds the application for production deployment.
*   `npm run start` – Runs the built Next.js production server.
*   `npm run lint` – Lints code with ESLint.
