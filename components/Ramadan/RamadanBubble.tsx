"use client";

export default function RamadanBubble() {
    return (
        <>
            <style>{`
        @keyframes bubbleFloat {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-8px); }
        }
        @keyframes starPulse {
          0%, 100% { transform: translate(72px, 35px) scale(1)   rotate(0deg);  opacity: 0.9; }
          50%       { transform: translate(72px, 35px) scale(1.4) rotate(15deg); opacity: 1;   }
        }
        @keyframes dotTwinkle {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1;   }
        }
        @keyframes ringPulse {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(1.8); opacity: 0;   }
        }
        @keyframes haloBreath {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 0.6;  }
        }

        .rb-float { animation: bubbleFloat 3.5s ease-in-out infinite; }
        .rb-star  { transform-origin: 72px 35px; animation: starPulse 2.8s ease-in-out infinite; }
        .rb-dot1  { animation: dotTwinkle 2s ease-in-out infinite; }
        .rb-dot2  { animation: dotTwinkle 2s ease-in-out infinite 0.7s; }
        .rb-dot3  { animation: dotTwinkle 2s ease-in-out infinite 1.4s; }
        .rb-halo  { animation: haloBreath 3.5s ease-in-out infinite; }
        .rb-ring  { animation: ringPulse 2.5s ease-out infinite; }
        .rb-ring2 { animation: ringPulse 2.5s ease-out infinite 1.25s; }

        .rb-wrap:hover .rb-tooltip { opacity: 1; transform: translateX(0); pointer-events: auto; }
        .rb-tooltip {
          opacity: 0; transform: translateX(8px); pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
      `}</style>

            <div className="rb-wrap fixed bottom-7 right-6 z-50 rb-float">

                {/* Tooltip */}
                <div className="rb-tooltip absolute right-full mr-3 top-1/2 -translate-y-1/2">
                    <div className="relative flex items-center bg-[#0a0a0a]/95 border border-[#c9a84c]/40 px-3 py-2  backdrop-blur-sm">
                        <span className="text-[#c9a84c] text-[0.75rem] font-light uppercase tracking-[0.22em]whitespace-normal sm:whitespace-nowrap">Menu Iftar - Spécial Ramadan</span>            
                        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#c9a84c]/40" />
                    </div>
                </div>

                {/* Anneaux pulsants */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="rb-ring  absolute w-16 h-16 rounded-full border border-[#c9a84c]/30" />
                    <div className="rb-ring2 absolute w-16 h-16 rounded-full border border-[#c9a84c]/20" />
                </div>

                <a href="/#iftar" aria-label="Menu Iftar Ramadan" className="block">
                    <svg width="90" height="90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", overflow: "visible", filter: "drop-shadow(0 4px 16px rgba(201,168,76,0.35))" }}>
                        <defs>
                            <linearGradient id="rbMoonGold" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#fff8d0" />
                                <stop offset="30%" stopColor="#f5d060" />
                                <stop offset="65%" stopColor="#c9a84c" />
                                <stop offset="100%" stopColor="#7a5a10" />
                            </linearGradient>
                            <linearGradient id="rbMoonEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#fffbe8" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="rbHalo" cx="38%" cy="40%" r="55%">
                                <stop offset="0%" stopColor="#fff5a0" stopOpacity="0.35" />
                                <stop offset="60%" stopColor="#c9a84c" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
                            </radialGradient>
                            <filter id="rbGlow" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                            <filter id="rbShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#7a5a10" floodOpacity="0.5" />
                            </filter>
                            <mask id="rbCrescentMask">
                                <circle cx="46" cy="52" r="34" fill="white" />
                                <circle cx="58" cy="46" r="28" fill="black" />
                            </mask>
                        </defs>

                        {/* Halo */}
                        <circle cx="46" cy="52" r="40" fill="url(#rbHalo)" className="rb-halo" />

                        {/* Corps croissant */}
                        <circle cx="46" cy="52" r="34" fill="url(#rbMoonGold)" mask="url(#rbCrescentMask)" filter="url(#rbShadow)" />

                        {/* Reflet bord convexe */}
                        <path d="M 20 38 Q 14 52 20 66 Q 17 52 20 38 Z" fill="url(#rbMoonEdge)" mask="url(#rbCrescentMask)" opacity="0.8" />

                        {/* Cratères */}
                        <circle cx="30" cy="45" r="2.5" fill="#b8922a" opacity="0.25" mask="url(#rbCrescentMask)" />
                        <circle cx="26" cy="58" r="1.8" fill="#b8922a" opacity="0.2" mask="url(#rbCrescentMask)" />
                        <circle cx="34" cy="65" r="3" fill="#b8922a" opacity="0.18" mask="url(#rbCrescentMask)" />
                        <circle cx="22" cy="50" r="1.2" fill="#fff5a0" opacity="0.15" mask="url(#rbCrescentMask)" />
                        <circle cx="28" cy="38" r="2" fill="#b8922a" opacity="0.2" mask="url(#rbCrescentMask)" />

                        {/* Brillance pointe */}
                        <ellipse cx="28" cy="25" rx="4" ry="2.5" fill="#fffbe8" opacity="0.45" transform="rotate(-30 28 25)" mask="url(#rbCrescentMask)" />

                        {/* Étoile animée */}
                        <g className="rb-star" filter="url(#rbGlow)">
                            <line x1="0" y1="-7" x2="0" y2="7" stroke="#f5e070" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="-7" y1="0" x2="7" y2="0" stroke="#f5e070" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="-4" y1="-4" x2="4" y2="4" stroke="#f5e070" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
                            <line x1="4" y1="-4" x2="-4" y2="4" stroke="#f5e070" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
                            <circle cx="0" cy="0" r="2" fill="#fff8d0" />
                        </g>

                        {/* Points étoilés */}
                        <circle cx="78" cy="55" r="1.5" fill="#f5e070" filter="url(#rbGlow)" className="rb-dot1" />
                        <circle cx="68" cy="68" r="1" fill="#f5e070" filter="url(#rbGlow)" className="rb-dot2" />
                        <circle cx="82" cy="44" r="1" fill="#fff8d0" filter="url(#rbGlow)" className="rb-dot3" />
                    </svg>
                </a>
            </div>
        </>
    );
}