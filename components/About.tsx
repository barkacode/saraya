export default function About() {
  return (
    <div className="h-screen bg-green-300 flex flex-row justify-center">
      <div className="bg-black w-1/2 p-8 flex items-center justify-center">
        <img src="./image.png" alt="About image" className="rounded-lg" />
      </div>
      <div className=" bg-black p-8 text-white w-1/2 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">
          Saraya c'est quoi ?
        </h2>
        <p className="sm:text-lg leading-relaxed text-sm">
          Bienvenue chez Saraya, une invitation au voyage au cœur de la Tunisie. <br />
          Dans une ambiance chaleureuse et élégante, 
          Saraya vous fait découvrir toute la richesse de la cuisine tunisienne authentique :
          couscous parfumés, bricks croustillantes, tajines savoureux et épices envoûtantes. 
          Chaque plat est préparé avec passion, à partir de recettes traditionnelles et d'ingrédients soigneusement sélectionnés, 
          pour éveiller vos sens et ravir votre palais. Chez Saraya, on ne vient pas seulement manger, 
          on vient vivre une expérience gourmande et conviviale, entre générosité, saveurs et soleil de la Méditerranée.
        </p>
      </div>
    </div>
  );
}
