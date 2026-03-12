import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image (Unsplash architecture - Florence/Kyoto vibe) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1549643194-436ed59ce501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8ZmxvcmVuY2UlMjBzdHJlZXR8ZW58MHx8fHwxNjk5MjQxNTkyfDA&ixlib=rb-4.0.3&q=80&w=2000"
                    alt="Europa Architecture"
                    fill
                    className="object-cover saturate-[0.6] scale-105 animate-fade-in"
                    priority
                />
                {/* Heavy minimal dark overlay for text contrast & premium feel */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-12 text-center max-w-4xl mx-auto mt-16 animate-fade-up">

                {/* Elegant Typography */}
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-cream-50 tracking-wide leading-tight mb-8" style={{ fontFamily: "var(--font-serif)" }}>
                    El destino se sueña.<br />
                    <span className="italic text-gold-500">La experiencia se traza.</span>
                </h1>

                <p className="text-sm md:text-base lg:text-lg text-gray-200 font-light leading-relaxed max-w-2xl mb-12 drop-shadow-md">
                    Especialistas en el diseño de viajes de autor a Europa y Asia con la precisión que solo la anticipación puede ofrecer.
                    <br className="hidden md:block" /> Asegure su lugar en el mundo con 8 meses de ventaja.
                </p>

                {/* Premium CTA */}
                <a
                    href="https://wa.me/5215666673841"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-transparent border border-gold-500 text-gold-400 font-medium tracking-widest uppercase text-xs md:text-sm hover:bg-gold-500 hover:text-navy-950 transition-all duration-300 backdrop-blur-sm"
                >
                    Iniciar mi Planificación
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>

            {/* Subtle bottom gradient to blend into the next section */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-cream-50 to-transparent z-0" />
        </section>
    );
}
