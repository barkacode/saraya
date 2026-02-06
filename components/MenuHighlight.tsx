"use client";

import { Card } from "./ui/card";
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

function Highlight({ image, name, id,category }: Highlight) {
    return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="group w-79 h-82 perspective-1000">
        <div className="relative w-full h-full transition-transform duration-300 transform-style-3d group-hover:rotate-y-180 shadow-[0_0_10px_1px_rgba(0,0,0,0.93)] rounded-lg">
          <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden bg-[#151515]">
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <div className="absolute rounded-lg flex flex-col items-center justify-center">
                <img src={image} alt={name} className="w-32 h-32 object-contain rounded-lg" />
              </div>
            </div>
          </div>
          
          <div className="absolute w-full h-full rotate-y-180 backface-hidden rounded-lg overflow-hidden bg-[#151515] text-white">
            <div className="absolute w-full h-full">
                <img src={image} alt={name} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="absolute w-full h-full p-2.5 flex flex-col justify-between">
              <span className="bg-black/30 backdrop-blur-sm px-2.5 py-0.5 rounded-lg text-xs w-fit">
                {category}
              </span>
              <div className="w-full p-2.5 bg-green-900/30 backdrop-blur-md rounded-lg shadow-[0_0_10px_5px_rgba(0,0,0,0.53)]">
                <div className="flex justify-between items-start text-[15px]">
                  <p className="w-1/2 font-bold">{name}</p>
                  <a href={`/menu#${id}`} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs transition duration-150">
                    Voir le plat
                  </a>
                </div>
                <p className="text-white/50 mt-1 text-[12px]">
                  30 Mins &nbsp; | &nbsp; 1 Serving
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float { animation: float 2600ms infinite linear; }
        .animate-float-delayed-800 {
          animation: float 2600ms infinite linear;
          animation-delay: -800ms;
        }
        .animate-float-delayed-1800 {
          animation: float 2600ms infinite linear;
          animation-delay: -1800ms;
        }
        .animate-spin-slow { animation: spin-slow 5000ms infinite linear; }
      `}</style>
    </div>
    );
}

function GetBestSellers(): Highlight[] {
    const recipes = data.recipes;
    const bestSellers = recipes
        .filter((recipe) => recipe.best_seller === true)
        .map((recipe) => ({
            id: recipe.id,
            description: recipe.description,
            price: recipe.price,
            category: recipe.category,
            currency: recipe.currency,
            image: recipe.path_picture,
            name: recipe.name,
            best_seller: recipe.best_seller,
        }));

    return bestSellers;
}

export default function MenuHighlight() {
    const bestSellers = GetBestSellers();
    return (
        <div className="min-h-screen bg-linear-to-b bg-[#333839] flex flex-col items-center justify-center py-12">
            <h2 className="text-4xl font-bold text-gray-800">Nos recommandations de plats</h2>
            <div className="flex px-8 justify-center items-center m-4 space-x-6 max-w-screen flex-wrap ">
                {bestSellers.map((highlight) => (
                    <Highlight
                        key={highlight.id}
                        id={highlight.id}
                        image={highlight.image}
                        name={highlight.name}
                        category={highlight.category}
                        description={highlight.description}
                        price={highlight.price}
                        currency={highlight.currency}
                        best_seller={highlight.best_seller}
                    />
                ))}
            </div>
        </div>
    );
}
