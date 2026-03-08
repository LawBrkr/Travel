"use client";

const STEPS = [
    {
        number: "01",
        title: "Consulta Privada",
        subtitle: "Entendemos su visión",
        body: "Una conversación íntima donde escuchamos sus sueños de viaje con atención plena. Sin presiones, sin plantillas. Cada itinerario comienza con la historia de quien viaja.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Diseño Arquitectónico",
        subtitle: "Trazamos la logística con meses de anticipación",
        body: "Diseñamos cada etapa con precisión milimétrica: hoteles boutique, traslados, horarios culturales y contingencias. Su viaje es una obra de ingeniería antes de ser una experiencia.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "La Experiencia",
        subtitle: "Usted viaja con seguridad blindada",
        body: "El día del viaje, usted solo se preocupa por disfrutar. Nuestro equipo opera en segundo plano las 24 horas con cobertura global, seguros de viaje y asistencia en tiempo real.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
    },
];

export default function Methodology() {
    return (
        <section
            id="metodo"
            aria-labelledby="methodology-heading"
            className="relative py-24 px-6"
            style={{ background: "var(--color-cream-50)" }}
        >
            {/* Subtle top border accent */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
                style={{ background: "var(--color-gold-400)" }}
                aria-hidden="true"
            />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="text-center mb-16">
                    <span
                        className="text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: "var(--color-gold-500)" }}
                    >
                        Cómo Funciona
                    </span>
                    <h2
                        id="methodology-heading"
                        className="mt-3 text-3xl md:text-4xl font-black leading-tight"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--color-navy-950)" }}
                    >
                        El Arte de{" "}
                        <em className="not-italic" style={{ color: "var(--color-gold-500)" }}>
                            Trazar
                        </em>{" "}
                        el Viaje Perfecto
                    </h2>
                    <p
                        className="mt-4 max-w-xl mx-auto text-sm leading-relaxed"
                        style={{ color: "rgba(10,17,40,0.6)" }}
                    >
                        No vendemos paquetes. Diseñamos experiencias con la misma meticulosidad
                        que un arquitecto construye su obra maestra.
                    </p>
                </header>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
                    {/* Connector line on desktop */}
                    <div
                        className="hidden md:block absolute top-10 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-px pointer-events-none"
                        style={{ background: "linear-gradient(90deg, transparent, var(--color-gold-400), transparent)", opacity: 0.3 }}
                        aria-hidden="true"
                    />

                    {STEPS.map((step) => (
                        <div key={step.number} className="relative flex flex-col items-center text-center gap-4">
                            {/* Number + Icon circle */}
                            <div
                                className="relative flex items-center justify-center w-20 h-20 rounded-full"
                                style={{
                                    background: "var(--color-navy-950)",
                                    border: "1px solid rgba(212,175,55,0.25)",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                                }}
                            >
                                <span
                                    className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-black"
                                    style={{
                                        background: "var(--color-gold-400)",
                                        color: "var(--color-navy-950)",
                                    }}
                                >
                                    {step.number}
                                </span>
                                <span style={{ color: "var(--color-gold-400)" }} aria-hidden="true">
                                    {step.icon}
                                </span>
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-1.5">
                                <h3
                                    className="text-lg font-bold"
                                    style={{ fontFamily: "var(--font-serif)", color: "var(--color-navy-950)" }}
                                >
                                    {step.title}
                                </h3>
                                <p
                                    className="text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: "var(--color-gold-500)" }}
                                >
                                    {step.subtitle}
                                </p>
                                <p
                                    className="text-sm leading-relaxed max-w-xs mx-auto"
                                    style={{ color: "rgba(10,17,40,0.6)" }}
                                >
                                    {step.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
