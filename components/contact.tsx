"use client";

export default function Contact() {
  return (
    <section className="bg-[#353839] py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Contactez-nous
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Réservez votre table ou contactez-nous pour toute question
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6 sm:space-y-8">
            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Nos coordonnées
              </h3>
              <div className="space-y-3 text-gray-300">
                <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-white">Téléphone :</span>
                  <a
                    href="tel:+33189343995"
                    className="text-[#8A9B3A] hover:text-[#9DAB4A] transition-colors"
                  >
                    +33 1 89 34 39 95
                  </a>
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-white">Email :</span>
                  <a
                    href="mailto:saraya.contact@gmail.com"
                    className="text-[#8A9B3A] hover:text-[#9DAB4A] transition-colors"
                  >
                    saraya.contact@gmail.com
                  </a>
                </p>
                <p className="flex flex-col gap-2">
                  <span className="font-medium text-white">Adresse :</span>
                  <span>40 bis Rue Emile Zola, 94600 Choisy-le-Roi</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => (window.location.href = "tel:+33189343995")}
              className="w-full bg-[#8A9B3A] text-white py-4 px-6 rounded-lg font-semibold uppercase tracking-wide hover:bg-[#9DAB4A] transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              Appeler pour réserver
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2629.790528758645!2d2.4065084000000003!3d48.766796400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67487a87761a3%3A0x9e1d8bfe10fe39e6!2s40%20bis%20Rue%20Emile%20Zola%2C%2094600%20Choisy-le-Roi!5e0!3m2!1sfr!2sfr!4v1770408208779!5m2!1sfr!2sfr"
              className="w-full h-64 sm:h-80 lg:h-full min-h-100"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Saraya Restaurant"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
