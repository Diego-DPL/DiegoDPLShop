import React, { useEffect } from 'react';

const About: React.FC = () => {
    // SEO Optimization
    useEffect(() => {
        // Dynamic meta tags for better SEO
        document.title = "Sobre DiegoDPL | DJ, Productor Musical & Creador de Sample Libraries";
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Conoce a DiegoDPL, DJ y productor musical con +15 años creando beats, remixes virales, mashups únicos y sample libraries exclusivos. Disco de Platino con Lorena Santos.');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = 'Conoce a DiegoDPL, DJ y productor musical con +15 años creando beats, remixes virales, mashups únicos y sample libraries exclusivos. Disco de Platino con Lorena Santos.';
            document.head.appendChild(meta);
        }

        // Add structured data for SEO
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "DiegoDPL",
            "jobTitle": "DJ, Productor Musical y Sound Designer",
            "description": "DJ y productor musical profesional especializado en beats únicos, remixes virales, mashups y sample libraries exclusivos. Disco de Platino con Lorena Santos.",
            "url": window.location.href,
            "sameAs": [],
            "knowsAbout": ["DJ Sets", "Producción Musical", "Remixes", "Mashups", "Sound Design", "Sample Libraries", "Beats", "Masterización", "Mezcla Audio"]
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
            {/* Hero Section - Storytelling approach */}
            <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col justify-center items-center relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(193,241,126,0.1),transparent_50%)]"></div>
                <div className="absolute top-20 left-20 w-72 h-72 bg-lime-300/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-lime-300/3 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-20 text-center">
                    {/* Hero Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8">
                        <div className="w-2 h-2 bg-lime-300 rounded-full animate-pulse"></div>
                        <span className="text-lime-300 text-sm font-medium">DJ & Productor Musical Profesional</span>
                    </div>

                    {/* Platinum Achievement Badge */}
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-400/30 rounded-full px-8 py-4 mb-8">
                        <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                            <span className="text-gray-900 text-xs font-bold">🏆</span>
                        </div>
                        <span className="text-yellow-400 text-lg font-bold">DISCO DE PLATINO</span>
                        <span className="text-gray-300 text-sm">• "La Historia" - Lorena Santos</span>
                    </div>

                    {/* Main Headline - Power statement */}
                    <h1 className="text-gray-100 text-5xl md:text-7xl lg:text-8xl font-bold font-sans mb-8 leading-tight">
                        Transformo
                        <span className="text-transparent bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text"> ideas </span>
                        en obras maestras
                    </h1>

                    {/* Value proposition */}
                    <p className="text-gray-300 text-xl md:text-2xl font-light max-w-4xl mx-auto mb-12 leading-relaxed">
                        Soy <strong className="text-lime-300 font-semibold">DiegoDPL</strong>, DJ y productor musical que durante los últimos 
                        <strong className="text-white"> 15 años</strong> ha ayudado a cientos de artistas a 
                        materializar su visión con beats únicos, remixes explosivos, mashups virales y librerías de sonidos exclusivas.
                    </p>

                    {/* Social proof numbers */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-lime-300 mb-2">500+</div>
                            <div className="text-gray-400 text-sm uppercase tracking-wider">Beats & Remixes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-lime-300 mb-2">15+</div>
                            <div className="text-gray-400 text-sm uppercase tracking-wider">Años DJ & Producer</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-lime-300 mb-2">200+</div>
                            <div className="text-gray-400 text-sm uppercase tracking-wider">Sets & Mashups</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">1</div>
                            <div className="text-gray-400 text-sm uppercase tracking-wider">Disco de Platino</div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a 
                            href="/catalog" 
                            className="group bg-gradient-to-r from-lime-300 to-green-400 text-gray-900 px-8 py-4 rounded-2xl font-semibold text-lg hover:from-lime-400 hover:to-green-500 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-lime-300/20"
                        >
                            Ver Mi Catálogo
                            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                        <a 
                            href="#mi-historia" 
                            className="group border-2 border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:border-lime-300/50 hover:bg-white/5 transition-all duration-300"
                        >
                            Conoce Mi Historia
                            <span className="inline-block ml-2 group-hover:translate-y-1 transition-transform">↓</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Mi Historia Section */}
            <div id="mi-historia" className="w-full py-20 md:py-32 bg-gray-950 relative">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Story Content */}
                        <div className="space-y-8">
                            <div>
                                <span className="text-lime-300 text-sm font-semibold uppercase tracking-wider">Mi Historia</span>
                                <h2 className="text-gray-100 text-4xl md:text-5xl font-bold mt-4 mb-6">
                                    Todo comenzó con una 
                                    <span className="text-lime-300"> pasión</span>
                                </h2>
                            </div>
                            
                            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                                <p>
                                    <strong className="text-white">2010.</strong> Era solo un adolescente obsesionado con los sonidos que escuchaba en mis canciones favoritas. 
                                    Me preguntaba: <em className="text-lime-300">"¿Cómo crean esas texturas tan únicas?"</em>
                                </p>
                                
                                <p>
                                    Esa curiosidad me llevó no solo a descargar mi primer DAW, sino también a explorar el mundo del DJing. 
                                    Las primeras semanas mezclando pistas fueron frustrantes, pero algo me mantenía enganchado. 
                                    <strong className="text-white">La magia de crear algo único combinando elementos existentes.</strong>
                                </p>
                                
                                <p>
                                    <strong className="text-white">Años después,</strong> esa pasión se expandió. No solo producía beats originales, 
                                    sino que creaba remixes que daban nueva vida a canciones conocidas, mashups que sorprendían a las audiencias, 
                                    y desarrollaba mis propias <span className="text-lime-300 font-semibold">librerías de sonidos exclusivos</span> 
                                    que ahora usan productores de todo el mundo.
                                </p>
                                
                                <p>
                                    <strong className="text-yellow-400">El momento cumbre:</strong> Cuando produje "La Historia" para 
                                    <strong className="text-white"> Lorena Santos</strong>, nunca imaginé que alcanzaríamos 
                                    <span className="text-yellow-400 font-semibold">Disco de Platino</span>. Esa canción cambió mi carrera para siempre.
                                </p>
                                
                                <p>
                                    Hoy, combino mi experiencia como <strong className="text-white">DJ en vivo</strong> con mi conocimiento técnico 
                                    como productor para crear un <span className="text-lime-300 font-semibold">sonido inconfundible</span> que funciona 
                                    tanto en el estudio como en la pista de baile.
                                </p>
                            </div>

                            {/* Achievement badges */}
                            <div className="flex flex-wrap gap-4 pt-6">
                                <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-400/30 rounded-full px-4 py-2">
                                    <span className="text-yellow-400 text-sm font-medium">🏆 Disco de Platino</span>
                                </div>
                                <div className="bg-gradient-to-r from-lime-300/10 to-green-400/10 border border-lime-300/20 rounded-full px-4 py-2">
                                    <span className="text-lime-300 text-sm font-medium">🎧 DJ Profesional</span>
                                </div>
                                <div className="bg-gradient-to-r from-lime-300/10 to-green-400/10 border border-lime-300/20 rounded-full px-4 py-2">
                                    <span className="text-lime-300 text-sm font-medium">🎵 Beatmaker Certificado</span>
                                </div>
                                <div className="bg-gradient-to-r from-lime-300/10 to-green-400/10 border border-lime-300/20 rounded-full px-4 py-2">
                                    <span className="text-lime-300 text-sm font-medium">🔥 Remix Specialist</span>
                                </div>
                                <div className="bg-gradient-to-r from-lime-300/10 to-green-400/10 border border-lime-300/20 rounded-full px-4 py-2">
                                    <span className="text-lime-300 text-sm font-medium">📚 Sample Library Creator</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Element - Timeline */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                                <h3 className="text-white text-2xl font-bold mb-8">Mi Evolución</h3>
                                
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-lime-300 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">2010</div>
                                        <div>
                                            <h4 className="text-white font-semibold">Primeros Pasos</h4>
                                            <p className="text-gray-400 text-sm">Descubrimiento del mundo de la producción musical</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-lime-300 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">2015</div>
                                        <div>
                                            <h4 className="text-white font-semibold">Primeros Sets & Colaboraciones</h4>
                                            <p className="text-gray-400 text-sm">DJing en eventos locales y primeras producciones originales</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-lime-300 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">2018</div>
                                        <div>
                                            <h4 className="text-white font-semibold">Mashups & Remixes Virales</h4>
                                            <p className="text-gray-400 text-sm">Creación de remixes que alcanzaron millones de reproducciones</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">2020</div>
                                        <div>
                                            <h4 className="text-white font-semibold">Disco de Platino</h4>
                                            <p className="text-gray-400 text-sm">"La Historia" con Lorena Santos alcanza Disco de Platino</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-lime-300 to-green-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">HOY</div>
                                        <div>
                                            <h4 className="text-white font-semibold">DiegoDPL: DJ + Producer</h4>
                                            <p className="text-gray-400 text-sm">Plataforma completa: beats, remixes, mashups y sample libraries</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mi Expertise Section */}
            <div className="w-full py-20 bg-gradient-to-b from-gray-950 to-gray-900">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <span className="text-lime-300 text-sm font-semibold uppercase tracking-wider">Mi Expertise</span>
                        <h2 className="text-gray-100 text-4xl md:text-5xl font-bold mt-4 mb-6">
                            Lo que me hace <span className="text-lime-300">diferente</span>
                        </h2>
                        <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                            No solo creo beats. Soy DJ, remixer, y creador de experiencias sonoras completas que conectan emocionalmente con tu audiencia y funcionan tanto en el estudio como en la pista de baile.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {/* Skill 1 */}
                        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-lime-300/30 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-br from-lime-300 to-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                </svg>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-4">Beats que Cuentan Historias</h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Cada beat que produzco tiene una narrativa. No son solo patrones rítmicos, son la base emocional que hará que tu audiencia se conecte desde el primer segundo.
                            </p>
                            <div className="text-lime-300 text-sm font-medium">• Trap • Hip-Hop • Reggaeton • R&B</div>
                        </div>

                        {/* Skill 2 */}
                        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-lime-300/30 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-br from-lime-300 to-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-4">DJ Sets & Experiencia Live</h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Mi experiencia como DJ me da una perspectiva única. Sé exactamente qué mueve a la gente en la pista de baile y aplico ese conocimiento a cada producción.
                            </p>
                            <div className="text-lime-300 text-sm font-medium">• Live Sets • Club Experience • Crowd Reading</div>
                        </div>

                        {/* Skill 3 */}
                        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-lime-300/30 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-br from-lime-300 to-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                </svg>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-4">Remixes & Mashups Virales</h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Tomo canciones conocidas y las transformo en algo completamente nuevo. Mis remixes y mashups han alcanzado millones de reproducciones y viralizado en redes sociales.
                            </p>
                            <div className="text-lime-300 text-sm font-medium">• Remixes • Mashups • Reworks • Edits</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Skill 4 */}
                        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-lime-300/30 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-br from-lime-300 to-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                                </svg>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-4">Librerías de Sonidos Exclusivas</h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Creo mis propias sample libraries con sonidos únicos que no encontrarás en ningún otro lugar. Cada sample está cuidadosamente crafteado para inspirar creatividad.
                            </p>
                            <div className="text-lime-300 text-sm font-medium">• Drum Kits • Melodic Loops • FX • One Shots</div>
                        </div>

                        {/* Skill 5 */}
                        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-lime-300/30 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-br from-lime-300 to-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-4">Sound Design Único</h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Mis texturas sonoras son mi firma. Creo atmósferas que transportan al oyente y efectos que se vuelven virales. Tu música tendrá esa "magia" que todos buscan.
                            </p>
                            <div className="text-lime-300 text-sm font-medium">• Ambient • FX • Texturas • Atmospheres</div>
                        </div>

                        {/* Skill 6 */}
                        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-lime-300/30 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-br from-lime-300 to-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                                </svg>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-4">Mezcla & Masterización Pro</h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Tu música sonará como si saliera de los mejores estudios del mundo. Cada frecuencia perfectamente equilibrada, cada elemento en su lugar exacto.
                            </p>
                            <div className="text-lime-300 text-sm font-medium">• Mix • Master • Clarity • Punch</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonios y Social Proof */}
            <div className="w-full py-20 bg-gray-950">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <span className="text-lime-300 text-sm font-semibold uppercase tracking-wider">Lo que Dicen los Artistas</span>
                        <h2 className="text-gray-100 text-4xl md:text-5xl font-bold mt-4 mb-6">
                            Testimonios <span className="text-lime-300">reales</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-lime-300 rounded-full flex items-center justify-center">
                                    <span className="text-gray-900 font-bold">LS</span>
                                </div>
                                <div>
                                    <div className="text-white font-semibold">Lorena Santos</div>
                                    <div className="text-gray-400 text-sm">Artista</div>
                                </div>
                            </div>
                            <p className="text-gray-300 italic mb-4">
                                "Trabajar con Diego en 'La Historia' fue mágico. Su producción llevó la canción a Disco de Platino. No solo es talentoso, es un visionario musical."
                            </p>
                            <div className="flex text-yellow-400">
                                ⭐⭐⭐⭐⭐ <span className="ml-2 text-yellow-400 text-sm">DISCO DE PLATINO</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-lime-300 rounded-full flex items-center justify-center">
                                    <span className="text-gray-900 font-bold">DJ</span>
                                </div>
                                <div>
                                    <div className="text-white font-semibold">DJ Luna</div>
                                    <div className="text-gray-400 text-sm">Club DJ</div>
                                </div>
                            </div>
                            <p className="text-gray-300 italic mb-4">
                                "Como DJ sé lo que funciona en la pista de baile. Los mashups de DiegoDPL siempre rompen el club. Su library de samples es oro puro para cualquier productor."
                            </p>
                            <div className="flex text-lime-300">
                                ⭐⭐⭐⭐⭐
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-lime-300 rounded-full flex items-center justify-center">
                                    <span className="text-gray-900 font-bold">TR</span>
                                </div>
                                <div>
                                    <div className="text-white font-semibold">Trap Records</div>
                                    <div className="text-gray-400 text-sm">Record Label</div>
                                </div>
                            </div>
                            <p className="text-gray-300 italic mb-4">
                                "DiegoDPL entiende la música desde todos los ángulos: producción, remixing, y performance. Es raro encontrar alguien tan versátil en la industria."
                            </p>
                            <div className="flex text-lime-300">
                                ⭐⭐⭐⭐⭐
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Final */}
            <div className="w-full py-20 md:py-32 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(193,241,126,0.05),transparent_70%)]"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-gray-100 text-4xl md:text-6xl font-bold mb-8 leading-tight">
                        ¿Listo para crear
                        <span className="text-transparent bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text"> magia musical</span>?
                    </h2>
                    
                    <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
                        No importa si eres un artista emergente o establecido. Si buscas ese sonido único que haga que tu música destaque, 
                        estás en el lugar correcto.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <a 
                            href="/catalog" 
                            className="group bg-gradient-to-r from-lime-300 to-green-400 text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:from-lime-400 hover:to-green-500 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-lime-300/25"
                        >
                            Explora Mi Catálogo
                            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">🎵</span>
                        </a>
                        
                        <a 
                            href="/contact" 
                            className="group border-2 border-lime-300/50 text-lime-300 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-lime-300/10 hover:border-lime-300 transition-all duration-300"
                        >
                            Colaboremos
                            <span className="inline-block ml-2 group-hover:rotate-12 transition-transform">🚀</span>
                        </a>
                    </div>

                    {/* Final stats */}
                    <div className="mt-16 pt-12 border-t border-white/10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-lime-300 mb-2">15+</div>
                                <div className="text-gray-400 text-sm uppercase tracking-wider">Años DJ & Producer</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-lime-300 mb-2">500+</div>
                                <div className="text-gray-400 text-sm uppercase tracking-wider">Beats & Remixes</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-lime-300 mb-2">200+</div>
                                <div className="text-gray-400 text-sm uppercase tracking-wider">Sets & Mashups</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">1</div>
                                <div className="text-gray-400 text-sm uppercase tracking-wider">Disco de Platino</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
