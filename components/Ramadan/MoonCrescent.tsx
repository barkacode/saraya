"use client";

import { useLanternPhysics } from "@/hooks/useLanternPhysics";

interface MoonCrescentProps {
  left: string;
  sensitivity?: number;
  height?: number;
  opacity?: number;
}

export default function MoonCrescent({ left, sensitivity = 1, height = 80, opacity = 1 }: MoonCrescentProps) {
 const { main, secondary } = useLanternPhysics(sensitivity);
  const width = height;

  const chainCurve = secondary * 1.5;
  const chainPath = `M 6 0 Q ${6 + chainCurve} 25 6 50`;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left,
        transformOrigin: "top center",
        transform: `rotate(${main}deg)`,
        pointerEvents: "none",
        zIndex: 49,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Chaîne dynamique identique à la lanterne */}
      <svg
        width="12"
        height="50"
        viewBox="0 0 12 50"
        style={{ display: "block", marginBottom: "-2px" }}
      >
        <defs>
          <linearGradient id="chainGoldBadge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#8b6914" />
            <stop offset="40%"  stopColor="#f5e6a0" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
        </defs>

        <path d={chainPath} fill="none" stroke="#8b6914" strokeWidth="1" opacity="0.3" />

        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const t = i / 8;
          const cx = 6 + chainCurve * 2 * t * (1 - t);
          const cy = t * 50;
          const isHorizontal = i % 2 === 0;
          return (
            <ellipse
              key={i}
              cx={cx}
              cy={cy + 2}
              rx={isHorizontal ? 3.5 : 2.5}
              ry={isHorizontal ? 2 : 3.5}
              fill="none"
              stroke="url(#chainGoldBadge)"
              strokeWidth="1.8"
              transform={`rotate(${chainCurve * t * 0.5}, ${cx}, ${cy + 2})`}
            />
          );
        })}
      </svg>
      {/* Croissant de lune réaliste */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          {/* Dégradé or métallique */}
          <linearGradient id="moonGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#fff8d0" />
            <stop offset="30%"  stopColor="#f5d060" />
            <stop offset="65%"  stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#7a5a10" />
          </linearGradient>

          {/* Dégradé bord illuminé */}
          <linearGradient id="moonEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#fffbe8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
          </linearGradient>

          {/* Halo lumineux */}
          <radialGradient id="halo" cx="38%" cy="40%" r="55%">
            <stop offset="0%"   stopColor="#fff5a0" stopOpacity="0.35" />
            <stop offset="60%"  stopColor="#c9a84c" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
          </radialGradient>

          {/* Ombre portée douce */}
          <filter id="moonShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#7a5a10" floodOpacity="0.5" />
          </filter>

          {/* Lueur externe */}
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Masque pour le croissant */}
          <mask id="crescentMask">
            {/* Cercle plein = zone visible */}
            <circle cx="46" cy="52" r="34" fill="white" />
            {/* Cercle décalé = zone découpée */}
            <circle cx="58" cy="46" r="28" fill="black" />
          </mask>
        </defs>

        {/* Anneau d'accroche */}
        <circle cx="50" cy="8" r="4.5" fill="none" stroke="url(#moonGold)" strokeWidth="2.5" />
        <circle cx="50" cy="8" r="1.5" fill="#c9a84c" />

        {/* Tige */}
        <line x1="50" y1="12" x2="50" y2="18" stroke="#c9a84c" strokeWidth="2" />

        {/* Halo diffus derrière */}
        <circle
          cx="46" cy="52" r="36"
          fill="url(#halo)"
        />

        {/* Corps du croissant */}
        <circle
          cx="46" cy="52" r="34"
          fill="url(#moonGold)"
          mask="url(#crescentMask)"
          filter="url(#moonShadow)"
        />

        {/* Reflet lumineux sur le bord convexe */}
        <path
          d="M 20 38 Q 14 52 20 66 Q 17 52 20 38 Z"
          fill="url(#moonEdge)"
          mask="url(#crescentMask)"
          opacity="0.8"
        />

        {/* Micro-texture : cratères subtils */}
        <circle cx="30" cy="45" r="2.5" fill="#b8922a" opacity="0.25" mask="url(#crescentMask)" />
        <circle cx="26" cy="58" r="1.8" fill="#b8922a" opacity="0.2"  mask="url(#crescentMask)" />
        <circle cx="34" cy="65" r="3"   fill="#b8922a" opacity="0.18" mask="url(#crescentMask)" />
        <circle cx="22" cy="50" r="1.2" fill="#fff5a0" opacity="0.15" mask="url(#crescentMask)" />
        <circle cx="28" cy="38" r="2"   fill="#b8922a" opacity="0.2"  mask="url(#crescentMask)" />

        {/* Brillance sur la pointe haute */}
        <ellipse
          cx="28" cy="25" rx="4" ry="2.5"
          fill="#fffbe8" opacity="0.45"
          transform="rotate(-30 28 25)"
          mask="url(#crescentMask)"
        />

        {/* Petite étoile à 4 branches près du croissant */}
        <g transform="translate(72, 35)" filter="url(#glow)">
          <line x1="0" y1="-7" x2="0" y2="7"   stroke="#f5e070" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="-7" y1="0" x2="7" y2="0"   stroke="#f5e070" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="-4" y1="-4" x2="4" y2="4"  stroke="#f5e070" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          <line x1="4" y1="-4" x2="-4" y2="4"  stroke="#f5e070" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          <circle cx="0" cy="0" r="2" fill="#fff8d0" />
        </g>

        {/* Petits points étoilés */}
        <circle cx="78" cy="55" r="1.5" fill="#f5e070" opacity="0.7" filter="url(#glow)" />
        <circle cx="68" cy="68" r="1"   fill="#f5e070" opacity="0.5" filter="url(#glow)" />
        <circle cx="82" cy="44" r="1"   fill="#fff8d0" opacity="0.6" filter="url(#glow)" />
      </svg>
    </div>
  );
}