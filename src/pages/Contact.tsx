import React from 'react';

const Contact: React.FC = () => {
    return (
        <>
            <div className="w-full min-h-screen bg-gray-950 py-16 px-4 md:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-gray-300 text-4xl md:text-6xl font-bold font-plus-jakarta text-center mb-12">Contacto</h1>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block mb-1 text-gray-300 text-base font-medium font-plus-jakarta">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 bg-white/5 rounded-lg outline outline-[1.5px] outline-white/20 text-gray-300 placeholder-gray-500 focus:outline-lime-300 focus:outline-2"
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 text-gray-300 text-base font-medium font-plus-jakarta">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 bg-white/5 rounded-lg outline outline-[1.5px] outline-white/20 text-gray-300 placeholder-gray-500 focus:outline-lime-300 focus:outline-2"
                                placeholder="tu@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-1 text-gray-300 text-base font-medium font-plus-jakarta">Mensaje</label>
                            <textarea
                                id="message"
                                className="w-full h-40 px-4 py-2 bg-white/5 rounded-lg outline outline-[1.5px] outline-white/20 text-gray-300 placeholder-gray-500 focus:outline-lime-300 focus:outline-2"
                                placeholder="Escribe tu mensaje..."
                            />
                        </div>
                        <div className="text-center pt-2">
                            <button type="submit" className="px-6 py-3 bg-lime-400 text-gray-950 font-semibold font-plus-jakarta rounded-lg hover:bg-lime-500 transition-colors">
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Contact;
