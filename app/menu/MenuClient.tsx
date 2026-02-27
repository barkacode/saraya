"use client";

import Navbar from "../components/navbar";
import { dishes } from "../../data/menus";
import { useEffect, useRef, useState, memo, useCallback, useMemo } from "react";


type Dish = (typeof dishes)[number];

interface CategoryData {
  category: string;
  items: Dish[];
  imageMap: Map<string, string>;
}


const dishesByCategory: CategoryData[] = (() => {
  const seen = new Set<string>();
  const order: string[] = [];
  for (const d of dishes) {
    if (!seen.has(d.category)) { seen.add(d.category); order.push(d.category); }
  }
  return order.map((category) => {
    const items = dishes.filter((d) => d.category === category);
    const imageMap = new Map<string, string>();
    for (const d of items) {
      if (d.image?.trim() && !imageMap.has(d.image)) {
        imageMap.set(d.image, d.imagePosition ?? "center");
      }
    }
    if (imageMap.size === 0) imageMap.set("/indisponible.png", "center top");
    return { category, items, imageMap };
  });
})();

const categoryNames = dishesByCategory.map((d) => d.category);


// ─── Lucioles ─────────────────────────────────────────────────────────────────

// Données fixes générées une seule fois (évite les diffs d'hydration)
const FIREFLY_DATA = [
  // [x%, y%, size, duration, delay, orbitX, orbitY, opacity]
  // Petites
  { x: 8,  y: 15, s: 3,  dur: 8,  del: 0,   ox: 18, oy: 22, op: 0.55 },
  { x: 22, y: 42, s: 2,  dur: 11, del: 1.5, ox: 12, oy: 16, op: 0.45 },
  { x: 35, y: 8,  s: 3,  dur: 9,  del: 3,   ox: 20, oy: 14, op: 0.5  },
  { x: 55, y: 28, s: 2,  dur: 13, del: 0.5, ox: 10, oy: 20, op: 0.4  },
  { x: 68, y: 60, s: 3,  dur: 10, del: 2,   ox: 16, oy: 18, op: 0.5  },
  { x: 80, y: 12, s: 2,  dur: 12, del: 4,   ox: 14, oy: 24, op: 0.45 },
  { x: 92, y: 38, s: 3,  dur: 8,  del: 1,   ox: 20, oy: 12, op: 0.55 },
  { x: 14, y: 72, s: 2,  dur: 14, del: 2.5, ox: 12, oy: 18, op: 0.4  },
  { x: 45, y: 85, s: 3,  dur: 9,  del: 0.8, ox: 18, oy: 14, op: 0.5  },
  { x: 75, y: 78, s: 2,  dur: 11, del: 3.5, ox: 16, oy: 20, op: 0.45 },
  { x: 28, y: 55, s: 2,  dur: 10, del: 1.2, ox: 14, oy: 16, op: 0.4  },
  { x: 60, y: 90, s: 3,  dur: 12, del: 0.3, ox: 12, oy: 22, op: 0.5  },
  { x: 88, y: 65, s: 2,  dur: 8,  del: 2.8, ox: 18, oy: 14, op: 0.45 },
  // Moyennes
  { x: 18, y: 30, s: 5,  dur: 14, del: 0.7, ox: 24, oy: 28, op: 0.6  },
  { x: 40, y: 65, s: 4,  dur: 16, del: 2.2, ox: 20, oy: 32, op: 0.55 },
  { x: 62, y: 20, s: 5,  dur: 13, del: 4.5, ox: 28, oy: 20, op: 0.6  },
  { x: 78, y: 48, s: 4,  dur: 15, del: 1.8, ox: 22, oy: 26, op: 0.5  },
  { x: 50, y: 50, s: 5,  dur: 17, del: 0.4, ox: 26, oy: 30, op: 0.55 },
  { x: 32, y: 88, s: 4,  dur: 12, del: 3.2, ox: 18, oy: 24, op: 0.5  },
  // Grosses
  { x: 12, y: 52, s: 7,  dur: 18, del: 1.0, ox: 30, oy: 36, op: 0.65 },
  { x: 48, y: 22, s: 8,  dur: 20, del: 3.8, ox: 36, oy: 28, op: 0.7  },
  { x: 72, y: 75, s: 7,  dur: 19, del: 0.6, ox: 32, oy: 40, op: 0.65 },
  { x: 25, y: 18, s: 8,  dur: 22, del: 2.0, ox: 34, oy: 30, op: 0.7  },
  { x: 85, y: 30, s: 7,  dur: 17, del: 4.2, ox: 28, oy: 38, op: 0.6  },
];

