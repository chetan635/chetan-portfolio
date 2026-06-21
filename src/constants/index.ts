export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  KEY: 'theme'
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Blogs', href: '/blogs' },
];

export const MARQUEE_ITEMS = [
  "Full Stack Developer",
  "AI Integration Specialist",
  "UI/UX Enthusiast",
  "Clean Code Advocate",
  "Problem Solver",
  "Vibrant Design"
] as const;

export const SECTION_HEADERS = {
  ABOUT: { subtitle: "Get to know me", title: "About Me" },
  SKILLS: { subtitle: "My capabilities", title: "Skills & Expertise" },
  PROJECTS: { subtitle: "My recent work", title: "Portfolio Projects" },
  EXPERIENCE: { subtitle: "My professional journey", title: "Work Experience" },
  CONTACT: { subtitle: "Reach out", title: "Get In Touch" }
} as const;

export const HERO_STRINGS = {
  BADGE: "Hello, I am",
  BUTTON_PRIMARY: "View Work",
  BUTTON_SECONDARY: "Let's Chat",
  TAB_JS: "developer.js",
  TAB_JSON: "skills.json",
  TAB_MD: "readme.md",
  SCROLL_LABEL: "Scroll to About section"
} as const;

export const HERO_CODE_JS = {
  ROLE: "Full Stack & AI",
  FOCUS: "Beautiful UI & UX",
  SKILLS: ["React", "TypeScript", "Node", "Gemini APIs", "Python"]
} as const;

export const HERO_CODE_JSON = {
  FRONTEND: ["React", "TypeScript", "Sass/Tailwind"],
  BACKEND: ["Node.js", "Express", "Python", "Django"],
  AI: ["OpenAI APIs", "Google Gemini", "RAG"]
} as const;

export const HERO_CODE_MD = {
  HEADING_PREFIX: "# ",
  AVAILABILITY: "Available for freelance & full-time contracts.",
  LINES: [
    "- Full Stack & AI Integration Engineer",
    "- Based in San Francisco, CA",
    "- Passionate about tactile, unique UI layouts"
  ]
} as const;

export const ABOUT_STRINGS = {
  BIO_SUBTEXT: "I love learning new APIs, experimenting with generative models, and engineering high-quality digital assets. When I am not coding, you can find me reading about architecture or exploring outdoor trails.",
  STATS: {
    EDUCATION: { title: "Education", value: "B.S. Computer Science" },
    EXPERIENCE: { title: "Experience", value: "5+ Years Active" },
    LOCATION: { title: "Location", value: "San Francisco, CA" },
    AVAILABILITY: { title: "Availability", value: "Open to Roles" }
  }
} as const;

export const PROJECTS_STRINGS = {
  FILTER_ALL: "All",
  BTN_GITHUB: "GitHub",
  BTN_LIVE: "Live Demo"
} as const;

export const CONTACT_STRINGS = {
  HEADING: "Let's start a project together",
  DESCRIPTION: "I am always open to discussing new web development projects, creative ideas, or opportunities to collaborate. Feel free to shoot me an email or connect with me via social media.",
  EMAIL_ME: "Email Me",
  SOCIALS: "Socials",
  LABEL_NAME: "Full Name",
  LABEL_EMAIL: "Email Address",
  LABEL_MESSAGE: "Message",
  BTN_SEND: "Send Message",
  SUCCESS_HEADING: "Thank you!",
  SUCCESS_MESSAGE: "Your message has been sent successfully. I will get back to you shortly."
} as const;

export const FOOTER_STRINGS = {
  CTA_HEADING: "Let's Build Something Amazing",
  CTA_BODY: "Have an idea or a project in mind? Let's make it a reality together.",
  BUILT_TEXT: "Crafted with Precision"
} as const;
