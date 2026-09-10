export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  metrics?: string;
  demoUrl?: string;
  githubUrl?: string;
  imageUrl: string;
}

export const PROFILE = {
  name: "Tamanna Kumari Naik",
  role: "Computer Science Undergraduate • AI & Full-Stack Developer",
  headline: "Building intelligent digital experiences with code and AI.",
  bio: "I am a Computer Science undergraduate at GIET University focusing on the intersection of modern web engineering and generative AI workflows. I design and build resilient architectures, LLM prompt pipelines, and intuitive user experiences where technical rigor solves genuine human friction.",
  email: "tamannakumari819@gmail.com",
  github: "https://github.com/TamannaKumariNaik/", // Changed to the real repo owner for the portfolio
  linkedin: "https://linkedin.com/",
  location: "Odisha, India",
  university: "GIET University",
  degree: "B.Tech in Computer Science and Engineering",
  graduation: "2027"
};

export const PROJECTS: Project[] = [
  {
    id: "ai-writing-platform",
    title: "AI Writing & Enhancement Platform",
    category: "AI & Full-Stack",
    description: "An intelligent editorial platform engineered to empower authors. Translates raw draft prose into articulate writing through semantic analysis, prompt orchestration, and contextual synonyms.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "OpenAI API", "Node.js"],
    metrics: "+38% Lexical Register Optimization",
    githubUrl: "https://github.com/TamannaKumariNaik/",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: "morph-slider",
    title: "MorphSlider — WebGL Displacement",
    category: "Creative WebGL",
    description: "A hardware-accelerated image deformation carousel built with OGL and GSAP. Features procedural noise distortion, chromatic aberration, and interactive physics.",
    technologies: ["WebGL", "GLSL Shaders", "React", "GSAP"],
    githubUrl: "https://github.com/TamannaKumariNaik/",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: "semantic-graph",
    title: "Lexicon & Token Cluster Explorer",
    category: "Data Visualization",
    description: "Interactive token distance visualizer that calculates cosine similarity between high-register synonyms across academic corpora.",
    technologies: ["Python", "FastAPI", "TypeScript", "Canvas API"],
    metrics: "Sub-40ms Vector Traversal",
    githubUrl: "https://github.com/TamannaKumariNaik/",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600"
  }
];

export const SKILL_CATEGORIES = [
  {
    title: "Frontend Engineering",
    skills: ["React 18", "TypeScript", "Next.js", "Tailwind CSS", "shadcn/ui", "Framer Motion"]
  },
  {
    title: "Backend & Systems",
    skills: ["Node.js", "Express", "Python", "FastAPI", "RESTful APIs", "SQL / NoSQL"]
  },
  {
    title: "AI & Data Layer",
    skills: ["LLM Orchestration", "Prompt Engineering", "Vector Embeddings", "OpenAI / Claude API"]
  },
  {
    title: "Tooling & Infrastructure",
    skills: ["Git & GitHub", "Vite", "Vercel", "Linux / Bash", "CI/CD Workflows"]
  }
];
