export default function Contact() {
    return (
        <div className="container mx-auto px-4 py-12 bg-blue-800">
             <div className="outer-container bg-black p-8 h-[700px] lg:h-[900px]">
                <div className="flex flex-col lg:flex-row gap-0 h-full">
                    <div className="w-full lg:w-1/2 h-full bg-black p-8">
                      <div className="h-full flex items-center justify-center px-4">
        <div className="w-full max-w-3xl bg-black text-white h-full flex flex-col justify-center">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif mb-2">Online Reservation</h2>
          <p className="text-gray-400">
            Numéro de téléphone : <a href="tel:+1234567890" className="text-yellow-500 hover:underline">+1 (234) 567-890</a><br />
            Adresse e-mail : <a href="mailto:test@test.com" className="text-yellow-500 hover:underline">test@test.com</a>
          </p>
        </div>

        <form className="space-y-6 h-full flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-zinc-900 border border-zinc-700 px-4 py-3 w-full focus:outline-none focus:border-yellow-500 transition"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="bg-zinc-900 border border-zinc-700 px-4 py-3 w-full focus:outline-none focus:border-yellow-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <select className="bg-zinc-900 border border-zinc-700 px-4 py-3 w-full focus:outline-none focus:border-yellow-500">
              <option>1 Person</option>
              <option>2 Persons</option>
              <option>3 Persons</option>
              <option>4 Persons</option>
              <option>5+ Persons</option>
            </select>

            <input
              type="date"
              className="bg-zinc-900 border border-zinc-700 px-4 py-3 w-full focus:outline-none focus:border-yellow-500"
            />

            <input
              type="time"
              defaultValue="08:00"
              className="bg-zinc-900 border border-zinc-700 px-4 py-3 w-full focus:outline-none focus:border-yellow-500"
            />
          </div>

          <textarea
            placeholder="Message"
            className="bg-zinc-900 border border-zinc-700 px-4 py-3 w-full focus:outline-none focus:border-yellow-500 resize-none flex-1"
          />

          <button
            type="submit"
            className="w-full bg-yellow-700 text-black tracking-widest py-4 uppercase font-medium hover:bg-yellow-600 transition mt-4"
          >
            Book a Table
          </button>
        </form>
      </div>
    </div>
                    </div>
                    <div
                      className="w-full lg:w-1/2 h-full bg-black p-8 text-white"
                      style={{ backgroundImage: 'url(/pattern.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                    >
                      <h2 className="text-2xl font-bold mb-4">Titre Section</h2>
                      <p>Votre texte ici avec background motif</p>
                    </div>
                </div>
            </div>
       </div>
        
    );
}
