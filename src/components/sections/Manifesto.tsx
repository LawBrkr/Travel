import React from "react";

export default function Manifesto() {
    return (
        <section className="py-24 md:py-32 px-6 lg:px-12 bg-cream-50 text-navy-950">
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* Header / Manifesto Text */}
                <div className="text-center max-w-3xl mb-20 animate-fade-up delay-100">
                    <h2 className="text-sm font-bold tracking-widest uppercase text-gold-500 mb-4 font-sans">
                        Investigación · Diseño · Ejecución
                    </h2>
                    <h3 className="text-3xl md:text-5xl lg:text-5xl font-light leading-tight mb-8" style={{ fontFamily: "var(--font-serif)" }}>
                        La Disciplina de Viajar Bien
                    </h3>
                    <p className="text-base md:text-lg text-navy-600 font-light leading-relaxed">
                        En Traza Travel, no creemos en la improvisación. Cada itinerario es esculpido
                        con rigor matemático y sensibilidad estética. Analizamos cientos de variables
                        para asegurarnos de que su única preocupación sea absorber el momento.
                        <br className="hidden md:block mt-2" />
                        <span className="font-medium text-navy-800 italic mt-2 block">
                            Trazamos rutas. Usted crea el legado.
                        </span>
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full animate-fade-up delay-300">

                    {/* Benefit 1 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors duration-300 shadow-lg">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-medium mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                            Arquitectura de Costos
                        </h4>
                        <p className="text-sm text-navy-700 font-light leading-relaxed">
                            Diseñamos estructuras financieras transparentes. Precios sellados y blindados
                            contra fluctuaciones, asegurando que cada inversión se traduzca en valor puro.
                        </p>
                    </div>

                    {/* Benefit 2 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors duration-300 shadow-lg">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-medium mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                            Disponibilidad Selecta
                        </h4>
                        <p className="text-sm text-navy-700 font-light leading-relaxed">
                            Acceso curado a cupos limitados y experiencias que no se encuentran en catálogos
                            públicos, gestionadas con la discreción de una boutique privada.
                        </p>
                    </div>

                    {/* Benefit 3 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors duration-300 shadow-lg">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-medium mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                            Seguridad Blindada
                        </h4>
                        <p className="text-sm text-navy-700 font-light leading-relaxed">
                            Protocolos exhaustivos y acompañamiento continuo que transforman la logística
                            compleja en una transición fluida e invisible para usted.
                        </p>
                    </div>

                </div>
            </div>

            {/* Minimal separator */}
            <div className="w-full max-w-sm mx-auto h-px bg-gray-200 mt-24"></div>
        </section>
    );
}