const Fireflies = memo(function Fireflies() {
  return (
    <>
      <style>{`
        @keyframes ff-float {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(var(--ox), calc(var(--oy) * -0.6)) scale(1.1); }
          50%  { transform: translate(calc(var(--ox) * 0.4), var(--oy)) scale(0.95); }
          75%  { transform: translate(calc(var(--ox) * -0.7), calc(var(--oy) * 0.3)) scale(1.05); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes ff-pulse {
          0%, 100% { opacity: var(--op-min); box-shadow: 0 0 calc(var(--s) * 1px) calc(var(--s) * 0.5px) rgba(201,168,76,0.4); }
          50%       { opacity: var(--op-max); box-shadow: 0 0 calc(var(--s) * 3px) calc(var(--s) * 1.5px) rgba(201,168,76,0.7), 0 0 calc(var(--s) * 6px) calc(var(--s) * 2px) rgba(201,168,76,0.2); }
        }
        .firefly {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #f5e070 0%, #c9a84c 50%, transparent 100%);
          animation: ff-float var(--dur) ease-in-out infinite, ff-pulse calc(var(--dur) * 0.6) ease-in-out infinite;
          pointer-events: none;
          will-change: transform, opacity;
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {FIREFLY_DATA.map((f, i) => (
          <div
            key={i}
            className="firefly"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: `${f.s}px`,
              height: `${f.s}px`,
              "--s": f.s,
              "--dur": `${f.dur}s`,
              "--ox": `${f.ox}px`,
              "--oy": `${f.oy}px`,
              "--op-min": f.op * 0.3,
              "--op-max": f.op,
              animationDelay: `${f.del}s, ${f.del * 0.7}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
});


// ─── DishCard ─────────────────────────────────────────────────────────────────

const DishCard = memo(function DishCard({
  name, description, price, index,
}: { name: string; description: string; price: number; index: number }) {
  return (
    <div
      className="dish-card group relative border-b border-[rgba(201,168,76,0.1)] py-5 last:border-0"
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3
            className="text-[#f5f0e8] font-light tracking-wide mb-2 group-hover:text-[#c9a84c] transition-colors duration-300"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.05rem, 2.5vw, 1.2rem)" }}
          >
            {name}
          </h3>
          <p
            className="text-[rgba(245,240,232,0.45)] font-light leading-relaxed line-clamp-2"
            style={{ fontFamily: "'Lato', sans-serif", fontSize: "clamp(0.8rem, 2vw, 0.875rem)" }}
          >
            {description}
          </p>
        </div>
        <span
          className="shrink-0 font-semibold text-[#c9a84c] mt-0.5 tabular-nums"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.1rem, 3vw, 1.3rem)" }}
        >
          {price.toFixed(2)} €
        </span>
      </div>
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-[rgba(201,168,76,0.3)] transition-all duration-500" />
    </div>
  );
});

// ─── ImageCarousel ────────────────────────────────────────────────────────────

