import React from 'react';
import { Mail, Gavel, Code, Briefcase, Award, Trophy, Star, ShieldCheck, User } from 'lucide-react';

export const About: React.FC = () => {
  const team = [
    {
      name: "Labiba Marzuka Erata",
      position: "CEO",
      email: "labibaerata@gmail.com",
      description: "Visionary leader driving the strategic expansion of bio-energy infrastructure in Bangladesh."
    },
    {
      name: "MD. Samiul Islam Mahid",
      position: "COO",
      email: "samiulmahid.imp@gmail.com",
      description: "Operations lead managing UCO collection networks and transesterification logistics."
    },
    {
      name: "Prizon Barua",
      position: "CTO",
      description: "Technical architect behind refinery automation and industrial software integration."
    },
    {
      name: "Abrar Ibn Zaman",
      position: "CFO",
      description: "Overseeing fiscal strategy and investment models for green energy scaling."
    }
  ];

  const achievements = [
    { title: "3Zero Hackathon", rank: "Runners Up", year: "2025", icon: <Trophy /> },
    { title: "Lean Sprint 3.0", rank: "Top Performance", year: "2025", icon: <Star /> },
    { title: "Manufactra 1.0", rank: "Champions", year: "2025", icon: <Award /> }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 text-center">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Corporate" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
            <Code className="h-4 w-4" />
            <span>Project: Code Red</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">Team <span className="text-red-600">Code Red</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed italic">"Engineered for sustainability, programmed for impact."</p>
        </div>
      </section>

      {/* Team Section (Minimalist, No Pictures) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
           <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Leadership Executive</h2>
           <p className="text-slate-500 font-medium italic">Professional identity cards of the circular energy strategic team.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {team.map((member, idx) => (
            <div key={idx} className="group p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:border-red-600 hover:shadow-2xl transition-all duration-500">
              <div className="mb-8 w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
                <User className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tighter">{member.name}</h3>
              <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-4 flex items-center">
                 <Briefcase className="h-3 w-3 mr-2" /> {member.position}
              </p>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 italic">{member.description}</p>
              {member.email && (
                <a href={`mailto:${member.email}`} className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                  <Mail className="h-3 w-3 mr-2 text-red-500" /> {member.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-100">
         <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Team Excellence</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((item, idx) => (
              <div key={idx} className="p-12 bg-white rounded-[2.5rem] border border-slate-200 flex flex-col items-center text-center hover:border-red-600 transition-all shadow-sm">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                  {item.icon}
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-1">{item.title}</h4>
                <p className="text-red-600 font-black uppercase tracking-widest text-[10px] mb-4">{item.rank}</p>
                <p className="text-slate-400 font-bold">{item.year}</p>
              </div>
            ))}
         </div>
      </section>

      {/* Legal & IP Section */}
      <section className="py-24 bg-red-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-2xl rotate-12 transition-transform">
            <Gavel className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-4xl font-black text-white mb-8 tracking-tighter">Intellectual Property Protection</h2>
          <div className="bg-slate-950 p-12 rounded-[3rem] shadow-2xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-white text-red-600 text-[10px] font-black uppercase tracking-[0.4em] rounded-full shadow-lg">Legal Status</div>
            <p className="text-xl text-slate-300 font-medium leading-relaxed italic mb-8">"This project architecture and the Greengine brand concept are the exclusive intellectual property of <span className="text-white font-black">Team Code Red</span>."</p>
            <div className="flex items-start justify-center text-left bg-white/5 p-6 rounded-2xl border border-white/10">
              <ShieldCheck className="h-5 w-5 text-red-400 mr-4 flex-shrink-0 mt-1" />
              <p className="text-xs text-slate-400 font-bold leading-relaxed uppercase tracking-tight">Unauthorized reproduction, imitation, or unethical use of this business model will result in direct legal action under the IP laws of Bangladesh.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};