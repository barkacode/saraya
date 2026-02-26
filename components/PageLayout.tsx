import Navbar from "@/app/components/navbar";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function PageLayout({
  children,
  className = "",
  containerClassName = "",
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#353839] text-white">
      <Navbar ramadan={false}/>

      {/* Spacer pour la navbar fixed - correspond exactement à la hauteur de la navbar */}
      <div className="h-16 sm:h-20" aria-hidden="true" />

      {/* Contenu principal avec padding responsive */}
      <main className={`flex-1 ${className}`}>
        <div
          className={`
          w-full h-full
          
          ${containerClassName}
        `}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
// px-4 py-8
//           sm:px-6 sm:py-12
//           md:px-8 md:py-16
//           lg:px-12 lg:py-20
//           xl:px-16 xl:py-24
