"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Lantern from "@/components/Ramadan/Lantern";
import MoonCrescent from "@/components/Ramadan/MoonCrescent";
import RamadanBadge from "@/components/Ramadan/RamadanBadge";
type NavbarProps = {
  ramadan: boolean
}

export default function Navbar({ ramadan }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWide, setIsWide] = useState(true);

  const isRamadan = ramadan;
  const navLinks = [
    { name: "Accueil",    href: "/" },
    { name: "La carte",   href: "/menu" },
    { name: "Événements", href: "#evenements" },
    ...(isRamadan ? [{ name: "Iftar", href: "#iftar" }] : []),
    { name: "Contact",    href: "#contact" },
  ];

  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setIsScrollingUp(y < lastScrollY || y <= 80);
        setIsScrolled(y > 20);
        setLastScrollY(y);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <>
      <style>{`
        .nav-link-line { transform: scaleX(0); transition: transform 0.3s ease; transform-origin: left; }
        .nav-link:hover .nav-link-line { transform: scaleX(1); }

        .nb-btn { position: relative; overflow: hidden; transition: color 0.35s ease; }
        .nb-btn::before { content: ''; position: absolute; inset: 0; background: #c9a84c; transform: translateX(-101%); transition: transform 0.35s ease; }
        .nb-btn:hover::before { transform: translateX(0); }
        .nb-btn:hover { color: #0a0a0a !important; }
        .nb-btn span { position: relative; z-index: 1; }
      `}</style>

      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrollingUp ? "translate-y-0" : "-translate-y-full",
        isScrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(201,168,76,0.12)]"
          : "bg-transparent",
      )}>

        {/* Décorations Ramadan */}
        + {!isMobileMenuOpen && isScrolled && isRamadan && (
          <div className="absolute top-full left-0 w-full pointer-events-none">
            {isWide ? (
              <>
                <Lantern left="5%" height={55} sensitivity={0.9} opacity={0.85} />
                <MoonCrescent left="21%" height={40} sensitivity={1.3} opacity={0.8} />
                <Lantern left="32%" height={60} sensitivity={1.1} opacity={0.9} />
                <RamadanBadge left="45%" height={110} sensitivity={0.6} opacity={1} />
                <Lantern left="60%" height={55} sensitivity={1.2} opacity={0.9} />
                <MoonCrescent left="75%" height={45} sensitivity={1.0} opacity={0.8} />
                <Lantern left="90%" height={60} sensitivity={0.7} opacity={0.9} />
              </>
            ) : (
              <>
                <MoonCrescent left="15%" height={32} sensitivity={1.3} opacity={0.75} />
                <RamadanBadge left="38%" height={90} sensitivity={0.6} opacity={1} />
                <MoonCrescent left="72%" height={32} sensitivity={1.0} opacity={0.75} />
              </>
            )}
          </div>
        )}

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16 sm:h-20">

            {/* Logo */}
            <Link href="/" onClick={closeMobileMenu}
              className="flex items-center gap-2 sm:gap-3 group relative z-50">
              <div className="h-16 w-16 sm:h-20 sm:w-20 transition-transform duration-300 group-hover:scale-105">
                <img src="/saraya_logo_gold_transparent.png" alt="Saraya" className="h-full w-full object-contain" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-[#f5f0e8] tracking-wide"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Saraya
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}
                  className="nav-link relative px-4 py-2 group"
                  style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,232,0.7)", transition: "color 0.3s ease", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}
                >
                  {link.name}
                  <span className="nav-link-line absolute bottom-0 left-4 right-4 h-px bg-[#c9a84c]" />
                </Link>
              ))}

              {/* CTA réserver */}
              <a href="#contact"
                className="nb-btn ml-4 inline-block border border-[rgba(201,168,76,0.7)] text-[#c9a84c] no-underline px-5 py-2.5"
                style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                <span>Réserver</span>
              </a>
            </div>

            {/* Burger mobile */}
            <button
              className="md:hidden relative z-50 flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <span className={cn(
                "block w-6 h-px bg-[#f5f0e8] transition-all duration-300",
                isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
              )} />
              <span className={cn(
                "block w-6 h-px bg-[#f5f0e8] transition-all duration-300",
                isMobileMenuOpen ? "opacity-0" : ""
              )} />
              <span className={cn(
                "block w-6 h-px bg-[#f5f0e8] transition-all duration-300",
                isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              )} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — plein écran */}
      <div className={cn(
        "fixed inset-0 z-40 md:hidden flex flex-col transition-all duration-500",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>

        {/* Fond */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />

        <div className="relative z-10 flex flex-col h-full px-6 pt-28 pb-10">

          {/* Liens */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link key={link.name} href={link.href} onClick={closeMobileMenu}
                className={cn(
                  "group flex items-center justify-between py-5 border-b border-[rgba(201,168,76,0.1)] no-underline transition-all duration-500",
                  isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                )}
                style={{ transitionDelay: isMobileMenuOpen ? `${80 + i * 60}ms` : "0ms", textDecoration: "none" }}
              >
                <span className="text-[#f5f0e8] font-light group-hover:text-[#c9a84c] transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.6rem, 6vw, 2.2rem)" }}>
                  {link.name}
                </span>
                <span className="text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ fontSize: "1.2rem" }}>
                  →
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA mobile */}
          <div className={cn(
            "mt-10 transition-all duration-500",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
            style={{ transitionDelay: isMobileMenuOpen ? "320ms" : "0ms" }}>
            <a href="#contact" onClick={closeMobileMenu}
              className="nb-btn block text-center no-underline border border-[rgba(201,168,76,0.7)] text-[#c9a84c] py-4 px-6"
              style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              <span>Réserver une table</span>
            </a>
          </div>

          {/* Infos bas */}
          <div className={cn(
            "mt-auto transition-all duration-500",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
            style={{ transitionDelay: isMobileMenuOpen ? "400ms" : "0ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#c9a84c] opacity-50" />
              <span className="text-[#c9a84c] uppercase tracking-[0.22em]"
                style={{ fontSize: "0.55rem", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                Informations
              </span>
            </div>
            <p className="text-[rgba(245,240,232,0.4)] font-light mb-1"
              style={{ fontSize: "0.8rem", fontFamily: "'Lato', sans-serif" }}>
              7j / 7 — 10h à 00h30
            </p>
            <p className="text-[rgba(245,240,232,0.4)] font-light"
              style={{ fontSize: "0.8rem", fontFamily: "'Lato', sans-serif" }}>
              40 bis Rue Emile Zola, Choisy-le-Roi
            </p>
          </div>
        </div>
      </div>
    </>
  );
}