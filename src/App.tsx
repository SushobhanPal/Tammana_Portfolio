import { useState, useEffect } from 'react';
import { GlowEffect } from '@/components/ui/glow-effect';
import MorphSlider, { type MorphSliderTransition } from '@/components/MorphSlider';

import {
  Sparkles,
  ArrowUpRight,
  BookOpen,
  Award,
  Mail,
  Copy,
  Check,
  Workflow,
  Sparkle,
  Clock,
  Menu,
  X,
  FileText,
  Code2,
  Cpu,
  Globe,
  Send,
  CheckCircle2,
  ArrowUp,
} from 'lucide-react';

/* =========================================================================
   PROJECT & ARCHITECTURE DATA
   ========================================================================= */

interface ProjectItem {
  id: string;
  title: string;
  category: 'AI & NLP' | 'Creative WebGL' | 'Web Systems';
  tag: string;
  description: string;
  architecture: string[];
  metrics: string;
  links: { demo?: string; github?: string };
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'ai-writing-platform',
    title: 'AI Writing & Vocabulary Enhancement Platform',
    category: 'AI & NLP',
    tag: 'Primary Case Study • Active Deployment',
    description:
      'An intelligent editorial environment that translates raw prose into articulate, high-register writing through semantic vector search, prompt pipeline orchestration, and contextual synonym suggestions.',
    architecture: ['React', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Vector Embeddings', 'Node.js'],
    metrics: '+38% Lexical Register Optimization',
    links: { demo: '#', github: 'https://github.com' },
  },
  {
    id: 'morph-slider-webgl',
    title: 'MorphSlider — GPU Displacement & Procedural Shaders',
    category: 'Creative WebGL',
    tag: 'Interactive WebGL Canvas',
    description:
      'A hardware-accelerated image deformation carousel built with OGL and GSAP. Employs procedural simplex noise distortion, chromatic aberration RGB split, and interactive pointer wave physics.',
    architecture: ['OGL WebGL', 'GSAP Timelines', 'GLSL Fragment Shaders', 'React Hooks'],
    metrics: '60 FPS Hardware-Accelerated Transforms',
    links: { demo: '#', github: 'https://github.com' },
  },
  {
    id: 'editorial-monograph',
    title: 'Cognitive Monograph & Typographic System',
    category: 'Web Systems',
    tag: 'Architecture & Design System',
    description:
      'A luxury technical publishing framework inspired by architectural monographs. Features disciplined hairline geometry, contrast-checked midnight tonal depth, and dual editorial serif/monospace typography.',
    architecture: ['TypeScript', 'Tailwind CSS', 'shadcn/ui', 'CSS Variables', 'Accessible DOM'],
    metrics: 'WCAG AAA 7:1 Contrast Compliance',
    links: { demo: '#', github: 'https://github.com' },
  },
  {
    id: 'semantic-graph-engine',
    title: 'Algorithmic Lexicon & Token Cluster Explorer',
    category: 'AI & NLP',
    tag: 'Research Prototype',
    description:
      'Interactive token distance visualizer that calculates cosine similarity between high-register synonyms across academic corpora, visualising subject-predicate semantic clustering.',
    architecture: ['Python / FastAPI', 'TypeScript', 'Vector Distance Algorithms', 'Canvas API'],
    metrics: 'Sub-40ms Vector Neighbor Traversal',
    links: { demo: '#', github: 'https://github.com' },
  },
];

/* Sample presets for the interactive AI Writing Platform simulator */
const SAMPLE_PROMPTS = [
  {
    label: 'Academic Paper',
    input: 'The computational model demonstrates an intriguing approach to semantic synthesis.',
    enhanced: 'The algorithmic architecture exhibits an exceptional paradigm for contextual semantic synthesis.',
    tone: 'Academic Rigor',
    metric: '+42% Precision',
    replacements: [
      { from: 'computational model', to: 'algorithmic architecture' },
      { from: 'intriguing approach', to: 'exceptional paradigm' },
    ],
  },
  {
    label: 'Creative Narrative',
    input: 'The cold wind moved through the dark streets as silence covered the ancient city.',
    enhanced: 'A cutting gale swept through nocturnal thoroughfares as profound stillness enveloped the venerable citadel.',
    tone: 'Evocative Prose',
    metric: '+36% Imagery Density',
    replacements: [
      { from: 'cold wind', to: 'cutting gale' },
      { from: 'dark streets', to: 'nocturnal thoroughfares' },
      { from: 'silence covered', to: 'stillness enveloped' },
    ],
  },
  {
    label: 'Technical RFC',
    input: 'We need to make our database queries faster because the system is getting slow.',
    enhanced: 'We must optimize database retrieval latency to mitigate severe throughput degradation under high concurrency.',
    tone: 'Engineering RFC',
    metric: '+48% Specificity',
    replacements: [
      { from: 'make queries faster', to: 'optimize retrieval latency' },
      { from: 'system is getting slow', to: 'severe throughput degradation' },
    ],
  },
];

/* Skills domain clusters */
interface SkillCluster {
  id: string;
  tier: string;
  title: string;
  color: string;
  summary: string;
  skills: { name: string; proficiency: string; note: string }[];
}

const SKILL_CLUSTERS: SkillCluster[] = [
  {
    id: 'web-architecture',
    tier: 'Tier 01',
    title: 'Web Architecture',
    color: '#164E63',
    summary: 'Type-safe, accessible interfaces that maintain performance and visual elegance.',
    skills: [
      { name: 'React 18 / 19', proficiency: 'Advanced', note: 'Concurrent rendering, custom hooks, memoization' },
      { name: 'TypeScript', proficiency: 'Strict', note: 'Generics, union discrimination, module augmentation' },
      { name: 'Next.js', proficiency: 'Proficient', note: 'App Router, Server Components, SEO optimization' },
      { name: 'Tailwind CSS', proficiency: 'Advanced', note: 'Custom design systems, CSS variables, tokens' },
      { name: 'shadcn/ui', proficiency: 'Advanced', note: 'Primitive component composition & CLI orchestration' },
      { name: 'HTML5 / Semantic DOM', proficiency: 'Expert', note: 'ARIA landmark compliance, high-contrast layouts' },
    ],
  },
  {
    id: 'ai-nlp-layer',
    tier: 'Tier 02',
    title: 'AI & Semantic Layer',
    color: '#7E5265',
    summary: 'Bridging large language models with application logic to construct context-aware tools.',
    skills: [
      { name: 'Prompt Engineering', proficiency: 'Advanced', note: 'Few-shot framing, structural output schemas' },
      { name: 'LLM Orchestration', proficiency: 'Proficient', note: 'OpenAI API, Anthropic Claude, rate limiting' },
      { name: 'Vector Embeddings', proficiency: 'Working Knowledge', note: 'Cosine distance, semantic neighbor maps' },
      { name: 'Structured JSON Outputs', proficiency: 'Advanced', note: 'Strict Zod / JSON Schema validation' },
      { name: 'Context Optimization', proficiency: 'Proficient', note: 'Token budgeting, sliding window contexts' },
    ],
  },
  {
    id: 'infrastructure-tooling',
    tier: 'Tier 03',
    title: 'Infrastructure & Tools',
    color: '#D4AF37',
    summary: 'Version control, automated build pipelines, and reliable deployment environments.',
    skills: [
      { name: 'Git & GitHub Flow', proficiency: 'Advanced', note: 'Branching strategies, semantic commits, PR reviews' },
      { name: 'Vite & Bundlers', proficiency: 'Advanced', note: 'HMR tuning, path aliasing, code splitting' },
      { name: 'Node.js Ecosystem', proficiency: 'Proficient', note: 'npm/npx orchestration, scripts, local servers' },
      { name: 'Linux / Bash Basics', proficiency: 'Working Knowledge', note: 'Shell scripting, environment variables' },
      { name: 'Vercel Deployment', proficiency: 'Advanced', note: 'Preview deployments, edge network distribution' },
    ],
  },
  {
    id: 'working-style',
    tier: 'Tier 04',
    title: 'Cognitive & Working Style',
    color: '#9CA3AF',
    summary: 'Cognitive and collaborative qualities that ensure cohesive project execution.',
    skills: [
      { name: 'Technical Storytelling', proficiency: 'Native', note: 'Transforming dense architecture into clear narratives' },
      { name: 'Systems Thinking', proficiency: 'Native', note: 'End-to-end component lifecycle comprehension' },
      { name: 'Empathetic User Research', proficiency: 'Native', note: 'User journey mapping, cognitive load reduction' },
      { name: 'Rapid Prototyping', proficiency: 'Advanced', note: 'Turning concept briefs into functioning code within hours' },
      { name: 'Editorial Precision', proficiency: 'Native', note: 'Zero toleration for misaligned pixels or typo clutter' },
    ],
  },
];

