import { PROFILE } from '../data/portfolio';

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Education</h2>
          <div className="h-1 w-20 bg-cyan-500 rounded-full"></div>
        </div>

        <div className="max-w-3xl">
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h3 className="text-2xl font-bold text-white">{PROFILE.degree}</h3>
              <span className="px-4 py-1.5 bg-zinc-800 text-zinc-300 rounded-full text-sm font-medium border border-zinc-700">
                Class of {PROFILE.graduation}
              </span>
            </div>
            <p className="text-lg text-cyan-400 font-medium mb-4">{PROFILE.university}</p>
            <p className="text-zinc-400 leading-relaxed">
              Focusing on algorithms, full-stack web development, and artificial intelligence. Active participant in coding clubs and open-source contributions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
