"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TRIPS_CATALOGUE } from "@/lib/trips";

const slides = [
    {
        tripId: "europa-total",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2000&auto=format&fit=crop",
        priority: true,
    },
    {
        tripId: "japon-samurai",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop",
        priority: false,
    },
    {
        tripId: "turquia-vuelo",
        image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=2000&auto=format&fit=crop",
        priority: false,
    }
];

export default function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const getTripInfo = (id: string) => TRIPS_CATALOGUE[id];

    return (
        <div className="relative w-full h-[75vh] min-h-[600px] overflow-hidden bg-gray-900 group">
            {/* Slides Container */}
            <div
                className="flex h-full w-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide) => {
                    const trip = getTripInfo(slide.tripId);
                    return (
                        <div key={slide.tripId} className="relative min-w-full h-full flex-[1_0_100%]">
                            <Image
                                src={slide.image}
                                alt={trip?.name || "Destino"}
                                fill
                                className="object-cover"
                                priority={slide.priority}
                                sizes="100vw"
                            />
                            {/* Overlays to ensure text is highly readable */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                            {/* Content Box */}
                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 lg:px-24 pb-20 md:pb-24 flex flex-col gap-4 max-w-7xl mx-auto">
                                {/* Promotional Badges */}
                                <div className="flex flex-wrap gap-2 md:gap-3 mb-2 animate-fade-up">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-sm font-black tracking-wide bg-gradient-to-r from-yellow-400 to-amber-600 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)] border border-yellow-300">
                                        <span className="text-sm md:text-base leading-none">💳</span> 12 MESES SIN INTERESES
                                    </span>
                                </div>

                                {/* Hero Title with semi-transparent backdrop for extra legibility if needed, but the dark gradient is usually enough. Let's add a subtle text-shadow. */}
                                <Link href={`/tour/${trip?.id}`}>
                                    <h2
                                        className="text-4xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-tight max-w-4xl hover:text-gray-200 transition-colors cursor-pointer"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {trip?.name}
                                    </h2>
                                </Link>

                                {/* CTA Button */}
                                <div className="mt-4 md:mt-8 animate-fade-up delay-100 flex gap-4 flex-wrap">
                                    <Link
                                        href={`/tour/${trip?.id}`}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold text-sm md:text-base rounded-full hover:bg-gray-100 hover:scale-105 transition-all w-full md:w-auto text-center cursor-pointer shadow-xl"
                                    >
                                        Ver Itinerario <span className="text-xl leading-none animate-bounce">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Manual Controls - Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${currentIndex === i
                            ? "w-8 h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                            : "w-2 h-2 bg-white/50 hover:bg-white/80"
                            }`}
                        aria-label={`Ir al slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Manual Controls - Arrows */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
                onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            >
                ←
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
            >
                →
            </button>
        </div>
    );
}
