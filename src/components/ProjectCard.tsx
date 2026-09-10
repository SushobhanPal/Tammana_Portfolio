import { Code2, ExternalLink } from 'lucide-react';
import type { Project } from '../data/portfolio';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col group hover:border-zinc-700 transition-colors">
      <div className="h-48 md:h-56 overflow-hidden relative">
        <div className="absolute inset-0 bg-zinc-900/20 group-hover:bg-transparent transition-colors z-10" />
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
          {project.category}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 flex-1">
          {project.description}
        </p>
        
        {project.metrics && (
          <div className="mb-6 bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800 inline-block self-start">
            <span className="text-sm font-medium text-emerald-400">{project.metrics}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map(tech => (
            <span key={tech} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs font-medium">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-zinc-800">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              <Code2 className="w-4 h-4" /> Code
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
