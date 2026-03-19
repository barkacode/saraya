"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "saraya_aid_popup_session";

export default function AidPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (!seen) setVisible(true);
  }, []);

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Fermeture exceptionnelle — Aïd el-Fitr",
            "description":
              "Le Restaurant Saraya sera exceptionnellement fermé le vendredi 20 mars 2026 à l'occasion de l'Aïd el-Fitr. Réouverture le samedi 21 mars à partir de 11h30. Toute l'équipe vous adresse ses meilleurs vœux : Aïd Moubarak.",
            "startDate": "2026-03-20",
            "endDate": "2026-03-20",
            "eventStatus": "https://schema.org/EventCancelled",
            "location": {
              "@type": "Place",
              "name": "Restaurant Saraya",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "40 bis Rue Émile Zola",
                "addressLocality": "Choisy-le-Roi",
                "postalCode": "94600",
                "addressCountry": "FR",
              },
            },
            "organizer": {
              "@type": "Restaurant",
              "name": "Saraya",
              "url": "https://www.saraya-restaurant.fr",
            },
          }),
        }}
      />

      <style>{`
        @keyframes aidMoonGlow  { 0%,100%{opacity:.8;transform:scale(1)} 50%{opacity:1;transform:scale(1.04)} }
        @keyframes aidStarTwink { 0%,100%{opacity:.25} 50%{opacity:1} }
        @keyframes aidFadeIn    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes aidFloat     { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-7px)} }
        @keyframes aidOverlay   { from{opacity:0} to{opacity:1} }
        @keyframes aidStarOnMoon{ 0%,100%{opacity:.7} 50%{opacity:1} }

        .aid-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.80);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: aidOverlay .3s ease forwards;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .aid-box {
          background: #0a0a0a;
          border: 1px solid rgba(201,168,76,0.35);
          border-radius: 16px;
          max-width: 460px;
          width: 100%;
          position: relative;
          overflow: hidden;
          animation: aidFadeIn .45s ease forwards;
          max-height: calc(100dvh - 32px);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .aid-box::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%);
          pointer-events: none;
          border-radius: inherit;
          z-index: 0;
        }
        .aid-gold-line {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.6), transparent);
        }
        .aid-moon-float {
          display: inline-block;
          animation: aidFloat 3.5s ease-in-out infinite;
        }
        .aid-star {
          animation: aidStarTwink var(--d,2s) ease-in-out infinite;
          animation-delay: var(--dl,0s);
        }
        .aid-encart {
          margin: 18px 22px 0;
          padding: 14px 18px;
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 10px;
          background: rgba(201,168,76,0.04);
          position: relative; z-index: 1;
        }
        .aid-btn {
          position: relative; overflow: hidden;
          border: 1px solid rgba(201,168,76,0.7);
          border-radius: 8px;
          background: transparent; color: #c9a84c; cursor: pointer;
          transition: color .35s ease;
          width: 100%;
          padding: 16px 12px;
          font-family: 'Lato', sans-serif;
          font-size: .72rem; letter-spacing: .22em;
          text-transform: uppercase; font-weight: 400;
          -webkit-tap-highlight-color: transparent;
        }
        .aid-btn::before {
          content: ''; position: absolute; inset: 0;
          border-radius: 8px;
          background: #c9a84c; transform: translateX(-101%);
          transition: transform .35s ease;
        }
        .aid-btn:hover::before,
        .aid-btn:active::before { transform: translateX(0); }
        .aid-btn:hover,
        .aid-btn:active { color: #0a0a0a; }
        .aid-btn span { position: relative; z-index: 1; }
        .aid-box::-webkit-scrollbar { display: none; }
        .aid-box { scrollbar-width: none; }
      `}</style>

      <div
        className="aid-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="aid-title"
        aria-describedby="aid-description"
      >
        <div className="aid-box">

          {/* ── Étoiles de fond ── */}
          <svg
            aria-hidden="true"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", borderRadius: "16px", zIndex: 0 }}
            viewBox="0 0 460 520"
            preserveAspectRatio="xMidYMid slice"
          >
            <g fill="rgba(201,168,76,0.55)">
              {[
                { cx: 22,  cy: 22,  r: 9,  d: "2.1s", dl: "0s"   },
                { cx: 438, cy: 30,  r: 7,  d: "1.8s", dl: ".4s"  },
                { cx: 18,  cy: 490, r: 6,  d: "2.4s", dl: ".8s"  },
                { cx: 440, cy: 480, r: 8,  d: "1.6s", dl: ".2s"  },
                { cx: 230, cy: 15,  r: 5,  d: "2.8s", dl: "1s"   },
                { cx: 380, cy: 260, r: 6,  d: "2s",   dl: ".6s"  },
                { cx: 70,  cy: 280, r: 5,  d: "1.9s", dl: "1.2s" },
              ].map((p, i) => {
                const pts = Array.from({ length: 5 }, (_, k) => {
                  const o   = (k * 72 - 90) * (Math.PI / 180);
                  const inn = (k * 72 - 90 + 36) * (Math.PI / 180);
                  return [
                    `${(p.cx + p.r * Math.cos(o)).toFixed(1)},${(p.cy + p.r * Math.sin(o)).toFixed(1)}`,
                    `${(p.cx + p.r * 0.4 * Math.cos(inn)).toFixed(1)},${(p.cy + p.r * 0.4 * Math.sin(inn)).toFixed(1)}`,
                  ];
                }).flat().join(" ");
                return (
                  <polygon
                    key={i}
                    className="aid-star"
                    style={{ "--d": p.d, "--dl": p.dl } as React.CSSProperties}
                    points={pts}
                  />
                );
              })}
            </g>
            <g fill="rgba(201,168,76,0.35)">
              {[
                { cx: 60,  cy: 350, r: 1.5, d: "1.5s", dl: ".3s"  },
                { cx: 415, cy: 55,  r: 1.2, d: "2.2s", dl: ".7s"  },
                { cx: 370, cy: 420, r: 1.5, d: "1.7s", dl: ".1s"  },
                { cx: 110, cy: 130, r: 1.2, d: "2.5s", dl: ".9s"  },
                { cx: 440, cy: 190, r: 1.5, d: "1.3s", dl: ".5s"  },
                { cx: 35,  cy: 200, r: 1.2, d: "2.1s", dl: "1.1s" },
                { cx: 200, cy: 500, r: 1.5, d: "1.9s", dl: ".65s" },
              ].map((p, i) => (
                <circle
                  key={i}
                  className="aid-star"
                  style={{ "--d": p.d, "--dl": p.dl } as React.CSSProperties}
                  cx={p.cx} cy={p.cy} r={p.r}
                />
              ))}
            </g>
          </svg>

          {/* ── Croissant de lune fin ── */}
          <div style={{ textAlign: "center", padding: "28px 20px 0", position: "relative", zIndex: 1 }}>
            <div className="aid-moon-float">
              <svg
                width="90" height="90"
                viewBox="0 0 100 100"
                aria-label="Croissant de lune — symbole de l'Aïd el-Fitr"
                role="img"
              >
                {/* Halo doux */}
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(201,168,76,0.1)" strokeWidth="1.5" />

                {/*
                  Croissant fin islamique :
                  - Grand cercle plein doré
                  - Cercle "cache" légèrement décalé vers la droite
                  qui découpe un croissant mince et élégant
                */}
                <defs>
                  <mask id="crescentMask">
                    <rect width="100" height="100" fill="white" />
                    {/* Le cercle noir crée le "vide" pour former le croissant */}
                    <circle cx="61" cy="47" r="30" fill="black" />
                  </mask>
                  <radialGradient id="moonGold" cx="35%" cy="35%" r="65%">
                    <stop offset="0%"   stopColor="#f7e68a" />
                    <stop offset="50%"  stopColor="#c9a84c" />
                    <stop offset="100%" stopColor="#9a7530" />
                  </radialGradient>
                </defs>

                <circle
                  cx="50" cy="50" r="32"
                  fill="url(#moonGold)"
                  mask="url(#crescentMask)"
                  style={{ animation: "aidMoonGlow 3s ease-in-out infinite" }}
                />

                {/* Étoile à 5 branches à droite du croissant */}
                <polygon
                  points="76,28 77.2,31.7 81.1,31.7 78,34 79.1,37.7 76,35.4 72.9,37.7 74,34 70.9,31.7 74.8,31.7"
                  fill="#f5e070"
                  style={{ animation: "aidStarOnMoon 2s ease-in-out infinite" }}
                />
              </svg>
            </div>
          </div>

          {/* ── Ligne dorée ── */}
          <div style={{ margin: "16px 22px 0" }} className="aid-gold-line" />

          {/* ── Tag ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 22px 0", position: "relative", zIndex: 1 }}>
            <div style={{ height: 1, width: 20, background: "#c9a84c", opacity: .6 }} />
            <span style={{ color: "#c9a84c", fontFamily: "'Lato', sans-serif", fontSize: ".6rem", letterSpacing: ".28em", textTransform: "uppercase", fontWeight: 300 }}>
              Avis important
            </span>
            <div style={{ height: 1, width: 20, background: "#c9a84c", opacity: .6 }} />
          </div>

          {/* ── Titre — indexé par Google via aria-labelledby ── */}
          <div style={{ padding: "12px 28px 0", textAlign: "center", position: "relative", zIndex: 1 }}>
            <h2
              id="aid-title"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, color: "#f5f0e8", fontSize: "clamp(1.5rem, 5vw, 2rem)", lineHeight: 1.15, margin: "0 0 4px" }}
            >
              Aïd el-Fitr
            </h2>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontStyle: "italic", color: "#c9a84c", fontSize: "clamp(1.5rem, 5vw, 2rem)", lineHeight: 1.15, margin: 0 }}>
              عيد الفطر
            </p>
          </div>

          {/* ── Petites lunes décoratives ── */}
          <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, padding: "14px 0 0", position: "relative", zIndex: 1 }}>
            {[{ w: 16, op: 0.5, dur: "3s" }, { w: 22, op: 0.75, dur: "3.5s" }, { w: 16, op: 0.5, dur: "2.8s" }].map((m, i) => (
              <svg key={i} width={m.w} height={m.w} viewBox="0 0 100 100">
                <defs>
                  <mask id={`sm${i}`}>
                    <rect width="100" height="100" fill="white" />
                    <circle cx="63" cy="46" r="38" fill="black" />
                  </mask>
                </defs>
                <circle cx="50" cy="50" r="38" fill={`rgba(201,168,76,${m.op})`} mask={`url(#sm${i})`} style={{ animation: `aidMoonGlow ${m.dur} ease-in-out infinite` }} />
              </svg>
            ))}
          </div>

          {/* ── Message — indexé par Google via aria-describedby ── */}
          <div id="aid-description" style={{ padding: "16px 28px 0", textAlign: "center", position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, color: "rgba(245,240,232,0.72)", fontSize: "clamp(.88rem, 3.5vw, .95rem)", lineHeight: 1.9, margin: 0 }}>
              À l'occasion de la fête bénie de l'<strong style={{ color: "#c9a84c", fontWeight: 400 }}>Aïd el-Fitr</strong>, toute l'équipe de Saraya vous adresse ses vœux les plus chaleureux.
            </p>
          </div>

          {/* ── Encart fermeture ── */}
          <div className="aid-encart">
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 18 18" style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="9" cy="9" r="8" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="1" />
                <path d="M9 5v5M9 13v.5" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <div>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "clamp(.78rem, 3vw, .85rem)", color: "rgba(245,240,232,0.85)", lineHeight: 1.7, margin: "0 0 5px" }}>
                  Le restaurant sera{" "}
                  <strong style={{ color: "#f5f0e8", fontWeight: 400 }}>exceptionnellement fermé</strong>
                  {" "}le
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem, 4vw, 1.15rem)", color: "#c9a84c", margin: 0, fontWeight: 400 }}>
                  Vendredi 20 mars 2026
                </p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "clamp(.68rem, 2.5vw, .75rem)", color: "rgba(245,240,232,0.38)", margin: "6px 0 0", letterSpacing: ".06em" }}>
                  Nous reprenons le 21 mars à partir de 11h30 — Koll 3am w entom bikhir 🤍
                </p>
              </div>
            </div>
          </div>

          {/* ── Ligne dorée ── */}
          <div style={{ margin: "18px 22px 0" }} className="aid-gold-line" />

          {/* ── Bouton ── */}
          <div style={{ padding: "16px 22px 24px", position: "relative", zIndex: 1 }}>
            <button
              className="aid-btn"
              onClick={close}
              aria-label="Fermer l'avis de fermeture pour l'Aïd el-Fitr"
            >
              <span>J'ai compris — Aïd Moubarak 🌙</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}