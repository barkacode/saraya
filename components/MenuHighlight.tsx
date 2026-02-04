import { Card } from "./ui/card";

interface Highlight {
    image: string;
    name: string;
}

function Highlight({ image, name }: Highlight) {
    return (
        
        <div className="group flex flex-col items-center m-4 space-y-2 transition-transform hover:scale-105">
            <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-center font-semibold text-gray-800 text-sm">{name}</h3>
        </div>
    );
}

export default function MenuHighlight() {
    return (
        <div className="min-h-screen bg-linear-to-b from-yellow-100 to-yellow-200 flex flex-col items-center justify-center py-12">
            <h2 className="text-4xl font-bold text-gray-800">Nos recommandations de plats</h2>
            <div className="flex px-8 justify-center max-x-screen-lg flex-wrap ">
                <Highlight image="./image.png" name="Couscous Royal" />
                <Highlight image="./image.png" name="Tajine aux légumes" />
                <Highlight image="./image.png" name="Bricks au thon" />
                <Highlight image="./image.png" name="Baklava" />
            </div>
        </div>
    );
}
