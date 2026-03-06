import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
    getDestinationBySlug,
    getAllSlugs,
    formatDestinationPrice,
    type Destination,
} from "@/data/destinations";

// ─── Static Params (SSG) ─────────────────────────────────────────────────────

export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic Metadata ────────────────────────────────────────────────────────
// Next.js 15+: params is a Promise — must be awaited.
// Per CONTENT_MARKETING_RULES.md: unique H1, meta ≤ 155 chars, descriptive ALT.

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const dest = getDestinationBySlug(slug);
    if (!dest) return { title: "Destino no encontrado" };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://euroasia.travel";

    return {
        title: dest.seo.title,
        description: dest.seo.metaDescription,
        keywords: dest.seo.keywords,
        openGraph: {
            title: dest.og.title,
            description: dest.og.description,
            url: `${baseUrl}/destinos/${dest.slug}`,
            siteName: "EuroAsia Viajes",
            images: [
                {
                    url: `${baseUrl}${dest.og.image}`,
                    width: 1200,
                    height: 630,
                    alt: dest.imageAlt,
                },
            ],
            locale: "es_ES",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: dest.og.title,
            description: dest.og.description,
            images: [`${baseUrl}${dest.og.image}`],
        },
        alternates: {
            canonical: `${baseUrl}/destinos/${dest.slug}`,
        },
    };
}

// ─── Page Component ───────────────────────────────────────────────────────────

function RegionBadge({ region }: { region: Destination["region"] }) {
    const isAsia = region === "ASIA";
    return (
        <span
            style={{
                backgroundColor: isAsia ? "rgba(96,184,212,0.2)" : "rgba(244,185,66,0.2)",
                color: isAsia ? "#8dd0e4" : "#f4b942",
                border: `1px solid ${isAsia ? "rgba(96,184,212,0.35)" : "rgba(244,185,66,0.35)"}`,
            }}
            className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
        >
            {isAsia ? "Asia" : "Europa"}
        </span>
    );
}

// Next.js 15+: page props params is a Promise — must be awaited.
export default async function DestinationPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const dest = getDestinationBySlug(slug);
    if (!dest) notFound();

    const formattedPrice = formatDestinationPrice(dest);

    return (
        <main
            id="main-content"
            className="relative min-h-dvh flex flex-col overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #0a0f1e 0%, #111d3c 30%, #0d2240 60%, #0a1a30 100%)",
            }}
        >
            {/* Decorative blobs */}
            <div
                className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, #f4b942 0%, transparent 70%)", filter: "blur(80px)" }}
                aria-hidden="true"
            />
            <div
                className="absolute bottom-[-10%] left-[-15%] w-[50vw] h-[50vw] rounded-full opacity-15 pointer-events-none"
                style={{ background: "radial-gradient(circle, #60b8d4 0%, transparent 70%)", filter: "blur(80px)" }}
                aria-hidden="true"
            />

            {/* ── Nav ── */}
            <nav
                id="destination-nav"
                className="relative z-10 flex items-center justify-between px-4 pt-5 pb-3"
                aria-label="Navegación destino"
            >
                <a
                    href="/"
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                    aria-label="Volver al inicio"
                >
                    <span className="text-2xl" aria-hidden="true">✈️</span>
                    <span
                        className="font-bold text-lg leading-none"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--color-gold-400)" }}
                    >
                        EuroAsia
                    </span>
                </a>
                <RegionBadge region={dest.region} />
            </nav>

            {/* ── Hero Image ── */}
            <div className="relative z-10 mx-4 mt-2 rounded-2xl overflow-hidden aspect-[16/9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={dest.og.image}
                    alt={dest.imageAlt}
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(10,15,30,0.7) 0%, transparent 60%)" }}
                    aria-hidden="true"
                />
            </div>

            {/* ── Main Content ── */}
            <article className="relative z-10 flex flex-col px-4 pt-5 pb-12 gap-6">

                {/* Header — unique H1 per CONTENT_MARKETING_RULES.md */}
                <header className="flex flex-col gap-2">
                    <h1
                        className="text-[1.65rem] leading-[1.2] font-black text-white"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {dest.headline}
                    </h1>
                    <p className="text-sm text-white/55 leading-relaxed">{dest.subheadline}</p>

                    {/* Price badge */}
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-white/40">Desde</span>
                        <span
                            className="text-base font-bold"
                            style={{ color: "var(--color-gold-400)" }}
                        >
                            {formattedPrice}
                        </span>
                        <span className="text-xs text-white/40">/ persona</span>
                    </div>
                </header>

                {/* Body — short paragraphs for mobile readability */}
                <section aria-label="Descripción del destino" className="flex flex-col gap-4">
                    {dest.body.map((paragraph, i) => (
                        <p key={i} className="text-sm text-white/70 leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </section>

                {/* Highlights — bullet list */}
                <section
                    aria-label="Experiencias destacadas"
                    className="glass rounded-2xl p-4 flex flex-col gap-3"
                >
                    <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                        Experiencias incluidas
                    </h2>
                    <ul className="flex flex-col gap-2" role="list">
                        {dest.highlights.map((highlight, i) => (
                            <li key={i} className="text-sm text-white/80 leading-relaxed" role="listitem">
                                {highlight}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* CTA */}
                <a
                    id={`cta-${dest.slug}`}
                    href={dest.cta.url}
                    className="w-full rounded-xl font-bold text-sm uppercase tracking-wide text-center transition-all duration-200 cursor-pointer flex items-center justify-center"
                    style={{
                        background: "linear-gradient(135deg, #f4b942, #e8a020)",
                        color: "#0a0f1e",
                        minHeight: "52px",
                    }}
                >
                    {dest.cta.text}
                </a>

                {/* Back link */}
                <a
                    href="/"
                    className="text-center text-sm transition-colors"
                    style={{ color: "var(--color-gold-400)" }}
                >
                    ← Ver todos los destinos
                </a>
            </article>
        </main>
    );
}
