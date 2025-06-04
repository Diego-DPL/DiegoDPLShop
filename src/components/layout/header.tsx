import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <>
        <header className="w-full py-4 bg-gray-950 flex flex-col">
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo section */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 relative overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lime-300 w-full h-full">
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                        </svg>
                    </div>
                    <div className="text-lime-300 text-3xl font-bold font-['Plus_Jakarta_Sans'] leading-7">DiegoDPL</div>
                </Link>

                {/* Navigation links */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-1">
                        <div className="text-gray-300 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Inicio</div>
                        <div className="w-4 h-4 relative overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 w-full h-full">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </Link>
                    <Link to="/about-me" className="flex items-center gap-1">
                        <div className="text-gray-300 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Sobre mí</div>
                        <div className="w-4 h-4 relative overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 w-full h-full">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </Link>
                    <div className="flex items-center gap-1">
                        <div className="text-gray-300 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Bundles</div>
                        <div className="w-4 h-4 relative overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 w-full h-full">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="text-gray-300 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Contacto</div>
                        <div className="w-4 h-4 relative overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 w-full h-full">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="text-gray-300 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Carrito</div>
                        <div className="w-4 h-4 relative overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 w-full h-full">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                </nav>

                {/* Icons on the right */}
                <div className="flex items-center gap-6">
                    <div className="w-6 h-6 relative overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M21.8239 21.3039L17.4739 16.9539M19.8235 11.3039C19.8235 15.7222 16.2418 19.3039 11.8235 19.3039C7.40521 19.3039 3.82349 15.7222 3.82349 11.3039C3.82349 6.88565 7.40521 3.30392 11.8235 3.30392C16.2418 3.30392 19.8235 6.88565 19.8235 11.3039Z" stroke="#D6DDE6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className="w-6 h-6 relative overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M20.8235 21.3039V19.3039C20.8235 18.2431 20.4021 17.2256 19.6519 16.4755C18.9018 15.7254 17.8844 15.3039 16.8235 15.3039H8.82349C7.76262 15.3039 6.7452 15.7254 5.99506 16.4755C5.24491 17.2256 4.82349 18.2431 4.82349 19.3039V21.3039M16.8235 7.30392C16.8235 9.51306 15.0326 11.3039 12.8235 11.3039C10.6143 11.3039 8.82349 9.51306 8.82349 7.30392C8.82349 5.09479 10.6143 3.30392 12.8235 3.30392C15.0326 3.30392 16.8235 5.09479 16.8235 7.30392Z" stroke="#D6DDE6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className="w-6 h-6 relative overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M3.82349 6.30392L6.82349 2.30392H18.8235L21.8235 6.30392M3.82349 6.30392V20.3039C3.82349 20.8344 4.0342 21.3431 4.40927 21.7181C4.78435 22.0932 5.29305 22.3039 5.82349 22.3039H19.8235C20.3539 22.3039 20.8626 22.0932 21.2377 21.7181C21.6128 21.3431 21.8235 20.8344 21.8235 20.3039V6.30392M3.82349 6.30392H21.8235M16.8235 10.3039C16.8235 11.3648 16.4021 12.3822 15.6519 13.1324C14.9018 13.8825 13.8844 14.3039 12.8235 14.3039C11.7626 14.3039 10.7452 13.8825 9.99506 13.1324C9.24491 12.3822 8.82349 11.3648 8.82349 10.3039" stroke="#D6DDE6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            
            {/* Border line */}
            <div className="w-full h-0 mt-4 border-t border-white/20"></div>
        </header>
        
        </>
    );
};

export default Header;