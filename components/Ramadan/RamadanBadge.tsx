"use client";

import { useLanternPhysics } from "@/hooks/useLanternPhysics";

interface RamadanBadgeProps {
  left: string;
  sensitivity?: number;
  height?: number;
  opacity?: number;
}

export default function RamadanBadge({ left, sensitivity = 1, height = 120, opacity = 1 }: RamadanBadgeProps) {
  const { main: angle, secondary } = useLanternPhysics(sensitivity);
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
        transform: `rotate(${angle}deg)`,
        pointerEvents: "none",
        zIndex: 49,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Chaîne dynamique */}
      <svg
        width="12"
        height="50"
        viewBox="0 0 12 50"
        style={{ display: "block"}}
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

        {/* Crochet de connexion en bas de chaîne */}
        <circle cx="6" cy="48" r="3" fill="none" stroke="url(#chainGoldBadge)" strokeWidth="1.8" />
        <circle cx="6" cy="48" r="1" fill="#c9a84c" />
      </svg>

      {/* Badge */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", overflow: "visible", marginTop: "-22%" }}
      >
        <defs>
          <linearGradient id="goldGradBadge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#fff8d0" />
            <stop offset="40%"  stopColor="#f5d060" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
          <filter id="softGlowBadge">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <mask id="crescentCutBadge">
            <circle cx="90" cy="115" r="75" fill="white" />
            <circle cx="112" cy="105" r="60" fill="black" />
          </mask>
        </defs>

        {/* Halo derrière */}
        <circle cx="90" cy="115" r="78" fill="#c9a84c" opacity="0.08" />

        {/* Croissant */}
        <circle cx="90" cy="115" r="75" fill="url(#goldGradBadge)" mask="url(#crescentCutBadge)" />

        {/* Reflet bord */}
        <path
          d="M 28 80 Q 18 115 28 150 Q 22 115 28 80 Z"
          fill="#fffbe8"
          opacity="0.5"
          mask="url(#crescentCutBadge)"
        />

        {/* === Mosquée === */}
        <g fill="#c9a84c" stroke="#8b6914" strokeWidth="0.5">
          <rect x="38" y="158" width="68" height="3" rx="1" />
          <rect x="52" y="138" width="40" height="22" rx="1" />
          <ellipse cx="72" cy="138" rx="14" ry="10" />
          <rect x="58" y="133" width="28" height="7" rx="1" />
          <rect x="40" y="128" width="8" height="32" rx="1" />
          <ellipse cx="44" cy="128" rx="5" ry="7" />
          <rect x="42" y="121" width="4" height="4" />
          <circle cx="44" cy="120" r="2" />
          <rect x="96" y="128" width="8" height="32" rx="1" />
          <ellipse cx="100" cy="128" rx="5" ry="7" />
          <rect x="98" y="121" width="4" height="4" />
          <circle cx="100" cy="120" r="2" />
          <rect x="52" y="135" width="5" height="25" rx="1" />
          <ellipse cx="54.5" cy="135" rx="3.5" ry="5" />
          <rect x="87" y="135" width="5" height="25" rx="1" />
          <ellipse cx="89.5" cy="135" rx="3.5" ry="5" />
          <path d="M 68 160 Q 72 154 76 160 L 76 161 H 68 Z" fill="#8b6914" />
          <path d="M 58 145 Q 61 141 64 145 L 64 150 H 58 Z" fill="#8b6914" opacity="0.6" />
          <path d="M 80 145 Q 83 141 86 145 L 86 150 H 80 Z" fill="#8b6914" opacity="0.6" />
        </g>

        {/* === Texte Ramadan Kareem === */}
        <text
          x="148" y="90"
          fontSize="16"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fontWeight="bold"
          fill="url(#goldGradBadge)"
          textAnchor="middle"
          filter="url(#softGlowBadge)"
        >
          Ramadan
        </text>
        <text
          x="152" y="110"
          fontSize="16"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fontWeight="bold"
          fill="url(#goldGradBadge)"
          textAnchor="middle"
          filter="url(#softGlowBadge)"
        >
          Kareem
        </text>

        {/* Étoiles */}
        <g fill="#f5e070" filter="url(#softGlowBadge)">
          <polygon points="136,72 137.5,76 142,76 138.5,78.5 140,83 136,80 132,83 133.5,78.5 130,76 134.5,76" transform="scale(0.7) translate(58, 30)" />
          <polygon points="160,60 161,63 164,63 161.5,65 162.5,68 160,66 157.5,68 158.5,65 156,63 159,63" transform="scale(0.6) translate(105, 42)" />
          <circle cx="130" cy="118" r="2" opacity="0.8" />
          <circle cx="168" cy="75" r="1.5" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}