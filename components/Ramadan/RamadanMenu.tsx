"use client";

import { useEffect, useRef } from "react";

const menuItems = [
  { label: "Datte", desc: "Pour rompre le jeûne" },
  { label: "Chorba", desc: "Au choix — poisson ou viande" },
  { label: "Brick au thon", desc: "Croustillante à souhait" },
  { label: "Plat du jour", desc: "Chaque jour de nouveaux plats délicieux" },
  { label: "Bouteille d'eau", desc: "Incluse" },
  { label: "Thé à la menthe", desc: "Savoureux & parfumé" },
];

export default function RamadanMenu() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Canvas étoiles ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const COUNT = 60;
    const sx  = new Float32Array(COUNT).map(() => Math.random() * canvas.width);
    const sy  = new Float32Array(COUNT).map(() => Math.random() * canvas.height);
    const sop = new Float32Array(COUNT).map(() => Math.random());
    const sdop= new Float32Array(COUNT).map(() => (Math.random() - 0.5) * 0.008);
    const sr  = new Float32Array(COUNT).map(() => Math.random() * 1.1 + 0.3);

    let rafId: number;
    let last = 0;
    const draw = (t: number) => {
      if (t - last < 40) { rafId = requestAnimationFrame(draw); return; }
      last = t;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < COUNT; i++) {
        sop[i] += sdop[i];
        if (sop[i] > 0.85 || sop[i] < 0.05) sdop[i] *= -1;
        const g = ctx.createRadialGradient(sx[i], sy[i], 0, sx[i], sy[i], sr[i] * 6);
        g.addColorStop(0, `rgba(201,168,76,${sop[i] * 0.5})`);
        g.addColorStop(1, "rgba(201,168,76,0)");
        ctx.beginPath(); ctx.arc(sx[i], sy[i], sr[i] * 6, 0, 6.283);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(sx[i], sy[i], sr[i], 0, 6.283);
        ctx.fillStyle = `rgba(255,240,180,${sop[i]})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("ram-visible"); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Lato:wght@300;400&display=swap');

        .ram-section { opacity: 0; transform: translateY(30px); transition: opacity 1s ease, transform 1s ease; }
        .ram-visible  { opacity: 1 !important; transform: translateY(0) !important; }

        .ram-item { opacity: 0; transform: translateY(16px); transition: opacity 0.5s ease, transform 0.5s ease, background 0.3s ease, border-color 0.3s ease; }
        .ram-visible .ram-item { opacity: 1; transform: translateY(0); }
        .ram-item:hover { background: rgba(201,168,76,0.07) !important; border-color: rgba(201,168,76,0.35) !important; }

        .ram-badge-glow { animation: badgePulse 3s ease-in-out infinite; }
        @keyframes badgePulse {
          0%,100% { box-shadow: 0 0 18px rgba(201,168,76,0.3), 0 0 40px rgba(201,168,76,0.1); }
          50%      { box-shadow: 0 0 28px rgba(201,168,76,0.55), 0 0 60px rgba(201,168,76,0.2); }
        }

        .ram-crescent { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%,100% { transform: translateY(0) rotate(-15deg); } 50% { transform: translateY(-10px) rotate(-15deg); } }

        .ram-price-line {
          background: linear-gradient(90deg, transparent, #c9a84c, #f5e6a0, #c9a84c, transparent);
          height: 1px; width: 100%;
        }

        .ram-ornament { 
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
          height: 1px;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="ram-section relative flex min-h-screen bg-[#0a0a0a] overflow-hidden items-center justify-center py-24 px-5"
      >
        {/* Étoiles canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70" />

        {/* Fond géométrique subtil */}
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)`,
          }}
        />

        {/* Lune décorative */}
        <div className="ram-crescent absolute top-10 right-10 md:top-16 md:right-20 z-10 pointer-events-none select-none opacity-20"
          style={{ fontSize: "clamp(3rem, 6vw, 5rem)", filter: "drop-shadow(0 0 12px rgba(201,168,76,0.6))" }}>
          ☽
        </div>
        <div className="ram-crescent absolute bottom-16 left-8 md:left-16 z-10 pointer-events-none select-none opacity-10"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", animationDelay: "2s", filter: "drop-shadow(0 0 8px rgba(201,168,76,0.4))" }}>
          ☽
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 w-full max-w-5xl mx-auto">

          {/* Layout deux colonnes */}
          <div className="flex flex-col lg:flex-row gap-0 items-stretch">

            {/* ── Colonne gauche : image + badge prix ── */}
            <div className="relative flex-1 min-h-[340px] lg:min-h-0 overflow-hidden">
              <img
                src="/Iftar.png"
                alt="Menu Ramadan Saraya"
                className="w-full h-full object-cover object-top"
                style={{ filter: "sepia(20%) contrast(1.05) brightness(0.75)" }}
              />

              {/* Vignette */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to right, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.85) 100%), linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.6) 100%)"
                }}
              />

              {/* Badge prix */}
              <div className="ram-badge-glow absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-[-1px] lg:bottom-12
                border border-[rgba(201,168,76,0.5)] bg-[rgba(10,10,10,0.92)] px-7 py-5 text-center"
                style={{ backdropFilter: "blur(12px)" }}
              >
                <p className="text-[#c9a84c] uppercase tracking-[0.22em] mb-1"
                  style={{ fontSize: "0.55rem", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                  Menu spécial Ramadan
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 2.6rem)", fontWeight: 700, color: "#f5e6a0", lineHeight: 1 }}>
                  24,50<span style={{ fontSize: "1rem", verticalAlign: "super", marginLeft: "3px" }}>€</span>
                </p>
                <div className="ram-price-line mt-3" />
                <p className="text-[rgba(245,240,232,0.5)] mt-2"
                  style={{ fontSize: "0.58rem", fontFamily: "'Lato', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  par personne
                </p>
              </div>

              {/* Numéro déco */}
              <span className="absolute top-8 left-8 pointer-events-none select-none"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "7rem", fontWeight: 700, color: "rgba(201,168,76,0.07)", lineHeight: 1 }}>
                ✦
              </span>
            </div>

            {/* Séparateur vertical */}
            <div className="hidden lg:block flex-shrink-0 w-px self-stretch opacity-40"
              style={{ background: "linear-gradient(to bottom, transparent, #c9a84c 20%, #c9a84c 80%, transparent)" }}
            />

            {/* ── Colonne droite : contenu ── */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-14 py-12 lg:py-16">

              {/* Tag */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] uppercase tracking-[0.28em]"
                  style={{ fontSize: "0.6rem", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                  Ramadan Kareem
                </span>
              </div>

              {/* Titre */}
              <h2 className="mb-2"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem, 3vw, 3rem)", fontWeight: 700, color: "#f5f0e8", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
                Iftar chez
                <br />
                <span style={{ color: "#c9a84c", fontStyle: "italic" }}>Saraya</span>
              </h2>

              {/* Barre décorative */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-0.5 w-12" style={{ background: "linear-gradient(to right, #c9a84c, #f5e6a0)" }} />
                <div className="w-1 h-1 rounded-full bg-[#c9a84c]" />
                <div className="h-px w-16 bg-[#c9a84c] opacity-30" />
              </div>

              {/* Intro */}
              <p className="mb-8 max-w-sm"
                style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.9, color: "rgba(245,240,232,0.6)" }}>
                Rompez le jeûne dans une <strong style={{ color: "rgba(245,240,232,0.88)", fontWeight: 400 }}>ambiance chaleureuse</strong> et savourez les saveurs authentiques de la Tunisie, le temps d'un Iftar inoubliable.
              </p>

              {/* Liste des items */}
              <ul className="flex flex-col gap-2.5 mb-10" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {menuItems.map((item, i) => (
                  <li
                    key={item.label}
                    className="ram-item flex items-center gap-4 border border-[rgba(201,168,76,0.1)] px-4 py-3"
                    style={{
                      background: "rgba(201,168,76,0.03)",
                      transitionDelay: `${0.4 + i * 0.08}s`,
                    }}
                  >
                    <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: 400, fontSize: "0.92rem", color: "rgba(245,240,232,0.9)", letterSpacing: "0.04em" }}>
                      {item.label}
                    </span>
                    <span className="ml-auto"
                      style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "0.72rem", color: "rgba(245,240,232,0.38)", letterSpacing: "0.06em", textAlign: "right" }}>
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Ornement */}
              <div className="ram-ornament mb-8" />

              {/* CTA */}
              <a href="#contact"
                className="inline-flex items-center gap-4 w-fit group"
                style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "#c9a84c", textDecoration: "none" }}>
                Réserver pour l'Iftar
                <span className="relative h-px bg-[#c9a84c]"
                  style={{ width: "40px", transition: "width 0.3s ease", display: "inline-block" }}
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}