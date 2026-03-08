"use client";

const TESTIMONIALS = [
    {
        id: "garza",
        quote:
            "Traza Travel diseñó nuestro viaje familiar a Japón con una precisión que nunca habíamos vivido. Cada traslado, cada hotel, cada experiencia: perfectamente orquestados. Regresamos transformados.",
        name: "Familia Garza Soto",
        trip: "Camino del Samurái, Japón",
        initials: "GS",
    },
    {
        id: "mendoza",
        quote:
            "Como médico, mi tiempo es oro. Traza entendió eso desde el primer momento. Mi Gran Vuelta por Europa fue exactamente lo que soñé: sin fricciones, sin sorpresas, con lujo en cada detalle.",
        name: "Dr. Alejandro Mendoza",
        trip: "Gran Vuelta por Europa",
        initials: "AM",
    },
    {
        id: "reyes",
        quote:
            "El crucero por el Nilo superó todas mis expectativas. La atención personalizada antes, durante y después del viaje fue excepcional. Definitivamente, la agencia de lujo que buscaba.",
        name: "Sra. Patricia Reyes Villanueva",
        trip: "Egipto Clásico con Crucero en el Nilo",
        initials: "PR",
    },
];

const CERTIFICATIONS = [
    { label: "Miembros IATA", icon: "✈️" },
    { label: "Respaldo AMAV", icon: "🏅" },
    { label: "Seguros de Cobertura Global", icon: "🛡️" },
    { label: "Atención 24 / 7", icon: "📞" },
];

export default function SocialProof() {
    return (
        <section
            id="nosotros"
            aria-labelledby="social-proof-heading"
            className="relative py-24 px-6"
            style={{ background: "var(--color-navy-950)" }}
        >
            {/* Top accent line */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)" }}
                aria-hidden="true"
            />

            <div className="max-w-5xl mx-auto flex flex-col gap-20">
                {/* ── Section header ── */}
                <header className="text-center">
                    <span
                        className="text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: "var(--color-gold-400)" }}
                    >
                        Visionarios que Confían en Nosotros
                    </span>
                    <h2
                        id="social-proof-heading"
                        className="mt-3 text-3xl md:text-4xl font-black leading-tight"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--color-cream-50)" }}
                    >
                        Historias que{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #D4AF37, #e8cc7a)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Inspiran
                        </span>
                    </h2>
                    <p
                        className="mt-4 max-w-lg mx-auto text-sm leading-relaxed"
                        style={{ color: "rgba(250,249,246,0.55)" }}
                    >
                        Cada viaje que diseñamos deja una huella. Estas son algunas de las voces
                        de quienes eligieron viajar de otra manera.
                    </p>
                </header>

                {/* ── Testimonials grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((t) => (
                        <blockquote
                            key={t.id}
                            className="flex flex-col gap-5 p-6 rounded-2xl"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.07)",
                            }}
                        >
                            {/* Quote mark */}
                            <span
                                className="text-4xl leading-none select-none"
                                style={{ color: "rgba(212,175,55,0.35)", fontFamily: "Georgia, serif" }}
                                aria-hidden="true"
                            >
                                "
                            </span>

                            <p
                                className="text-sm leading-relaxed flex-1 -mt-6"
                                style={{ color: "rgba(250,249,246,0.75)" }}
                            >
                                {t.quote}
                            </p>

                            {/* Attribution */}
                            <footer className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                                {/* Avatar */}
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(212,175,55,0.3), rgba(96,184,212,0.2))",
                                        border: "1px solid rgba(212,175,55,0.3)",
                                        color: "var(--color-gold-400)",
                                    }}
                                >
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="text-xs font-bold" style={{ color: "var(--color-cream-50)" }}>
                                        {t.name}
                                    </p>
                                    <p className="text-[10px]" style={{ color: "rgba(212,175,55,0.7)" }}>
                                        {t.trip}
                                    </p>
                                </div>
                            </footer>
                        </blockquote>
                    ))}
                </div>

                {/* ── Certifications / Trust bar ── */}
                <div className="flex flex-col items-center gap-6">
                    <p
                        className="text-[11px] uppercase tracking-widest font-semibold text-center"
                        style={{ color: "rgba(250,249,246,0.35)" }}
                    >
                        Confianza y Respaldo Internacional
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {CERTIFICATIONS.map((cert) => (
                            <div
                                key={cert.label}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-full"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                }}
                            >
                                <span aria-hidden="true" className="text-base">
                                    {cert.icon}
                                </span>
                                <span
                                    className="text-xs font-semibold"
                                    style={{ color: "rgba(250,249,246,0.6)" }}
                                >
                                    {cert.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
