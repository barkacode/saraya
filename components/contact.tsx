"use client";

export default function Contact() {
    return (
        <div className="container mx-auto max-w-full px-4 py-12 bg-black">
             <div className="outer-container bg-black p-8 h-[500px] lg:h-[700px]">
                <div className="flex flex-col lg:flex-row gap-0 h-full">
                    <div className="w-full lg:w-1/2 h-full bg-black p-8">
                      <div className="h-full flex items-center justify-center px-4">
                          <div className="w-full max-w-3xl bg-black text-white h-full flex flex-col justify-center">
                          <div className="text-center mb-10">
                            <h2 className="text-4xl font-serif mb-2">Online Reservation</h2>
                            <p className="text-gray-400">
                              Numéro de téléphone : <a href="tel:+33189343995" className="text-yellow-500 hover:underline">+33 1 89 34 39 95</a><br />
                              Adresse e-mail : <a href="mailto:saraya.contact@gmail.com" className="text-yellow-500 hover:underline">saraya.contact@gmail.com</a>
                            </p>
                             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2629.790528758645!2d2.4065084000000003!3d48.766796400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67487a87761a3%3A0x9e1d8bfe10fe39e6!2s40%20bis%20Rue%20Emile%20Zola%2C%2094600%20Choisy-le-Roi!5e0!3m2!1sfr!2sfr!4v1770408208779!5m2!1sfr!2sfr" width="600" height="450"  loading="lazy" ></iframe>
                            <button onClick={() => window.location.href = "tel:+33189343995"}  className="w-full bg-yellow-700 text-black tracking-widest py-4 uppercase font-medium hover:bg-yellow-600 transition mt-4" >
                              Nous appeler pour réserver une table
                            </button>
                          </div>
                           
                        </div>
                      </div>
                    </div>
                    <div
                      className="w-full lg:w-1/2 h-full bg-black p-8 text-white"
                      style={{ backgroundImage: 'url(/pattern.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                    >
                      <h2 className="text-2xl font-bold mb-4">Ou nous retrouver</h2>
                    </div>
                </div>
            </div>
       </div>
        
    );
}
