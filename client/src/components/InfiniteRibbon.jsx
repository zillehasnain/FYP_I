import React from 'react';

const InfiniteRibbon = ({ brands }) => (
  /* Added my-20 for outer space and py-24 for inner height */
  <div className="my-20 py-24 border-y border-white/5 bg-white/[0.02] relative overflow-hidden">
    
    {/* Decorative Glow behind the ribbon to make it pop */}
    <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] pointer-events-none" />

    <style>{`
      @keyframes scroll { 
        0% { transform: translateX(0); } 
        100% { transform: translateX(-50%); } 
      }
      .animate-infinite-scroll { 
        display: flex; 
        width: max-content; 
        animation: scroll 40s linear infinite; 
      }
      .animate-infinite-scroll:hover { 
        animation-play-state: paused; 
      }
    `}</style>

    <div className="animate-infinite-scroll relative z-10">
      {/* We map the brands twice for a seamless loop */}
      {[...brands, ...brands].map((brand, i) => (
        <div key={i} className="flex items-center">
          {/* Increased px-16 for horizontal space between names */}
          <span className="text-5xl md:text-7xl font-black px-16 text-white/10 hover:text-emerald-400 transition-all duration-500 cursor-default uppercase italic tracking-tighter hover:scale-110">
            {brand}
          </span>
          <span className="text-emerald-500 text-3xl opacity-50">✦</span>
        </div>
      ))}
    </div>
  </div>
);

export default InfiniteRibbon;