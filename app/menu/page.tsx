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
    <div className="flex flex-row overflow-hidden">
      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 shrink-0 overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover aspect-square hover:scale-105 hover:rounded-md transition-transform duration-300 rounded-md"
        />
      </div>
      <div className="p-2 sm:p-3 md:p-4 flex-1 flex flex-col justify-between">
        <div className="flex flex-col space-y-1 justify-between mb-2">
          <h3 className="text-sm sm:text-base md:text-lg font-bold ">
            {dish.name}
          </h3>
          <p className="font-bold text-sm sm:text-base md:text-lg mt-auto">
            {dish.price} €
          </p>
        </div>
        <p className=" text-xs sm:text-xs md:text-sm line-clamp-2 mb-2">
          {dish.description}
        </p>
      </div>
    </div>
  );
}

export default function MenuPage() {
  // Grouper les plats par catégorie
  const categories = [
    "Entrées",
    "Sandwichs",
    "Soupes",
    "Plats Principaux",
    "Poissons",
    "Desserts",
  ];

  const dishesByCategory = categories.map((category) => ({
    category,
    items: dishes.filter((dish) => dish.category === category),
  }));

  return (
    <div>
      <Navbar />
      
      {/* Header avec image pleine largeur qui commence sous la navbar */}
      <div className="relative w-full overflow-hidden bg-[#333839]">
        <img
          src="test.jpg"
          alt="Notre Menu"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Notre Carte
          </h1>
        </div>
      </div>

      <div className="bg-[#333839] text-white min-h-screen">
        <div className="space-y-16 sm:space-y-20 md:space-y-24 px-4 py-8
          sm:px-6 sm:py-12
          md:px-8 md:py-16
          lg:px-12 lg:py-20
          xl:px-16 xl:py-24">
          {dishesByCategory.map(
            ({ category, items }) =>
              items.length > 0 && (
                <div key={category}>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
                    {category}
                  </h2>

                  {/* mobile  */}
                  <div className="flex flex-col space-y-4 sm:hidden">
                    {items.map((dish, index) => (
                      <div key={index}>{dishCard(dish)}</div>
                    ))}
                  </div>

                  {/* desktop */}
                  <div className="hidden sm:flex sm:gap-8 md:gap-12">
                    <div className="flex-1 flex flex-col space-y-5">
                      {items
                        .slice(0, Math.ceil(items.length / 2))
                        .map((dish, index) => (
                          <div key={index}>{dishCard(dish)}</div>
                        ))}
                    </div>
                    <Separator orientation="vertical" className="w-[0.5px] bg-gray-300"  />
                    <div className="flex-1 flex flex-col space-y-5">
                      {items
                        .slice(Math.ceil(items.length / 2))
                        .map((dish, index) => (
                          <div key={index}>{dishCard(dish)}</div>
                        ))}
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
