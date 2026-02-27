"use client";

import { useLanternPhysics } from "@/hooks/useLanternPhysics";

interface LanternProps {
  left: string;
  sensitivity?: number;
  height?: number;
  opacity?: number;
  svgPath?: string;
}

export default function Lantern({ left, sensitivity = 1, height = 130, opacity = 1 }: LanternProps) {
  const { main, secondary } = useLanternPhysics(sensitivity);
  const width = height;
  const chainCurve = secondary * 1.5;
  const chainPath = `M 6 0 Q ${6 + chainCurve} 25 6 50`;
  const svgPath = "/Header/lantern.svg"; // Chemin vers le SVG de la lanterne (optionnel)
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
      {/* Chaîne dynamique */}
      <svg
        width="12"
        height="50"
        viewBox="0 0 12 50"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", marginBottom: "-2px" }}
      >
        <defs>
          <linearGradient id="chainGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b6914" />
            <stop offset="40%" stopColor="#f5e6a0" />
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
              stroke="url(#chainGold)"
              strokeWidth="1.8"
              transform={`rotate(${chainCurve * t * 0.5}, ${cx}, ${cy + 2})`}
            />
          );
        })}
      </svg>

      {/* Lanterne — fichier SVG externe ou SVG inline par défaut */}
      {svgPath ? (
        <img
          src={svgPath}
          width={width}
          height={height}
          alt="Lanterne"
          style={{ display: "block", marginTop: "-2px" }}
        />
      ) : (
        <svg
          width={width}
          height={height}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", marginTop: "-2px" }}
        >
          <path d="M263.359,8h-14.719C243.869,8,240,11.869,240,16.641V48h32V16.641C272,11.869,268.132,8,263.359,8z" fill="#dcb253"/>
          <path d="M281.924,40h-51.847C222.302,40,216,46.302,216,54.076V80h80V54.076C296,46.302,289.698,40,281.924,40z" fill="#dcb253"/>
          <path d="M352,136H160l10.561-28.164C178.645,86.281,199.252,72,222.273,72h67.454c23.022,0,43.628,14.281,51.712,35.836L352,136z" fill="#dcb253"/>
          <path d="M358.317,128H153.683c-5.783,0-10.917,3.7-12.745,9.186L128,176h256l-12.938-38.814C369.233,131.7,364.1,128,358.317,128z" fill="#dcb253"/>
          <rect fill="#dcb253" height="296" width="240" x="136" y="184"/>
          <path d="M401.403,504H110.597c-3.351,0-5.81-3.149-4.997-6.4l5.425-21.698c0.573-2.293,2.634-3.902,4.997-3.902h279.957c2.364,0,4.424,1.609,4.997,3.902L406.4,497.6C407.213,500.851,404.754,504,401.403,504z" fill="#daab3a"/>
          <path d="M394.849,200H117.151c-2.845,0-5.151-2.306-5.151-5.151v-21.698c0-2.845,2.306-5.151,5.151-5.151h277.698c2.845,0,5.151,2.306,5.151,5.151v21.698C400,197.694,397.694,200,394.849,200z" fill="#daab3a"/>
          <path d="M352,440H160V328c0-53.019,42.981-96,96-96h0c53.019,0,96,42.981,96,96V440z" fill="#0d0d0d"/>
          <path d="M256,352c-4.418,0-8-3.582-8-8v-48c0-4.418,3.582-8,8-8s8,3.582,8,8v48C264,348.418,260.418,352,256,352z" fill="#c9a84c"/>
          <polygon fill="#f5e070" points="280,328 232,336 232,440 280,440"/>
          <path d="M277.333,290.667c0,11.782-9.551,21.333-21.333,21.333s-21.333-9.551-21.333-21.333S256,248,256,248S277.333,278.885,277.333,290.667z" fill="#c9a84c"/>
          <path d="M312,296h-8c-4.418,0-8-3.582-8-8s3.582-8,8-8h8c4.418,0,8,3.582,8,8S316.418,296,312,296z" fill="#c9a84c"/>
          <path d="M304,328c-2.047,0-4.095-0.781-5.657-2.343l-8-8c-3.125-3.124-3.125-8.189,0-11.313c3.124-3.124,8.189-3.124,11.313,0l8,8c3.125,3.124,3.125,8.189,0,11.313C308.095,327.219,306.047,328,304,328z" fill="#c9a84c"/>
          <path d="M208,296h-8c-4.418,0-8-3.582-8-8s3.582-8,8-8h8c4.418,0,8,3.582,8,8S212.418,296,208,296z" fill="#c9a84c"/>
          <path d="M208,328c-2.047,0-4.095-0.781-5.657-2.343c-3.125-3.124-3.125-8.189,0-11.313l8-8c3.124-3.124,8.189-3.124,11.313,0c3.125,3.124,3.125,8.189,0,11.313l-8,8C212.095,327.219,210.047,328,208,328z" fill="#c9a84c"/>
          <path d="M408,40c17.673,0,32,14.327,32,32c0-17.673,14.327-32,32-32c-17.673,0-32-14.327-32-32C440,25.673,425.673,40,408,40z" fill="#c9a84c"/>
          <path d="M440,160c17.673,0,32,14.327,32,32c0-17.673,14.327-32,32-32c-17.673,0-32-14.327-32-32C472,145.673,457.673,160,440,160z" fill="#c9a84c"/>
          <path d="M408,296c17.673,0,32,14.327,32,32c0-17.673,14.327-32,32-32c-17.673,0-32-14.327-32-32C440,281.673,425.673,296,408,296z" fill="#c9a84c"/>
          <path d="M104,40c-17.673,0-32,14.327-32,32c0-17.673-14.327-32-32-32c17.673,0,32-14.327,32-32C72,25.673,86.327,40,104,40z" fill="#c9a84c"/>
          <path d="M72,160c-17.673,0-32,14.327-32,32c0-17.673-14.327-32-32-32c17.673,0,32-14.327,32-32C40,145.673,54.327,160,72,160z" fill="#c9a84c"/>
          <path d="M104,296c-17.673,0-32,14.327-32,32c0-17.673-14.327-32-32-32c17.673,0,32-14.327,32-32C72,281.673,86.327,296,104,296z" fill="#c9a84c"/>
        </svg>
      )}
    </div>
  );
}