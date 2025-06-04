import React from 'react';

const Footer: React.FC = () => {
    return (
        <>
            <div className="w-full py-12 bg-gray-950 flex flex-col justify-start items-start gap-4 px-4 md:px-8 lg:px-16">
                <div className="w-full h-2 relative">
                    <div className="w-full h-0 absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white/20"></div>
                </div>
                <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-start items-start gap-12">
                    <div className="flex-1 min-w-[250px] flex flex-col justify-start items-start gap-3">
                        <div className="h-8 flex justify-start items-center gap-2">
                            <div className="w-8 h-8 relative overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lime-300 w-full h-full">
                                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                            </svg>
                            </div>
                            <div className="text-lime-300 text-3xl font-bold font-['Plus_Jakarta_Sans'] leading-7">DiegoDPL</div>
                        </div>
                        <div className="flex justify-start items-start gap-3">
                            <div className="w-6 h-6 relative overflow-hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path d="M21.4492 2.92407H4.19918C3.78434 2.92407 3.44918 3.25923 3.44918 3.67407V20.9241C3.44918 21.3389 3.78434 21.6741 4.19918 21.6741H21.4492C21.864 21.6741 22.1992 21.3389 22.1992 20.9241V3.67407C22.1992 3.25923 21.864 2.92407 21.4492 2.92407ZM19.2836 8.39673H17.7859C16.6117 8.39673 16.3843 8.95454 16.3843 9.77485V11.5819H19.1875L18.8218 14.4108H16.3843V21.6741H13.4617V14.4131H11.0172V11.5819H13.4617V9.49595C13.4617 7.07485 14.9406 5.75532 17.1015 5.75532C18.1375 5.75532 19.0257 5.83267 19.2859 5.86782V8.39673H19.2836Z" fill="#D6DDE6" fill-opacity="0.62"/>
                                </svg>
                            </div>
                            <div className="w-6 h-6 relative overflow-hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path d="M12.8235 6.80168C9.78329 6.80168 7.32972 9.25525 7.32972 12.2954C7.32972 15.3356 9.78329 17.7892 12.8235 17.7892C15.8637 17.7892 18.3172 15.3356 18.3172 12.2954C18.3172 9.25525 15.8637 6.80168 12.8235 6.80168ZM12.8235 15.866C10.8574 15.866 9.25294 14.2615 9.25294 12.2954C9.25294 10.3294 10.8574 8.72489 12.8235 8.72489C14.7895 8.72489 16.394 10.3294 16.394 12.2954C16.394 14.2615 14.7895 15.866 12.8235 15.866ZM18.5422 5.29632C17.8324 5.29632 17.2592 5.86953 17.2592 6.57935C17.2592 7.28918 17.8324 7.86239 18.5422 7.86239C19.252 7.86239 19.8253 7.29185 19.8253 6.57935C19.8255 6.4108 19.7924 6.24387 19.728 6.08811C19.6636 5.93235 19.5691 5.79082 19.4499 5.67164C19.3308 5.55246 19.1892 5.45796 19.0335 5.39355C18.8777 5.32915 18.7108 5.29611 18.5422 5.29632ZM23.5324 12.2954C23.5324 10.8169 23.5458 9.35168 23.4628 7.87578C23.3797 6.1615 22.9887 4.64007 21.7351 3.3865C20.4788 2.13025 18.9601 1.74185 17.2458 1.65882C15.7672 1.57578 14.302 1.58918 12.8261 1.58918C11.3476 1.58918 9.8824 1.57578 8.40651 1.65882C6.69222 1.74185 5.17079 2.13293 3.91722 3.3865C2.66097 4.64275 2.27258 6.1615 2.18954 7.87578C2.10651 9.35435 2.1199 10.8195 2.1199 12.2954C2.1199 13.7713 2.10651 15.2392 2.18954 16.7151C2.27258 18.4294 2.66365 19.9508 3.91722 21.2044C5.17347 22.4606 6.69222 22.849 8.40651 22.932C9.88508 23.0151 11.3503 23.0017 12.8261 23.0017C14.3047 23.0017 15.7699 23.0151 17.2458 22.932C18.9601 22.849 20.4815 22.4579 21.7351 21.2044C22.9913 19.9481 23.3797 18.4294 23.4628 16.7151C23.5485 15.2392 23.5324 13.774 23.5324 12.2954ZM21.1753 18.6115C20.9797 19.099 20.744 19.4633 20.3663 19.8383C19.9887 20.216 19.627 20.4517 19.1395 20.6472C17.7306 21.207 14.3851 21.0811 12.8235 21.0811C11.2619 21.0811 7.91365 21.207 6.50472 20.6499C6.01722 20.4544 5.65294 20.2186 5.27794 19.841C4.90026 19.4633 4.66454 19.1017 4.46901 18.6142C3.91186 17.2026 4.03776 13.857 4.03776 12.2954C4.03776 10.7338 3.91186 7.3856 4.46901 5.97668C4.66454 5.48918 4.90026 5.12489 5.27794 4.74989C5.65561 4.37489 6.01722 4.1365 6.50472 3.94096C7.91365 3.38382 11.2619 3.50971 12.8235 3.50971C14.3851 3.50971 17.7333 3.38382 19.1422 3.94096C19.6297 4.1365 19.994 4.37221 20.369 4.74989C20.7467 5.12757 20.9824 5.48918 21.1779 5.97668C21.7351 7.3856 21.6092 10.7338 21.6092 12.2954C21.6092 13.857 21.7351 17.2026 21.1753 18.6115Z" fill="#D6DDE6" fill-opacity="0.62"/>
                                </svg>
                            </div>
                            <div className="w-6 h-6 relative overflow-hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path d="M14.4995 10.958L21.0526 3.49854H19.5003L13.8078 9.97416L9.26468 3.49854H4.0234L10.895 13.2918L4.0234 21.1132H5.57572L11.5832 14.2733L16.3821 21.1132H21.6234M6.13599 4.64488H8.52079L19.4991 20.0232H17.1137" fill="#D6DDE6" fill-opacity="0.62"/>
                                </svg>
                            </div>
                            <div className="w-6 h-6 relative overflow-hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path d="M22.8242 7.53239C22.7109 7.09473 22.4883 6.69727 22.1758 6.38477C21.8633 6.07227 21.4658 5.84961 21.0281 5.73633C19.3633 5.29883 12.8242 5.29883 12.8242 5.29883C12.8242 5.29883 6.28516 5.29883 4.62109 5.73633C4.18359 5.84961 3.78613 6.07227 3.47363 6.38477C3.16113 6.69727 2.93848 7.09473 2.82519 7.53239C2.38769 9.19727 2.38769 12.5 2.38769 12.5C2.38769 12.5 2.38769 15.8027 2.82519 17.4668C2.93848 17.9053 3.16113 18.3027 3.47363 18.6152C3.78613 18.9277 4.18359 19.1504 4.62109 19.2637C6.28516 19.7012 12.8242 19.7012 12.8242 19.7012C12.8242 19.7012 19.3633 19.7012 21.0281 19.2637C21.4658 19.1504 21.8633 18.9277 22.1758 18.6152C22.4883 18.3027 22.7109 17.9053 22.8242 17.4668C23.2617 15.8027 23.2617 12.5 23.2617 12.5C23.2617 12.5 23.2617 9.19727 22.8242 7.53239ZM10.7227 15.625V9.375L16.0469 12.5L10.7227 15.625Z" fill="#D6DDE6" fill-opacity="0.62"/>
                                </svg>
                            </div>
                            <div className="w-6 h-6 relative overflow-hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path d="M17.5742 10.0985v2.9297c-0.1621 0-0.3242 0.0215-0.4844 0.0215-1.168 0-2.2578-0.457-3.0859-1.2851-0.8496-0.8496-1.3066-1.957-1.3066-3.1465v-0.1396V3.4985h-3.1036v11.9532c0 1.543-1.2422 2.8066-2.7852 2.8281-0.668 0-1.2851-0.2383-1.7695-0.6367-0.7559-0.6152-1.2422-1.5644-1.2422-2.6211 0-1.8633 1.5-3.3633 3.3418-3.3633 0.1816 0 0.3633 0.0215 0.5234 0.0429V8.6642c-0.1719-0.0215-0.3438-0.0215-0.5234-0.0215-3.1895 0-5.7891 2.5782-5.7891 5.7891 0 1.7481 0.7774 3.3203 2.0039 4.3945 1.0547 0.9395 2.4414 1.5215 3.957 1.5215 3.3711 0 6.1114-2.7403 6.1114-6.1114v-6.1577c1.125 0.8281 2.5136 1.3281 4.0278 1.3281 0.1621 0 0.3242-0.0215 0.4844-0.0215V5.3234c-2.1699-0.0645-3.9199-1.8252-3.9199-4.0078h-2.9297c0.0215 0.1396 0.0215 0.2793 0.0215 0.418v4.3086c0 2.2129 1.7695 3.9824 3.9414 4.0563z" fill="#D6DDE6" fill-opacity="0.62"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-48 flex flex-col justify-center items-start gap-2">
                        <div className="w-full text-gray-300 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Acerca de DiegoDPL</div>
                        <div className="w-full text-gray-300/60 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Inicio</div>
                        <div className="w-full text-gray-300/60 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Sobre mí</div>
                        <div className="w-full text-gray-300/60 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Bundles</div>
                        <div className="w-full text-gray-300/60 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Contacto</div>
                        <div className="w-full text-gray-300/60 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Términos</div>
                    </div>
                    <div className="w-full sm:w-48 flex flex-col justify-center items-start gap-2">
                        <div className="w-full text-gray-300 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Redes Sociales</div>
                        <div className="w-full text-gray-300/60 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Facebook</div>
                        <div className="w-full text-gray-300/60 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Instagram</div>
                        <div className="w-full text-gray-300/60 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Twitter</div>
                        <div className="w-full text-gray-300/60 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Youtube</div>
                        <div className="w-full text-gray-300/60 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Tiktok</div>
                    </div>
                    <div className="w-full md:w-96 flex flex-col justify-center items-start gap-4">
                        <div className="w-full flex flex-col justify-start items-start gap-1">
                            <div className="text-gray-300 text-base font-bold font-['Plus_Jakarta_Sans'] leading-tight">Newsletter</div>
                            <div className="w-full text-gray-300 text-base font-medium font-['Plus_Jakarta_Sans'] leading-tight">Suscríbete a nuestro newsletter para las últimas novedades.</div>
                        </div>
                        <div className="w-full flex justify-start items-start gap-3">
                            <div className="flex-1 px-3 py-2 bg-white/5 rounded-lg outline outline-[1.50px] outline-offset-[-1.50px] outline-white/20 flex justify-start items-center gap-2">
                                <div className="flex-1 text-gray-300/40 text-base font-medium font-['Plus_Jakarta_Sans'] leading-tight">Email address</div>
                            </div>
                            <div className="px-4 py-2 rounded-lg outline outline-[1.50px] outline-offset-[-1.50px] outline-gray-300/20 flex justify-center items-center">
                                <div className="text-gray-300 text-base font-semibold font-['Plus_Jakarta_Sans'] leading-tight">Subscribe</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    );
};

export default Footer;