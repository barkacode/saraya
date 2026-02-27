"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const events = [
  {
    id: 1,
    category: "Soirées & Animations",
    title: "Nuits Orientales",
    subtitle: "Chaque vendredi & samedi",
    description: "Plongez dans une ambiance envoûtante au rythme de musiques orientales live. Danse du ventre, oudh et percussions — une soirée hors du temps.",
    media: "/Events/Ambiance.mp4",
    type: "video" as const,
    tag: "Soirée",
    objectPosition: "center 15%",
  },
  {
    id: 2,
    category: "Anniversaires",
    title: "Célébrez en Grand",
    subtitle: "Une fête inoubliable",
    description: "Gâteau personnalisé, ambiance féerique et cuisine tunisienne d'exception. Offrez à vos proches une célébration à la hauteur de l'occasion.",
    media: "/Events/Anniversaire.jpeg",
    type: "image" as const,
    tag: "Anniversaire",
    objectPosition: "center 100%",
  },
  {
    id: 3,
    category: "Fiançailles",
    title: "L'Amour à la\nTunisienne",
    subtitle: "Le plus beau jour de votre vie",
    description: "Pour vos Fiançailles, Saraya vous accompagne avec élégance. Décors fleuris, mets raffinés et service impeccable pour une nuit de légende.",
    media: "/Events/Fiancailles.jpeg",
    type: "image" as const,
    tag: "Fiançailles",
    objectPosition: "center 10%",
  },
];

const DURATION = 6000;

