import PageLayout from "@/components/PageLayout";
import Navbar from "../components/navbar";
import { dishes } from "../../data/menus";
import { Separator } from "@/components/ui/separator";

function dishCard(dish: {
  name: string;
  description: string;
  price: number;
  image: string;
}) {
  return (
    <div className="group bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-[#8A9B3A]/50">
      <div className="flex flex-row justify-between items-start mb-3">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-[#8A9B3A] transition-colors duration-300">
          {dish.name}
        </h3>
        <p className="font-bold text-base sm:text-lg md:text-xl text-[#8A9B3A] ml-4 whitespace-nowrap">
          {dish.price} €
        </p>
      </div>
      <p className="text-xs sm:text-sm md:text-base text-gray-300 line-clamp-2 leading-relaxed">
        {dish.description}
      </p>
    </div>
  );
}

export default function MenuPage() {
  // Images fixes pour chaque catégorie
  const categoryImages: { [key: string]: string } = {
    Entrées: "Recipes/brik_crevettes.jpg",
    Sandwichs: "Recipes/brick_thon.jpg",
    Soupes: "Recipes/couscous_agneau.jpg",
    "Plats Principaux": "Recipes/couscous_agneau.jpg",
    Poissons: "Recipes/brik_crevettes.jpg",
    Desserts: "Recipes/brick_thon.jpg",
  };

  // Grouper les plats par catégorie
  const categories = [
    "Entrées",
    "Sandwichs",
    "Soupes",
    "Plats Principaux",
    "Poissons",
    "Desserts",
  ];

  const dishesByCategory: {
    category: string;
    items: typeof dishes;
    image: string;
  }[] = categories.map((category) => ({
    category,
    items: dishes.filter((dish) => dish.category === category),
    image: categoryImages[category] || "Recipes/brick_thon.jpg",
  }));

  return (
    <div>
      <Navbar />

      {/* Header avec image pleine largeur qui commence sous la navbar */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden bg-[#1a1a1a]">
        <img
          src="Recipes/couscous_agneau.jpg"
          alt="Notre Menu"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-[#333839]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-wide">
            Notre Carte
          </h1>
          <div className="w-24 h-px bg-[#8A9B3A]" />
          <p className="text-gray-200 text-sm sm:text-base mt-6 font-light tracking-wider uppercase">
            Une cuisine authentique et raffinée
          </p>
        </div>
      </div>

      <div className="bg-[#1a1a1a] text-white min-h-screen">
        <div className="max-w-7xl mx-auto space-y-20 sm:space-y-28 md:space-y-32 px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
          {dishesByCategory.map(
            ({ category, items, image }) =>
              items.length > 0 && (
                <div key={category} className="space-y-8">
                  {/* Header de catégorie minimaliste */}
                  <div className="text-center">
                    <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wide mb-3">
                      {category}
                    </h2>
                    <div className="h-px bg-linear-to-r from-transparent via-[#8A9B3A] to-transparent max-w-xs mx-auto" />
                  </div>

                  {/* mobile  */}
                  <div className="sm:hidden space-y-6">
                    <div className="relative h-64 rounded-lg overflow-hidden shadow-2xl">
                      <img
                        src={image}
                        alt={category}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="space-y-4">
                      {items.map((dish, index) => (
                        <div key={index}>{dishCard(dish)}</div>
                      ))}
                    </div>
                  </div>

                  {/* desktop */}
                  <div className="hidden sm:grid sm:grid-cols-2 sm:gap-8 md:gap-12 items-start">
                    <div className=" h-full min-h-100 rounded-lg overflow-hidden shadow-2xl sticky top-24">
                      <img
                        src={image}
                        alt={category}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-white/80 text-sm font-light tracking-wide">
                          {items.length} plat{items.length > 1 ? 's' : ''} disponible{items.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4  my-auto">
                      {items.map((dish, index) => (
                        <div key={index}>{dishCard(dish)}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
}
