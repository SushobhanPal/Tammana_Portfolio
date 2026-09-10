import { SKILL_CATEGORIES } from '../data/portfolio';

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-zinc-900/30 border-y border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Technical Expertise</h2>
          <div className="h-1 w-20 bg-cyan-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div key={idx} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map(skill => (
                  <span key={skill} className="bg-zinc-800 text-zinc-200 px-4 py-2 rounded-lg text-sm font-medium border border-zinc-700/50">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
