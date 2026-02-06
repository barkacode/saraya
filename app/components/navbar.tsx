"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Gestion du scroll avec hide/show intelligent
  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      
      // Détecte si on scroll vers le haut ou vers le bas
      if (scrollY > lastScrollY && scrollY > 80) {
        // Scroll down - cache la navbar
        setIsScrollingUp(false);
      } else {
        // Scroll up - montre la navbar
        setIsScrollingUp(true);
      }

      // Détecte si on a scrollé
      setIsScrolled(scrollY > 20);
      setLastScrollY(scrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  // Ferme le menu mobile au redimensionnement
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Empêche le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "#about" },
    { name: "La carte", href: "/menu" },
    { name: "Contact", href: "#contact" },
  ];

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          // Animation de slide up/down
          isScrollingUp ? "translate-y-0" : "-translate-y-full",
          // Background et shadow
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo avec animation */}
            <Link 
              href="/" 
              className="flex items-center gap-2 sm:gap-3 group relative z-50"
              onClick={closeMobileMenu}
            >
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <img
                  src="/Saraya_Couleur.png"
                  alt="Saraya"
                  className="h-full w-full object-contain"
                />
              </div>
              <span
                className={cn(
                  "text-xl sm:text-2xl font-bold transition-all duration-300",
                  isScrolled ? "text-gray-900" : "text-white"
                )}
              >
                Saraya
              </span>
            </Link>

            {/* Desktop Navigation avec animations */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group",
                    isScrolled
                      ? "text-gray-700 hover:text-[#8A9B3A] hover:bg-gray-50"
                      : "text-white hover:text-white/90 hover:bg-white/10"
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Underline animation */}
                  <span
                    className={cn(
                      "absolute bottom-1 left-4 right-4 h-0.5 scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                      isScrolled ? "bg-[#8A9B3A]" : "bg-white"
                    )}
                  />
                </Link>
              ))}
              
              <Button
                className={cn(
                  "ml-4 transition-all duration-300 hover:scale-105 hover:shadow-lg",
                  "bg-[#8A9B3A] hover:bg-[#6F7F2A] text-white"
                )}
                size="sm"
              >
                Réserver
              </Button>
            </div>

            {/* Mobile Menu Button avec animation */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden relative z-50 transition-colors duration-300",
                isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={cn(
                    "absolute top-1/2 left-0 w-6 h-0.5 transition-all duration-300 ease-out",
                    isScrolled ? "bg-gray-900" : "bg-white",
                    isMobileMenuOpen
                      ? "rotate-45 translate-y-0"
                      : "-translate-y-2"
                  )}
                />
                <span
                  className={cn(
                    "absolute top-1/2 left-0 w-6 h-0.5 transition-all duration-300 ease-out",
                    isScrolled ? "bg-gray-900" : "bg-white",
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute top-1/2 left-0 w-6 h-0.5 transition-all duration-300 ease-out",
                    isScrolled ? "bg-gray-900" : "bg-white",
                    isMobileMenuOpen
                      ? "-rotate-45 translate-y-0"
                      : "translate-y-2"
                  )}
                />
              </div>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay avec animation premium */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop avec blur */}
        <div
          className={cn(
            "absolute inset-0 bg-[#353839] backdrop-blur-md transition-opacity duration-500",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={closeMobileMenu}
        />

        {/* Menu Content */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full pt-24 pb-8 px-6">
            {/* Navigation Links avec stagger animation */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "group relative py-4 px-6 text-lg font-medium text-gray-900 rounded-xl transition-all duration-300 hover:bg-gray-50 hover:pl-8",
                    "transform transition-all duration-500 ease-out",
                    isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  )}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${100 + index * 50}ms`
                      : "0ms",
                  }}
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#8A9B3A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="mt-auto">
              <Button
                className={cn(
                  "w-full bg-[#8A9B3A] hover:bg-[#6F7F2A] text-white transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl",
                  isMobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? "400ms" : "0ms",
                }}
                onClick={closeMobileMenu}
              >
                Réserver une table
              </Button>

              {/* Footer info */}
              <div
                className={cn(
                  "mt-6 pt-6 border-t border-gray-200 transition-all duration-500 ease-out",
                  isMobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? "500ms" : "0ms",
                }}
              >
                <p className="text-sm text-gray-600">
                  Ouvert du lundi au samedi
                </p>
                <p className="text-sm text-gray-600">12h - 14h30 | 19h - 22h30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}