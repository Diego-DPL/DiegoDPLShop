import React, { useState, useEffect } from 'react';
import { sendEmail } from '../utils/email';

interface ContactForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    projectType: string;
}

const Contact: React.FC = () => {
    const [form, setForm] = useState<ContactForm>({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        phone: '',
        subject: '',
        message: '',
        projectType: 'general'
    });
    const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // SEO Optimization
    useEffect(() => {
        document.title = "Contacto | DiegoDPL - Productor Musical & DJ Profesional";
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Contacta con DiegoDPL para colaboraciones musicales, producciones personalizadas y servicios de DJ. Respuesta garantizada en 24h. ¡Hagamos música juntos!');
        }

        // Structured Data para SEO
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contacto - DiegoDPL",
            "description": "Página de contacto para servicios de producción musical y DJ",
            "url": "https://diegodpl.com/contact",
            "mainEntity": {
                "@type": "Person",
                "name": "DiegoDPL",
                "jobTitle": "Productor Musical & DJ",
                "email": "info@diegodpl.com",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "customer service",
                    "email": "info@diegodpl.com",
                    "availableLanguage": ["Spanish", "English"]
                }
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            // Email para DiegoDPL (el que recibe)
            const adminEmailHtml = `
                <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #e5e5e5; border-radius: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #84cc16, #10b981); padding: 30px; text-align: center;">
                        <h1 style="color: #111827; margin: 0; font-size: 28px; font-weight: bold;">🎵 Nueva Solicitud de Contacto</h1>
                        <p style="color: #1f2937; margin: 10px 0 0 0; font-size: 16px;">DiegoDPL Shop</p>
                    </div>
                    
                    <div style="padding: 30px;">
                        <div style="background: #374151; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                            <h2 style="color: #84cc16; margin: 0 0 15px 0; font-size: 20px;">👤 Información del Cliente</h2>
                            <p style="margin: 8px 0; line-height: 1.6;"><strong style="color: #84cc16;">Nombre:</strong> ${form.firstName} ${form.lastName}</p>
                            <p style="margin: 8px 0; line-height: 1.6;"><strong style="color: #84cc16;">Email:</strong> <a href="mailto:${form.email}" style="color: #10b981; text-decoration: none;">${form.email}</a></p>
                            ${form.phone ? `<p style="margin: 8px 0; line-height: 1.6;"><strong style="color: #84cc16;">Teléfono:</strong> <a href="tel:${form.phone}" style="color: #10b981; text-decoration: none;">${form.phone}</a></p>` : ''}
                            <p style="margin: 8px 0; line-height: 1.6;"><strong style="color: #84cc16;">Tipo de Proyecto:</strong> ${getProjectTypeLabel(form.projectType)}</p>
                        </div>

                        <div style="background: #374151; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                            <h2 style="color: #84cc16; margin: 0 0 15px 0; font-size: 20px;">📋 Detalles de la Consulta</h2>
                            <p style="margin: 8px 0; line-height: 1.6;"><strong style="color: #84cc16;">Asunto:</strong> ${form.subject}</p>
                            <div style="margin-top: 15px;">
                                <strong style="color: #84cc16;">Mensaje:</strong>
                                <div style="background: #1f2937; border-radius: 6px; padding: 15px; margin-top: 8px; border-left: 4px solid #84cc16;">
                                    <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${form.message}</p>
                                </div>
                            </div>
                        </div>

                        <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 8px; padding: 20px; text-align: center;">
                            <p style="margin: 0; color: #9ca3af; font-size: 14px;">💡 <strong>Recordatorio:</strong> Responde en un máximo de 24 horas para mantener tu excelente reputación de servicio.</p>
                        </div>
                    </div>
                    
                    <div style="background: #111827; padding: 20px; text-align: center; border-top: 1px solid #374151;">
                        <p style="margin: 0; color: #6b7280; font-size: 12px;">
                            📧 Email enviado automáticamente desde DiegoDPL Shop<br>
                            🕒 ${new Date().toLocaleString('es-ES')}
                        </p>
                    </div>
                </div>
            `;

            // Email de confirmación para el cliente
            const clientEmailHtml = `
                <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #e5e5e5; border-radius: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #84cc16, #10b981); padding: 30px; text-align: center;">
                        <h1 style="color: #111827; margin: 0; font-size: 28px; font-weight: bold;">🎵 ¡Gracias por contactar!</h1>
                        <p style="color: #1f2937; margin: 10px 0 0 0; font-size: 16px;">DiegoDPL - Productor Musical & DJ</p>
                    </div>
                    
                    <div style="padding: 30px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h2 style="color: #84cc16; margin: 0 0 15px 0; font-size: 24px;">¡Hola ${form.firstName}! 👋</h2>
                            <p style="color: #e5e5e5; line-height: 1.6; font-size: 16px; margin: 0;">
                                He recibido tu mensaje y me emociona saber más sobre tu proyecto musical.
                            </p>
                        </div>

                        <div style="background: #374151; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
                            <h3 style="color: #84cc16; margin: 0 0 15px 0; font-size: 18px;">📝 Resumen de tu consulta:</h3>
                            <p style="margin: 8px 0; line-height: 1.6;"><strong style="color: #84cc16;">Tipo de proyecto:</strong> ${getProjectTypeLabel(form.projectType)}</p>
                            <p style="margin: 8px 0; line-height: 1.6;"><strong style="color: #84cc16;">Asunto:</strong> ${form.subject}</p>
                        </div>

                        <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); border-radius: 8px; padding: 25px; margin-bottom: 25px;">
                            <h3 style="color: white; margin: 0 0 15px 0; font-size: 18px;">⚡ ¿Qué sucede ahora?</h3>
                            <ul style="color: white; margin: 0; padding-left: 20px; line-height: 1.8;">
                                <li>📨 <strong>Respuesta garantizada en 24h</strong></li>
                                <li>🎯 Análisis personalizado de tu proyecto</li>
                                <li>💰 Presupuesto detallado sin compromiso</li>
                                <li>🚀 Cronograma de trabajo optimizado</li>
                            </ul>
                        </div>

                        <div style="background: #065f46; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                            <h3 style="color: #10b981; margin: 0 0 15px 0; font-size: 18px;">🎵 Mientras tanto...</h3>
                            <p style="color: #d1fae5; margin: 0; line-height: 1.6;">
                                Te invito a escuchar mis últimas producciones y explorar mi catálogo de sample libraries. 
                                ¡Podrás hacerte una idea del estilo que podemos crear juntos!
                            </p>
                        </div>

                        <div style="text-align: center; margin: 25px 0;">
                            <a href="https://diegodpl.com/catalog" style="display: inline-block; background: linear-gradient(135deg, #84cc16, #10b981); color: #111827; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                                🎧 Explorar Catálogo
                            </a>
                        </div>

                        <div style="background: #1f2937; border-radius: 8px; padding: 20px; text-align: center;">
                            <p style="margin: 0 0 10px 0; color: #84cc16; font-weight: bold;">📱 Sígueme en redes sociales</p>
                            <p style="margin: 0; color: #9ca3af; font-size: 14px;">
                                Instagram • YouTube • TikTok<br>
                                @DiegoDPL
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: #111827; padding: 20px; text-align: center; border-top: 1px solid #374151;">
                        <p style="margin: 0 0 10px 0; color: #84cc16; font-weight: bold;">DiegoDPL</p>
                        <p style="margin: 0; color: #6b7280; font-size: 12px;">
                            Productor Musical & DJ Profesional<br>
                            📧 info@diegodpl.com | 🌐 diegodpl.com
                        </p>
                    </div>
                </div>
            `;

            // Enviar email al administrador (DiegoDPL)
            const adminEmailSent = await sendEmail({
                to: 'info@diegodpl.com',
                subject: `🎵 Nueva consulta: ${form.subject} - ${form.firstName} ${form.lastName}`,
                html: adminEmailHtml,
                text: `Nueva solicitud de contacto de ${form.firstName} ${form.lastName} (${form.email})\n\nTipo: ${getProjectTypeLabel(form.projectType)}\nAsunto: ${form.subject}\n\nMensaje:\n${form.message}`
            });

            // Enviar email de confirmación al cliente
            const clientEmailSent = await sendEmail({
                to: form.email,
                subject: `🎵 ¡Gracias por contactar con DiegoDPL! - Respuesta en 24h`,
                html: clientEmailHtml,
                text: `¡Hola ${form.firstName}!\n\nGracias por contactar con DiegoDPL. He recibido tu consulta sobre "${form.subject}" y te responderé en un máximo de 24 horas.\n\nMientras tanto, te invito a explorar mi catálogo en: https://diegodpl.com/catalog\n\n¡Hagamos música juntos!\n\nDiegoDPL\ninfo@diegodpl.com`
            });

            if (adminEmailSent && clientEmailSent) {
                setStatus('sent');
                setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '', projectType: 'general' });
            } else {
                throw new Error('Error al enviar uno o ambos emails');
            }

        } catch (error) {
            setStatus('error');
            setErrorMessage('No se pudo enviar el mensaje. Por favor, intenta de nuevo o escríbenos directamente a info@diegodpl.com');
        }
    }

    function getProjectTypeLabel(type: string): string {
        const types: Record<string, string> = {
            'general': '💬 Consulta General',
            'production': '🎵 Producción Musical',
            'mixing': '🎛️ Mezcla y Mastering',
            'dj': '🎧 Servicios de DJ',
            'samples': '🔊 Sample Libraries',
            'collaboration': '🤝 Colaboración',
            'other': '🎯 Otros Servicios'
        };
        return types[type] || types.general;
    }

    return (
        <>
            {/* Hero Section con SEO */}
            <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-20 pb-16">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-lime-300 via-emerald-400 to-lime-300 bg-clip-text text-transparent font-['Plus_Jakarta_Sans'] leading-tight mb-6">
                            Contacto
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-medium mb-8 leading-relaxed">
                            ¿Tienes un proyecto musical en mente? <br className="hidden md:block" />
                            <span className="text-lime-300">¡Hagámoslo realidad juntos!</span>
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-gray-400">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                                <span>Respuesta en 24h</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span>Presupuesto gratuito</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                                <span>Servicio personalizado</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-gray-950 py-16">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                            
                            {/* Left Column - Info & Benefits */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-6 font-['Plus_Jakarta_Sans']">
                                        ¿Por qué elegir <span className="text-lime-300">DiegoDPL</span>?
                                    </h2>
                                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                        Con más de <strong className="text-lime-300">10 años de experiencia</strong> en la industria musical, 
                                        he trabajado con artistas de diferentes géneros creando producciones únicas y de alta calidad.
                                    </p>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-lime-500/30 transition-all duration-300">
                                        <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-100 mb-2">Calidad Profesional</h3>
                                            <p className="text-gray-400">Producciones con estándares de la industria musical internacional.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-lime-500/30 transition-all duration-300">
                                        <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-100 mb-2">Respuesta Rápida</h3>
                                            <p className="text-gray-400">Garantía de respuesta en máximo 24 horas, sin excusas.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-lime-500/30 transition-all duration-300">
                                        <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-100 mb-2">Enfoque Personalizado</h3>
                                            <p className="text-gray-400">Cada proyecto es único, adaptado a tu visión y estilo musical.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700">
                                    <h3 className="text-xl font-bold text-gray-100 mb-4">📞 Información de Contacto</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-lime-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-lime-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                                </svg>
                                            </div>
                                            <span className="text-gray-300">info@diegodpl.com</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-lime-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-lime-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                                </svg>
                                            </div>
                                            <span className="text-gray-300">España</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Contact Form */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
                                <div className="mb-8">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3 font-['Plus_Jakarta_Sans']">
                                        Cuéntame tu proyecto 🎵
                                    </h2>
                                    <p className="text-gray-400">
                                        Completa el formulario y te responderé con un presupuesto personalizado
                                    </p>
                                </div>

                                <form onSubmit={onSubmit} className="space-y-6">
                                    {/* Nombre y Apellido */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                                                Nombre *
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                placeholder="Tu nombre"
                                                value={form.firstName}
                                                onChange={onChange}
                                                className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all duration-300"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                                                Apellidos *
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Tus apellidos"
                                                value={form.lastName}
                                                onChange={onChange}
                                                className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all duration-300"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email y Teléfono */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="tu@email.com"
                                                value={form.email}
                                                onChange={onChange}
                                                className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all duration-300"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                                Teléfono <span className="text-gray-500">(opcional)</span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                placeholder="+34 600 000 000"
                                                value={form.phone}
                                                onChange={onChange}
                                                className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Tipo de proyecto */}
                                    <div>
                                        <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                                            Tipo de proyecto *
                                        </label>
                                        <select
                                            id="projectType"
                                            name="projectType"
                                            value={form.projectType}
                                            onChange={onChange}
                                            className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all duration-300"
                                            required
                                        >
                                            <option value="general">💬 Consulta General</option>
                                            <option value="production">🎵 Producción Musical</option>
                                            <option value="mixing">🎛️ Mezcla y Mastering</option>
                                            <option value="dj">🎧 Servicios de DJ</option>
                                            <option value="samples">🔊 Sample Libraries</option>
                                            <option value="collaboration">🤝 Colaboración</option>
                                            <option value="other">🎯 Otros Servicios</option>
                                        </select>
                                    </div>

                                    {/* Asunto */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                            Asunto *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder="Ej: Producción de mi próximo single"
                                            value={form.subject}
                                            onChange={onChange}
                                            className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all duration-300"
                                            required
                                        />
                                    </div>

                                    {/* Mensaje */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                            Cuéntame sobre tu proyecto *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            placeholder="Describe tu proyecto musical, género, referencias, presupuesto estimado, fechas importantes, etc. Cuanta más información, mejor podremos ayudarte."
                                            value={form.message}
                                            onChange={onChange}
                                            className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all duration-300 resize-vertical"
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div>
                                        <button
                                            type="submit"
                                            disabled={status === 'sending'}
                                            className="w-full px-6 py-4 bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-gray-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lime-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            {status === 'sending' ? (
                                                <span className="flex items-center justify-center gap-3">
                                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Enviando mensaje...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-3">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                                                    </svg>
                                                    Enviar Mensaje
                                                </span>
                                            )}
                                        </button>
                                    </div>

                                    {/* Status Messages */}
                                    {status === 'sent' && (
                                        <div className="bg-green-900/50 border border-green-500/50 rounded-lg p-4">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                                </svg>
                                                <div>
                                                    <h4 className="text-green-400 font-bold">¡Mensaje enviado con éxito! 🎉</h4>
                                                    <p className="text-green-300 text-sm">
                                                        He recibido tu consulta y también te he enviado un email de confirmación. 
                                                        Te responderé en un máximo de 24 horas.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {status === 'error' && (
                                        <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                                </svg>
                                                <div>
                                                    <h4 className="text-red-400 font-bold">Error al enviar el mensaje</h4>
                                                    <p className="text-red-300 text-sm">{errorMessage}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 py-16">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-6 font-['Plus_Jakarta_Sans']">
                            Sígueme en <span className="text-lime-300">redes sociales</span>
                        </h2>
                        <p className="text-lg text-gray-300 mb-12 leading-relaxed">
                            Mantente al día con mis últimas producciones, colaboraciones y contenido exclusivo
                        </p>

                        <div className="flex justify-center items-center gap-8 md:gap-12">
                            <a 
                                href="https://instagram.com/diegodpl" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group p-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl hover:scale-110 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/25"
                            >
                                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            
                            <a 
                                href="https://youtube.com/@diegodpl" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group p-6 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl hover:scale-110 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/25"
                            >
                                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                            
                            <a 
                                href="https://tiktok.com/@diegodpl_" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl hover:scale-110 transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/25"
                            >
                                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                            </a>
                        </div>

                        <div className="mt-12 p-6 bg-gray-900/50 rounded-xl border border-gray-700">
                            <p className="text-gray-300 text-center">
                                <span className="text-lime-300 font-bold">¿Prefieres el contacto directo?</span><br />
                                Escríbeme a: <a href="mailto:info@diegodpl.com" className="text-lime-300 hover:text-lime-400 underline">info@diegodpl.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
