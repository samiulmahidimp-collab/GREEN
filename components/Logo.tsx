import React from 'react';
import { Leaf, Droplet, Settings } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark' }) => {
  const isDarkBg = variant === 'light';

  return (
    <div className={`flex items-center gap-3 group select-none transition-all duration-300 ${className}`}>
      <style>{`
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 8s linear infinite;
        }
        .group:hover .animate-fast-spin {
          animation: slow-spin 2s linear infinite;
        }
      `}</style>
      
      <div className="relative flex items-center justify-center">
        {/* Ambient Glow */}
        <div className={`absolute inset-0 bg-green-500/15 rounded-full blur-xl group-hover:bg-green-500/30 transition-all duration-700 ${isDarkBg ? 'opacity-10' : 'opacity-30'}`}></div>
        
        <div className="relative flex items-center">
          {/* Engine Gear - Interactive Rotation */}
          <div className="relative">
            <Settings 
              className={`h-12 w-12 md:h-14 md:w-14 ${isDarkBg ? 'text-slate-400' : 'text-slate-500'} animate-slow-spin animate-fast-spin transition-colors`} 
              strokeWidth={1.5}
            />
            {/* Core Engine Silhouette */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className={`h-6 w-6 md:h-7 md:w-7 ${isDarkBg ? 'text-slate-300' : 'text-slate-600'}`}
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path d="M4 10h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8z" />
                <path d="M8 10V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3" />
              </svg>
            </div>
          </div>
          
          {/* The Leaf - Interactive Growth/Wiggle */}
          <Leaf 
            className={`h-8 w-8 md:h-9 md:w-9 absolute -top-2 -left-3 ${isDarkBg ? 'text-green-400' : 'text-green-600'} transform -rotate-12 transition-all duration-500 group-hover:rotate-12 group-hover:-translate-y-2 group-hover:scale-125`} 
            strokeWidth={2.5}
            fill={isDarkBg ? "rgba(74, 222, 128, 0.2)" : "rgba(22, 163, 74, 0.1)"}
          />
          
          {/* Emerald Droplet - Pulse */}
          <Droplet 
            className={`h-5 w-5 md:h-6 md:w-6 absolute bottom-0 -right-2 ${isDarkBg ? 'text-emerald-300' : 'text-emerald-500'} fill-current animate-pulse`} 
          />
        </div>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span className={`text-3xl md:text-4xl font-black tracking-tighter ${isDarkBg ? 'text-white' : 'text-slate-800'}`}>
            <span className="text-green-600 group-hover:text-green-500 transition-colors">Green</span>
            <span className={isDarkBg ? 'text-slate-300' : 'text-slate-500'}>gine</span>
          </span>
        </div>
        <div className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] mt-1 ${isDarkBg ? 'text-green-400/80' : 'text-slate-400'}`}>
          Fueling tomorrow with todays leftover
        </div>
      </div>
    </div>
  );
};