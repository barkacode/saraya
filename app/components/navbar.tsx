"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
    <nav className={`fixed w-full z-20 top-0 start-0 transition-colors duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent border-transparent'}` } style={{ backdropFilter: isScrolled ? 'saturate(180%) blur(6px)' : undefined }}>
        <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto relative">
            <a href="#menu" className="flex items-center">
                <img src="./Saraya_Couleur.png" className="h-32 w-25" alt="Saraya Logo" />
                <span className={`self-center text-2xl font-semibold whitespace-nowrap ${isScrolled ? 'text-heading' : 'text-white'}`}>Saraya</span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" className="backdrop-blur-2xl bg-[rgb(74,100,51)]/60  rounded-full inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Ouvrir le menu</span>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
                </svg>
            </button>
            <div className="group hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center rounded-full transition-transform duration-200 hover:scale-115 px-4 py-2 md:px-6"
             style={{
               background: isScrolled ? 'rgba(255,255,255,150)' : 'linear-gradient(180deg, rgba(138,155,58,0.6) 0%, rgba(111,127,42,0.6) 50%, rgba(79,94,31,0.6) 100%)',
               backdropFilter: 'blur(25px)'
             }}>
                <ul id="navbar-default" className="flex items-center gap-4 md:gap-6 font-medium pl-2 pr-2 md:pl-4 md:pr-4">
                    <li>
                        <a href="#" className={`py-2 px-3 rounded ${isScrolled ? 'text-heading' : 'text-white'} hover:scale-105`}>Accueil</a>
                    </li>
                    <li>
                        <a href="#" className={`py-2 px-3 rounded ${isScrolled ? 'text-heading' : 'text-white'} hover:scale-105`}>A propos</a>
                    </li>
                    <li>
                        <a href="#" className={`py-2 px-3 rounded ${isScrolled ? 'text-heading' : 'text-white'} hover:scale-105`}>La carte</a>
                    </li>
                    <li>
                        <a href="#" className={`py-2 px-3 rounded  ${isScrolled ? 'text-heading' : 'text-white'} hover:scale-105`}>Contact</a>
                    </li>
                </ul>
            </div>
           
        </div>
    </nav>
    );
}