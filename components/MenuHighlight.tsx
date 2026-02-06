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

function Highlight({ image, name, id }: Highlight) {
    return (
        <div className="group flex flex-col items-center m-4 space-y-2 transition-transform hover:scale-105">
            <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-center font-semibold text-gray-800 text-sm">{name}</h3>
            <a href={`/menu#${id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                Voir le plat sur la carte
            </a>
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
        <div className="min-h-screen bg-linear-to-b from-yellow-100 to-yellow-200 flex flex-col items-center justify-center py-12">
            <h2 className="text-4xl font-bold text-gray-800">Nos recommandations de plats</h2>
            <div className="flex px-8 justify-center max-x-screen-lg flex-wrap ">
                {bestSellers.map((highlight) => (
                    <Highlight
                        key={highlight.id}
                        image={highlight.image}
                        name={highlight.name}
                        id={highlight.id}
                        description={highlight.description}
                        price={highlight.price}
                        category={highlight.category}
                        currency={highlight.currency}
                        best_seller={highlight.best_seller}
                    />
                ))}
            </div>
        </div>
    );
}
