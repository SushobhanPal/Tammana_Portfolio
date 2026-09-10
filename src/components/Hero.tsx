import { motion } from 'framer-motion';
import { PROFILE } from '../data/portfolio';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col justify-center min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-zinc-900 border border-zinc-800 text-cyan-400 text-xs sm:text-sm font-medium mb-6 tracking-wide">
            {PROFILE.role}
          </span>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            {PROFILE.headline}
          </h1>
          
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
            {PROFILE.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#projects" className="bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-zinc-200 transition-colors shadow-lg">
              View My Work
            </a>
            <a href="#contact" className="bg-transparent border border-zinc-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-zinc-800 hover:border-zinc-600 transition-colors">
              Contact Me
            </a>
          </div>
        </motion.div>
        
        {/* Tech strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 pt-8 border-t border-zinc-800 flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-zinc-500 uppercase tracking-widest"
        >
          <span>React</span>
          <span>TypeScript</span>
          <span>Python</span>
          <span>Node.js</span>
          <span>AI Orchestration</span>
        </motion.div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}