const ImageCarousel = memo(function ImageCarousel({
  imageMap, category, height,
}: { imageMap: Map<string, string>; category: string; height: number }) {
  const entries = [...imageMap.entries()];
  const isMulti = entries.length > 1;

  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (!isMulti) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % entries.length),
      4000
    );
  }, [entries.length, isMulti]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    startTimer();
  }, [startTimer]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ border: "1px solid rgba(201,168,76,0.12)", height: `${height}px` }}
    >
      {entries.map(([src, position], i) => (
        <img
          key={src}
          src={src}
          alt={`${category} ${i + 1}`}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          style={{
            objectPosition: position,
            filter: "sepia(10%) brightness(0.85)",
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)" }}
      />
      {isMulti && (
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-10">
          {entries.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Image ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === current ? "16px" : "4px",
                height: "4px",
                borderRadius: "2px",
                background: i === current ? "#c9a84c" : "rgba(201,168,76,0.35)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
});

// ─── CategorySection ──────────────────────────────────────────────────────────

const CategorySection = memo(function CategorySection({
  category, items, imageMap, index,
}: CategoryData & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("cat-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = category.split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");

  return (
    <div ref={ref} id={category} className="cat-section" style={{ scrollMarginTop: "130px" }}>

      {/* Titre */}
      <div className="flex items-center gap-4 sm:gap-5 mb-8 sm:mb-12">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-[#c9a84c]" />
            <span
              className="text-[#c9a84c] uppercase tracking-[0.28em] font-light"
              style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.65rem)", fontFamily: "'Lato', sans-serif" }}
            >
              {items.length} plat{items.length > 1 ? "s" : ""}
            </span>
          </div>
          <h2
            className="font-light text-[#f5f0e8] leading-[1.1]"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            {firstWord}
            {restWords && (
              <><br /><span className="italic font-bold text-[#c9a84c]">{restWords}</span></>
            )}
          </h2>
        </div>
        <div className="flex-1 h-px bg-[rgba(201,168,76,0.12)]" />
      </div>

      {/* ── Mobile ── */}
      <div className="sm:hidden">
        <div className="mb-6">
          <ImageCarousel imageMap={imageMap} category={category} height={224} />
        </div>
        <div>
          {items.map((dish, i) => <DishCard key={dish.name} {...dish} index={i} />)}
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden sm:grid sm:grid-cols-2 gap-10 md:gap-16 items-start">
        <div className="sticky top-[130px]">
          <ImageCarousel imageMap={imageMap} category={category} height={420} />
          <div className="mt-3 flex items-center gap-3">
            <div className="w-4 h-px bg-[#c9a84c] opacity-50" />
            <span
              className="text-[rgba(201,168,76,0.3)] font-light"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.75rem" }}
            >
              0{index + 1}
            </span>
          </div>
        </div>
        <div>
          {items.map((dish, i) => <DishCard key={dish.name} {...dish} index={i} />)}
        </div>
      </div>
    </div>
  );
});

// ─── MenuPage ─────────────────────────────────────────────────────────────────

export default function MenuPage() {
  const [navVisible, setNavVisible] = useState(true);
  const [isSmScreen, setIsSmScreen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const checkSize = () => setIsSmScreen(window.innerWidth >= 640);
    checkSize();
    window.addEventListener("resize", checkSize, { passive: true });
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavVisible(y < lastScrollRef.current || y <= 80);
      lastScrollRef.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navHeight = navVisible ? (isSmScreen ? 80 : 64) : 0;

  return (
    <>
      <style>{`
        body { background: #0a0a0a; }
        .cat-section{opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .8s ease}
        .cat-section.cat-visible{opacity:1;transform:translateY(0)}
        .dish-card{opacity:0;transform:translateY(10px);transition:opacity .45s ease,transform .45s ease}
        .cat-visible .dish-card{opacity:1;transform:translateY(0)}
        body.mobile-nav-open .sticky { opacity: 0; pointer-events: none; }
        body.mobile-nav-open .cat-float-btn { opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
      `}</style>

      {/* ── Lucioles ── */}
      <Fireflies />

      <div className="min-h-screen relative">
        <Navbar ramadan={false} />

        {/* ── Hero ── */}
        <div className="relative w-full overflow-hidden" style={{ height: "65vh", zIndex: 1 }}>
          <img
            src="Recipes/en_tete.png"
            alt="Notre Carte"
            className="absolute w-full h-full object-cover object-center"
            style={{ filter: "sepia(10%) brightness(0.75)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, #0a0a0a 100%)" }}
          />
          <div className="absolute inset-0 flex flex-col items-start justify-end px-6 sm:px-12 lg:px-20 pb-14 sm:pb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-px bg-[#c9a84c]" />
              <span
                className="text-[#c9a84c] uppercase tracking-[0.28em] font-light"
                style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.65rem)", fontFamily: "'Lato', sans-serif" }}
              >
                Cuisine Tunisienne
              </span>
            </div>
            <h1
              className="font-light text-[#f5f0e8] leading-[1.05] mb-1"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              Notre
            </h1>
            <h1
              className="font-bold italic text-[#c9a84c] leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              Carte
            </h1>
          </div>
        </div>

        {/* ── Barre catégories ── */}
        <div
          className="sticky z-50 bg-[#0a0a0a]/95 backdrop-blur-md transition-[top] duration-300"
          style={{
            top: `${navHeight}px`,
            boxShadow: "0 1px 0 0 rgba(201,168,76,0.12), 0 4px 24px 0 rgba(0,0,0,0.4)",
          }}
        >
          <div className="hidden md:flex items-center justify-center max-w-7xl mx-auto px-5 lg:px-12">
            {categoryNames.map((cat, i) => (
              <div key={cat} className="flex items-center">
                {i > 0 && (
                  <div className="w-px self-stretch bg-[rgba(201,168,76,0.1)]" />
                )}
                <a
                  href={`#${cat}`}
                  className="relative group px-5 py-5 flex flex-col items-center gap-1.5"
                  style={{ fontFamily: "'Lato', sans-serif", textDecoration: "none" }}
                >
                  <span
                    className="text-[#c9a84c] opacity-30 group-hover:opacity-70 transition-opacity duration-300 tabular-nums"
                    style={{ fontSize: "0.48rem", letterSpacing: "0.15em" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[rgba(245,240,232,0.5)] group-hover:text-[#c9a84c] transition-colors duration-300 whitespace-nowrap"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
                  >
                    {cat}
                  </span>
                  <span className="absolute bottom-0 left-5 right-5 h-px bg-[#c9a84c] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-center" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bouton flottant mobile ── */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="cat-float-btn md:hidden fixed bottom-6 right-5 z-50 flex items-center gap-2.5 px-4 py-3 transition-opacity duration-300"
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(201,168,76,0.5)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08)",
          }}
        >
          <span className="flex flex-col gap-[4px]">
            <span className="block w-4 h-px bg-[#c9a84c]" />
            <span className="block w-3 h-px bg-[#c9a84c] opacity-60" />
            <span className="block w-4 h-px bg-[#c9a84c]" />
          </span>
          <span
            className="text-[#c9a84c] uppercase tracking-[0.2em] font-light"
            style={{ fontSize: "0.55rem", fontFamily: "'Lato', sans-serif" }}
          >
            Voir les catégories de plats
          </span>
        </button>

        {/* ── Drawer mobile ── */}
        {drawerOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <div
              className="md:hidden fixed bottom-0 left-0 right-0 z-50"
              style={{
                background: "#0f0f0f",
                borderTop: "1px solid rgba(201,168,76,0.2)",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.8)",
                maxHeight: "75vh",
                overflowY: "auto",
              }}
            >
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-px bg-[#c9a84c]" />
                  <span
                    className="text-[#c9a84c] uppercase tracking-[0.28em] font-light"
                    style={{ fontSize: "0.55rem", fontFamily: "'Lato', sans-serif" }}
                  >
                    Voir les catégories de plats
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-[rgba(245,240,232,0.3)] hover:text-[#c9a84c] transition-colors duration-200 text-lg leading-none"
                >
                  ✕
                </button>
              </div>
              <div className="mx-6 h-px bg-[rgba(201,168,76,0.1)]" />
              <div className="px-6 py-3 pb-8">
                {categoryNames.map((cat, i) => (
                  <a
                    key={cat}
                    href={`#${cat}`}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-4 py-4 border-b border-[rgba(201,168,76,0.06)] last:border-0 active:text-[#c9a84c] group"
                    style={{ textDecoration: "none" }}
                  >
                    <span
                      className="text-[#c9a84c] opacity-30 tabular-nums shrink-0"
                      style={{ fontSize: "0.5rem", fontFamily: "'Lato', sans-serif", letterSpacing: "0.15em" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-[rgba(245,240,232,0.65)] group-active:text-[#c9a84c] transition-colors"
                      style={{ fontSize: "0.75rem", fontFamily: "'Lato', sans-serif", letterSpacing: "0.18em", textTransform: "uppercase" }}
                    >
                      {cat}
                    </span>
                    <span className="ml-auto text-[#c9a84c] opacity-20 text-xs">→</span>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── Sections + footer au-dessus des lucioles ── */}
        <div style={{ position: "relative", zIndex: 2 }}>

        {/* ── Sections ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-28 space-y-24 sm:space-y-36">
          {dishesByCategory.map(({ category, items, imageMap }, i) =>
            items.length > 0 && (
              <CategorySection
                key={category}
                category={category}
                items={items}
                imageMap={imageMap}
                index={i}
              />
            )
          )}
        </div>

        {/* ── Pied de page décoratif ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-16">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[rgba(201,168,76,0.12)]" />
            <div className="w-1 h-1 rounded-full bg-[#c9a84c] opacity-40" />
            <div className="flex-1 h-px bg-[rgba(201,168,76,0.12)]" />
          </div>
        </div>

        </div>
      </div>
    </>
  );
}