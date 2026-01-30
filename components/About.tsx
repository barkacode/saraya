export default function About() {
  return (
    <div className="h-screen bg-green-300 flex flex-row justify-center">
      <div className="bg-black w-1/2 p-8 flex items-center justify-center">
        <img src="./image.png" alt="About image" />
      </div>
      <div className=" bg-black p-8 text-white w-1/2 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">Notre Restaurant</h2>
        <p className="sm:text-lg leading-relaxed text-sm">
          Bienvenue dans notre restaurant tunisien authentique, où nous
          célébrons les saveurs méditerranéennes et les traditions culinaires de
          la Tunisie. Découvrez nos plats généreux préparés avec des épices
          fraîches et des ingrédients de qualité : couscous parfumé, tajines
          savoureux, bricks croustillants et pâtisseries orientales. Une
          expérience gastronomique qui vous transportera au cœur de la
          Méditerranée.
        </p>
      </div>
    </div>
  );
}
