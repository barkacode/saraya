export default function Contact() {
    return (
        <div className="h-screen bg-green-300 flex flex-row justify-center">
            <div className="bg-black w-1/2 p-8 flex items-center justify-center">
                <img src="./contact.png" alt="Contact image" className="rounded-lg" />
            </div>
            <div className=" bg-black p-8 text-white w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">
                    Contactez-nous
                </h2>
                <p className="sm:text-lg leading-relaxed text-sm">
                    Vous avez des questions, des commentaires ou souhaitez réserver une table ? N'hésitez pas à nous contacter !<br />
                    Téléphone : +33 1 23 45 67 89<br />
                    Email :
                    <a href="mailto:contact@saraya.fr" className="text-green-400 hover:underline">
                        contact@saraya.fr
                    </a><br />
                    Adresse : 123 Rue de la Méditerranée, 75000 Paris, France<br />
                    Nous sommes impatients de vous accueillir chez Saraya et de partager avec vous les saveurs authentiques de la Tunisie !
                </p>
            </div>
        </div>
    );
}