export default function App() {
  /* =========================================================================
     STATE MANAGEMENT
     ========================================================================= */
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProjectFilter, setActiveProjectFilter] = useState<'All' | 'AI & NLP' | 'Creative WebGL' | 'Web Systems'>('All');
  const [selectedSkillCluster, setSelectedSkillCluster] = useState<string>('web-architecture');
  const [showDossierModal, setShowDossierModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  /* Live IST Clock */
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  /* Scroll spy for scroll-to-top button */
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Interactive Simulator State */
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [inputText, setInputText] = useState(SAMPLE_PROMPTS[0].input);
  const [activeTab, setActiveTab] = useState<'preview' | 'pipeline' | 'synonyms'>('preview');

  const handleSelectSample = (index: number) => {
    setSelectedPromptIndex(index);
    setInputText(SAMPLE_PROMPTS[index].input);
  };

  /* MorphSlider State */
  const morphItems = [
    {
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
      caption: 'Neural Architecture & Generative Workflows',
    },
    {
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop',
      caption: 'Contextual Semantic Synthesis & LLM Pipelines',
    },
    {
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
      caption: 'GPU Displacement & Interactive WebGL Shaders',
    },
    {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      caption: 'Computational Monograph & Editorial Systems',
    },
  ];
  const [sliderTransition, setSliderTransition] = useState<MorphSliderTransition>('melt');

  /* Contact Form State */
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formType, setFormType] = useState('Summer Internship 2027');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormName('');
        setFormEmail('');
        setFormMessage('');
        setFormSubmitted(false);
      }, 5000);
    }, 900);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('tamannakumari819@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* Filtered projects */
  const filteredProjects = activeProjectFilter === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeProjectFilter);

  const activeClusterData = SKILL_CLUSTERS.find((c) => c.id === selectedSkillCluster) || SKILL_CLUSTERS[0];

  return (
    <div className='min-h-screen bg-[#0B0F19] text-[#F3F4F6] font-sans antialiased selection:bg-[#D4AF37]/25 selection:text-[#F3F4F6] flex flex-col relative'>
      {/* =====================================================================
          1. EDITORIAL HEADER & LIVE TIME TICKER
          ===================================================================== */}
      <header className='sticky top-0 z-50 border-b border-[#1F293D] bg-[#0B0F19]/95 backdrop-blur-md px-4 sm:px-6 py-3.5 transition-all'>
        <div className='max-w-6xl mx-auto flex items-center justify-between'>
          {/* Brand Signature Monogram */}
          <a href='#' className='flex items-center gap-3 group'>
            <div className='flex h-8 w-8 items-center justify-center rounded-sm bg-[#111726] border border-[#1F293D] text-[#D4AF37] font-mono text-xs font-bold transition-all group-hover:border-[#D4AF37] group-hover:shadow-[0_0_12px_rgba(212,175,55,0.2)]'>
              TK
            </div>
            <div>
              <span className='font-mono text-xs tracking-wider uppercase text-[#F3F4F6] block group-hover:text-[#D4AF37] transition-colors'>
                Tamanna Kumari Naik
              </span>
              <span className='font-mono text-[10px] text-[#9CA3AF] block'>
                B.Tech CSE • GIET University
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className='hidden md:flex items-center gap-7 font-mono text-xs tracking-wider uppercase text-[#9CA3AF]'>
            <a href='#about' className='hover:text-[#F3F4F6] transition-colors'>01 // About</a>
            <a href='#projects' className='hover:text-[#F3F4F6] transition-colors'>02 // Projects</a>
            <a href='#skills' className='hover:text-[#F3F4F6] transition-colors'>03 // Skills</a>
            <a href='#education' className='hover:text-[#F3F4F6] transition-colors'>04 // Education</a>
            <a href='#contact' className='hover:text-[#D4AF37] transition-colors'>05 // Contact</a>
          </nav>

          {/* Header Actions: Live Clock, Dossier & Contact */}
          <div className='hidden sm:flex items-center gap-3'>
            {/* Live UTC+5:30 IST Clock */}
            <div className='flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#111726] border border-[#1F293D] font-mono text-[11px] text-[#9CA3AF]' title='Live local time in Odisha, India'>
              <Clock className='h-3 w-3 text-[#D4AF37]' />
              <span>{currentTime || 'IST'}</span>
            </div>

            {/* Dossier / CV Modal Trigger */}
            <button
              type='button'
              onClick={() => setShowDossierModal(true)}
              className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-[#1F293D] bg-[#111726] font-mono text-[11px] text-[#F3F4F6] hover:border-[#D4AF37]/60 transition-colors'
            >
              <FileText className='h-3 w-3 text-[#D4AF37]' />
              <span>Dossier</span>
            </button>

            {/* Primary Action Button */}
            <a
              href='#contact'
              className='inline-flex items-center gap-1.5 rounded-sm bg-[#D4AF37] px-3.5 py-1 font-mono text-xs font-bold text-[#0B0F19] hover:bg-[#E5B842] transition-colors shadow-sm'
            >
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className='flex items-center gap-2 md:hidden'>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='p-2 rounded-sm border border-[#1F293D] bg-[#111726] text-[#F3F4F6] hover:border-[#D4AF37]'
              aria-label='Toggle Navigation'
            >
              {mobileMenuOpen ? <X className='h-5 w-5 text-[#D4AF37]' /> : <Menu className='h-5 w-5' />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Drawer */}
        {mobileMenuOpen && (
          <div className='md:hidden mt-3 pt-4 border-t border-[#1F293D] font-mono text-xs uppercase tracking-wider space-y-3 bg-[#0B0F19] pb-4'>
            <a
              href='#about'
              onClick={() => setMobileMenuOpen(false)}
              className='block py-2 text-[#9CA3AF] hover:text-[#F3F4F6]'
            >
              01 // About
            </a>
            <a
              href='#projects'
              onClick={() => setMobileMenuOpen(false)}
              className='block py-2 text-[#9CA3AF] hover:text-[#F3F4F6]'
            >
              02 // Projects
            </a>
            <a
              href='#skills'
              onClick={() => setMobileMenuOpen(false)}
              className='block py-2 text-[#9CA3AF] hover:text-[#F3F4F6]'
            >
              03 // Skills
            </a>
            <a
              href='#education'
              onClick={() => setMobileMenuOpen(false)}
              className='block py-2 text-[#9CA3AF] hover:text-[#F3F4F6]'
            >
              04 // Education
            </a>
            <a
              href='#contact'
              onClick={() => setMobileMenuOpen(false)}
              className='block py-2 text-[#D4AF37]'
            >
              05 // Contact
            </a>
            <div className='pt-2 flex items-center gap-2'>
              <button
                type='button'
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowDossierModal(true);
                }}
                className='w-full py-2.5 rounded-sm bg-[#111726] border border-[#1F293D] text-center text-xs text-[#D4AF37] font-semibold'
              >
                View Academic Dossier
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          MAIN EDITORIAL CONTENT
          ===================================================================== */}
      <main className='flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16 space-y-24 md:space-y-32'>
        {/* ===================================================================
            SECTION 01: HERO SECTION
            =================================================================== */}
        <section className='relative pt-4 pb-10 border-b border-[#1F293D]'>
          {/* Top Metadata Header */}
          <div className='flex flex-wrap items-center justify-between gap-3 mb-6'>
            <span className='inline-flex items-center gap-2 rounded-sm bg-[#111726] border border-[#1F293D] px-2.5 py-1 font-mono text-[11px] text-[#D4AF37]'>
              <span className='h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse' />
              AVAILABLE FOR SUMMER 2027 INTERNSHIPS & CONTRACTS
            </span>
            <div className='flex items-center gap-3 font-mono text-xs text-[#9CA3AF]'>
              <span>AFFILIATION // GIET University</span>
              <span className='hidden sm:inline'>•</span>
              <span className='hidden sm:inline'>LOC // Odisha, India</span>
            </div>
          </div>

          {/* Lead Headline */}
          <h1 className='font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#F3F4F6] max-w-4xl leading-[1.12] mb-8'>
            Synthesizing <em className='italic text-[#D4AF37] font-serif'>computational logic</em> with narrative creativity & intelligent systems.
          </h1>

          {/* Body Bio Text */}
          <p className='text-base sm:text-lg text-[#9CA3AF] max-w-2xl leading-relaxed mb-10'>
            I am <strong className='text-[#F3F4F6] font-medium'>Tamanna Kumari Naik</strong>, an engineer and writer constructing resilient web architectures, LLM prompt pipelines, and editorial user experiences. Dedicated to building software where intellectual rigor solves genuine human friction.
          </p>

          {/* Primary Action Row */}
          <div className='flex flex-wrap items-center gap-4'>
            {/* Primary Button with Antique Gold Glow Aura */}
            <div className='relative inline-block'>
              <GlowEffect
                colors={['#D4AF37', '#164E63', '#7E5265']}
                mode='rotate'
                blur='soft'
                scale={1.04}
                duration={5}
              />
              <a
                href='#projects'
                className='relative z-10 inline-flex items-center gap-2 rounded-sm bg-[#D4AF37] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#0B0F19] hover:bg-[#E5B842] transition-colors shadow-lg'
              >
                <span>Explore Featured Work</span>
                <ArrowUpRight className='h-4 w-4' />
              </a>
            </div>

            <a
              href='#contact'
              className='inline-flex items-center gap-2 rounded-sm border border-[#1F293D] bg-[#111726] px-6 py-3 font-mono text-xs uppercase tracking-wider text-[#F3F4F6] hover:border-[#D4AF37]/60 hover:bg-[#161F31] transition-colors'
            >
              <span>Initiate Collaboration</span>
            </a>

            {/* 1-Click Copy Email Button */}
            <button
              type='button'
              onClick={copyEmail}
              className='inline-flex items-center gap-2 rounded-sm border border-[#1F293D] bg-[#111726] px-4 py-3 font-mono text-xs text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-[#F3F4F6]/40 transition-colors'
              title='Copy email to clipboard'
            >
              {copiedEmail ? <Check className='h-3.5 w-3.5 text-emerald-400' /> : <Copy className='h-3.5 w-3.5' />}
              <span>{copiedEmail ? 'tamannakumari819@gmail.com copied' : 'Copy Email'}</span>
            </button>
          </div>

          {/* Quick Metrics Ticker */}
          <div className='mt-12 pt-8 border-t border-[#1F293D]/70 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs'>
            <div className='p-3.5 rounded-sm bg-[#111726]/60 border border-[#1F293D]'>
              <span className='text-[10px] text-[#D4AF37] uppercase block'>Undergraduate</span>
              <span className='text-base font-serif text-[#F3F4F6] block mt-0.5'>2nd Year B.Tech</span>
              <span className='text-[10px] text-[#9CA3AF]'>GIET University, CSE</span>
            </div>
            <div className='p-3.5 rounded-sm bg-[#111726]/60 border border-[#1F293D]'>
              <span className='text-[10px] text-[#D4AF37] uppercase block'>Specialization</span>
              <span className='text-base font-serif text-[#F3F4F6] block mt-0.5'>Full-Stack & AI</span>
              <span className='text-[10px] text-[#9CA3AF]'>React • TS • Prompt Flows</span>
            </div>
            <div className='p-3.5 rounded-sm bg-[#111726]/60 border border-[#1F293D]'>
              <span className='text-[10px] text-[#D4AF37] uppercase block'>Architecture</span>
              <span className='text-base font-serif text-[#F3F4F6] block mt-0.5'>Type-Safe & Clean</span>
              <span className='text-[10px] text-[#9CA3AF]'>shadcn • Tailwind • OGL</span>
            </div>
            <div className='p-3.5 rounded-sm bg-[#111726]/60 border border-[#1F293D]'>
              <span className='text-[10px] text-[#D4AF37] uppercase block'>Status</span>
              <span className='text-base font-serif text-[#F3F4F6] block mt-0.5'>Internship Open</span>
              <span className='text-[10px] text-[#9CA3AF]'>Summer 2027 Cohort</span>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 02: ABOUT — PERSPECTIVE & INTELLECTUAL GROUNDING
            =================================================================== */}
        <section id='about' className='grid grid-cols-1 md:grid-cols-12 gap-10 items-start pt-2'>
          <div className='md:col-span-4 font-mono'>
            <span className='text-xs uppercase tracking-widest text-[#D4AF37] block mb-2'>
              // 01 Context & Philosophy
            </span>
            <h2 className='font-serif text-2xl sm:text-3xl text-[#F3F4F6] font-normal leading-snug'>
              Engineering as an <em className='italic text-[#D4AF37]'>act of invention</em>.
            </h2>
            <div className='mt-6 hidden md:block p-4 rounded-sm bg-[#111726] border border-[#1F293D] text-xs text-[#9CA3AF] space-y-2'>
              <span className='text-[10px] text-[#D4AF37] uppercase font-bold block'>Key Tenet</span>
              <p>
                Every design token, component abstraction, and animation curve must serve an unambiguous communicative function.
              </p>
            </div>
          </div>

          <div className='md:col-span-8 space-y-6 text-[#9CA3AF] text-base leading-relaxed'>
            <p>
              I approach software engineering not as an isolated assembly of syntax, but as a deliberate bridge between structural problem-solving and narrative clarity. As a Computer Science undergraduate at GIET University, my focus centers on the intersection of <strong className='text-[#F3F4F6]'>modern web engineering</strong> and <strong className='text-[#F3F4F6]'>generative AI workflows</strong>.
            </p>
            <p>
              Whether developing intelligent lexical tools that assist writers in discovering nuanced vocabulary or architecting modular frontend design systems, my work prioritizes <strong className='text-[#F3F4F6]'>contrast, accessibility, and conceptual honesty</strong>. I avoid gratuitous trends in favor of disciplined interfaces where every token, type choice, and animation serves an unambiguous purpose.
            </p>

            {/* Domain Credential Badges */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-mono text-xs'>
              <div className='p-4 rounded-sm bg-[#111726] border border-[#1F293D]'>
                <span className='text-[10px] uppercase text-[#D4AF37] block mb-1'>Academic Status</span>
                <span className='text-[#F3F4F6] font-medium block'>B.Tech CSE (2nd Year)</span>
                <span className='text-[#9CA3AF] text-[11px]'>GIET University, Gunupur</span>
              </div>
              <div className='p-4 rounded-sm bg-[#111726] border border-[#1F293D]'>
                <span className='text-[10px] uppercase text-[#D4AF37] block mb-1'>Engineering Focus</span>
                <span className='text-[#F3F4F6] font-medium block'>Full-Stack & AI Layer</span>
                <span className='text-[#9CA3AF] text-[11px]'>React, TypeScript, LLM Orchestration</span>
              </div>
              <div className='p-4 rounded-sm bg-[#111726] border border-[#1F293D]'>
                <span className='text-[10px] uppercase text-[#D4AF37] block mb-1'>Methodology</span>
                <span className='text-[#F3F4F6] font-medium block'>Empathetic Logic</span>
                <span className='text-[#9CA3AF] text-[11px]'>Narrative + Systems Thinking</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 03: PROJECTS (PRIMARY FOCAL ANCHOR)
            =================================================================== */}
        <section id='projects' className='space-y-10'>
          {/* Header & Filter Controls */}
          <div className='flex flex-col md:flex-row md:items-end justify-between border-b border-[#1F293D] pb-6 gap-4'>
            <div>
              <span className='font-mono text-xs uppercase tracking-widest text-[#D4AF37] block mb-1'>
                // 02 Selected Artifacts
              </span>
              <h2 className='font-serif text-3xl sm:text-4xl text-[#F3F4F6] font-normal'>
                Featured <em className='italic text-[#D4AF37]'>Projects & Systems</em>
              </h2>
            </div>

            {/* Filter Pills */}
            <div className='flex flex-wrap items-center gap-1.5 font-mono text-xs'>
              {(['All', 'AI & NLP', 'Creative WebGL', 'Web Systems'] as const).map((cat) => (
                <button
                  key={cat}
                  type='button'
                  onClick={() => setActiveProjectFilter(cat)}
                  className={`px-3 py-1 rounded-sm transition-colors text-[11px] ${
                    activeProjectFilter === cat
                      ? 'bg-[#D4AF37] text-[#0B0F19] font-bold'
                      : 'bg-[#111726] text-[#9CA3AF] hover:text-[#F3F4F6] border border-[#1F293D]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Lead Project: AI Writing & Vocabulary Enhancement Platform */}
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start rounded-md border border-[#1F293D] bg-[#111726] p-6 sm:p-8 relative overflow-hidden'>
            <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#164E63] to-transparent' />

            {/* Left Column: Context & Spec */}
            <div className='lg:col-span-5 space-y-6'>
              <div className='flex items-center gap-2 font-mono text-[11px] text-[#D4AF37]'>
                <span className='h-2 w-2 rounded-full bg-[#D4AF37]' />
                <span>PRIMARY CASE STUDY • ACTIVE RESEARCH</span>
              </div>

              <div>
                <h3 className='font-serif text-2xl sm:text-3xl text-[#F3F4F6] font-normal mb-3'>
                  AI Writing & Vocabulary Enhancement Platform
                </h3>
                <p className='text-sm text-[#9CA3AF] leading-relaxed'>
                  An intelligent editorial platform engineered to empower authors, technical writers, and students. Translates raw draft prose into articulate, high-register writing through real-time semantic analysis, prompt pipeline orchestration, and contextual synonym suggestions.
                </p>
              </div>

              {/* Architectural Highlights */}
              <div className='space-y-3 pt-2 font-mono text-xs'>
                <div className='flex items-start gap-3 p-3 rounded-sm bg-[#161F31] border border-[#1F293D]'>
                  <Workflow className='h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5' />
                  <div>
                    <strong className='text-[#F3F4F6] block'>Prompt Pipeline Orchestration</strong>
                    <span className='text-[11px] text-[#9CA3AF]'>Chains structural outlining, tone calibration, and lexical refinement.</span>
                  </div>
                </div>

                <div className='flex items-start gap-3 p-3 rounded-sm bg-[#161F31] border border-[#1F293D]'>
                  <Sparkles className='h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5' />
                  <div>
                    <strong className='text-[#F3F4F6] block'>Contextual Lexical Enhancement</strong>
                    <span className='text-[11px] text-[#9CA3AF]'>Replaces static thesaurus lookups with semantic vector-aware synonyms.</span>
                  </div>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className='flex flex-wrap gap-2 pt-2 font-mono text-[11px]'>
                {['React', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Vector Embeddings', 'Node.js'].map((tech) => (
                  <span
                    key={tech}
                    className='rounded-sm bg-[#0B0F19] px-2.5 py-1 text-[#9CA3AF] border border-[#1F293D]'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Live Interactive Simulator */}
            <div className='lg:col-span-7 rounded-sm border border-[#1F293D] bg-[#0B0F19] overflow-hidden'>
              {/* Simulator Header with Interactive Tabs */}
              <div className='flex flex-wrap items-center justify-between border-b border-[#1F293D] bg-[#111726] px-4 py-2.5 gap-2'>
                <div className='flex items-center gap-2'>
                  <span className='h-2.5 w-2.5 rounded-full bg-[#1F293D]' />
                  <span className='h-2.5 w-2.5 rounded-full bg-[#1F293D]' />
                  <span className='h-2.5 w-2.5 rounded-full bg-[#1F293D]' />
                  <span className='font-mono text-xs text-[#9CA3AF] ml-2'>
                    lexical-engine.v2.live
                  </span>
                </div>

                <div className='flex items-center gap-1 font-mono text-[11px]'>
                  <button
                    type='button'
                    onClick={() => setActiveTab('preview')}
                    className={`px-2.5 py-1 rounded-sm transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-[#161F31] text-[#D4AF37] border border-[#1F293D]'
                        : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                    }`}
                  >
                    Simulator
                  </button>
                  <button
                    type='button'
                    onClick={() => setActiveTab('pipeline')}
                    className={`px-2.5 py-1 rounded-sm transition-colors ${
                      activeTab === 'pipeline'
                        ? 'bg-[#161F31] text-[#D4AF37] border border-[#1F293D]'
                        : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                    }`}
                  >
                    Pipeline Log
                  </button>
                  <button
                    type='button'
                    onClick={() => setActiveTab('synonyms')}
                    className={`px-2.5 py-1 rounded-sm transition-colors ${
                      activeTab === 'synonyms'
                        ? 'bg-[#161F31] text-[#D4AF37] border border-[#1F293D]'
                        : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                    }`}
                  >
                    Synonyms Map
                  </button>
                </div>
              </div>

              {/* Tab 1: Live Interactive Simulator */}
              {activeTab === 'preview' && (
                <div className='p-5 space-y-4 font-mono text-xs'>
                  {/* Preset Sample Buttons */}
                  <div>
                    <div className='flex items-center justify-between mb-1.5'>
                      <label className='text-[10px] uppercase text-[#9CA3AF] tracking-wider block'>
                        // Test Preset Samples:
                      </label>
                      <span className='text-[10px] text-[#D4AF37] font-semibold'>
                        Active: {SAMPLE_PROMPTS[selectedPromptIndex].tone}
                      </span>
                    </div>
                    <div className='flex flex-wrap gap-2 mb-3'>
                      {SAMPLE_PROMPTS.map((sample, idx) => (
                        <button
                          key={sample.label}
                          type='button'
                          onClick={() => handleSelectSample(idx)}
                          className={`px-2.5 py-1 rounded-sm text-[11px] transition-colors ${
                            selectedPromptIndex === idx
                              ? 'bg-[#D4AF37] text-[#0B0F19] font-bold'
                              : 'bg-[#111726] text-[#9CA3AF] hover:text-[#F3F4F6] border border-[#1F293D]'
                          }`}
                        >
                          {sample.label}
                        </button>
                      ))}
                    </div>

                    <label className='text-[10px] uppercase text-[#9CA3AF] tracking-wider block mb-1'>
                      // Input Draft Sentence (Editable in Real Time):
                    </label>
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={3}
                      className='w-full rounded-sm bg-[#111726] border border-[#1F293D] p-3 text-[#F3F4F6] text-xs focus:border-[#D4AF37] focus:outline-none resize-none leading-relaxed'
                    />
                  </div>

                  {/* AI Enhanced Synthesis Box */}
                  <div className='rounded-sm bg-[#161F31] border border-[#1F293D] p-4 space-y-3'>
                    <div className='flex items-center justify-between text-[11px] text-[#D4AF37]'>
                      <span className='flex items-center gap-1.5'>
                        <Sparkle className='h-3 w-3' />
                        AI Enhanced Synthesis:
                      </span>
                      <span className='text-[#9CA3AF] font-mono'>
                        {SAMPLE_PROMPTS[selectedPromptIndex].metric}
                      </span>
                    </div>

                    <p className='text-sm text-[#F3F4F6] font-serif leading-relaxed border-l-2 border-[#D4AF37] pl-3 py-0.5'>
                      “{SAMPLE_PROMPTS[selectedPromptIndex].enhanced}”
                    </p>

                    <div className='pt-2 border-t border-[#1F293D] flex flex-wrap items-center gap-2 text-[10px] text-[#9CA3AF]'>
                      <span className='text-[#F3F4F6] font-semibold'>Key Contextual Replacements:</span>
                      {SAMPLE_PROMPTS[selectedPromptIndex].replacements.map((r, i) => (
                        <span key={i} className='px-1.5 py-0.5 bg-[#111726] rounded text-[#D4AF37] border border-[#1F293D]'>
                          {r.from} → {r.to}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Prompt Pipeline Inspector */}
              {activeTab === 'pipeline' && (
                <div className='p-5 space-y-3 font-mono text-xs text-[#9CA3AF] leading-relaxed'>
                  <div className='p-3 bg-[#111726] rounded-sm border border-[#1F293D]'>
                    <span className='text-[#D4AF37] text-[10px] block'>STAGE 01 // Structural Tokenization</span>
                    <p className='text-[#F3F4F6] mt-1'>Extracting syntactic predicates and subject semantic density index.</p>
                  </div>
                  <div className='p-3 bg-[#111726] rounded-sm border border-[#1F293D]'>
                    <span className='text-[#D4AF37] text-[10px] block'>STAGE 02 // Embedding Distance Lookup</span>
                    <p className='text-[#F3F4F6] mt-1'>Querying cosine proximity against formal academic and literature corpora.</p>
                  </div>
                  <div className='p-3 bg-[#111726] rounded-sm border border-[#1F293D]'>
                    <span className='text-[#D4AF37] text-[10px] block'>STAGE 03 // Output Re-alignment</span>
                    <p className='text-[#F3F4F6] mt-1'>Verifying tone neutrality without introducing artificial verbosity.</p>
                  </div>
                </div>
              )}

              {/* Tab 3: Synonyms Vector Map */}
              {activeTab === 'synonyms' && (
                <div className='p-5 font-mono text-xs space-y-3'>
                  <span className='text-[10px] text-[#9CA3AF] block uppercase'>
                    High-register vector neighbours for input tokens:
                  </span>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='p-3 bg-[#111726] rounded border border-[#1F293D]'>
                      <span className='text-[#D4AF37] block font-bold'>approach (n.)</span>
                      <ul className='mt-1 text-[#9CA3AF] space-y-1 text-[11px]'>
                        <li>• paradigm (94% match)</li>
                        <li>• methodology (91%)</li>
                        <li>• schema (88%)</li>
                      </ul>
                    </div>
                    <div className='p-3 bg-[#111726] rounded border border-[#1F293D]'>
                      <span className='text-[#D4AF37] block font-bold'>intriguing (adj.)</span>
                      <ul className='mt-1 text-[#9CA3AF] space-y-1 text-[11px]'>
                        <li>• compelling (96% match)</li>
                        <li>• exceptional (92%)</li>
                        <li>• salient (89%)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Second Featured Artifact: MorphSlider WebGL GPU Displacement */}
          <div className='rounded-md border border-[#1F293D] bg-[#111726] p-6 sm:p-8 space-y-6'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F293D] pb-4'>
              <div>
                <div className='flex items-center gap-2 font-mono text-[11px] text-[#D4AF37]'>
                  <span className='h-2 w-2 rounded-full bg-[#164E63]' />
                  <span>INTERACTIVE VISUAL ARTIFACT • WEBGL GPU MORPH</span>
                </div>
                <h3 className='font-serif text-2xl text-[#F3F4F6] font-normal mt-1'>
                  MorphSlider — GPU Displacement & Procedural Warp Transitions
                </h3>
              </div>

              {/* Transition Selector Controls */}
              <div className='flex items-center gap-1.5 font-mono text-xs'>
                <span className='text-[#9CA3AF] text-[11px] mr-1 hidden sm:inline'>Morph Mode:</span>
                {(['melt', 'ripple', 'shear', 'swirl'] as const).map((t) => (
                  <button
                    key={t}
                    type='button'
                    onClick={() => setSliderTransition(t)}
                    className={`px-2.5 py-1 rounded-sm transition-colors uppercase text-[10px] ${
                      sliderTransition === t
                        ? 'bg-[#D4AF37] text-[#0B0F19] font-bold'
                        : 'bg-[#161F31] text-[#9CA3AF] hover:text-[#F3F4F6] border border-[#1F293D]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <p className='text-xs text-[#9CA3AF] leading-relaxed max-w-2xl'>
              A GPU-accelerated WebGL slider driven by <strong>OGL</strong> shaders and <strong>GSAP</strong> timelines. Features procedural noise field warping, chromatic aberration RGB split, interactive pointer ripples, and mouse/touch drag gestures.
            </p>

            {/* MorphSlider Canvas Stage */}
            <div className='relative h-[380px] sm:h-[460px] w-full rounded-lg overflow-hidden border border-[#1F293D] shadow-2xl bg-[#0c0c0e]'>
              <MorphSlider
                items={morphItems}
                transition={sliderTransition}
                intensity={0.55}
                aberration={0.35}
                drift={0.4}
                autoplay
                autoplayDelay={4}
                radius={8}
              />
            </div>
          </div>

          {/* Grid of Remaining Project Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {filteredProjects
              .filter((p) => p.id !== 'ai-writing-platform' && p.id !== 'morph-slider-webgl')
              .map((project) => (
                <div
                  key={project.id}
                  className='p-6 rounded-md bg-[#111726] border border-[#1F293D] flex flex-col justify-between space-y-5 hover:border-[#D4AF37]/50 transition-colors group'
                >
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <span className='font-mono text-[10px] uppercase text-[#D4AF37] bg-[#161F31] px-2 py-0.5 rounded-sm border border-[#1F293D]'>
                        {project.tag}
                      </span>
                      <span className='font-mono text-[10px] text-[#9CA3AF]'>{project.metrics}</span>
                    </div>
                    <h4 className='font-serif text-xl text-[#F3F4F6] font-normal group-hover:text-[#D4AF37] transition-colors'>
                      {project.title}
                    </h4>
                    <p className='text-xs text-[#9CA3AF] leading-relaxed'>
                      {project.description}
                    </p>
                  </div>

                  <div className='pt-3 border-t border-[#1F293D] space-y-3'>
                    <div className='flex flex-wrap gap-1.5 font-mono text-[10px] text-[#9CA3AF]'>
                      {project.architecture.map((tech) => (
                        <span key={tech} className='bg-[#0B0F19] px-2 py-0.5 rounded border border-[#1F293D]'>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* ===================================================================
            SECTION 04: SKILLS — INTERACTIVE DOMAIN CLUSTERS
            =================================================================== */}
        <section id='skills' className='space-y-10'>
          <div className='border-b border-[#1F293D] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3'>
            <div>
              <span className='font-mono text-xs uppercase tracking-widest text-[#D4AF37] block mb-1'>
                // 03 Competencies & Architecture
              </span>
              <h2 className='font-serif text-3xl sm:text-4xl text-[#F3F4F6] font-normal'>
                Practical <em className='italic text-[#D4AF37]'>Domain Clusters</em>
              </h2>
            </div>
            <span className='font-mono text-xs text-[#9CA3AF]'>
              Select any domain tier below to inspect architectural details.
            </span>
          </div>

          {/* Interactive Tier Tabs */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            {SKILL_CLUSTERS.map((cluster) => {
              const isActive = selectedSkillCluster === cluster.id;
              return (
                <button
                  key={cluster.id}
                  type='button'
                  onClick={() => setSelectedSkillCluster(cluster.id)}
                  className={`p-5 rounded-md text-left transition-all border ${
                    isActive
                      ? 'bg-[#161F31] border-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.15)]'
                      : 'bg-[#111726] border-[#1F293D] hover:border-[#F3F4F6]/40'
                  }`}
                >
                  <div className='flex items-center gap-2 mb-2'>
                    <span
                      className='h-2 w-2 rounded-full inline-block'
                      style={{ backgroundColor: cluster.color }}
                    />
                    <span className='font-mono text-[10px] uppercase text-[#9CA3AF]'>{cluster.tier}</span>
                  </div>
                  <h4 className='font-serif text-lg text-[#F3F4F6] font-normal mb-1'>{cluster.title}</h4>
                  <p className='text-[11px] text-[#9CA3AF] line-clamp-2 leading-relaxed'>{cluster.summary}</p>
                </button>
              );
            })}
          </div>

          {/* Active Cluster Inspector Panel */}
          <div className='rounded-md border border-[#1F293D] bg-[#111726] p-6 sm:p-8 space-y-6'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1F293D] pb-4 gap-2'>
              <div className='flex items-center gap-2.5'>
                <span
                  className='h-3 w-3 rounded-full'
                  style={{ backgroundColor: activeClusterData.color }}
                />
                <h3 className='font-serif text-2xl text-[#F3F4F6] font-normal'>
                  {activeClusterData.title} & Competency Breakdown
                </h3>
              </div>
              <span className='font-mono text-xs text-[#D4AF37] uppercase'>
                {activeClusterData.tier} Specifications
              </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {activeClusterData.skills.map((skill) => (
                <div
                  key={skill.name}
                  className='p-4 rounded-sm bg-[#0B0F19] border border-[#1F293D] space-y-1.5 hover:border-[#D4AF37]/50 transition-colors'
                >
                  <div className='flex items-center justify-between'>
                    <span className='font-mono text-xs text-[#F3F4F6] font-bold'>{skill.name}</span>
                    <span className='font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#161F31] text-[#D4AF37] border border-[#1F293D]'>
                      {skill.proficiency}
                    </span>
                  </div>
                  <p className='text-xs text-[#9CA3AF] leading-relaxed'>{skill.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 05: EDUCATION & ACHIEVEMENTS
            =================================================================== */}
        <section id='education' className='grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2'>
          {/* Education Card */}
          <div className='md:col-span-6 space-y-6'>
            <div className='border-b border-[#1F293D] pb-4'>
              <span className='font-mono text-xs uppercase tracking-widest text-[#D4AF37] block mb-1'>
                // 04 Academic Foundation
              </span>
              <h2 className='font-serif text-2xl sm:text-3xl text-[#F3F4F6] font-normal'>
                Education & Credentials
              </h2>
            </div>

            <div className='p-6 rounded-md bg-[#111726] border border-[#1F293D] space-y-4'>
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <h3 className='font-serif text-xl text-[#F3F4F6] font-normal'>
                    Bachelor of Technology in Computer Science & Engineering
                  </h3>
                  <p className='font-mono text-xs text-[#D4AF37] mt-0.5'>
                    GIET University, Gunupur, Odisha
                  </p>
                </div>
                <span className='font-mono text-xs bg-[#161F31] border border-[#1F293D] px-2.5 py-1 rounded text-[#9CA3AF] shrink-0'>
                  2nd Year (Ongoing)
                </span>
              </div>

              <p className='text-xs text-[#9CA3AF] leading-relaxed'>
                Focusing on theoretical computing principles, data structures, algorithms, and modular software architecture. Consistently applying computational concepts to practical software prototypes.
              </p>

              <div className='pt-3 border-t border-[#1F293D] font-mono text-[11px] text-[#9CA3AF] space-y-1.5'>
                <span className='text-[#F3F4F6] block font-semibold'>Core Coursework:</span>
                <div className='flex flex-wrap gap-1.5 text-[#9CA3AF]'>
                  {['Data Structures & Algorithms', 'Object-Oriented Design', 'DBMS & SQL', 'Discrete Mathematics', 'Computer Architecture'].map((course) => (
                    <span key={course} className='px-2 py-0.5 bg-[#0B0F19] rounded border border-[#1F293D]'>
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements & Milestones */}
          <div className='md:col-span-6 space-y-6'>
            <div className='border-b border-[#1F293D] pb-4'>
              <span className='font-mono text-xs uppercase tracking-widest text-[#D4AF37] block mb-1'>
                // 05 Leadership & Community
              </span>
              <h2 className='font-serif text-2xl sm:text-3xl text-[#F3F4F6] font-normal'>
                Contributions & Milestones
              </h2>
            </div>

            <div className='space-y-4'>
              <div className='p-5 rounded-md bg-[#111726] border border-[#1F293D] flex items-start gap-4'>
                <Award className='h-5 w-5 text-[#D4AF37] shrink-0 mt-1' />
                <div>
                  <h4 className='font-serif text-base text-[#F3F4F6] font-normal'>Open-Source Community Engagement</h4>
                  <p className='text-xs text-[#9CA3AF] mt-1 leading-relaxed'>
                    Actively participating in open developer forums, authoring clear technical documentation, and contributing code to modern UI and developer tools.
                  </p>
                </div>
              </div>

              <div className='p-5 rounded-md bg-[#111726] border border-[#1F293D] flex items-start gap-4'>
                <BookOpen className='h-5 w-5 text-[#D4AF37] shrink-0 mt-1' />
                <div>
                  <h4 className='font-serif text-base text-[#F3F4F6] font-normal'>Creative Writing & Literature Leadership</h4>
                  <p className='text-xs text-[#9CA3AF] mt-1 leading-relaxed'>
                    Directing creative writing workshops and literary analyses, directly informing the empathetic human-centered design in my AI writing platform.
                  </p>
                </div>
              </div>

              <div className='p-5 rounded-md bg-[#111726] border border-[#1F293D] flex items-start gap-4'>
                <Cpu className='h-5 w-5 text-[#D4AF37] shrink-0 mt-1' />
                <div>
                  <h4 className='font-serif text-base text-[#F3F4F6] font-normal'>Technical Discussion Leadership</h4>
                  <p className='text-xs text-[#9CA3AF] mt-1 leading-relaxed'>
                    Organizing collaborative peer sessions around generative AI workflows, API schema contracts, and modern frontend best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 06: CONTACT & RECRUITER-READY INQUIRY FORM
            =================================================================== */}
        <section id='contact' className='pt-8 pb-12 border-t border-[#1F293D]'>
          <div className='relative rounded-md border border-[#1F293D] bg-[#111726] p-6 sm:p-12 overflow-hidden'>
            {/* Subtle antique gold glow aura */}
            <GlowEffect
              colors={['#D4AF37', '#164E63', '#7E5265']}
              mode='rotate'
              blur='medium'
              duration={6}
              scale={1.02}
              className='opacity-40'
            />

            <div className='relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>
              {/* Left Column: Direct Inquiries */}
              <div className='lg:col-span-5 space-y-6'>
                <span className='font-mono text-xs uppercase tracking-widest text-[#D4AF37] block'>
                  // 06 Direct Inquiries & Collaboration
                </span>

                <h2 className='font-serif text-3xl sm:text-5xl text-[#F3F4F6] font-normal'>
                  Let’s build something <em className='italic text-[#D4AF37]'>substantial</em>.
                </h2>

                <p className='text-sm text-[#9CA3AF] leading-relaxed'>
                  I am actively seeking software engineering internships, freelance frontend engagements, and generative AI research projects for 2026/2027.
                </p>

                {/* Direct Action Buttons */}
                <div className='space-y-3 pt-2 font-mono text-xs'>
                  <a
                    href='mailto:tamannakumari819@gmail.com'
                    className='w-full inline-flex items-center justify-center gap-2 rounded-sm bg-[#D4AF37] px-6 py-3 font-bold uppercase tracking-wider text-[#0B0F19] hover:bg-[#E5B842] transition-colors shadow-md'
                  >
                    <Mail className='h-4 w-4' />
                    <span>tamannakumari819@gmail.com</span>
                  </a>

                  <button
                    type='button'
                    onClick={copyEmail}
                    className='w-full inline-flex items-center justify-center gap-2 rounded-sm border border-[#1F293D] bg-[#161F31] px-5 py-3 text-[#F3F4F6] hover:border-[#D4AF37]/50 transition-colors'
                  >
                    {copiedEmail ? <Check className='h-4 w-4 text-emerald-400' /> : <Copy className='h-4 w-4' />}
                    <span>{copiedEmail ? 'Email Copied to Clipboard' : 'Copy Email Address'}</span>
                  </button>
                </div>

                {/* Social Badges */}
                <div className='pt-4 border-t border-[#1F293D] flex items-center gap-4 font-mono text-xs text-[#9CA3AF]'>
                  <a
                    href='https://github.com'
                    target='_blank'
                    rel='noreferrer'
                    className='hover:text-[#D4AF37] transition-colors flex items-center gap-1.5'
                  >
                    <Code2 className='h-4 w-4' />
                    <span>GitHub</span>
                  </a>
                  <span>•</span>
                  <a
                    href='https://linkedin.com'
                    target='_blank'
                    rel='noreferrer'
                    className='hover:text-[#D4AF37] transition-colors flex items-center gap-1.5'
                  >
                    <Globe className='h-4 w-4' />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Recruiter Inquiry Form */}
              <div className='lg:col-span-7 rounded-sm border border-[#1F293D] bg-[#0B0F19] p-6 sm:p-8 space-y-5 font-mono text-xs'>
                <div className='flex items-center justify-between border-b border-[#1F293D] pb-3'>
                  <span className='text-xs uppercase text-[#D4AF37] font-bold'>
                    Direct Communication Dispatcher
                  </span>
                  <span className='text-[10px] text-[#9CA3AF]'>
                    Average response: &lt; 24h
                  </span>
                </div>

                {formSubmitted ? (
                  <div className='py-12 text-center space-y-3'>
                    <div className='h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto'>
                      <CheckCircle2 className='h-6 w-6' />
                    </div>
                    <h4 className='font-serif text-xl text-[#F3F4F6]'>Message Dispatched</h4>
                    <p className='text-xs text-[#9CA3AF] max-w-sm mx-auto'>
                      Thank you, {formName}. Your inquiry regarding {formType} has been received. I will reply to {formEmail} shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className='space-y-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <div>
                        <label className='text-[10px] uppercase text-[#9CA3AF] block mb-1'>Your Name</label>
                        <input
                          type='text'
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder='e.g. Elena Rostova'
                          className='w-full rounded-sm bg-[#111726] border border-[#1F293D] px-3.5 py-2.5 text-[#F3F4F6] text-xs focus:border-[#D4AF37] focus:outline-none'
                        />
                      </div>
                      <div>
                        <label className='text-[10px] uppercase text-[#9CA3AF] block mb-1'>Your Email</label>
                        <input
                          type='email'
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder='elena@company.com'
                          className='w-full rounded-sm bg-[#111726] border border-[#1F293D] px-3.5 py-2.5 text-[#F3F4F6] text-xs focus:border-[#D4AF37] focus:outline-none'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='text-[10px] uppercase text-[#9CA3AF] block mb-1'>Inquiry Type</label>
                      <select
                        value={formType}
                        onChange={(e) => setFormType(e.target.value)}
                        className='w-full rounded-sm bg-[#111726] border border-[#1F293D] px-3 py-2.5 text-[#F3F4F6] text-xs focus:border-[#D4AF37] focus:outline-none'
                      >
                        <option value='Summer Internship 2027'>Summer Internship 2027 (Frontend / AI)</option>
                        <option value='Contract / Freelance'>Contract / Freelance Development</option>
                        <option value='Technical Research Collaboration'>Technical Research Collaboration</option>
                        <option value='Speaking / Community Workshop'>Speaking / Community Workshop</option>
                        <option value='General Inquiry'>General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className='text-[10px] uppercase text-[#9CA3AF] block mb-1'>Brief Message</label>
                      <textarea
                        required
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder='Tell me about your project, timeline, or engineering role...'
                        className='w-full rounded-sm bg-[#111726] border border-[#1F293D] p-3 text-[#F3F4F6] text-xs focus:border-[#D4AF37] focus:outline-none resize-none leading-relaxed'
                      />
                    </div>

                    <button
                      type='submit'
                      disabled={formLoading}
                      className='w-full py-3 rounded-sm bg-[#D4AF37] text-[#0B0F19] font-bold uppercase tracking-wider text-xs hover:bg-[#E5B842] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow'
                    >
                      {formLoading ? (
                        <span>Transmitting Dispatch...</span>
                      ) : (
                        <>
                          <Send className='h-3.5 w-3.5' />
                          <span>Transmit Direct Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          FOOTER & COLOPHON
          ===================================================================== */}
      <footer className='border-t border-[#1F293D] bg-[#070A11] px-6 py-8 font-mono text-xs text-[#9CA3AF]'>
        <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4'>
          <div>
            <span className='text-[#F3F4F6] font-semibold block'>Tamanna Kumari Naik</span>
            <span className='text-[11px] text-[#9CA3AF]'>
              B.Tech Computer Science & Engineering • GIET University
            </span>
          </div>

          <div className='text-center md:text-right text-[11px] space-y-0.5'>
            <p>Built with React, TypeScript, Tailwind CSS, Motion, OGL & GSAP.</p>
            <p className='text-[#9CA3AF]/60'>Editorial Design System • Timezone: IST (UTC+05:30)</p>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          FLOATING SCROLL-TO-TOP BUTTON
          ===================================================================== */}
      {showScrollTop && (
        <button
          type='button'
          onClick={scrollToTop}
          className='fixed bottom-6 right-6 z-40 p-3 rounded-sm bg-[#111726] border border-[#1F293D] text-[#D4AF37] hover:border-[#D4AF37] shadow-xl transition-all'
          aria-label='Scroll to top'
        >
          <ArrowUp className='h-4 w-4' />
        </button>
      )}

      {/* =====================================================================
          ACADEMIC & TECHNICAL DOSSIER MODAL
          ===================================================================== */}
      {showDossierModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'>
          <div className='relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-md border border-[#1F293D] bg-[#111726] p-6 sm:p-8 space-y-6 shadow-2xl'>
            <div className='flex items-center justify-between border-b border-[#1F293D] pb-4'>
              <div>
                <span className='font-mono text-[10px] text-[#D4AF37] uppercase tracking-wider block'>
                  Official Candidate Dossier
                </span>
                <h3 className='font-serif text-2xl text-[#F3F4F6] font-normal'>
                  Tamanna Kumari Naik
                </h3>
              </div>
              <button
                type='button'
                onClick={() => setShowDossierModal(false)}
                className='p-1.5 rounded-sm border border-[#1F293D] text-[#9CA3AF] hover:text-[#F3F4F6]'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            <div className='space-y-4 font-mono text-xs text-[#9CA3AF] leading-relaxed'>
              <div>
                <strong className='text-[#F3F4F6] block mb-1'>Academic Status:</strong>
                <p>2nd Year B.Tech in Computer Science & Engineering at GIET University (Gunupur, Odisha).</p>
              </div>

              <div>
                <strong className='text-[#F3F4F6] block mb-1'>Primary Disciplines:</strong>
                <p>Frontend Engineering, Design Systems, LLM Prompt Chains, Semantic Vector Lookup, WebGL Shaders.</p>
              </div>

              <div>
                <strong className='text-[#F3F4F6] block mb-1'>Verified Coursework:</strong>
                <p>Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Discrete Mathematics.</p>
              </div>

              <div>
                <strong className='text-[#F3F4F6] block mb-1'>Key Contact:</strong>
                <p className='text-[#D4AF37] font-bold'>tamannakumari819@gmail.com</p>
              </div>
            </div>

            <div className='pt-4 border-t border-[#1F293D] flex items-center justify-end gap-3'>
              <button
                type='button'
                onClick={() => setShowDossierModal(false)}
                className='px-4 py-2 rounded-sm bg-[#161F31] border border-[#1F293D] text-xs font-mono text-[#9CA3AF] hover:text-[#F3F4F6]'
              >
                Close Window
              </button>
              <a
                href='mailto:tamannakumari819@gmail.com?subject=Interview%20Inquiry%20for%20Tamanna'
                className='px-4 py-2 rounded-sm bg-[#D4AF37] text-[#0B0F19] text-xs font-mono font-bold hover:bg-[#E5B842]'
              >
                Schedule Interview
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
