"use client";

import { useEffect, useRef } from "react";

export default function Contact() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("ct-visible");
      }),
      { threshold: 0.15 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .ct-left  { opacity: 0; transform: translateX(-30px); transition: opacity 0.9s ease, transform 0.9s ease; }
        .ct-right { opacity: 0; transform: translateX(30px);  transition: opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s; }
        .ct-left.ct-visible, .ct-right.ct-visible { opacity: 1; transform: translateX(0); }

        .ct-btn { position: relative; overflow: hidden; transition: color 0.35s ease; }
        .ct-btn::before { content: ''; position: absolute; inset: 0; background: #c9a84c; transform: translateX(-101%); transition: transform 0.35s ease; }
        .ct-btn:hover::before { transform: translateX(0); }
        .ct-btn:hover { color: #0a0a0a !important; }
        .ct-btn span { position: relative; z-index: 1; }

        .ct-link { transition: color 0.3s ease; }
        .ct-link:hover { color: #c9a84c !important; }
      `}</style>

      <section className="relative bg-[#0a0a0a] py-24 sm:py-32 overflow-hidden" id="contact">

        {/* Transition depuis MenuHighlight */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent)" }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Header */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-px bg-[#c9a84c]" />
              <span className="text-[#c9a84c] uppercase tracking-[0.28em] font-light"
                style={{ fontSize: "0.62rem", fontFamily: "'Lato', sans-serif" }}>
                Nous trouver
              </span>
            </div>
            <h2 className="font-light text-[#f5f0e8] leading-[1.1] tracking-[-0.01em]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.4rem, 4vw, 4rem)" }}>
              Venez nous<br />
              <span className="italic font-bold text-[#c9a84c]">rendre visite</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Gauche — infos */}
            <div ref={leftRef} className="ct-left flex flex-col space-y-10" style={{ height: "100%" }}>

              {/* Coordonnées */}
              <div className="space-y-6">
                {[
                  {
                    label: "Téléphone",
                    value: "+33 1 89 34 39 95",
                    href: "tel:+33189343995",
                  },
                  {
                    label: "Email",
                    value: "saraya.contact@gmail.com",
                    href: "mailto:saraya.contact@gmail.com",
                  },
                  {
                    label: "Adresse",
                    value: "40 bis Rue Emile Zola\n94600 Choisy-le-Roi",
                    href: "https://maps.google.com/?q=40+bis+Rue+Emile+Zola+94600+Choisy-le-Roi",
                  },
                   {
                    label: "Horaires",
                    value: "Lun - Dim: 10h - 00h30",
                    href: null,
                  },
                ].map(({ label, value, href }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <span className="text-[#c9a84c] uppercase tracking-[0.22em] font-light"
                      style={{ fontSize: "0.80rem", fontFamily: "'Lato', sans-serif" }}>
                      {label}
                    </span>
                    {href ? (
                      <a href={href} className="ct-link no-underline text-[rgba(245,240,232,0.65)]"
                        style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", fontWeight: 300, whiteSpace: "pre-line" }}>
                        {value}
                      </a>
                    ) : (
                      <span className="text-[rgba(245,240,232,0.65)]"
                        style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", fontWeight: 300, whiteSpace: "pre-line" }}>
                        {value}
                      </span>
                    )}
                    <div className="w-8 h-px bg-[rgba(201,168,76,0.25)] mt-1" />
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-4">

                <a href="tel:+33189343995"
                  className="ct-btn inline-block w-full text-center no-underline border border-[rgba(201,168,76,0.7)] text-[#c9a84c]"
                  style={{
                    padding: "15px 28px",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 400,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  <span>Appeler pour réserver</span>
                </a>
              </div>
            </div>

            {/* Droite — carte */}
            <div ref={rightRef} className="ct-right">
              <div className="relative overflow-hidden"
                style={{ height: "420px", border: "1px solid rgba(201,168,76,0.15)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2629.790528758645!2d2.4065084000000003!3d48.766796400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67487a87761a3%3A0x9e1d8bfe10fe39e6!2s40%20bis%20Rue%20Emile%20Zola%2C%2094600%20Choisy-le-Roi!5e0!3m2!1sfr!2sfr!4v1770408208779!5m2!1sfr!2sfr"
                  className="w-full h-full"
                  style={{ border: 0, filter: "grayscale(0.3) brightness(1.05)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Saraya"
                />
              </div>

              {/* Adresse sous la carte */}
              <div className="flex items-center gap-3 mt-4">
                <div className="w-4 h-px bg-[#c9a84c] opacity-60 shrink-0" />
                <span className="text-[rgba(245,240,232,0.75)] font-light"
                  style={{ fontSize: "0.9rem", fontFamily: "'Lato', sans-serif", letterSpacing: "0.08em" }}>
                  40 bis Rue Emile Zola, 94600 Choisy-le-Roi
                </span>
              </div>
            </div>
          </div>

          {/* Ligne décorative bas */}
          <div className="mt-20 flex items-center gap-4">
            <div className="flex-1 h-px bg-[rgba(201,168,76,0.12)]" />
            <div className="w-1 h-1 rounded-full bg-[#c9a84c] opacity-30" />
            <div className="flex-1 h-px bg-[rgba(201,168,76,0.12)]" />
          </div>

        </div>
      </section>
    </>
  );
}