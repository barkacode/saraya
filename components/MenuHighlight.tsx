"use client";

import { useEffect, useRef } from "react";
import data from "../recipes.json";

interface Highlight {
  id: string;
  description: string;
  price: number;
  category: string;
  currency: string;
  image: string;
  name: string;
  best_seller: boolean;
}

function HighlightCard({ image, name, id, category, price, currency }: Highlight) {
  return (
    <a href={`/menu#${id}`} className="group block relative">

      {/* Image */}
      <div className="card-img-wrapper relative overflow-hidden mb-4 sm:mb-5">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out sm:group-hover:scale-105"
          style={{ filter: "sepia(10%) brightness(0.88)" }}
        />
        <div className="absolute inset-0 bg-black/0 sm:group-hover:bg-black/20 transition-colors duration-500" />

        {/* Catégorie — toujours visible */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <span className="text-[#c9a84c] uppercase tracking-[0.2em] font-light"
            style={{ fontSize: "0.55rem", fontFamily: "'Lato', sans-serif" }}>
            {category}
          </span>
        </div>

        {/* Prix — visible en statique sur mobile, hover sur desktop */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-white font-light"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}>
            {price} {currency}
          </span>
        </div>
      </div>

      {/* Nom */}
      <div className="px-1">
        <h3 className="text-white font-light tracking-wide sm:transition-colors sm:duration-300 sm:group-hover:text-[#c9a84c] mb-2 sm:mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(0.95rem, 3vw, 1.2rem)" }}>
          {name}
        </h3>

        {/* Ligne — visible en statique sur mobile, animée sur desktop */}
        <div className="h-px bg-[#c9a84c] w-8 sm:w-0 sm:group-hover:w-10 transition-all duration-500 ease-o ut" />
      </div>
    </a>
  );
}
function GetBestSellers(): Highlight[] {
  return data.recipes
    .filter((r) => r.best_seller)
    .map((r) => ({
      id: r.id,
      description: r.description,
      price: r.price,
      category: r.category,
      currency: r.currency,
      image: r.path_picture,
      name: r.name,
      best_seller: r.best_seller,
    }));
}

export default function MenuHighlight() {
  const bestSellers = GetBestSellers();
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("mh-visible");
      }),
      { threshold: 0.1 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    if (gridRef.current)  observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .mh-title { opacity: 0; transform: translateY(24px); transition: opacity 0.9s ease, transform 0.9s ease; }
        .mh-title.mh-visible { opacity: 1; transform: translateY(0); }

        .mh-card { opacity: 0; transform: translateY(32px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .mh-grid.mh-visible .mh-card:nth-child(1) { opacity: 1; transform: translateY(0); transition-delay: 0.1s; }
        .mh-grid.mh-visible .mh-card:nth-child(2) { opacity: 1; transform: translateY(0); transition-delay: 0.25s; }
        .mh-grid.mh-visible .mh-card:nth-child(3) { opacity: 1; transform: translateY(0); transition-delay: 0.4s; }
        .mh-grid.mh-visible .mh-card:nth-child(4) { opacity: 1; transform: translateY(0); transition-delay: 0.55s; }
        .mh-grid.mh-visible .mh-card:nth-child(5) { opacity: 1; transform: translateY(0); transition-delay: 0.7s; }
        .mh-grid.mh-visible .mh-card:nth-child(6) { opacity: 1; transform: translateY(0); transition-delay: 0.85s; }
        .card-img-wrapper { height: 200px; }
        @media (min-width: 640px) {
          .card-img-wrapper { aspect-ratio: 3/4; height: auto; }
        }
          .cta-mh { transition: color 0.35s ease; }
.cta-mh::before { content: ''; position: absolute; inset: 0; background: #c9a84c; transform: translateX(-101%); transition: transform 0.35s ease; }
.cta-mh:hover::before { transform: translateX(0); }
.cta-mh:hover { color: #ffffff; }
      `}</style>

      <section className="relative bg-[#0a0a0a] py-24 sm:py-32 overflow-hidden">

        {/* Transition depuis About */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent)" }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Header section */}
          <div ref={titleRef} className="mh-title mb-20 sm:mb-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              {/* Tag */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] uppercase tracking-[0.28em] font-light"
                  style={{ fontSize: "0.62rem", fontFamily: "'Lato', sans-serif" }}>
                  Sélection du chef
                </span>
              </div>

              <h2 className="font-light text-[#f5f0e8] leading-[1.1] tracking-[-0.01em]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.4rem, 4vw, 4rem)" }}>
                Nos<br />
                <span className="italic font-bold text-[#c9a84c]">Spécialités</span>
              </h2>
            </div>

            {/* CTA aligné à droite */}
            <a href="/menu"
              className="cta-mh relative inline-block no-underline overflow-hidden border border-[rgba(201,168,76,0.7)] text-[#c9a84c] self-start sm:self-auto shrink-0 px-6 py-3 uppercase tracking-[0.22em] font-light"
              style={{ fontSize: "0.65rem", fontFamily: "'Lato', sans-serif" }}
            >
              <span className="relative z-10">Voir la carte complète</span>
            </a>
          </div>

          {/* Grille avec décalage vertical sur la colonne centrale */}
          <div ref={gridRef} className="mh-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 lg:gap-x-12 lg:gap-y-0">
            {bestSellers.map((item, i) => (
              <div
                key={item.id}
                className="mh-card"
                style={{ marginTop: i % 3 === 1 ? "60px" : "0px" }} // colonne centrale décalée
              >
                <HighlightCard {...item} />
              </div>
            ))}
          </div>

          {/* Ligne décorative bas */}
          <div className="mt-24 flex items-center gap-4">
            <div className="flex-1 h-px bg-[rgba(201,168,76,0.15)]" />
            <div className="w-1 h-1 rounded-full bg-[#c9a84c] opacity-40" />
            <div className="flex-1 h-px bg-[rgba(201,168,76,0.15)]" />
          </div>
        </div>

        {/* Transition vers section suivante */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0a0a0a)" }}
        />
      </section>
    </>
  );
}