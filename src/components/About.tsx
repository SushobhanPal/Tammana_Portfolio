import { PROFILE } from '../data/portfolio';

export default function About() {
  return (
    <section id="about" className="py-24 bg-zinc-900/30 border-y border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Me</h2>
            <div className="h-1 w-20 bg-cyan-500 rounded-full"></div>
          </div>
          
          <div className="lg:col-span-8 text-zinc-400 text-lg leading-relaxed space-y-6">
            <p>
              I approach software engineering as a deliberate bridge between structural problem-solving and narrative clarity. I avoid gratuitous trends in favor of disciplined interfaces where every choice serves an unambiguous purpose.
            </p>
            <p>
              Currently studying at {PROFILE.university}, I dedicate my time to exploring modern web frameworks and integrating large language models into useful, practical tools.
            </p>
            
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider block mb-2">Location</span>
                <span className="text-white text-lg block">{PROFILE.location}</span>
              </div>
              <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider block mb-2">Focus</span>
                <span className="text-white text-lg block">Full-Stack & Applied AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
