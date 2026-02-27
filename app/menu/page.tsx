// app/menu/page.tsx
import MenuClient from "./MenuClient";
import { dishes } from "../../data/menus";

function buildJsonLd() {
  const seen = new Set<string>();
  const categories: string[] = [];
  for (const d of dishes) {
    if (!seen.has(d.category)) { seen.add(d.category); categories.push(d.category); }
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Menu",
        "@id": "https://restaurant-saraya.fr/menu",
        "name": "Carte du Restaurant Saraya",
        "inLanguage": "fr",
        "hasMenuSection": categories.map((cat) => ({
          "@type": "MenuSection",
          "name": cat,
          "hasMenuItem": dishes
            .filter((d) => d.category === cat)
            .map((dish) => ({
              "@type": "MenuItem",
              "name": dish.name,
              ...(dish.description && { "description": dish.description }),
              "offers": {
                "@type": "Offer",
                "price": dish.price.toFixed(2),
                "priceCurrency": "EUR",
              },
            })),
        })),
      },
    ],
  };
}

function CategoriesStatic() {
  const seen = new Set<string>();
  const categories: string[] = [];
  for (const d of dishes) {
    if (!seen.has(d.category)) { seen.add(d.category); categories.push(d.category); }
  }
  return (
    <>
      {categories.map((cat) => (
        <section key={cat}>
          <h2>{cat}</h2>
          <ul>
            {dishes.filter((d) => d.category === cat).map((dish) => (
              <li key={dish.name}>
                <strong>{dish.name}</strong>
                {dish.description && <span> — {dish.description}</span>}
                <span> — {dish.price.toFixed(2)} €</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />
      <div className="sr-only" aria-hidden="false">
        <h1>Carte du Restaurant Saraya — Cuisine Tunisienne à Choisy-le-Roi</h1>
        <CategoriesStatic />
      </div>
      <MenuClient />
    </>
  );
}