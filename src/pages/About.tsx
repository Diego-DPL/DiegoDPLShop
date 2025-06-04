import React from 'react';

const About: React.FC = () => {
    return (
        <>
            <div className="w-full py-12 bg-gray-950 flex flex-col md:flex-row justify-start items-start gap-8 md:gap-12 px-4 md:px-8">
                <div className="w-full md:w-1/2 flex flex-col justify-start items-start gap-6">
                    <h1 className="text-gray-300 text-4xl md:text-6xl font-bold font-sans">Sobre mí</h1>
                    <p className="text-gray-300 text-xl md:text-2xl font-medium font-sans leading-relaxed">
                        Soy DiegoDPL, un apasionado productor musical especializado en la creación de beats únicos y 
                        diseño de sonido innovador. Mi trayectoria abarca desde la producción de música electrónica 
                        hasta la masterización de pistas para artistas emergentes.
                    </p>
                    <div className="pt-6 w-full"></div>
                    <a href="#trayectoria" className="text-lime-300 text-2xl md:text-4xl font-medium font-sans hover:underline">
                        Ver mi trayectoria
                    </a>
                </div>
                <div className="w-full md:w-1/2 h-40 md:h-auto">
                </div>
            </div>

            <div className="w-full py-12 bg-gray-950 flex flex-col md:flex-row justify-start items-start gap-8">
                <div className="w-full md:w-1/2 ml-10 text-gray-300 text-2xl md:text-4xl font-medium font-sans leading-relaxed">Desde 2010, he trabajado con artistas de renombre y he contribuido a la industria musical con mi enfoque creativo y técnico. Mi trabajo ha sido reconocido por su calidad y originalidad, llevando a colaboraciones exitosas a nivel internacional.</div>
            </div>
            <div className="w-full px-4 md:px-8 pt-16 pb-24 bg-gray-950 flex flex-col justify-start items-start gap-6">
                <h2 className="w-full text-gray-300 text-3xl md:text-5xl font-bold font-sans">Valores y Habilidades</h2>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 bg-white/5 rounded-2xl outline outline-[1.5px] outline-white/20 flex flex-col justify-start items-start gap-6 overflow-hidden">
                        <div className="w-16 h-16 relative overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none">
                                <path d="M32.8235 58.9707C47.5511 58.9707 59.4902 47.0316 59.4902 32.304C59.4902 17.5764 47.5511 5.63733 32.8235 5.63733C18.0959 5.63733 6.15686 17.5764 6.15686 32.304C6.15686 47.0316 18.0959 58.9707 32.8235 58.9707Z" stroke="#C1F17E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 4"/>
                            </svg>
                        </div>
                        <div className="w-full text-gray-300 text-xl md:text-2xl font-medium font-sans leading-loose">Producción de Beats</div>
                    </div>
                    <div className="p-8 bg-white/5 rounded-2xl outline outline-[1.5px] outline-white/20 flex flex-col justify-start items-start gap-6 overflow-hidden">
                        <div className="w-16 h-16 relative overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none">
                                <path d="M32.8235 58.9707C47.5511 58.9707 59.4902 47.0316 59.4902 32.304C59.4902 17.5764 47.5511 5.63733 32.8235 5.63733C18.0959 5.63733 6.15686 17.5764 6.15686 32.304C6.15686 47.0316 18.0959 58.9707 32.8235 58.9707Z" stroke="#C1F17E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 4"/>
                            </svg>
                        </div>
                        <div className="w-full text-gray-300 text-xl md:text-2xl font-medium font-sans leading-loose">Diseño de Sonido</div>
                    </div>
                    <div className="p-8 bg-white/5 rounded-2xl outline outline-[1.5px] outline-white/20 flex flex-col justify-start items-start gap-6 overflow-hidden">
                        <div className="w-16 h-16 relative overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none">
                                <path d="M32.8235 58.9707C47.5511 58.9707 59.4902 47.0316 59.4902 32.304C59.4902 17.5764 47.5511 5.63733 32.8235 5.63733C18.0959 5.63733 6.15686 17.5764 6.15686 32.304C6.15686 47.0316 18.0959 58.9707 32.8235 58.9707Z" stroke="#C1F17E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 4"/>
                            </svg>
                        </div>
                        <div className="w-full text-gray-300 text-xl md:text-2xl font-medium font-sans leading-loose">Masterización & Mezcla</div>
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 bg-white/5 rounded-2xl outline outline-[1.5px] outline-white/20 flex flex-col justify-start items-start gap-6 overflow-hidden">
                        <div className="w-16 h-16 relative overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none">
                                <path d="M32.8235 58.9707C47.5511 58.9707 59.4902 47.0316 59.4902 32.304C59.4902 17.5764 47.5511 5.63733 32.8235 5.63733C18.0959 5.63733 6.15686 17.5764 6.15686 32.304C6.15686 47.0316 18.0959 58.9707 32.8235 58.9707Z" stroke="#C1F17E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 4"/>
                            </svg>
                        </div>
                        <div className="w-full text-gray-300 text-xl md:text-2xl font-medium font-sans"></div>
                    </div>
                    <div className="p-8 bg-white/5 rounded-2xl outline outline-[1.5px] outline-white/20 flex flex-col justify-start items-start gap-6 overflow-hidden">
                        <div className="w-16 h-16 relative overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none">
                                <path d="M32.8235 58.9707C47.5511 58.9707 59.4902 47.0316 59.4902 32.304C59.4902 17.5764 47.5511 5.63733 32.8235 5.63733C18.0959 5.63733 6.15686 17.5764 6.15686 32.304C6.15686 47.0316 18.0959 58.9707 32.8235 58.9707Z" stroke="#C1F17E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 4"/>
                            </svg>
                        </div>
                        <div className="w-full text-gray-300 text-xl md:text-2xl font-medium font-sans"></div>
                    </div>
                    <div className="p-8 bg-white/5 rounded-2xl outline outline-[1.5px] outline-white/20 flex flex-col justify-start items-start gap-6 overflow-hidden">
                        <div className="w-16 h-16 relative overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none">
                                <path d="M32.8235 58.9707C47.5511 58.9707 59.4902 47.0316 59.4902 32.304C59.4902 17.5764 47.5511 5.63733 32.8235 5.63733C18.0959 5.63733 6.15686 17.5764 6.15686 32.304C6.15686 47.0316 18.0959 58.9707 32.8235 58.9707Z" stroke="#C1F17E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 4"/>
                            </svg>
                        </div>
                        <div className="w-full text-gray-300 text-xl md:text-2xl font-medium font-sans"></div>
                    </div>
                </div>
                <div className="w-full border-t border-white/20 mt-8"></div>
            </div>

            <div className="w-full py-12 md:py-24 bg-gray-950 flex flex-col justify-center items-center">
                <div className="w-full mb-20 max-w-5xl px-4 md:px-8">
                    <h2 className="text-center text-gray-300 text-3xl md:text-5xl lg:text-6xl font-medium font-sans leading-tight md:leading-snug">
                        ¿Te interesa trabajar conmigo o explorar mis bundles?
                    </h2>
                </div>
            </div>
        </>
    );
};

export default About;