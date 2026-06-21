export interface PersonalInfo {
  name: string;
  title: string;
  subheading: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubLink: string;
  liveLink: string;
  image: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceItem[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Alex Dev",
    title: "Full Stack Developer & AI Engineer",
    subheading: "Building beautiful, functional, and intelligent web experiences.",
    bio: "I am a passionate software engineer specializing in building high-performance web applications and integrating advanced AI capabilities. With a strong eye for design and detail, I turn complex ideas into elegant digital solutions.",
    email: "alex@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    resumeUrl: "#"
  },
  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React / Next.js", level: 90 },
        { name: "JavaScript / TypeScript", level: 95 },
        { name: "CSS3 / Sass / Tailwind", level: 88 },
        { name: "HTML5 / Responsive Design", level: 95 }
      ]
    },
    {
      category: "Backend & DB",
      items: [
        { name: "Node.js / Express", level: 85 },
        { name: "Python / Django", level: 80 },
        { name: "PostgreSQL / MongoDB", level: 82 },
        { name: "GraphQL / REST APIs", level: 90 }
      ]
    },
    {
      category: "DevOps & Tools",
      items: [
        { name: "Git / GitHub Actions", level: 90 },
        { name: "Docker / Kubernetes", level: 75 },
        { name: "AWS / Vercel", level: 80 },
        { name: "AI APIs (OpenAI, Gemini)", level: 85 }
      ]
    }
  ],
  projects: [
    {
      id: 1,
      title: "AI Chat Assistant",
      description: "A real-time intelligent chat interface integrated with Google Gemini API, featuring markdown rendering, code execution, and conversational memory.",
      tags: ["React", "Node.js", "Gemini API", "CSS Modules"],
      githubLink: "https://github.com",
      liveLink: "https://example.com",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Interactive Data Visualizer",
      description: "A beautiful analytics dashboard utilizing D3.js and React for visualizing real-time financial market indicators and stock portfolios.",
      tags: ["React", "D3.js", "TypeScript", "Tailwind"],
      githubLink: "https://github.com",
      liveLink: "https://example.com",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "E-Commerce Cloud Engine",
      description: "A headless commerce engine featuring microservices, Stripe payment processing, complex search queries, and instant checkout capabilities.",
      tags: ["Next.js", "GraphQL", "PostgreSQL", "Stripe"],
      githubLink: "https://github.com",
      liveLink: "https://example.com",
      image: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?q=80&w=600&auto=format&fit=crop"
    }
  ],
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Innovate AI",
      period: "2024 - Present",
      description: "Led a team of frontend developers to build generative AI tools. Reduced page rendering speed by 40% and improved Web Vitals."
    },
    {
      role: "Full Stack Developer",
      company: "ByteCraft Solutions",
      period: "2022 - 2024",
      description: "Developed and maintained multiple React web applications. Integrated payment architectures and built scalable GraphQL APIs."
    },
    {
      role: "Junior Web Developer",
      company: "Pixel Perfect Agency",
      period: "2020 - 2022",
      description: "Collaborated with UI/UX designers to translate Figma visual prototypes into responsive HTML/CSS/React layouts."
    }
  ]
};
