import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
    const { totalItems, recentlyAdded } = useCart();
    const { user, logout, isAdmin } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { to: '/', label: 'Inicio' },
        { to: '/about-me', label: 'Sobre mí' },
        { to: '/catalog', label: 'Catálogo' },
        { to: '/contact', label: 'Contacto' }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
        <header className="sticky top-0 z-50 w-full bg-gray-950/95 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Simple and Clean */}
                    <Link 
                        to="/" 
                        className="flex items-center group transition-all duration-300 hover:scale-105"
                    >
                        <div className="relative">
                            <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent font-['Plus_Jakarta_Sans']">
                                DiegoDPL
                            </span>
                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-300 to-emerald-400 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                                    isActive(link.to)
                                        ? 'text-lime-300'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                {link.label}
                                <div className={`absolute bottom-0 left-0 h-0.5 bg-lime-300 transition-all duration-300 ${
                                    isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></div>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Cart Button */}
                        <Link 
                            to="/cart" 
                            className="relative p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 group"
                        >
                            <div className={`w-5 h-5 transition-all duration-300 ${
                                recentlyAdded ? 'scale-125 animate-bounce' : ''
                            }`}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3M7 13v7a1 1 0 001 1h8a1 1 0 001-1v-7M12 16h.01"/>
                                </svg>
                            </div>
                            {totalItems > 0 && (
                                <span className={`absolute -top-1 -right-1 bg-gradient-to-r from-lime-400 to-emerald-500 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 ${
                                    recentlyAdded ? 'animate-pulse scale-110' : ''
                                }`}>
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* User Section */}
                        {user ? (
                            <div className="hidden md:flex items-center space-x-3">
                                <Link 
                                    to="/account" 
                                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                                >
                                    <div className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                            <circle cx="12" cy="7" r="4"/>
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                        Cuenta
                                    </span>
                                </Link>
                                {isAdmin && (
                                    <Link 
                                        to="/admin" 
                                        className="px-3 py-1.5 text-xs font-medium text-gray-900 bg-lime-300 hover:bg-lime-400 rounded-md transition-all duration-300 hover:scale-105"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <button 
                                    onClick={logout}
                                    className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-md transition-all duration-300"
                                >
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-3">
                                <Link 
                                    to="/login" 
                                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-gradient-to-r from-lime-300 to-emerald-400 hover:from-lime-400 hover:to-emerald-500 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    Registrarse
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                            aria-label="Toggle mobile menu"
                        >
                            <div className="w-6 h-6">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                    {isMobileMenuOpen ? (
                                        <path d="M6 18L18 6M6 6l12 12"/>
                                    ) : (
                                        <path d="M3 12h18M3 6h18M3 18h18"/>
                                    )}
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-white/10 py-4 space-y-2 animate-in slide-in-from-top duration-300">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                                    isActive(link.to)
                                        ? 'text-lime-300 bg-lime-300/10'
                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        
                        <div className="border-t border-white/10 pt-4 mt-4">
                            {user ? (
                                <div className="space-y-2">
                                    <Link
                                        to="/account"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                                    >
                                        <div className="w-5 h-5">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                                <circle cx="12" cy="7" r="4"/>
                                            </svg>
                                        </div>
                                        <span>Mi Cuenta</span>
                                    </Link>
                                    {isAdmin && (
                                        <Link
                                            to="/admin"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block px-4 py-3 text-lime-300 hover:bg-lime-300/10 rounded-lg transition-all duration-300"
                                        >
                                            Administrador
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block px-4 py-3 text-center text-gray-900 bg-gradient-to-r from-lime-300 to-emerald-400 hover:from-lime-400 hover:to-emerald-500 rounded-lg transition-all duration-300 font-medium"
                                    >
                                        Registrarse
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
        
        </>
    );
};

export default Header;