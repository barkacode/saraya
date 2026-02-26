"use client";
import { useState, useEffect } from "react";

const images = [
  { src: "./Header/Image_Avant.jpeg", alt: "Votre restaurant Saraya" },
  { src: "./Header/Plat.jpeg", alt: "Notre cuisine" },
  { src: "./Header/Salle_Haut.png", alt: "Notre ambiance" },
  { src: "./Header/Salle_Haut_3.png", alt: "Notre salle" },
];

export default function Header() {
  const [current, setCurrent] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parallaxe uniquement sur desktop
  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes expandLine {
          from { width: 0; }
          to   { width: 40px; }
        }
        .h-tag     { opacity: 0; animation: fadeUp 0.8s ease forwards 0.4s; }
        .h-title-1 { opacity: 0; animation: fadeUp 0.8s ease forwards 0.65s; }
        .h-title-2 { opacity: 0; animation: fadeUp 0.8s ease forwards 0.85s; }
        .h-sub     { opacity: 0; animation: fadeUp 0.8s ease forwards 1.05s; }
        .h-cta     { opacity: 0; animation: fadeUp 0.8s ease forwards 1.25s; }
        .h-line    { width: 0; height: 1px; background: rgba(201,168,76,0.5); animation: expandLine 0.8s ease forwards 0.95s; }

        .cta-btn { position: relative; overflow: hidden; transition: color 0.35s ease; }
        .cta-btn::before { content: ''; position: absolute; inset: 0; background: #c9a84c; transform: translateX(-101%); transition: transform 0.35s ease; }
        .cta-btn:hover::before { transform: translateX(0); }
        .cta-btn:hover { color: #ffffff !important; }
        .cta-btn span { position: relative; z-index: 1; }
      `}</style>

      <div className="relative h-screen w-full overflow-hidden bg-black">

        {/* Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{ opacity: index === current ? 1 : 0, transition: "opacity 1500ms ease" }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="absolute w-full object-cover object-center"
              style={{
                // Pas de parallaxe sur mobile — height 100% fixe
                height: isMobile ? "100%" : "115%",
                top: 0,
                transform: isMobile ? "none" : `translateY(${scrollY * 0.25}px)`,
                willChange: isMobile ? "auto" : "transform",
              }}
            />
          </div>
        ))}

        {/* Overlay — plus sombre sur mobile pour lisibilité */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: isMobile
              ? "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 50%, rgba(10,10,10,0.97) 100%)"
              : "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.3) 50%, rgba(10,10,10,0.95) 100%)"
          }}
        />

        {/* Contenu */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center
          px-6 sm:px-10 md:px-20 lg:px-28
          pb-20 sm:pb-0"
        >
          <div className="max-w-xl">

            {/* Tag */}
            <div className="h-tag flex items-center gap-3 mb-5 sm:mb-7">
              <div className="w-6 sm:w-7 h-px flex-shrink-0 bg-[#c9a84c]" />
              <span className="text-[#c9a84c] uppercase tracking-[0.22em] sm:tracking-[0.28em] font-light"
                style={{ fontSize: "0.80rem", fontFamily: "'Lato', sans-serif" }}>
                Restaurant Tunisien
              </span>
            </div>

            {/* Titre */}
            <h1 className="h-title-1 leading-[1.05] tracking-[-0.02em] font-normal text-[#f5f0e8] mb-[0.05em]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.4rem, 8vw, 5rem)" }}>
              Bienvenue
            </h1>
            <h1 className="h-title-2 leading-[1.05] tracking-[-0.02em] font-bold italic text-[#c9a84c] mb-6 sm:mb-8"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.4rem, 8vw, 5rem)" }}>
              chez Saraya
            </h1>

            {/* Ligne */}
            <div className="h-line mb-5 sm:mb-6" />

            {/* Sous-titre */}
            <p className="h-sub font-light leading-[1.85] tracking-[0.03em] text-[rgba(245,240,232,0.65)] mb-8 sm:mb-10"
              style={{ fontSize: "clamp(0.82rem, 3vw, 0.95rem)", fontFamily: "'Lato', sans-serif" }}>
              Le goût authentique de la Tunisie<br />dans chaque assiette.
            </p>

            {/* CTAs */}
            <div className="h-cta flex items-center gap-4 sm:gap-6">
              <a href="/menu"
                className="cta-btn inline-block text-[#c9a84c] border border-[rgba(201,168,76,0.7)] no-underline
                  px-5 py-3 sm:px-7 sm:py-3"
                style={{ fontSize: "0.62rem", fontFamily: "'Lato', sans-serif", fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                <span>La carte</span>
              </a>

              <a href="#contact"
                className="font-light no-underline transition-colors duration-300 text-[rgba(245,240,232,0.45)] hover:text-[rgba(245,240,232,0.9)]"
                style={{ fontSize: "0.62rem", fontFamily: "'Lato', sans-serif", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Réserver
              </a>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-row gap-2 items-center">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className="border-none p-0 rounded-sm cursor-pointer transition-all duration-500"
              style={{
                height: "2px",
                width: index === current ? "24px" : "10px",
                background: index === current ? "#c9a84c" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        {/* Transition bas */}
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0a0a0a)" }}
        />
      </div>
    </>
  );
}