"use client";

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

function Highlight({ image, name, id, category, price, currency }: Highlight) {
  return (
    <a
      href={`/menu#${id}`}
      className="group block"
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 mb-6">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light">
            {category}
          </span>
          
        </div>
        
        <h3 className="text-xl font-light text-white tracking-wide group-hover:text-[#8A9B3A] transition-colors duration-300">
          {name}
        </h3>

        <div className="w-12 h-px bg-[#8A9B3A] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </a>
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
    <section className="bg-[#1a1a1a] py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Titre minimaliste */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <div className="inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-wide mb-4">
              Nos Spécialités
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-[#8A9B3A] to-transparent" />
          </div>
          <p className="text-gray-400 text-sm sm:text-base font-light tracking-wider mt-6 uppercase">
            Une sélection raffinée de nos créations
          </p>
        </div>

        {/* Grille minimaliste */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 sm:gap-x-12 sm:gap-y-20 lg:gap-x-16 lg:gap-y-24">
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
    </section>
  );
}