export default function Events() {
  const [current, setCurrent]               = useState(0);
  const [prev, setPrev]                     = useState<number | null>(null);
  const [direction, setDirection]           = useState<"next" | "prev">("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress]             = useState(0);
  const [paused, setPaused]                 = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number, dir: "next" | "prev" = "next") => {
    if (isTransitioning) return;
    setDirection(dir);
    setPrev(current);
    setIsTransitioning(true);
    setProgress(0);
    setTimeout(() => { setCurrent(index); setPrev(null); setIsTransitioning(false); }, 450);
  }, [current, isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % events.length, "next"), [current, goTo]);
  const back = useCallback(() => goTo((current - 1 + events.length) % events.length, "prev"), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, DURATION);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next, paused]);

  useEffect(() => {
    setProgress(0);
    if (paused) return;
    const step = 100 / (DURATION / 50);
    progressRef.current = setInterval(() => setProgress(p => Math.min(p + step, 100)), 50);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [current, paused]);

  const ev  = events[current];
  const evP = prev !== null ? events[prev] : null;

  return (
    <>
      <style>{`
        @keyframes evEnter     { from{opacity:0;transform:scale(1.03) translateX(20px) } to{opacity:1;transform:scale(1) translateX(0)    } }
        @keyframes evEnterPrev { from{opacity:0;transform:scale(1.03) translateX(-20px)} to{opacity:1;transform:scale(1) translateX(0)    } }
        @keyframes evExit      { from{opacity:1;transform:scale(1)    translateX(0)    } to{opacity:0;transform:scale(0.98) translateX(-20px)} }
        @keyframes evExitPrev  { from{opacity:1;transform:scale(1)    translateX(0)    } to{opacity:0;transform:scale(0.98) translateX(20px) } }
        @keyframes evText      { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes evTag       { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
        .ev-enter      { animation: evEnter     0.45s ease-out forwards }
        .ev-enter-prev { animation: evEnterPrev 0.45s ease-out forwards }
        .ev-exit       { animation: evExit      0.45s ease-out forwards }
        .ev-exit-prev  { animation: evExitPrev  0.45s ease-out forwards }
        .ev-text       { animation: evText 0.4s ease 0.1s both }
        .ev-tag        { animation: evTag  0.3s ease 0.05s both }
        .ev-cta        { position:relative; overflow:hidden; transition:color 0.35s ease }
        .ev-cta::before{ content:''; position:absolute; inset:0; background:#c9a84c; transform:translateX(-101%); transition:transform 0.35s ease }
        .ev-cta:hover::before { transform:translateX(0) }
        .ev-cta:hover  { color:#0a0a0a !important }
        .ev-cta span   { position:relative; z-index:1 }
      `}</style>

      <section
        className="relative w-full overflow-hidden bg-[#0a0a0a] h-svh min-h-[600px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ── Slides ── */}
        <div className="absolute inset-0">
          {evP && (
            <div key={`exit-${evP.id}`} className={cn("absolute inset-0 z-[1]", direction === "next" ? "ev-exit" : "ev-exit-prev")}>
              <SlideMedia event={evP} />
            </div>
          )}
          <div key={`enter-${ev.id}`} className={cn("absolute inset-0 z-[2]", isTransitioning && (direction === "next" ? "ev-enter" : "ev-enter-prev"))}>
            <SlideMedia event={ev} />
          </div>
        </div>

        {/* ── Overlays ── */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#0a0a0a]/55 via-transparent to-transparent" />

        {/* ── Zones nav invisibles ── */}
        <button onClick={back} aria-label="Précédent" className="absolute left-0 top-0 bottom-0 z-20 w-[30%] cursor-w-resize bg-transparent border-none" />
        <button onClick={next} aria-label="Suivant"   className="absolute right-0 top-0 bottom-0 z-20 w-[30%] cursor-e-resize bg-transparent border-none" />

        {/* ── Header ── */}
        <div className="absolute top-10 left-10 z-30 flex items-center gap-3">
          <div className="w-9 h-px bg-[#c9a84c]" />
          <span className="text-[#c9a84c] uppercase tracking-[0.28em] text-[0.6rem] font-light">Événements</span>
        </div>

        {/* ── Counter ── */}
        <div className="absolute top-10 right-10 z-30 flex items-center gap-2 text-[0.65rem] font-light text-white/35 tracking-[0.1em]">
          <span className="text-[#c9a84c] font-['Playfair_Display',serif] text-base font-bold">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span>/</span>
          <span>{String(events.length).padStart(2, "0")}</span>
        </div>

        {/* ── Texte ── */}
        <div key={`text-${ev.id}`} className="ev-text absolute bottom-0 left-0 z-30 px-8 sm:px-12 lg:px-16 pb-24 max-w-2xl">

          <div className="ev-tag inline-flex items-center gap-2 mb-5">
            <div className="w-4 h-px bg-[#c9a84c] opacity-70" />
            <span className="text-[#c9a84c] uppercase tracking-[0.22em] text-[0.58rem] font-light">{ev.category}</span>
          </div>

          <h2 className="mb-5 font-['Playfair_Display',serif] text-[clamp(2rem,5vw,4rem)] font-bold text-[#f5f0e8] leading-[1.1] tracking-[-0.02em] whitespace-pre-line">
            {ev.title}
          </h2>

          <p className="mb-5 text-[0.75rem] font-light tracking-[0.18em] uppercase text-[#c9a84c]/80">{ev.subtitle}</p>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-0.5 w-10 bg-gradient-to-r from-[#c9a84c] to-[#f5e6a0]" />
            <div className="w-1 h-1 rounded-full bg-[#c9a84c]" />
            <div className="h-px w-14 bg-[#c9a84c] opacity-25" />
          </div>

          <p className="mb-9 max-w-md text-[clamp(0.82rem,1.1vw,0.95rem)] font-light leading-[1.9] text-[#f5f0e8]/60">
            {ev.description}
          </p>

          <a href="#contact" className="ev-cta inline-block border border-[#c9a84c]/60 text-[#c9a84c] no-underline px-6 py-3 text-[0.62rem] font-normal tracking-[0.24em] uppercase">
            <span>Nous contacter</span>
          </a>
        </div>

        {/* ── Flèches ── */}
        <div className="absolute bottom-20 right-8 sm:right-12 lg:right-16 z-30 flex items-center gap-3">
          {([{ fn: back, label: "Précédent", d: "M10 3L5 8l5 5" }, { fn: next, label: "Suivant", d: "M6 3l5 5-5 5" }] as const).map(({ fn, label, d }) => (
            <button key={label} onClick={fn} aria-label={label}
              className="w-12 h-12 flex items-center justify-center border border-[#c9a84c]/30 text-[#c9a84c]/70 backdrop-blur-sm bg-[#0a0a0a]/40 transition-all duration-300 hover:border-[#c9a84c]/80 hover:text-[#c9a84c] hover:bg-[#0a0a0a]/70">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d={d} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        {/* ── Dots + progress ── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {events.map((_, i) => (
            <button key={i} onClick={() => goTo(i, i > current ? "next" : "prev")} aria-label={`Slide ${i + 1}`}
              className={cn("relative h-px py-1 border-none cursor-pointer transition-all duration-300", i === current ? "w-8 bg-[#c9a84c]" : "w-4 bg-[#c9a84c]/25")}>
              {i === current && (
                <span className="absolute inset-0 origin-left bg-[#f5e6a0] transition-[transform] duration-[50ms]"
                  style={{ transform: `scaleX(${progress / 100})` }} />
              )}
            </button>
          ))}
        </div>

        {/* ── Label vertical ── */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 pointer-events-none">
          <div className="h-16 w-px bg-gradient-to-b from-transparent to-[#c9a84c]/30" />
          <span className="text-[#c9a84c]/35 text-[0.55rem] font-light tracking-[0.25em] uppercase [writing-mode:vertical-rl]">
            {ev.tag}
          </span>
          <div className="h-16 w-px bg-gradient-to-t from-transparent to-[#c9a84c]/30" />
        </div>
      </section>
    </>
  );
}

function SlideMedia({ event }: { event: typeof events[0] }) {
  const [isLg, setIsLg] = useState(false);
  useEffect(() => {
    setIsLg(window.innerWidth >= 1024);
    const onResize = () => setIsLg(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const pos = isLg ? event.objectPosition : "center";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {event.type === "video"
        ? <video src={event.media} autoPlay muted loop playsInline className="w-full h-full object-cover" style={{ objectPosition: pos }} />
        : <img src={event.media} alt={event.title} className="w-full h-full object-cover brightness-75 contrast-105" style={{ objectPosition: pos }} />
      }
    </div>
  );
}