import { useState } from 'react';
import { Mail, Code2, Globe, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('submitting');
    
    try {
      // If Web3Forms API key exists, use it. Otherwise simulate submission.
      const apiKey = import.meta.env.VITE_WEB3FORMS_KEY;
      if (apiKey) {
        const formData = new FormData(form);
        formData.append("access_key", apiKey);
        
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
        
        if (res.ok) {
          setStatus('success');
          form.reset();
        } else {
          setStatus('error');
        }
      } else {
        // Fallback for simulation
        setTimeout(() => {
          setStatus('success');
          form.reset();
        }, 1500);
      }
    } catch (err) {
      setStatus('error');
    }
    
    setTimeout(() => {
      if (status !== 'error') setStatus('idle');
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-900/30 border-y border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's build something meaningful.</h2>
            <p className="text-lg text-zinc-400 mb-10">
              Open for Summer 2027 software engineering internships, technical writing contracts, and collaborative open-source system design.
            </p>
            
            <div className="space-y-6">
              <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-4 text-zinc-300 hover:text-cyan-400 transition-colors group">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium">{PROFILE.email}</span>
              </a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-zinc-300 hover:text-cyan-400 transition-colors group">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium">GitHub Profile</span>
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-zinc-300 hover:text-cyan-400 transition-colors group">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium">LinkedIn Network</span>
              </a>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 md:p-10 rounded-3xl border border-zinc-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="jane@company.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={4}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : (
                  <>Send Message <Send className="w-5 h-5" /></>
                )}
              </button>
              
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">Something went wrong. Please try again later.</p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
