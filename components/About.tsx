"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("about-visible");
      }),
      { threshold: 0.2 }
    );
    if (imgRef.current)  observer.observe(imgRef.current);
    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
  }, []);

  // Lucioles optimisées
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

    // Seulement 20 particules, données dans des tableaux Float32 (plus performant)
    const COUNT = 20;
    const x   = new Float32Array(COUNT).map(() => Math.random() * canvas.width);
    const y   = new Float32Array(COUNT).map(() => Math.random() * canvas.height);
    const vx  = new Float32Array(COUNT).map(() => (Math.random() - 0.5) * 0.15);
    const vy  = new Float32Array(COUNT).map(() => (Math.random() - 0.5) * 0.15);
    const op  = new Float32Array(COUNT).map(() => Math.random() * 0.35 + 0.08);
    const dop = new Float32Array(COUNT).map(() => (Math.random() - 0.5) * 0.004);
    const r   = new Float32Array(COUNT).map(() => Math.random() * 1.2 + 0.5);

    let rafId: number;
    let lastTime = 0;

    const draw = (time: number) => {
      // Throttle à 30fps max pour économiser le CPU
      if (time - lastTime < 33) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < COUNT; i++) {
        x[i] += vx[i];
        y[i] += vy[i];
        if (x[i] < 0 || x[i] > canvas.width)  vx[i] *= -1;
        if (y[i] < 0 || y[i] > canvas.height) vy[i] *= -1;
        op[i] += dop[i];
        if (op[i] > 0.45 || op[i] < 0.05) dop[i] *= -1;

        // Halo
        const grd = ctx.createRadialGradient(x[i], y[i], 0, x[i], y[i], r[i] * 5);
        grd.addColorStop(0, `rgba(201,168,76,${op[i]})`);
        grd.addColorStop(1, "rgba(201,168,76,0)");
        ctx.beginPath();
        ctx.arc(x[i], y[i], r[i] * 5, 0, 6.283);
        ctx.fillStyle = grd;
        ctx.fill();

        // Point
        ctx.beginPath();
        ctx.arc(x[i], y[i], r[i], 0, 6.283);
        ctx.fillStyle = `rgba(245,230,160,${op[i] + 0.2})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        .about-image-side { opacity: 0; transform: translateX(-40px); transition: opacity 1s ease, transform 1s ease; }
        .about-text-side  { opacity: 0; transform: translateX(40px);  transition: opacity 1s ease 0.3s, transform 1s ease 0.3s; }
        .about-visible    { opacity: 1 !important; transform: translateX(0) !important; }
        .about-image-side img { transition: transform 8s ease, filter 0.6s ease; }
        .about-image-side:hover img { transform: scale(1.04); filter: sepia(0%) contrast(1.08) brightness(0.95); }
        .about-cta:hover  { gap: 24px; }
        .about-cta:hover .about-cta-arrow { width: 56px; }
        .about-cta-arrow::after { content: ''; position: absolute; right: 0; top: -3px; width: 7px; height: 7px; border-right: 1px solid #c9a84c; border-top: 1px solid #c9a84c; transform: rotate(45deg); }
      `}</style>

      <section className="relative flex min-h-screen bg-[#0a0a0a] overflow-hidden">

        {/* Lucioles */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60" />

        {/* Image */}
        <div ref={imgRef} className="about-image-side relative flex-1 overflow-hidden">
          <img
            src="/Chef_Cuisto.jpeg"
            alt="Chef Saraya"
            className="w-full h-full object-cover object-top"
            style={{ filter: "sepia(15%) contrast(1.05) brightness(0.9)" }}
          />
          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent 60%, #0a0a0a 100%), linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)" }}
          />
          <span className="absolute bottom-10 left-10 pointer-events-none select-none z-10"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "8rem", fontWeight: 700, color: "rgba(201,168,76,0.1)", lineHeight: 1 }}>
            01
          </span>
        </div>

        {/* Séparateur */}
        <div className="flex-shrink-0 w-px self-stretch opacity-40"
          style={{ background: "linear-gradient(to bottom, transparent, #c9a84c 20%, #c9a84c 80%, transparent)" }}
        />

        {/* Texte */}
        <div ref={textRef} className="about-text-side relative flex-1 flex flex-col justify-center px-14 py-20 z-10">

          {/* Tag */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-9 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] uppercase tracking-[0.25em]"
              style={{ fontSize: "0.65rem", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              Notre histoire
            </span>
          </div>

          {/* Titre */}
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)", fontWeight: 700, color: "#f5f0e8", lineHeight: 1.15, letterSpacing: "-0.01em", marginBottom: "0.3em" }}>
            Saraya,<br />
            <span style={{ color: "#c9a84c", fontStyle: "italic" }}>l'âme de la Tunisie</span>
          </h2>

          {/* Barre */}
          <div className="flex items-center gap-3 mb-9">
            <div className="h-0.5 w-12" style={{ background: "linear-gradient(to right, #c9a84c, #f5e6a0)" }} />
            <div className="w-1 h-1 rounded-full bg-[#c9a84c]" />
            <div className="h-px w-16 bg-[#c9a84c] opacity-30" />
          </div>

          {/* Body */}
          <p className="mb-12 max-w-md"
            style={{ fontFamily: "'Lato', sans-serif", fontSize: "clamp(0.875rem, 1.1vw, 1rem)", fontWeight: 300, lineHeight: 1.95, color: "rgba(245,240,232,0.65)" }}>
            Bienvenue chez Saraya, une <strong style={{ color: "rgba(245,240,232,0.9)", fontWeight: 400 }}>invitation au voyage</strong> au cœur de la Tunisie.
            Dans une ambiance chaleureuse et élégante, nous vous faisons découvrir toute la richesse
            de la cuisine tunisienne — <strong style={{ color: "rgba(245,240,232,0.9)", fontWeight: 400 }}>couscous parfumés</strong>, bricks croustillantes,
            tajines savoureux et épices envoûtantes.
            <br /><br />
            Chaque plat est préparé avec passion, à partir de recettes traditionnelles.
            Chez Saraya, on vient <strong style={{ color: "rgba(245,240,232,0.9)", fontWeight: 400 }}>vivre une expérience</strong> entre générosité, saveurs et soleil méditerranéen.
          </p>

          {/* CTA */}
          <a href="/menu" className="about-cta inline-flex items-center gap-4 w-fit"
            style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", textDecoration: "none", transition: "gap 0.3s ease" }}>
            Découvrir la carte
            <span className="about-cta-arrow relative h-px bg-[#c9a84c]" style={{ width: "40px", transition: "width 0.3s ease" }} />
          </a>
        </div>

        {/* Responsive mobile */}
        <style>{`
          @media (max-width: 768px) {
            section.relative.flex { flex-direction: column; min-height: auto; }
            .about-image-side { height: 55vw; min-height: 280px; flex: none; }
            .about-image-side::after { background: linear-gradient(to bottom, transparent 50%, #0a0a0a 100%); }
            .about-text-side { padding: 40px 24px; }
            .w-px.self-stretch { display: none; }
          }
        `}</style>

        {/* Séparateur mobile */}
        <div className="flex md:hidden items-center gap-4 absolute bottom-0 left-6 right-6 pb-6">
          <div className="flex-1 h-px bg-[rgba(201,168,76,0.15)]" />
          <div className="w-1 h-1 rounded-full bg-[#c9a84c] opacity-40" />
          <div className="flex-1 h-px bg-[rgba(201,168,76,0.15)]" />
        </div>
      </section>
    </>
  );
}