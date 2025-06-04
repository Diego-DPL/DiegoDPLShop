import React from 'react';
import diegoDPLDJ from '../assets/images/DiegoDPL_DJ_Pinchando.png';
import discoplatino from '../assets/images/Disco_platino_historia.webp';

const Home: React.FC = () => {
    return (

        <>
            {/* Hero section */}
            <div className="home-container bg-bg-primary w-full min-h-screen pt-16 md:pt-24 lg:pt-40">
                <div className="relative px-4 md:px-8">
                    <div className="absolute inset-0 flex justify-center z-0 -mt-10 md:-mt-20 lg:mt-30">
                        <div className="text-center text-gray-300 text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold font-plus-jakarta">DiegoDPL</div>
                    </div>
                    <div className="relative z-10 mx-auto flex justify-center lg:justify-end lg:-pr-30 xl:pr-40 mt-40 lg:-mt-20">
                        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl">
                            <img 
                                src={diegoDPLDJ} 
                                alt="DiegoDPL DJ Pinchando" 
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* sobre mi */}
            <div className="self-stretch py-12 bg-gray-950 flex flex-col md:flex-row justify-start items-start gap-12 overflow-hidden">
                <div className="flex-1 pr-12 flex flex-col justify-start items-start gap-6">
                    <div className="self-stretch h-16 justify-start ml-8 text-gray-300 text-6xl font-bold font-plus-jakarta leading-[68px]">Sobre mí</div>
                    <div className="self-stretch justify-start ml-8 text-gray-300 text-2xl font-medium font-plus-jakarta leading-loose">Con más de 10 años creando música, he colaborado con numerosos artistas, ofreciendo bundles exclusivos que reflejan su filosofía creativa. Además, he conseguido un disco de platino con la canción "La historia de Lorena Santos".</div>
                    <div className="self-stretch pt-6 flex flex-col justify-start items-start gap-4">
                        <div className="self-stretch justify-start ml-8 text-lime-300 text-4xl font-medium font-plus-jakarta leading-10">+10 años creando</div>
                        <div className="self-stretch justify-start ml-8 text-lime-300 text-4xl font-medium font-plus-jakarta leading-10">Disco de Platino</div>
                        <div className="self-stretch justify-start ml-8 text-lime-300 text-4xl font-medium font-plus-jakarta leading-10">Bundles exclusivos</div>
                    </div>
                </div>
                <div className="flex justify-center items-center md:flex-1">
                    <img 
                        className="object-contain max-w-full h-150 border-[1.50px] border-gray-300/20" 
                        src={discoplatino} 
                        alt="Disco de platino" 
                    />
                </div>
            </div>

            {/* Audio Previews section */}
            <div className="w-full py-16 md:py-24 bg-gray-950">
                <div className="container mx-auto mt-20 px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-10">
                        <div className="md:col-span-1">
                            <h2 className="text-gray-300 text-3xl md:text-4xl lg:text-5xl font-bold font-plus-jakarta leading-tight">Previews de Audio</h2>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-gray-300 text-lg md:text-2xl font-medium font-plus-jakarta leading-relaxed">
                                Escucha una muestra de nuestros bundles de sonido. Cada clip tiene una duración de 10-15 segundos.
                            </p>
                            
                        </div>
                    </div>
                </div>
                
            </div>

            {/* Call to action section */}
            <div className="w-full h-150 py-40 relative bg-gray-950">
                <div className="w-full h-full absolute inset-0 bg-gradient-radial from-lime-800/5 to-transparent"></div>
                <div className="container mx-auto px-4 md:px-8 flex flex-col justify-start items-center gap-12">
                    <div className="w-full flex flex-col justify-start items-start gap-4">
                        <h2 className="w-full text-center text-gray-300 text-3xl md:text-4xl lg:text-6xl font-bold font-plus-jakarta leading-tight md:leading-snug">¿Listo para llevar tu producción al siguiente nivel?</h2>
                    </div>
                    <a href="/catalog" className="px-6 py-3 bg-lime-400 rounded-lg inline-flex justify-center items-center hover:bg-lime-500 transition-colors">
                        <span className="text-gray-950 text-lg md:text-xl font-semibold font-plus-jakarta">Ver Catálogo Completo</span>
                    </a>
                </div>
                <div className="w-full h-px absolute bottom-0 left-0 bg-white/20"></div>
            </div>
        </>
    );
};

export default Home;