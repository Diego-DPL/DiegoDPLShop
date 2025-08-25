import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import diegoDPLDJ from '../assets/images/DiegoDPL_DJ_Pinchando.png';
import discoplatino from '../assets/images/Disco_platino_historia.webp';

const Home: React.FC = () => {
    // SEO Optimization
    useEffect(() => {
        // Dynamic meta tags for better SEO
        document.title = "DiegoDPL - Beats, Remixes & Sample Libraries | DJ y Productor Musical con Disco de Platino";
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Descubre sample libraries exclusivos, packs de sonidos únicos y recursos premium para DJs y productores. DiegoDPL - Calidad profesional respaldada por un Disco de Platino.');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = 'Descubre sample libraries exclusivos, packs de sonidos únicos y recursos premium para DJs y productores. DiegoDPL - Calidad profesional respaldada por un Disco de Platino.';
            document.head.appendChild(meta);
        }

        // Add keywords meta
        let keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (!keywordsMeta) {
            keywordsMeta = document.createElement('meta');
            keywordsMeta.setAttribute('name', 'keywords');
            document.head.appendChild(keywordsMeta);
        }
        keywordsMeta.setAttribute('content', 'sample libraries, packs de sonidos, recursos DJ, sample packs, loops, one shots, drum kits, DJ tools, producer resources, sound design');

        // Add structured data for SEO
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "DiegoDPL",
            "description": "DJ y productor musical especializado en sample libraries exclusivos, packs de sonidos únicos y recursos premium para DJs y productores. Calidad profesional respaldada por un Disco de Platino.",
            "url": window.location.origin,
            "founder": {
                "@type": "Person",
                "name": "DiegoDPL",
                "jobTitle": "DJ y Productor Musical",
                "award": "Disco de Platino - La Historia (Lorena Santos)"
            },
            "sameAs": [],
            "offers": {
                "@type": "Offer",
                "category": "Música Digital",
                "itemOffered": ["Sample Libraries", "Packs de Sonidos", "Loops Exclusivos", "Drum Kits", "DJ Tools", "Recursos para Productores"]
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);

        return () => {
            // Cleanup
            document.head.removeChild(script);
        };
    }, []);

    return (
        <>
            {/* Hero Section - Emotion-driven storytelling */}
            <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col justify-center items-center relative overflow-hidden">
                {/* Dynamic background effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(193,241,126,0.15),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(193,241,126,0.08),transparent_50%)]"></div>
                <div className="absolute top-20 left-20 w-96 h-96 bg-lime-300/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-lime-300/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
                
                {/* Floating elements */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-lime-300 rounded-full animate-bounce delay-500"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-lime-300 rounded-full animate-bounce delay-1000"></div>
                <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-lime-300 rounded-full animate-bounce delay-1500"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Content Column */}
                        <div className="text-center lg:text-left space-y-8">
                            {/* Authority Badge */}
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3">
                                <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                                    <span className="text-gray-900 text-xs font-bold">🏆</span>
                                </div>
                                <span className="text-yellow-400 text-sm font-bold">DISCO DE PLATINO CERTIFICADO</span>
                            </div>

                            {/* Main Headline - Professional and focused */}
                            <div className="space-y-4">
                                <h1 className="text-gray-100 text-4xl md:text-6xl lg:text-7xl font-bold font-sans leading-tight">
                                    Sample Libraries, Remixes y
                                    <span className="text-transparent bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text"> Contenido Gratuito</span>
                                </h1>
                                <h2 className="text-gray-100 text-3xl md:text-5xl font-bold font-sans leading-tight">
                                    para DJs y
                                    <span className="text-lime-300"> Productores</span>
                                </h2>
                            </div>

                            {/* Value proposition with focus on variety */}
                            <p className="text-gray-300 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
                                Descubre <strong className="text-lime-300">sample packs premium, remixes exclusivos y mashups únicos</strong> creados durante 
                                <strong className="text-white"> 15 años de experiencia</strong>. Además, disfruta de 
                                <strong className="text-lime-300"> contenido gratuito</strong> para elevar tus producciones.
                            </p>

                            {/* Updated stats with free content */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-lime-300 mb-1">50+</div>
                                    <div className="text-gray-400 text-sm uppercase tracking-wider">Sample Libraries</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-lime-300 mb-1">100+</div>
                                    <div className="text-gray-400 text-sm uppercase tracking-wider">Remixes & Mashups</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1">GRATIS</div>
                                    <div className="text-gray-400 text-sm uppercase tracking-wider">Contenido Disponible</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">1</div>
                                    <div className="text-gray-400 text-sm uppercase tracking-wider">Disco Platino</div>
                                </div>
                            </div>

                            {/* CTA with free content mention */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Link 
                                    to="/catalog" 
                                    className="group bg-gradient-to-r from-lime-300 to-green-400 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:from-lime-400 hover:to-green-500 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-lime-300/25"
                                >
                                    Explorar Catálogo
                                    <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                                <a 
                                    href="#preview-audio" 
                                    className="group border-2 border-green-400/50 text-green-400 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-green-400 hover:bg-green-400/10 transition-all duration-300"
                                >
                                    🎁 Contenido Gratuito
                                    <span className="inline-block ml-2 group-hover:translate-y-1 transition-transform">↓</span>
                                </a>
                            </div>

                            {/* Trust indicators - updated */}
                            <div className="flex flex-wrap items-center gap-6 pt-6 opacity-80">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-gray-400 text-sm">Sample Packs Premium</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-gray-400 text-sm">Remixes Exclusivos</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-gray-400 text-sm">Contenido Gratuito</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Column */}
                        <div className="relative flex justify-center lg:justify-end">
                            {/* Glow effect behind image */}
                            <div className="absolute inset-0 bg-gradient-to-r from-lime-300/20 to-green-400/20 rounded-full blur-3xl scale-75"></div>
                            
                            <div className="relative max-w-lg">
                                <img 
                                    src={diegoDPLDJ} 
                                    alt="DiegoDPL DJ profesional con equipos de mezcla - Productor musical con Disco de Platino"
                                    className="w-full h-auto rounded-3xl shadow-2xl shadow-lime-300/10"
                                    loading="eager"
                                />
                                
                                {/* Floating achievement badge */}
                                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-4 shadow-2xl shadow-yellow-400/25 animate-bounce">
                                    <div className="text-gray-900 text-2xl font-bold">🏆</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose DiegoDPL - Benefit-focused section */}

            <div className="w-full py-20 md:py-32 bg-gray-900 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Visual Column */}
                        <div className="relative order-2 lg:order-1">
                            <div className="relative">
                                {/* Background glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-3xl blur-2xl"></div>
                                
                                <img 
                                    className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl shadow-yellow-400/10 border border-yellow-400/20"
                                    src={discoplatino} 
                                    alt="Disco de Platino DiegoDPL - La Historia con Lorena Santos - Certificación oficial de ventas"
                                    loading="lazy"
                                />
                                
                                {/* Achievement overlay */}
                                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-6 shadow-2xl">
                                    <div className="text-gray-900 text-center">
                                        <div className="text-2xl font-bold">🏆</div>
                                        <div className="text-sm font-bold">PLATINO</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="space-y-8 order-1 lg:order-2">
                            <div>
                                <span className="text-lime-300 text-sm font-semibold uppercase tracking-wider">Mi Experiencia</span>
                                <h2 className="text-gray-100 text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                                    Más de 15 años creando
                                    <span className="text-lime-300"> sonidos únicos</span>
                                </h2>
                            </div>
                            
                            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                                <p>
                                    Como <strong className="text-white">DJ y productor musical</strong>, he desarrollado un oído único 
                                    para crear <span className="text-lime-300 font-semibold">sample libraries, remixes exclusivos y mashups únicos</span> 
                                    que realmente funcionan en tus producciones y sets.
                                </p>
                                
                                <p>
                                    <strong className="text-white">Mi experiencia en cabinas de DJ</strong> me ha enseñado qué sonidos 
                                    mueven realmente a la gente. Desde <strong className="text-lime-300">remixes que reinventan clásicos</strong> hasta 
                                    <strong className="text-lime-300">mashups que sorprenden</strong>, cada elemento está pensado para el público real.
                                </p>
                                
                                <p>
                                    <strong className="text-yellow-400">El Disco de Platino con "La Historia" de Lorena Santos</strong> demuestra 
                                    la calidad que puedes esperar, pero también comparto <strong className="text-green-400">contenido gratuito</strong> 
                                    regularmente para que puedas experimentar mi estilo antes de comprar.
                                </p>
                            </div>

                            {/* Results-focused CTA */}
                            <div className="pt-6">
                                <Link 
                                    to="/about-me" 
                                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 hover:border-lime-300/50 transition-all duration-300"
                                >
                                    <span className="text-white font-semibold">Conoce Mi Historia Completa</span>
                                    <span className="text-lime-300 group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Features Section - Nueva sección independiente */}
            <div className="w-full py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(193,241,126,0.08),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(193,241,126,0.05),transparent_50%)]"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <span className="text-lime-300 text-sm font-semibold uppercase tracking-wider">Nuestros Productos</span>
                        <h2 className="text-gray-100 text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                            Todo lo que necesitas para
                            <span className="text-lime-300"> elevar tu música</span>
                        </h2>
                        <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                            Desde sample libraries premium hasta drum kits profesionales, tenemos todo lo que necesitas para destacar en la industria musical.
                        </p>
                    </div>

                    {/* Product-focused selling points */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-lime-300/30 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="text-lime-300 text-4xl font-bold mb-4">🎵</div>
                            <h3 className="text-white text-xl font-bold mb-3">Sample Libraries</h3>
                            <p className="text-gray-300">Colecciones organizadas de samples únicos y de alta calidad, perfectos para cualquier género musical.</p>
                        </div>
                        
                        <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-lime-300/30 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="text-lime-300 text-4xl font-bold mb-4">🔄</div>
                            <h3 className="text-white text-xl font-bold mb-3">Loops Exclusivos</h3>
                            <p className="text-gray-300">Loops perfectos para tus producciones, creados con técnicas profesionales y sonido único.</p>
                        </div>
                        
                        <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-lime-300/30 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="text-lime-300 text-4xl font-bold mb-4">🥁</div>
                            <h3 className="text-white text-xl font-bold mb-3">Drum Kits</h3>
                            <p className="text-gray-300">Kits de batería con sonido profesional que darán el punch perfecto a tus tracks.</p>
                        </div>
                        
                        <div className="group bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="text-yellow-400 text-4xl font-bold mb-4">🏆</div>
                            <h3 className="text-yellow-400 text-xl font-bold mb-3">Calidad Garantizada</h3>
                            <p className="text-gray-300">Respaldado por experiencia y resultados comprobados en la industria musical.</p>
                        </div>
                    </div>

                    {/* Results-focused CTA */}
                    <div className="text-center">
                        <Link 
                            to="/catalog" 
                            className="group inline-flex items-center gap-4 bg-gradient-to-r from-lime-300/10 to-green-400/10 backdrop-blur-sm border border-lime-300/30 rounded-2xl px-8 py-4 hover:border-lime-300/50 hover:bg-lime-300/5 transition-all duration-300"
                        >
                            <span className="text-white font-semibold text-lg">Ver Catálogo Completo </span>
                            <span className="text-lime-300 group-hover:translate-x-2 transition-transform text-xl">→</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Audio Previews - Social proof section */}
            <div id="preview-audio" className="w-full py-20 md:py-32 bg-gray-950 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(193,241,126,0.05),transparent_70%)]"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <span className="text-lime-300 text-sm font-semibold uppercase tracking-wider">Explora Nuestros Sonidos</span>
                        <h2 className="text-gray-100 text-4xl md:text-6xl font-bold mt-4 mb-6">
                            Sample Packs, Remixes y
                            <span className="text-transparent bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text"> Contenido Gratuito</span>
                        </h2>
                        <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                            Descubre nuestra colección completa: <strong className="text-lime-300">sample packs premium, remixes exclusivos, mashups únicos</strong> 
                            y <strong className="text-green-400">contenido gratuito mensual</strong> para experimentar nuestro estilo.
                        </p>
                    </div>

                    {/* Product Cards - Productos Reales de DiegoDPL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* 808 Vibes Sample Pack */}
                        <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-lime-300/30 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-lime-300 to-green-400 rounded-2xl flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-bold">808 Vibes - Sample Pack</h3>
                                    <p className="text-gray-400 text-sm">150+ Samples • Trap • Club Ready</p>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4">
                                <strong className="text-lime-300">808s potentes, kicks, snares y loops</strong> listos para club. Probados en pista con 
                                sonidos que garantizan impacto en tus producciones trap.
                            </p>
                            <div className="flex items-center gap-4">
                                <Link 
                                    to="/catalog" 
                                    className="flex-1 bg-lime-300 text-gray-900 py-3 rounded-xl font-semibold hover:bg-lime-400 transition-colors text-center"
                                >
                                    ▶ Escuchar Preview
                                </Link>
                                <div className="text-lime-300 text-lg font-bold">€19</div>
                            </div>
                        </div>

                        {/* Remix Exclusivo - Lorena Santos */}
                        <div className="group bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center">
                                    <span className="text-gray-900 text-2xl font-bold">🏆</span>
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-bold">Remix Exclusivo - Lorena</h3>
                                    <p className="text-yellow-400 text-sm">DISCO DE PLATINO • EXCLUSIVO</p>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4">
                                <strong className="text-yellow-400">Remix exclusivo de "La Historia"</strong> de Lorena Santos. 
                                La versión que llevó al Disco de Platino, <strong className="text-white">solo disponible aquí</strong>.
                            </p>
                            <div className="flex items-center gap-4">
                                <Link 
                                    to="/catalog" 
                                    className="flex-1 bg-yellow-400 text-gray-900 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-colors text-center"
                                >
                                    ▶ Escuchar Hit
                                </Link>
                                <div className="text-yellow-400 text-lg font-bold">€9</div>
                            </div>
                        </div>

                        {/* Mashup Fiesta - Club Tool */}
                        <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-bold">Mashup Fiesta - Club Tool</h3>
                                    <p className="text-purple-400 text-sm">PROBADO EN PISTA • CLUB READY</p>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4">
                                <strong className="text-purple-400">Mashup probado en pista</strong> para levantar cualquier set. 
                                La herramienta secreta que uso en mis sesiones para <strong className="text-white">garantizar el climax</strong>.
                            </p>
                            <div className="flex items-center gap-4">
                                <Link 
                                    to="/catalog" 
                                    className="flex-1 bg-purple-400 text-gray-900 py-3 rounded-xl font-semibold hover:bg-purple-500 transition-colors text-center"
                                >
                                    ▶ Escuchar Tool
                                </Link>
                                <div className="text-purple-400 text-lg font-bold">€7</div>
                            </div>
                        </div>

                        {/* Bonus: Descarga Gratuita */}
                        <div className="md:col-span-2 lg:col-span-3">
                            <div className="group bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30 hover:border-green-400/50 transition-all duration-500 hover:transform hover:scale-[1.02] max-w-2xl mx-auto">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-gray-900 text-3xl font-bold">🎁</span>
                                    </div>
                                    <h3 className="text-white text-2xl font-bold mb-3">Prueba Mi Estilo - Pack Gratuito</h3>
                                    <p className="text-green-400 text-sm font-semibold uppercase tracking-wider mb-4">DESCARGA DIRECTA • SIN REGISTRO</p>
                                    <p className="text-gray-300 text-lg mb-6 max-w-xl mx-auto">
                                        Descarga <strong className="text-green-400">5 samples exclusivos</strong> para que experimentes la calidad y 
                                        estilo que ofrezco. <strong className="text-white">Sin compromisos, sin email</strong> - solo buena música.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                        <a 
                                            href="#free-download" 
                                            className="bg-green-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-500 transition-colors inline-flex items-center gap-2"
                                        >
                                            🎁 Descargar Gratis Ahora
                                            <span className="text-xl">↓</span>
                                        </a>
                                        <div className="text-green-400 text-xl font-bold">100% GRATIS</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer testimonial - more humble */}
                    <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-lime-300 rounded-full flex items-center justify-center">
                                    <span className="text-gray-900 text-2xl font-bold">LS</span>
                                </div>
                            </div>
                            <div className="text-center md:text-left">
                                <p className="text-gray-300 text-xl md:text-2xl italic mb-4">
                                    "Trabajar con Diego fue increíble. Su <strong className="text-lime-300">calidad de producción</strong> y 
                                    atención al detalle llevaron 'La Historia' a niveles que nunca imaginé. Un profesional excepcional."
                                </p>
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <div>
                                        <div className="text-white font-bold text-lg">Lorena Santos</div>
                                        <div className="text-yellow-400 text-sm">🏆 Artista Disco de Platino</div>
                                    </div>
                                    <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA - Urgency and conversion-focused */}
            <div className="w-full py-20 md:py-32 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(193,241,126,0.1),transparent_50%)]"></div>
                <div className="absolute top-20 left-20 w-96 h-96 bg-lime-300/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-lime-300/3 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 text-center">
                    {/* Professional headline */}
                    <div className="mb-12">
                        <h2 className="text-gray-100 text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            Descubre nuestra
                            <span className="text-transparent bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text"> colección completa</span>
                        </h2>
                        <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto">
                            Explora todos nuestros <strong className="text-lime-300">sample packs, drum kits y recursos exclusivos</strong>. 
                            Calidad profesional respaldada por años de experiencia en la industria.
                        </p>
                    </div>

                    {/* Product benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <div className="text-4xl mb-4">📥</div>
                            <h3 className="text-white text-xl font-bold mb-4">Descarga Inmediata</h3>
                            <p className="text-gray-300">Acceso instantáneo a todos los archivos después de la compra.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <div className="text-4xl mb-4">🎵</div>
                            <h3 className="text-white text-xl font-bold mb-4">Sonidos Originales</h3>
                            <p className="text-gray-300">Samples únicos que no encontrarás en ningún otro lugar.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-white text-xl font-bold mb-4">Listos para Usar</h3>
                            <p className="text-gray-300">Archivos optimizados y organizados para uso inmediato.</p>
                        </div>
                    </div>

                    {/* Professional CTA */}
                    <div className="space-y-8">
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link 
                                to="/catalog" 
                                className="group bg-gradient-to-r from-lime-300 to-green-400 text-gray-900 px-12 py-6 rounded-2xl font-bold text-xl hover:from-lime-400 hover:to-green-500 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-lime-300/25"
                            >
                                Ver Catálogo Completo
                                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                            
                            <Link 
                                to="/contact" 
                                className="group border-2 border-lime-300/50 text-lime-300 px-12 py-6 rounded-2xl font-bold text-xl hover:bg-lime-300/10 hover:border-lime-300 transition-all duration-300"
                            >
                                Colaboraciones Personalizadas
                                <span className="inline-block ml-2 group-hover:rotate-12 transition-transform">🎵</span>
                            </Link>
                        </div>

                        {/* Updated stats */}
                        <div className="pt-12 border-t border-white/10">
                            <p className="text-gray-400 text-sm mb-6">Confianza respaldada por:</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-lime-300 mb-1">50+</div>
                                    <div className="text-gray-400 text-sm">Sample Libraries</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-lime-300 mb-1">1000+</div>
                                    <div className="text-gray-400 text-sm">Samples Únicos</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-lime-300 mb-1">15+</div>
                                    <div className="text-gray-400 text-sm">Años Experiencia</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-yellow-400 mb-1">1</div>
                                    <div className="text-gray-400 text-sm">Disco de Platino</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
