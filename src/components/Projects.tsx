import { PROJECTS } from '../data/portfolio';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Selected Work</h2>
          <div className="h-1 w-20 bg-cyan-500 rounded-full"></div>
          <p className="mt-6 text-zinc-400 max-w-2xl text-lg">
            A showcase of my recent architectural and generative AI projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
