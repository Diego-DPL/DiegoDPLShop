import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('sending');
        try {
            // Simple fallback: open mailto with prefilled content. In production, post to an API/Email service.
            const subject = encodeURIComponent(`Contacto desde la web: ${form.firstName} ${form.lastName}`);
            const body = encodeURIComponent(`Nombre: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\n\nMensaje:\n${form.message}`);
            window.location.href = `mailto:contacto@diegodpl.com?subject=${subject}&body=${body}`;
            setStatus('sent');
        } catch {
            setStatus('error');
        }
    }

    return (
        <>
            <div className="self-stretch bg-gray-950 text-center justify-start pb-20 pt-10 ">
                <h1 className="text-gray-300 text-9xl font-bold font-['Plus_Jakarta_Sans'] leading-[120px]">Contacto</h1>
            </div>

            <div className="w-full py-12 bg-gray-950 flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-24 px-10 lg:px-20">
                <div className="w-full lg:flex-1 flex flex-col justify-start items-start gap-4">
                    <div className="w-full text-gray-300 text-2xl lg:text-4xl font-bold font-['Plus_Jakarta_Sans'] leading-tight lg:leading-10">Formulario de contacto</div>
                    <div className="w-full text-gray-300 text-lg lg:text-xl font-medium font-['Plus_Jakarta_Sans'] leading-normal">Por favor, rellena el formulario para ponerte en contacto.</div>
                </div>
                <div className="w-full lg:flex-1 flex flex-col justify-start items-start gap-4">
                    <form onSubmit={onSubmit} className="w-full flex flex-col justify-start items-start gap-4">
                        <div className="w-full flex flex-col sm:flex-row justify-start items-start gap-4">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={form.firstName}
                                onChange={onChange}
                                className="w-full flex-1 min-h-11 px-3 py-2 bg-gray-900 rounded-lg border border-white border-opacity-20 text-gray-300 text-base font-medium font-['Plus_Jakarta_Sans'] leading-tight placeholder-gray-300 placeholder-opacity-40 focus:outline-none focus:border-lime-400 focus:border-opacity-60"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={form.lastName}
                                onChange={onChange}
                                className="w-full flex-1 min-h-11 px-3 py-2 bg-gray-900 rounded-lg border border-white border-opacity-20 text-gray-300 text-base font-medium font-['Plus_Jakarta_Sans'] leading-tight placeholder-gray-300 placeholder-opacity-40 focus:outline-none focus:border-lime-400 focus:border-opacity-60"
                                required
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={onChange}
                            className="w-full min-h-11 px-3 py-2 bg-gray-900 rounded-lg border border-white border-opacity-20 text-gray-300 text-base font-medium font-['Plus_Jakarta_Sans'] leading-tight placeholder-gray-300 placeholder-opacity-40 focus:outline-none focus:border-lime-400 focus:border-opacity-60"
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            rows={4}
                            value={form.message}
                            onChange={onChange}
                            className="w-full min-h-32 px-3 py-2 bg-gray-900 rounded-lg border border-white border-opacity-20 text-gray-300 text-base font-medium font-['Plus_Jakarta_Sans'] leading-tight placeholder-gray-300 placeholder-opacity-40 focus:outline-none focus:border-lime-400 focus:border-opacity-60 resize-vertical"
                            required
                        />
                        <button
                            type="submit"
                            disabled={status==='sending'}
                            className="px-4 py-2 bg-lime-400 rounded-lg hover:bg-lime-500 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-opacity-50 disabled:opacity-60"
                        >
                            <span className="text-gray-950 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">{status==='sending'?'Enviando…':'Enviar'}</span>
                        </button>
                        {status==='sent' && <p className="text-lime-300">Abriendo tu app de correo…</p>}
                        {status==='error' && <p className="text-red-400">No se pudo abrir el correo. Intenta de nuevo.</p>}
                    </form>
                </div>
            </div>

            <div className="w-full py-12 lg:py-24 bg-gray-950 flex flex-col justify-start items-start gap-8 px-4 sm:px-6 lg:px-20">
                <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-24">
                    <div className="w-full lg:flex-1 text-gray-300 text-2xl sm:text-3xl lg:text-5xl font-bold font-['Plus_Jakarta_Sans'] leading-tight lg:leading-[52px]">Sígueme en redes</div>
                    <div className="w-full lg:flex-1 flex flex-col justify-start items-start">
                        <div className="w-full text-gray-300 text-base sm:text-lg lg:text-2xl font-medium font-['Plus_Jakarta_Sans'] leading-relaxed lg:leading-loose">Puedes encontrarme en mis redes sociales o enviarme un correo directo.</div>
                    </div>
                </div>

                <div className="w-full flex justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-45 py-10">
                    <a 
                        href="https://instagram.com/your-username" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                    
                    <a 
                        href="https://youtube.com/@your-channel" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                    </a>
                    
                    <a 
                        href="https://tiktok.com/@your-username" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                    </a>
                </div>
                <div className="w-full h-px bg-white bg-opacity-20"></div>
            </div>
        </>
    );
};

export default Contact;
