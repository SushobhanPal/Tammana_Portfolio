import { PROFILE } from '../data/portfolio';
import { Code2, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-black border-t border-zinc-900 text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="flex items-center gap-6 mb-8">
          <a href={`mailto:${PROFILE.email}`} className="text-zinc-500 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <Code2 className="w-5 h-5" />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <Globe className="w-5 h-5" />
          </a>
        </div>
        <p className="text-zinc-500 text-sm font-medium">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
