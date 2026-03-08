/**
 * trips.ts — Server-side price catalogue.
 *
 * SECURITY: The client NEVER sends the price. The server always looks up the
 * canonical price by tripId. This prevents price-tampering attacks.
 *
 * Per SKILL.md: prices in dynamic format per destination currency.
 */

export interface Trip {
    id: string;
    name: string;
    destination: string;
    country: string;
    region: "EUROPE" | "ASIA" | "AFRICA";
    /** Price per person in the smallest currency unit (cents / yen / etc.) */
    priceUnit: number;
    /** ISO 4217 currency code */
    currency: string;
    /** BCP 47 locale for display */
    locale: string;
    emoji: string;
    /** Human-readable description shown on Stripe checkout */
    description: string;
    /** Dates available for travel */
    travelDates: string;
    /** Duration in nights */
    nights: number;
    /** Whether international flights are included in the price */
    flightIncluded: boolean;
    /** Detailed itinerary */
    itinerary?: string[];
    /** What is included */
    includes?: string[];
    /** What is not included */
    excludes?: string[];
    /** Terms and conditions */
    terms?: string | string[];
    /** Main hero image for the tour */
    image?: string;
}

/**
 * Authoritative price catalogue — single source of truth for all trip prices.
 * Prices are in the SMALLEST currency unit (Stripe convention):
 *   - EUR/USD/GBP/MXN → cents  (19380 MXN = 1938000)
 */
export const TRIPS_CATALOGUE: Record<string, Trip> = {
    "europa-total": {
        "id": "europa-total",
        "name": "Tour Europa Total con Vuelo",
        "destination": "Tour Europa Total con Vuelo",
        "country": "Europa",
        "region": "EUROPE",
        "priceUnit": 4528583,
        "currency": "MXN",
        "locale": "es-MX",
        "emoji": "🇪🇺",
        "flightIncluded": true,
        "description": "De Madrid a Ámsterdam en un grand tour de 17 días: cruce el Viejo Continente con guía hispanohablante y vuelos redondos incluidos. Madrid, París, Venecia, Roma, Florencia y Barcelona en una sola experiencia arquitectónica.",
        "travelDates": "Próximas salidas: Primavera 2027",
        "nights": 16,
        "itinerary": [
            "Día 1. México - Madrid: Encuentro en el aeropuerto CDMX 3 horas antes del vuelo trasatlántico. Noche a bordo.",
            "Día 2. Madrid: Llegada al aeropuerto Adolfo Suárez Madrid-Barajas. Traslado al hotel.",
            "Día 3. Madrid: Desayuno. Recorrido panorámico: Plaza España, Gran Vía, Fuente de la Cibeles, Puerta de Alcalá, Plaza Mayor y Plaza de Oriente.",
            "Día 4. Madrid - Burgos - Burdeos: Salida hacia el norte de España. Visita panorámica a Burgos (Arco de Santa María, Catedral de Santa María). Cruce a Francia, llegada a Burdeos, Plaza de la Bolsa y fuente reflectante Miroir d'eau.",
            "Día 5. Burdeos – Blois – París: Desayuno. Parada en Blois, Castillo de Blois (Patrimonio UNESCO). Llegada a París.",
            "Día 6. París: Recorrido por Campos Elíseos, Plaza de la Concordia, Arco del Triunfo, Asamblea Nacional, Ópera, Museo del Louvre, Inválidos, Campo de Marte, Torre Eiffel. Visita al Museo del Perfume.",
            "Día 7. París: Desayuno. Día libre para actividades personales o excursiones opcionales.",
            "Día 8. París – Lucerna – Zúrich: Salida hacia Suiza. Visita panorámica por Lucerna (arquitectura medieval, puentes, iglesias). Llegada a Zúrich.",
            "Día 9. Zúrich – Venecia: Traslado hacia la frontera suizo-italiana hasta llegar a Venecia.",
            "Día 10. Venecia – Roma: Recorrido por Venecia: Puente de los Suspiros y Plaza de San Marcos con su Basílica Bizantina. Salida hacia Roma.",
            "Día 11. Roma: Visita panorámica de Roma con recorrido hasta la muralla del Vaticano.",
            "Día 12. Roma: Día libre para actividades personales o excursiones opcionales.",
            "Día 13. Roma – Florencia: Desayuno. Visita a pie por Florencia: Plaza de San Marcos, Galería de la Academia, Mercado de la Paja, Catedral Santa María del Fiore, Baptisterio, Puertas del Paraíso, Ponte Vecchio, Plaza de la Santa Croce.",
            "Día 14. Florencia – Pisa – Niza: Desayuno. Visita a Pisa: Torre Inclinada, Catedral, Baptisterio, Plaza de los Milagros. Continuación hacia Niza, Costa Azul.",
            "Día 15. Niza – Barcelona: Desayuno. Cruce por La Provenza, Alpes y Occitania hasta Barcelona. Visita panorámica: Basílica de la Sagrada Familia y otros monumentos.",
            "Día 16. Barcelona – Zaragoza – Madrid: Parada en Zaragoza, Basílica de Nuestra Señora del Pilar. Llegada a Madrid.",
            "Día 17. Madrid – México: Desayuno. Traslado al aeropuerto. Vuelo de regreso a la CDMX."
        ],
        "includes": [
            "Vuelos internacionales (trasatlántico de ida y vuelta)",
            "Alojamiento en habitación doble",
            "Desayunos según itinerario",
            "Traslados indicados en el itinerario",
            "Visitas panorámicas indicadas",
            "Guía de habla hispana durante todo el recorrido",
            "Documentos electrónicos con código QR"
        ],
        "excludes": [
            "Impuestos aéreos por persona",
            "Excursiones opcionales",
            "Tasas hoteleras",
            "Servicios, excursiones o comidas no especificadas en el itinerario",
            "Seguro de viaje",
            "Gastos extras en hotel (llamadas, lavandería, etc.)",
            "Propinas (maleteros, camaristas, meseros, etc.)",
            "Gastos personales",
            "Visados (responsabilidad del viajero)"
        ],
        "terms": [
            "Tarifas por persona en ocupación doble, sujetas a disponibilidad y cambios sin previo aviso.",
            "No aplican si el tipo de cambio USD/MXN supera los $20.25 MXN; pagos al tipo de cambio del día.",
            "El anticipo de $5,000 MXN no es reembolsable.",
            "Las tarifas pueden variar en temporada alta.",
            "Una vez confirmada la reserva, aplican cargos por cambios o cancelaciones.",
            "Es responsabilidad del viajero contar con pasaporte vigente (mínimo 6 meses), visas y documentos necesarios.",
            "Traza Travel no se hace responsable por cancelaciones derivadas de fuerza mayor (desastres naturales, guerras, cierres de fronteras, epidemias, huelgas, conflictos bélicos/políticos).",
            "Una vez contratado el servicio, las tarifas no aceptan cambios ni reembolsos. Aplican restricciones."
        ],
        "image": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2000&auto=format&fit=crop"
    },
    "gran-vuelta-europa": {
        "id": "gran-vuelta-europa",
        "name": "Tour Gran Vuelta por Europa con Vuelo 2026",
        "destination": "Tour Gran Vuelta por Europa con Vuelo 2026",
        "country": "Europa",
        "region": "EUROPE",
        "priceUnit": 5240105,
        "currency": "MXN",
        "locale": "es-MX",
        "emoji": "🇪🇺",
        "flightIncluded": true,
        "description": "El itinerario más completo de Europa: 19 días desde Londres hasta Madrid, cruzando Londres, París, Zúrich, Venecia, Roma y Barcelona. Vuelo trasatlántico incluido desde la CDMX con aerolíneas de primera clase.",
        "travelDates": "Salidas selectas: Abr, Jun, Sep 2027",
        "nights": 18,
        "itinerary": [
            "Día 1. México - Londres: Cita en aeropuerto CDMX 3 hrs antes del vuelo trasatlántico a Londres. Noche a bordo.",
            "Día 2. Londres: Llegada al aeropuerto Heathrow. Recorrido por Hyde Park, Kensington, Piccadilly Circus, Regent St., Oxford St., Parlamento, Big Ben, puentes y Abadía de Westminster. (Nota: si el vuelo llega después de las 17:00, la visita se reprograma para el día siguiente).",
            "Día 3. Londres: Día libre para actividades personales o excursiones opcionales.",
            "Día 4. Londres - París: Desayuno. Salida al puerto de Dover, ferry de 75 min hasta Calais. Continuación en carretera hasta París. Llegada y alojamiento.",
            "Día 5. París: Desayuno. Recorrido por la \"Ciudad del Amor\": Campos Elíseos, Plaza de la Concordia, Arco del Triunfo, Asamblea Nacional, Ópera, Louvre, Inválidos, Campo de Marte, Torre Eiffel. Tarde libre.",
            "Día 6. París: Desayuno. Día libre para actividades personales o excursiones opcionales.",
            "Día 7. París – Luxemburgo – Frankfurt: Desayuno. Travesía por el Gran Este de Francia hasta Luxemburgo. Tiempo libre. Continuación a Frankfurt. Alojamiento.",
            "Día 8. Frankfurt – Heidelberg – Zúrich: Desayuno. Visita a Heidelberg: Iglesia del Espíritu Santo y Puente Viejo. Continuación a Zúrich. Visita panorámica.",
            "Día 9. Zúrich – Lucerna – Vaduz – Innsbruck: Desayuno. Visita a Lucerna (lago de los Cuatro Cantones). Bordeo de los Alpes hasta Vaduz, capital de Liechtenstein. Continuación a Innsbruck.",
            "Día 10. Innsbruck – Padua – Venecia: Desayuno. Día libre con opción de excursión opcional por los Alpes tiroleses. Visita a Basílica de San Antonio en Padua. Continuación a Venecia.",
            "Día 11. Venecia – Roma: Recorrido por Venecia: Puente de los Suspiros y Plaza de San Marcos. Tiempo libre. Salida hacia Roma.",
            "Día 12. Roma: Desayuno. Visita panorámica: Coliseo (exterior), Circo Máximo, Basílica Santa María la Mayor, cruce del Tíber, llegada al Vaticano. Tarde libre.",
            "Día 13. Roma: Desayuno. Día libre o excursión opcional.",
            "Día 14. Roma – Florencia: Desayuno. Salida a Florencia. Visita a pie: Plaza de San Marcos, Galería de la Academia, Mercado de la Paja, Catedral Santa María del Fiore, Campanario de Giotto, Baptisterio, Puertas del Paraíso, Ponte Vecchio, Plaza de Santa Croce. Tiempo libre.",
            "Día 15. Florencia – Pisa – Niza: Desayuno. Visita a Pisa: Torre Inclinada, Catedral, Baptisterio. Continuación a Niza, Costa Azul. Visita panorámica breve.",
            "Día 16. Niza – Barcelona: Desayuno. Travesía por La Provenza, Alpes, Costa Azul y Occitania hasta Barcelona. Visita: Sagrada Familia, Plaza Cataluña, Monumento a Colón, Plaza de España.",
            "Día 17. Barcelona – Zaragoza – Madrid: Desayuno. Parada en Zaragoza, Basílica de Nuestra Señora del Pilar. Llegada y alojamiento en Madrid.",
            "Día 18. Madrid: Desayuno. Día libre para conocer la ciudad o hacer compras.",
            "Día 19. Madrid – México: Desayuno. Traslado al aeropuerto. Vuelo de regreso a la CDMX."
        ],
        "includes": [
            "Boleto de avión México – Londres / Madrid – México en clase turista (Aeroméxico; algunas salidas con Iberia vía Madrid)",
            "17 noches de alojamiento en categoría indicada",
            "Transporte en autocar turístico",
            "Guía profesional de habla hispana",
            "Visitas indicadas en el itinerario",
            "Traslados indicados y visitas panorámicas",
            "Documentos electrónicos con código QR"
        ],
        "excludes": [
            "Impuestos aéreos por persona",
            "Alimentos (fuera de los desayunos incluidos)",
            "Actividades opcionales",
            "Bebidas",
            "Gastos extras en hotel (llamadas, lavandería, etc.)",
            "Propinas (maleteros, camaristas, meseros, etc.)",
            "Gastos personales"
        ],
        "terms": [
            "Tarifas por persona en ocupación doble, sujetas a disponibilidad y cambios sin previo aviso.",
            "No aplican si el tipo de cambio USD/MXN supera los $20.25 MXN; pagos al tipo de cambio del día.",
            "El anticipo de $5,000 MXN no es reembolsable.",
            "Las tarifas pueden variar en temporada alta.",
            "Una vez confirmada la reserva, aplican cargos por cambios o cancelaciones.",
            "Modificación de fecha posible según política de aerolínea y disponibilidad de hotel, con posible cargo adicional.",
            "Es responsabilidad del viajero contar con pasaporte vigente (mínimo 6 meses), visas y documentos necesarios.",
            "Traza Travel no se hace responsable por cancelaciones derivadas de fuerza mayor.",
            "Una vez contratado el servicio, las tarifas no aceptan cambios ni reembolsos. Aplican restricciones."
        ],
        "image": "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2000&auto=format&fit=crop"
    },
    "escapada-europa": {
        "id": "escapada-europa",
        "name": "Tour Escapada a Europa",
        "destination": "Tour Escapada a Europa",
        "country": "Europa",
        "region": "EUROPE",
        "priceUnit": 1654669,
        "currency": "MXN",
        "locale": "es-MX",
        "emoji": "🇪🇺",
        "flightIncluded": false,
        "description": "De Madrid al corazón de París en 7 días de pura elegancia europea: paseos por la Gran Vía madrileña, el Valle del Loira y los bulevares iluminados de la Ciudad de la Luz. Ideal como primera incursión al continente.",
        "travelDates": "Salidas disponibles: Mar – Oct 2027",
        "nights": 6,
        "itinerary": [
            "Día 1. Madrid: Llegada al aeropuerto de Madrid-Barajas. Traslado al hotel. Día libre para explorar.",
            "Día 2. Madrid: Desayuno buffet. Visita panorámica por Madrid: Plaza de Toros, Estadio Santiago Bernabéu, contraste del Madrid viejo y moderno. Tarde: excursión opcional a Toledo (Patrimonio UNESCO, a 70 km de Madrid).",
            "Día 3. Madrid – San Sebastián – Burdeos: Desayuno buffet. Salida hacia San Sebastián con vista panorámica en bus. Continuación a Burdeos.",
            "Día 4. Burdeos – Valle de Loira – París: Desayuno. Cruce del Valle del Loira (\"Jardín de Francia\"). Parada en Blois con tiempo libre para visitar opcionalmente el Castillo de Blois. Llegada a París. Opcional nocturno: \"París Iluminado\" y crucero por el Sena.",
            "Día 5. París: Visita panorámica de la \"Ciudad de la Luz\": Plaza de la Concordia, La Bastilla, Barrio Latino, Campos Elíseos, Inválidos (tumba de Napoleón), parada fotográfica en la Torre Eiffel. Tarde libre. Opcional: espectáculo en cabaret parisino con copa de champagne.",
            "Día 6. París: Desayuno. Día libre. Excursión opcional al Palacio de Versalles (Patrimonio UNESCO, 1979).",
            "Día 7. París: Desayuno. Traslado al aeropuerto."
        ],
        "includes": [
            "Alojamiento y desayuno",
            "Traslados aeropuerto – hotel – aeropuerto",
            "Visita con guía local en Madrid y París",
            "Guía durante el recorrido",
            "Seguro de viaje (coberturas según web)"
        ],
        "excludes": [
            "Vuelos internacionales",
            "Propinas (maleteros, camaristas, meseros, etc.)",
            "Gastos personales"
        ],
        "terms": [
            "Tarifas por persona en ocupación doble, sujetas a disponibilidad y cambios sin previo aviso.",
            "No aplican si el tipo de cambio USD/MXN supera los $20.25 MXN; pagos al tipo de cambio del día.",
            "El anticipo de $5,000 MXN no es reembolsable.",
            "Las tarifas pueden variar en temporada alta.",
            "Una vez confirmada la reserva, aplican cargos por cambios o cancelaciones.",
            "Es responsabilidad del viajero contar con pasaporte vigente, visas y documentos necesarios.",
            "Traza Travel no se hace responsable por cancelaciones derivadas de fuerza mayor.",
            "Una vez contratado el servicio, las tarifas no aceptan cambios ni reembolsos. Aplican restricciones."
        ],
        "image": "https://images.unsplash.com/photo-1522814890654-e9102b4d956a?q=80&w=2000&auto=format&fit=crop"
    },
    "paraiso-europeo": {
        "id": "paraiso-europeo",
        "name": "Tour Paraíso Europeo",
        "destination": "Tour Paraíso Europeo",
        "country": "Europa",
        "region": "EUROPE",
        "priceUnit": 3829106,
        "currency": "MXN",
        "locale": "es-MX",
        "emoji": "🌍",
        "flightIncluded": false,
        "description": "De Londres a Ámsterdam pasando por Bruselas, Brujas y La Haya: 10 días de arquitectura gótica, canales y diamantes. Crucero incluido por los canales del norte de Europa al final del recorrido.",
        "travelDates": "Próxima salida: Mayo 2027",
        "nights": 9,
        "itinerary": [
            "Día 1. Londres: Llegada al aeropuerto de Heathrow. Traslado al hotel. Día libre para explorar la ciudad y pasear por el centro comercial.",
            "Día 2. Londres: Desayuno en hotel. Recorrido por la ciudad: Piccadilly Circus, Oxford Street, Trafalgar Square, Abadía de Westminster, Palacio de Buckingham (posible cambio de guardia). Tarde libre.",
            "Día 3. Londres – París (por el Eurotunnel): Desayuno. Salida hacia Folkestone; el autobús toma el tren del Eurotunnel (o Ferry en algunas salidas) cruzando el Canal de la Mancha. Llegada a Calais y continuación por carretera hasta París. A última hora, recorrido por el París iluminado. (Paseo en Bateaux Mouche incluido en Paquete Plus P+).",
            "Día 4. París: Desayuno buffet. Recorrido por la ciudad: Isla de la Cité, Notre Dame, Arco de Triunfo, Campos Elíseos, Inválidos, Ópera, Torre Eiffel (subida al 2° piso incluida en Paquete Plus P+). Tarde libre. Opcionales: paseo en Bateaux Mouche, Montmartre, Barrio Latino.",
            "Día 5. París: Día libre. Excursión opcional a Versalles. Opcional por la noche: espectáculo en cabaret parisino (Paradis Latin incluido en Paquete Plus P+).",
            "Día 6. París – Bruselas: Visita panorámica de Bruselas: Catedral de Saint-Michel, Atomium, Place Royale, Palacio Real, Grand Place. Tiempo libre. Opcional: cena típica en Grand Place (incluida en Paquete Plus P+).",
            "Día 7. Bruselas – Gante – Brujas: Visita a Gante: Catedral de San Bavon con el Cordero Místico, casco antiguo medieval. Continuación a Brujas: Lago de Amor, Beaterio, Plaza Mayor, Atalaya. Opcional: paseo en barco por canales. (Almuerzo incluido en Paquete Plus P+).",
            "Día 8. Brujas – Amberes – La Haya – Ámsterdam: Visita a Amberes (ciudad de Rubens, 2° puerto de Europa, mercado de diamantes, Plaza Mayor). Tiempo libre. Visita panorámica a La Haya (capital administrativa, Parlamento, Palacio de la Paz). Llegada a Ámsterdam; paseo en barco por canales, visita a fábrica de talla de diamantes.",
            "Día 9. Ámsterdam: Visita panorámica breve en bus. Día libre. Excursión opcional a Volendam y Marken (fábrica de queso holandés). (Incluida en Paquete Plus P+).",
            "Día 10. Ámsterdam: Desayuno. Tiempo libre hasta traslado al aeropuerto."
        ],
        "includes": [
            "Alojamiento y desayuno",
            "Bolsa de viaje",
            "Transporte en autobús con guía",
            "Seguro de viaje",
            "Traslados llegada y salida del aeropuerto",
            "Guía durante el recorrido"
        ],
        "excludes": [
            "Gastos extras en hotel (llamadas, lavandería, etc.)",
            "Propinas (maleteros, camaristas, meseros, etc.)",
            "Gastos personales"
        ],
        "terms": [
            "Tarifas por persona en ocupación doble, sujetas a disponibilidad y cambios sin previo aviso.",
            "No aplican si el tipo de cambio USD/MXN supera los $20.25 MXN; pagos al tipo de cambio del día.",
            "El anticipo de $5,000 MXN no es reembolsable.",
            "Las tarifas pueden variar en temporada alta.",
            "Una vez confirmada la reserva, aplican cargos por cambios o cancelaciones.",
            "Es responsabilidad del viajero contar con pasaporte vigente, visas y documentos necesarios.",
            "Traza Travel no se hace responsable por cancelaciones derivadas de fuerza mayor.",
            "Una vez contratado el servicio, las tarifas no aceptan cambios ni reembolsos. Aplican restricciones."
        ],
        "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
    },
    "escapada-italia": {
        "id": "escapada-italia",
        "name": "Tour Escapada a Italia",
        "destination": "Tour Escapada a Italia",
        "country": "Italia",
        "region": "EUROPE",
        "priceUnit": 2074297,
        "currency": "MXN",
        "locale": "es-MX",
        "emoji": "🍕",
        "flightIncluded": false,
        "description": "Roma, Florencia, Venecia y Milán en una semana intensa de arte y gastronomía: desde la Capilla Sixtina hasta el Ponte Vecchio. Recorra la Bota con guía hispanohablante y cristal de Murano de primera mano.",
        "travelDates": "Salidas: Abr – Nov 2027",
        "nights": 6,
        "itinerary": [
            "Día 1. Ciudad de Origen – Roma: Llegada a Roma. Traslado al hotel. Tiempo libre. Excursión opcional nocturna \"Roma Nocturna\" (Piazza Navona, Fontana de Trevi).",
            "Día 2. Roma: Desayuno. Mañana libre. Excursión opcional: Museos Vaticanos y Capilla Sixtina. Visita panorámica de Roma: Castel Sant'Angelo, Lungotevere, Isla Tiberina, Boca de la Verdad, Circo Máximo, Termas de Caracalla, Pirámide Cestia, Basílicas de San Juan de Letrán y Santa María la Mayor (exteriores), Estación Termini, Plaza de la República, Vía Veneto, Villa Borghese. Resto del día libre. Excursión opcional \"Roma Antigua\".",
            "Día 3. Roma: Desayuno. Día libre. Excursión opcional de día completo: Nápoles, Pompeya y Capri (nota: del 1 nov 2025 al 31 mar 2026 se sustituye por \"Pompeya y Nápoles\"; visita a Capri sujeta a condiciones climáticas y operativa naviera).",
            "Día 4. Roma – Florencia: Desayuno. Salida a Florencia. Visita panorámica: Duomo de Santa Maria del Fiore (cúpula de Brunelleschi), Campanario de Giotto, Baptisterio (Puertas del Paraíso de Ghiberti), Ponte Vecchio, Plaza de la Signoria con Palazzo Vecchio. Excursión opcional \"Santa Croce y Piazzale Michelangelo\". (Almuerzo incluido en categorías Clásico-Co y Clásico-Si).",
            "Día 5. Florencia – Venecia – Región del Véneto: Desayuno. Salida hacia Venecia, travesía por los Apeninos. Paseo panorámico en barco por los canales. Exterior del Palacio de los Dogos, Piazzeta, Piazza San Marco. Visita a fábrica de cristal de Murano. Tiempo libre. Excursión opcional \"Góndolas con Venecia Escondida\". Traslado al hotel en Región del Véneto. (Cena incluida en Clásico-Co y Clásico-Si).",
            "Día 6. Región del Véneto – Milán: Desayuno. Recorrido paralelo a los Alpes hasta Milán. Tiempo libre: Castello Sforzesco, Galería de Vittorio Emanuele, Duomo; calles de la moda.",
            "Día 7. Milán – Ciudad de Destino: Desayuno. Tiempo libre para explorar o hacer compras. Traslado al aeropuerto. Fin de servicios."
        ],
        "includes": [
            "Alojamiento y desayuno (6 noches)",
            "Guía de habla hispana",
            "Traslados aeropuerto – hotel – aeropuerto",
            "Autocar con aire acondicionado",
            "Visita a fábrica de cristal de Murano",
            "Paseo panorámico en barco en Venecia",
            "Visitas panorámicas indicadas"
        ],
        "excludes": [
            "Vuelos internacionales",
            "Gastos personales"
        ],
        "terms": [
            "Tarifas por persona en ocupación doble, sujetas a disponibilidad y cambios sin previo aviso.",
            "No aplican si el tipo de cambio USD/MXN supera los $20.25 MXN; pagos al tipo de cambio del día.",
            "El anticipo de $5,000 MXN no es reembolsable. Aplican restricciones.",
            "Una vez confirmada la reserva, aplican cargos por cambios o cancelaciones.",
            "Modificación de fecha posible con posible cargo adicional.",
            "Es responsabilidad del viajero contar con pasaporte vigente (mínimo 6 meses), visas y documentos necesarios.",
            "Traza Travel no se hace responsable por cancelaciones derivadas de fuerza mayor.",
            "Una vez contratado el servicio, las tarifas no aceptan cambios ni reembolsos."
        ],
        "image": "https://images.unsplash.com/photo-1529260830199-42b24126f198?q=80&w=2000&auto=format&fit=crop"
    },
    "europa-magnifica": {
        "id": "europa-magnifica",
        "name": "Tour Europa Magnífica",
        "destination": "Tour Europa Magnífica",
        "country": "Europa",
        "region": "EUROPE",
        "priceUnit": 2789572,
        "currency": "MXN",
        "locale": "es-MX",
        "emoji": "🇪🇺",
        "flightIncluded": false,
        "description": "París, Brujas, Bruselas, Ámsterdam y Frankfurt en 8 días de lujo sin escala: crucero por el Rin y vistas al Valle de Loreley incluidos. El circuito más europeo para el viajero que exige lo extraordinario.",
        "travelDates": "Próxima salida: Verano 2027",
        "nights": 7,
        "itinerary": [
            "Día 1. Ciudad de Origen – París: Llegada a París. Traslado al hotel. Tiempo libre. Opcional: \"Iluminaciones de París\".",
            "Día 2. París: Desayuno. Visita panorámica con guía local: Plazas de la Concordia y de la Ópera, Campos Elíseos, Arco de Triunfo, barrio de Saint Germain, grandes bulevares. Tarde libre. Opcional: paseo en Bateaux Mouche por el Sena y recorrido por el Barrio Latino.",
            "Día 3. París: Desayuno. Día libre. Opcional: excursión al Palacio de Versalles (Galería de los Espejos, capilla real, aposentos privados; incluida en Clásico-Vi y Clásico-Si). Tarde: visita opcional a Montmartre (Basílica del Sagrado Corazón).",
            "Día 4. París – Brujas: Desayuno. Salida a Bélgica, llegada a Brujas (Patrimonio de la Humanidad). Tarde libre. Opcional \"Panorámica de Brujas con paseo en barco por canales\" (Plaza Mayor, Basílica de la Santa Sangre, Plaza Buró, Puente de San Bonifacio, Lago del Amor).",
            "Día 5. Brujas – Bruselas – La Haya – Ámsterdam: Desayuno. Visita panorámica de Bruselas: Barrio de Sablon, Palacio de Justicia, Parlamento Europeo, Atomium, Arco del Cincuentenario, Manneken Pis, Grand Place (Casas del Rey, de los Gremios y Ayuntamiento). Continuación a La Haya (Palacio de la Paz, Parlamento, Palacio Real). Llegada a Ámsterdam. Alojamiento.",
            "Día 6. Ámsterdam: Desayuno. Visita panorámica: Molino de Rembrandt, Centro de Convenciones RAI, Plaza de los Museos (Rijksmuseum, Stedelijk Museum, Van Gogh Museum), Leidseplein, antigua fábrica de Heineken, barrio judío (Monumento al Holocausto, sinagogas, mercado de las Pulgas), puerto con exteriores del Nemo y Museo Marítimo. Resto del día libre. Opcional: paseo en barco por canales y excursión a Marken y Volendam.",
            "Día 7. Ámsterdam – Colonia – Crucero por el Rin – Frankfurt: Desayuno. Salida a Colonia: tiempo libre, visita a la Catedral gótica (157 m). Tarde: paseo en barco por el Rin, Valle de Loreley (Patrimonio Cultural UNESCO), aldeas, viñedos y castillos de Renania. Desembarque y continuación a Frankfurt. Tiempo libre: Römerberg, casas patricias del siglo XV. (Cena incluida en Clásico-Co y Clásico-Si).",
            "Día 8. Frankfurt – Ciudad de Origen: Desayuno. Tiempo libre hasta traslado al aeropuerto. Fin de servicios."
        ],
        "includes": [
            "8 noches de alojamiento con desayuno",
            "Todas las tasas de alojamiento incluidas",
            "Autobús confortable y moderno",
            "Visitas panorámicas indicadas",
            "Traslados llegada y salida del aeropuerto",
            "Asistencia 24 hrs antes y durante el viaje",
            "Guía durante el recorrido"
        ],
        "excludes": [
            "Vuelos internacionales e internos",
            "Traslados de entrada y salida (en algunas modalidades)",
            "Servicios, excursiones o comidas no especificadas",
            "Seguro de viaje",
            "Bebidas",
            "Gastos extras en hotel (llamadas, lavandería, etc.)",
            "Propinas (maleteros, camaristas, meseros, etc.)",
            "Gastos personales"
        ],
        "terms": [
            "Tarifas por persona en ocupación doble, sujetas a disponibilidad y cambios sin previo aviso.",
            "No aplican si el tipo de cambio USD/MXN supera los $20.25 MXN; pagos al tipo de cambio del día.",
            "El anticipo de $5,000 MXN no es reembolsable.",
            "Las tarifas pueden variar en temporada alta.",
            "Una vez confirmada la reserva, aplican cargos por cambios o cancelaciones.",
            "Es responsabilidad del viajero contar con pasaporte, visas y documentos necesarios.",
            "Traza Travel no se hace responsable por cancelaciones derivadas de fuerza mayor.",
            "Una vez contratado el servicio, las tarifas no aceptan cambios ni reembolsos. Aplican restricciones."
        ],
        "image": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2000&auto=format&fit=crop"
    },
    "japon-samurai": {
        "id": "japon-samurai",
        "name": "Tour Japón, Camino del Samurái con Vuelo",
        "destination": "Tour Japón, Camino del Samurái con Vuelo",
        "country": "Japón",
        "region": "ASIA",
        "priceUnit": 6257104,
        "currency": "MXN",
        "locale": "es-MX",
        "emoji": "🎌",
        "flightIncluded": true,
        "description": "Siga la ruta del Samurái desde Tokio hasta los santuarios de Hiroshima y los mercados de Osaka. 12 días en tren bala atravesando la tierra de los cerezos en flor, con vuelos internacionales desde la CDMX.",
        "travelDates": "Salidas selectas: Mar – May 2027",
        "nights": 11,
        "itinerary": [
            "Día 1. México – Tokio: Cita en el aeropuerto CDMX para abordar vuelo a Narita. Noche a bordo.",
            "Día 2. Tiempo de Vuelo: En tránsito.",
            "Día 3. Tokio – Hiroshima: Llegada al aeropuerto Internacional de Narita. Traslado al centro de Tokio, visita panorámica: Santuario de Meiji, barrio de Harajuku, avenida Omotesando. Traslado a estación de tren para abordar tren bala a Hiroshima. Alojamiento.",
            "Día 4. Hiroshima: Desayuno. Día libre. Excursión opcional \"HIROSHIMA\": Parque Conmemorativo de la Paz, Cúpula de la Bomba Atómica, Museo de la Paz. Excursión en ferri a Isla Miyajima con Santuario Itsukushima y puerta sagrada Torii.",
            "Día 5. Hiroshima – Osaka: Desayuno. Tour por Osaka: Castillo de Osaka (siglo XVI). Excursión opcional \"OSAKA CON METRO\": zona Shinsaibashi, paseo en barco por el canal Dotonbori, degustación de Takoyaki.",
            "Día 6. Osaka: Desayuno. Día libre. Excursión opcional \"KIOTO\": Templo Kinkaku-ji (Pabellón Dorado, Patrimonio UNESCO), Arashiyama, bosque de bambú, Santuario Fushimi Inari, Templo Kiyomizudera.",
            "Día 7. Osaka: Desayuno. Día libre. Excursión opcional \"NARA, KOBE Y CASTILLO HIMEJI\": Templo Todai-ji (Gran Buda de Nara), Parque de Nara (ciervos), Kobe Harborland Umie, Castillo de Himeji.",
            "Día 8. Osaka: Desayuno. Día libre. Excursión opcional \"WAKAYAMA\": formación Senjojiki, Kuroshio Market (show de corte de atún), Fábrica de Cerveza Umeshu con experiencia práctica.",
            "Día 9. Osaka – Tokio: Desayuno. Traslado a estación para tomar tren bala a Tokio. Tour panorámico: barrio de Asakusa (puerta Kaminarimon, calle Nakamise, Templo Sensoji, Santuario Asakusa), cruce de Shibuya, estatua de Hachiko. Opcional: \"TOKIO CON METRO\" (Ginza, Harajuku, Shinjuku).",
            "Día 10. Tokio: Desayuno. Día libre. Excursión opcional \"KAMAKURA Y YOKOHAMA\": Templo Kotoku (Gran Buda de Kamakura), Tsurugaoka Hachimangu, calle Komachi-dori, Chinatown de Yokohama, distrito de Motomachi.",
            "Día 11. Tokio: Desayuno. Día libre. Excursión opcional \"MONTE FUJI, OSHINO HAKKAI Y GOTEMBA PREMIUM OUTLET\": Monte Fuji (3,776 m), Pueblo Oshino Hakkai (Patrimonio Mundial), Gotemba Premium Outlet.",
            "Día 12. Tokio – México: Desayuno. Traslado al aeropuerto para vuelo de regreso a la CDMX."
        ],
        "includes": [
            "Vuelos internacionales (México – Japón – México)",
            "Alojamiento y desayuno",
            "Transporte en autobús con guía",
            "Traslados indicados (incluye traslados en tren bala)",
            "Visitas panorámicas indicadas en el itinerario",
            "Guía de habla hispana"
        ],
        "excludes": [
            "Seguro de viaje",
            "Actividades opcionales",
            "Bebidas",
            "Gastos extras en hotel (llamadas, lavandería, etc.)",
            "Propinas (maleteros, camaristas, meseros, etc.)",
            "Gastos personales"
        ],
        "terms": [
            "Tarifas por persona en ocupación doble, sujetas a disponibilidad y cambios sin previo aviso.",
            "No aplican si el tipo de cambio USD/MXN supera los $20.25 MXN; pagos al tipo de cambio del día.",
            "El anticipo de $5,000 MXN no es reembolsable.",
            "Las tarifas pueden variar en temporada alta.",
            "Una vez confirmada la reserva, aplican cargos por cambios o cancelaciones.",
            "Es responsabilidad del viajero contar con pasaporte vigente (mínimo 6 meses), visas y documentos.",
            "Traza Travel no se hace responsable por cancelaciones derivadas de fuerza mayor.",
            "Una vez contratado el servicio, las tarifas no aceptan cambios ni reembolsos. Aplican restricciones."
        ],
        "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop"
    },
    "japon-vuelo": {
        "id": "japon-vuelo",
        "name": "Tour Japón con Vuelo",
        "destination": "Tour Japón con Vuelo",
        "country": "Japón",
        "region": "ASIA",
        "priceUnit": 5240105,
        "currency": "MXN",
        "locale": "es-MX",
        "emoji": "🎌",
        "flightIncluded": true,
        "description": "Tokio, Kioto y Nara en 8 días de inmersión cultural profunda: templos milenarios, geishas en el barrio Gion y el tren bala Nozomi incluido. Vuelo directo desde México con guía de habla hispana.",
        "travelDates": "Próxima salida: Otoño 2027",
        "nights": 7,
        "itinerary": [
            "Día 1. México – Narita: Cita en el aeropuerto CDMX para abordar vuelo a Narita. Noche a bordo.",
            "Día 2. Narita – Tokio: Llegada al aeropuerto de Narita. Recepción por guía de habla hispana. Visitas con audífonos:\n  - Barrio de Asakusa: Templo budista Sensoji (628 d.C., el más antiguo de Tokio), arcada comercial de 250 m.\n  - Barrio de Shibuya: centros comerciales, cruce de Shibuya, estatua de Hachiko.\n  - Santuario Meiji (siglo XX, dedicado al Emperador Meiji y la Emperatriz Shoken), bosque de 100 mil árboles.\n  - Barrio Harajuku: calle Takeshita Dori, tiendas de moda juvenil.",
            "Día 3. Tokio: Desayuno. Día libre. Excursión opcional a KAMAKURA: Templo Hase Kannon (estatua budista de madera más grande de Japón, 9.18 m), Gran Buda del Bronce (13.35 m, Templo Kotoku-In), Santuario Tsuruoka Hachimangu, calle Komachi.",
            "Día 4. Tokio – Kioto: Temprano reunión para abordar tren bala Nozomi a Kioto. Visitas con audífonos:\n  - Templo Todaji (siglo VIII, templo de madera más grande del mundo, estatua de Buda de 15 m), Parque Nacional de Nara con más de mil ciervos.\n  - Santuario Fushimi Inari (siglo VIII, miles de puertas Torii rojas en 4 km de camino).\n  (Nota: los pasajeros dejan maletas grandes en hotel de Tokio y viajan con equipaje de mano).",
            "Día 5. Kioto: Día libre. Excursión opcional 1 \"MEDIO DÍA DE KIOTO\": Pabellón Dorado Kinkakuji, Templo Kiyomizu (vistas panorámicas), Barrio Gion (barrio de geishas, casas de madera, ambiente tradicional). Excursión opcional 2 a OSAKA: Castillo de Osaka, Barrio Shinsekai, distrito Dotonbori.",
            "Día 6. Kioto: Día libre. Excursión opcional 1 \"HIROSHIMA\": Parque Conmemorativo de la Paz, Cúpula de la Bomba Atómica, Museo de la Paz, Isla Miyajima con Santuario Itsukushima (en restauración sin fecha de finalización).",
            "Día 7. Kioto – Tokio: Reunión temprana para abordar tren bala Nozomi a Tokio. Traslado al hotel. (Maletas grandes transportadas aparte).",
            "Día 8. Tokio – Narita – México: Desayuno. Traslado al aeropuerto de Narita para vuelo de regreso a la CDMX."
        ],
        "includes": [
            "Vuelos internacionales (México – Japón – México)",
            "Boleto de tren bala clase turista (Tokio – Kioto – Tokio)",
            "Alojamiento y desayuno",
            "Autocar con aire acondicionado",
            "Traslados indicados",
            "Guías de habla hispana con audífonos durante las visitas",
            "Visitas indicadas en el itinerario"
        ],
        "excludes": [
            "Seguro de viaje",
            "Actividades opcionales",
            "Fee de cámaras en los monumentos",
            "Bebidas",
            "Gastos extras en hotel (llamadas, lavandería, etc.)",
            "Propinas (maleteros, camaristas, meseros, etc.)",
            "Gastos personales"
        ],
        "terms": [
            "Tarifas cotizadas en base doble, sujetas a disponibilidad y suplementos de temporada alta.",
            "Precios en MXN al tipo de cambio del día; no aplican si USD/MXN supera los $20.25 MXN.",
            "El anticipo de $5,000 MXN no es reembolsable.",
            "Una vez confirmada la reserva, aplican cargos por cambios o cancelaciones.",
            "Es responsabilidad del viajero contar con pasaporte vigente, visas y documentos necesarios.",
            "Traza Travel no se hace responsable por cancelaciones derivadas de fuerza mayor.",
            "Una vez contratado el servicio, las tarifas no aceptan cambios ni reembolsos. Aplican restricciones."
        ],
        "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop"
    },
    "mejor-china": {
        "id": "mejor-china",
        "name": "Tour Lo Mejor de China",
        "destination": "Tour Lo Mejor de China",
        "country": "China",
        "region": "ASIA",
        "priceUnit": 3581143,
        "currency": "MXN",
        "locale": "es-MX",
        "emoji": "🐉",
        "flightIncluded": false,
        "description": "Desde la Ciudad Prohibida de Beijing hasta la magia de Shanghái Disney: 9 días frente a la Gran Muralla, los Guerreros de Terracota y los jardines imperiales de Xi'an. China colosal, al alcance.",
        "travelDates": "Salidas disponibles: Oct – Nov 2027",
        "nights": 8,
        "itinerary": [
            "Día 1. Beijing: Llegada al aeropuerto de Beijing. Traslado al hotel. Descanso o exploración libre de la ciudad.",
            "Día 2. Beijing: Desayuno. Visitas: Plaza Tian An Men, Ciudad Prohibida (Palacio Imperial), Templo del Cielo (1420, 267 hectáreas), Casa del Té Chino. Almuerzo incluido (Pato Laqueado). Masaje de pies.",
            "Día 3. Beijing: Desayuno. Visita a la Gran Muralla China. Almuerzo incluido. Tarde: Palacio de Verano (Dinastía Qing), Taller de Perlas, Parque Olímpico (exterior del Nido de Pájaro y Cubo de Agua, sin entrada a estadios).",
            "Día 4. Beijing – Xi'an (Tren de alta velocidad): Traslado a estación para tomar tren de alta velocidad a Xi'an (ciudad de más de 3,000 años, capital de 11 dinastías, punto de partida de la Ruta de la Seda). Tarde libre en Xi'an. (Excursión opcional Travel Shop Pack: Beijing – Luoyang – Xi'an, con visita a Grutas de Longmen, Patrimonio UNESCO, más de 100,000 estatuas de Buda).",
            "Día 5. Xi'an: Desayuno. Visita a la Tumba del Emperador Qin Shi Huangdi: Guerreros y Corceles de Terracota (6,000 figuras a tamaño natural, +2,000 años de antigüedad). Taller de Terracota. Almuerzo incluido. Tarde: Plaza de la Gran Pagoda de la Oca Salvaje, Antigua Muralla (exterior), Barrio Musulmán. Opcional nocturno: Show Cultural de la Dinastía Tang (Travel Shop Pack).",
            "Día 6. Xi'an – Shanghái: Desayuno. Traslado al aeropuerto para vuelo a Shanghái (incluido en el paquete). Llegada y traslado al hotel.",
            "Día 7. Shanghái: Desayuno. Tour completo: Jardín Yuyuan, Barrio Antiguo Cheng Huang Miao, Templo del Buda de Jade, Calle Nanjing, Malecón (The Bund), Tienda de la Seda. Almuerzo incluido. Opcional nocturno: crucero por el río Huangpu (Travel Shop Pack).",
            "Día 8. Shanghái (Disney): Desayuno. Entrada al parque Shanghai Disney Resort incluida (ticket de 1 día). Traslados por cuenta propia (o con Travel Shop Pack para traslado con guía en español).",
            "Día 9. Shanghái: Desayuno. Traslado al aeropuerto. Fin de servicios."
        ],
        "includes": [
            "Vuelo en clase turista Xi'an – Shanghái (1 maleta documentada de 20 kg)",
            "Tren de alta velocidad en segunda clase Beijing – Xi'an",
            "Masaje de pies en Beijing",
            "Ticket de entrada 1 día para Shanghai Disney Resort (sin traslados)",
            "Visitas con guías locales de habla hispana en servicio compartido",
            "9 desayunos y 4 almuerzos en restaurante local",
            "8 noches de alojamiento con desayuno",
            "Traslados aeropuerto – hotel – aeropuerto"
        ],
        "excludes": [
            "Vuelo internacional de origen/destino",
            "Visitas y/o alimentos no indicados en el itinerario",
            "Trámite de visa o pasaporte (se requiere visa china para ciudadanos mexicanos)",
            "Servicios, excursiones o comidas no especificadas",
            "Actividades opcionales",
            "Bebidas",
            "Gastos extras en hotel (llamadas, lavandería, etc.)",
            "Propinas: guía local 4 USD/día, chofer 2 USD/día, masajista de pies 4 USD/vez",
            "Gastos personales"
        ],
        "terms": [
            "Tarifas por persona en ocupación doble, sujetas a disponibilidad y cambios sin previo aviso.",
            "No aplican si el tipo de cambio USD/MXN supera los $20.25 MXN; pagos al tipo de cambio del día.",
            "El anticipo de $5,000 MXN no es reembolsable.",
            "Las tarifas pueden variar en temporada alta.",
            "Habitación triple: cama doble + cama extra plegable o sofá cama (no cómoda ni grande).",
            "Habitación doble: una cama matrimonial.",
            "Habitación no fumadora y habitación comunicada/vecina sujetas a disponibilidad, no garantizadas.",
            "No hay habitación cuádruple.",
            "Check-in después de las 14:00 hrs; check-out antes de las 12:00 hrs.",
            "Los hoteles solicitan depósito de garantía al hacer check-in (por consumos internos).",
            "Una vez confirmada la reserva, aplican cargos por cambios o cancelaciones.",
            "Es responsabilidad del viajero contar con pasaporte vigente, visas y documentos necesarios.",
            "Traza Travel no se hace responsable por cancelaciones derivadas de fuerza mayor.",
            "Una vez contratado el servicio, las tarifas no aceptan cambios ni reembolsos. Aplican restricciones."
        ],
        "image": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2000&auto=format&fit=crop"
    },
    "turquia-vuelo": {
        "id": "turquia-vuelo",
        "name": "Tour Turquía con Vuelo 2026",
        "destination": "Tour Turquía con Vuelo 2026",
        "country": "Turquía",
        "region": "ASIA",
        "priceUnit": 3603686,
        "currency": "MXN",
        "locale": "es-MX",
        "emoji": "🕌",
        "flightIncluded": true,
        "description": "De Estambul al Bósforo, Capadocia y las terrazas termales de Pamukkale: 13 días entre dos continentes con vuelo redondo incluido. Vuele a la encrucijada del mundo donde Oriente y Occidente se fusionan.",
        "travelDates": "Salidas selectas: Mar – Nov 2027",
        "nights": 12,
        "itinerary": [
            "Día 1. México – Estambul: Cita en el aeropuerto CDMX para vuelo a Estambul (escala en Cancún). Noche a bordo.",
            "Día 2. Estambul: Llegada. Asistente de habla hispana en aeropuerto. Tiempo libre hasta check-in.",
            "Día 3. Estambul: Desayuno. Día libre. Excursión opcional \"TOUR POR EL BÓSFORO\" (con almuerzo en restaurante típico): colina de Pierre Loti y vista del Cuerno de Oro, Catedral de San Jorge (Patriarcado Ecuménico), Mezquita de Solimán El Magnífico (diseñada por Mimar Sinan, cúpula más grande de Estambul), Bazar de las Especias. Tarde: crucero por el Bósforo (estrecho entre Europa y Asia), fortalezas otomanas, palacios, villas y puentes.",
            "Día 4. Estambul: Desayuno. Día libre. Excursión opcional \"JOYAS DE CONSTANTINOPLA\" (con almuerzo típico): Hipódromo Romano, Obelisco de Teodosio, Obelisco de Constantino, fuente Alemana; Mezquita Azul (más de 20,000 azulejos de cerámica de Iznik); vista panorámica de Santa Sofía (entrada no incluida); Palacio Topkapi (jardines, cocinas, tesoros, Harén); Iglesia de Aya Irini; Gran Bazar.",
            "Día 5. Estambul – Ankara – Capadocia: Desayuno. Salida en autobús a Ankara. Visita a la capital y al Mausoleo de Atatürk. Llegada a Capadocia: visita a ciudad subterránea. Cena y alojamiento.",
            "Día 6. Capadocia: Desayuno. Visita a la región volcánica: Museo a Cielo Abierto de Göreme (monasterio con capillas excavadas en roca, frescos del siglo XIII), valles de paisaje lunar, \"Chimeneas de Hada\", Vista Panorámica del Valle de las Palomas. Visita a centro de joyas y fábrica de alfombras. Cena y alojamiento. Opcionales: Paseo en Globo al amanecer; Safari 4x4.",
            "Día 7. Capadocia – Pamukkale: Desayuno. Salida a Pamukkale: visita a Hierápolis (antigua) y \"Castillo de Algodón\" (terrazas de travertino con piscinas naturales termales). Cena y alojamiento.",
            "Día 8. Pamukkale – Selçuk – Kusadasi: Desayuno. Visita a la Casa de María (7 km de Selçuk, última morada de la madre de Jesús). Visita panorámica de Selçuk: castillo otomano, Basílica de San Juan, Templo de Artemisa. Showroom de piezas de cuero. Excursión opcional a ÉFESO: teatro romano (25,000 espectadores), Biblioteca de Celso, Calle de Mármol.",
            "Día 9. Kusadasi: Desayuno. Día libre. Excursión opcional \"ISLA GRIEGA CHIOS\": traslado a puerto de Cesme, trayecto a la isla de Chíos (producción de mastica, ciudad de Mesta, Pyrgi, playa volcánica de Mavra Volia Empoios), regreso a Cesme.",
            "Día 10. Kusadasi – Bursa – Estambul: Desayuno. Salida a Bursa: visita panorámica de la primera capital del Imperio Otomano, Mezquita Ulu Camii. Paseo por el mercado de la seda (antigüedades, sedas, perfumes, pashminas). Continuación a Estambul. Alojamiento.",
            "Día 11. Estambul: Desayuno. Día libre.",
            "Día 12. Estambul: Desayuno. Día libre. Check-out a las 12:00 hrs. Traslado nocturno al aeropuerto.",
            "Día 13. Estambul – México: Abordaje del vuelo de regreso a la CDMX.\n\n(Nota: salidas del 19 de septiembre y 21 de noviembre serán de 11 días y 9 noches. El itinerario puede sufrir modificaciones por condiciones de carreteras, clima u otros factores.)"
        ],
        "includes": [
            "Boleto de avión redondo México – Estambul – México, en clase turista",
            "5 noches de alojamiento en Estambul",
            "2 noches de alojamiento en Capadocia",
            "1 noche de alojamiento en Pamukkale",
            "2 noches de alojamiento en Kusadasi",
            "Autocar con aire acondicionado",
            "Guías de habla hispana",
            "Traslados indicados",
            "Régimen alimenticio indicado en el itinerario (incluye cenas en Capadocia y Pamukkale)"
        ],
        "excludes": [
            "Visa de Turquía",
            "Impuesto hotelero en Turquía: 15 USD por persona (se paga directo en destino)",
            "Tasas de servicio en Turquía: 45 USD por persona (se paga directo en destino)",
            "Impuestos aéreos por persona",
            "Bebidas",
            "Gastos extras en hotel (llamadas, lavandería, etc.)",
            "Propinas (maleteros, camaristas, meseros, etc.)",
            "Gastos personales"
        ],
        "terms": [
            "Tarifas por persona en ocupación doble, sujetas a disponibilidad y cambios sin previo aviso.",
            "No aplican si el tipo de cambio USD/MXN supera los $20.25 MXN; pagos al tipo de cambio del día.",
            "El anticipo de $5,000 MXN no es reembolsable.",
            "Las tarifas pueden variar en temporada alta.",
            "Una vez confirmada la reserva, aplican cargos por cambios o cancelaciones.",
            "Es responsabilidad del viajero contar con pasaporte vigente (mínimo 6 meses), visas y documentos necesarios.",
            "Traza Travel no se hace responsable por cancelaciones derivadas de fuerza mayor.",
            "Una vez contratado el servicio, las tarifas no aceptan cambios ni reembolsos. Aplican restricciones."
        ],
        "image": "https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=2000&auto=format&fit=crop"
    },
    "turquia-clasico": {
        "id": "turquia-clasico",
        "name": "Tour Turquía Clásico Libre",
        "destination": "Tour Turquía Clásico Libre",
        "country": "Turquía",
        "region": "ASIA",
        "priceUnit": 970631,
        "currency": "MXN",
        "locale": "es-MX",
        "emoji": "🕌",
        "flightIncluded": false,
        "description": "Estambul, Capadocia, Éfeso y la Casa de la Virgen María en 10 días de absoluta libertad: piscinas termales de Pamukkale y el mercado de la seda de Bursa. Turquía profunda a su propio ritmo.",
        "travelDates": "Disponibilidad: May – Oct 2027",
        "nights": 9,
        "itinerary": [
            "Día 1. Ciudad de Origen – Estambul: Llegada a Estambul. Recepción por asistente de habla hispana. Traslado al hotel. Día libre.",
            "Día 2. Estambul: Desayuno. Excursión panorámica por el casco antiguo: murallas del siglo V, vista del Bósforo, Dolmabahçe, Estadio Beşiktaş, Taksim, Şişhane y Eminonü. Excursión opcional \"Bósforo con almuerzo\": colina de Pierre Loti (vista del Cuerno de Oro), Mezquita de Süleymaniye (Mimar Sinan, 1551-1557), crucero por el Bósforo, Ortaköy, Mezquita Mecidiye, puentes intercontinentales; Bazar Egipcio (especias, frutos secos, dulces, té).",
            "Día 3. Estambul – Ankara – Capadocia: Desayuno. Salida a Ankara. Tour panorámico de la capital con parada en el Mausoleo de Atatürk. Continuación a Capadocia. Alojamiento.",
            "Día 4. Capadocia: Desayuno. Visitas: Ciudad subterránea de Ozkonak (protección cristiana vs. romanos), Museo Abierto de Göreme (capillas excavadas, frescos del siglo X, imagen de San Jorge), Avanos (cooperativa de alfombras hechas a mano). Joyería con piedras de la región. Opcionales: Jeep Safari por los valles; Noche Turca con barra libre (danzas folclóricas y danza del vientre); Paseo en Globo.",
            "Día 5. Capadocia: Desayuno. Visita a los valles de Avcilar y Guvercinlik: \"Chimeneas de Hada\", pueblo troglodita de Uchisar, cooperativa de cerámica. Opcionales de temporada: Cappa Park (15 abr – 30 sep): Monster Safari en Jeep 4x4, ZipLine, Jet Boat; Erciyes SKI (15 dic – 31 mar); SkyDinner (almuerzo/cena en el cielo de Capadocia).",
            "Día 6. Capadocia – Pamukkale: Desayuno. Salida a Pamukkale. Parada en tienda outlet de prendas típicas. Visita a las ruinas de Hierápolis y el \"Castillo de Algodón\" (terrazas calcáreas de travertino con piscinas termales naturales). Alojamiento.",
            "Día 7. Pamukkale – Éfeso – Esmirna: Desayuno. Visita a las ruinas de Éfeso (ciudad greco-latina mejor conservada de Turquía): Biblioteca de Celso, Calle de Mármol, Teatro para 25,000 personas. Visita a la Casa de la Virgen María (7 km de Selçuk). Outlet de pieles de alta calidad. Alojamiento.",
            "Día 8. Esmirna – Bursa – Estambul: Desayuno. Salida a Bursa. Parada en tienda de \"Turkish Delight\". Visita panorámica de Bursa (antigua capital Otomana): Mausoleo Verde y Mezquita Verde (Sultan Mehmed I, azulejos de Iznik verde y turquesa). Mercado de la seda (antigüedades, sedas, perfumes, pashminas). Continuación a Estambul. Alojamiento.",
            "Día 9. Estambul: Desayuno. Día libre. Excursión opcional \"Paseo Estambul Clásico con almuerzo\": Palacio de Topkapı (diamante Kasikci de 86 quilates), Basílica de Santa Sofía, Hipódromo Romano, Mezquita Azul (azulejos de Iznik), Gran Bazar.",
            "Día 10. Estambul: Desayuno. Traslado al aeropuerto para vuelo de regreso."
        ],
        "includes": [
            "Alojamiento y desayuno (9 noches)",
            "5 cenas en hoteles del circuito (excepto Estambul)",
            "Impuestos hoteleros",
            "Transporte en autobús con guía",
            "Traslados con asistente de habla hispana (llegada y salida)",
            "Guía autorizado de habla hispana o portuguesa",
            "Wi-Fi en el autobús durante todo el recorrido",
            "Todas las visitas indicadas del itinerario",
            "Botella de agua (0.5 l) por persona por día en el vehículo"
        ],
        "excludes": [
            "Vuelos internacionales e internos",
            "Tasas de servicio en Turquía: 45-50 USD por persona (se paga en destino)",
            "Excursiones opcionales",
            "Bebidas no incluidas en las comidas",
            "Seguro de asistencia",
            "Exceso de equipaje",
            "Bebidas (adicionales)",
            "Propinas (maleteros, camaristas, meseros, etc.)",
            "Gastos personales"
        ],
        "terms": [
            "Tarifas por persona en ocupación doble, sujetas a disponibilidad y cambios sin previo aviso.",
            "No aplican si el tipo de cambio USD/MXN supera los $20.25 MXN; pagos al tipo de cambio del día.",
            "El anticipo de $5,000 MXN no es reembolsable.",
            "Las tarifas pueden variar en temporada alta.",
            "Una vez confirmada la reserva, aplican cargos por cambios o cancelaciones.",
            "Es responsabilidad del viajero contar con pasaporte, visas y documentos necesarios.",
            "Traza Travel no se hace responsable por cancelaciones derivadas de fuerza mayor.",
            "Una vez contratado el servicio, las tarifas no aceptan cambios ni reembolsos. Aplican restricciones."
        ],
        "image": "https://images.unsplash.com/photo-1647413491410-67c0cd385e05?q=80&w=2000&auto=format&fit=crop"
    },
    "egipto-clasico": {
        "id": "egipto-clasico",
        "name": "Tour Egipto Clásico con Crucero en el Nilo",
        "destination": "Tour Egipto Clásico con Crucero en el Nilo",
        "country": "Egipto",
        "region": "AFRICA",
        "priceUnit": 1970979,
        "currency": "MXN",
        "locale": "es-MX",
        "emoji": "🐪",
        "flightIncluded": false,
        "description": "Navegue por el Nilo y descubra los secretos de Luxor y Aswan: pirámides de Guiza, el Valle de los Reyes y los colosos de Memnón en un solo crucero de 7 días. El faraón lo espera.",
        "travelDates": "Salidas: Ene, Feb, Nov 2027",
        "nights": 6,
        "itinerary": [
            "Día 1. El Cairo: Llegada al aeropuerto de El Cairo. Asistencia y traslado al hotel. Tiempo libre en El Cairo (\"Madre del Mundo\"), a orillas del Nilo.",
            "Día 2. El Cairo (Pirámides): Desayuno. Visita al recinto arqueológico de las Pirámides de Guiza (Keops, Kefrén y Mikerinos, ~4,500 años de antigüedad) y la Gran Esfinge. (Nota: entrada al interior de las pirámides no incluida). Tiempo libre para fotografías. Museo del Papiro (elaboración artesanal y significado de grabados). Almuerzo incluido en restaurante local. Tarde: excursión opcional al Museo Egipcio de El Cairo (EMC, más de 170,000 piezas), Ciudadela de Saladino (vista panorámica), Mezquita de Mehmet Alí Pasha (Mezquita de Alabastro).",
            "Día 3. El Cairo – Aswan (Obelisco Inacabado – Presa de Aswan): Desayuno. Traslado al aeropuerto para vuelo a Aswan. Llegada y traslado al barco (embarque y acomodación). Visita a antigua cantera de granito con Obelisco Inacabado (40 m de largo, +1,000 toneladas). Visita a la Presa de Aswan (control de inundaciones, energía eléctrica, origen del lago Nasser, >500 km de longitud). Opcional: paseo en faluca por el Nilo hasta Templo de Philae (dedicado a la diosa Isis). Pensión completa a bordo.",
            "Día 4. Aswan – Kom Ombo – Edfu (Templo Kom Ombo): Pensión completa a bordo. Opcional: excursión en autocar al Templo de Abu Simbel (Ramsés II; trasladado 65 m arriba y 210 m de su ubicación original por la UNESCO para salvarlo del Lago Nasser; cuatro colosos de 20 m; Templo de Hathor para Nefertari). Navegación a Kom Ombo: visita al Templo de Kom Ombo (dedicado a los dioses Sobek y Haroeris, templo simétrico con dos entradas, dos salas hipóstilas y dos santuarios; Museo del Cocodrilo con restos arqueológicos del culto al cocodrilo). Navegación a Edfu. Alojamiento a bordo.",
            "Día 5. Edfu – Esna – Luxor (Templo Edfu): Pensión completa a bordo. Visita al Templo de Horus en Edfu (estado de conservación magnífico por su ubicación elevada). Cruce de la esclusa de Esna (desnivel de +10 m). Navegación a Luxor. Alojamiento a bordo.",
            "Día 6. Luxor (Valle de los Reyes – Colosos de Memnón – Templo de Hatsepsut) – El Cairo: Desayuno. Desembarque. Visita al Valle de los Reyes (necrópolis en la orilla occidental del Nilo, faraones del Imperio Nuevo; explicación del guía en exterior de las tumbas; no incluye Tumba de Tutankamón). Colosos de Memnón (dos estatuas de piedra de 18 m y 1,300 toneladas cada una, 3,400 años de antigüedad). Templo de la Reina Hatsepsut (templo funerario en tres niveles, incrustado en la montaña). Traslado al aeropuerto de Luxor. Vuelo a El Cairo. Llegada y traslado al hotel. Alojamiento.",
            "Día 7. El Cairo: Desayuno. Tiempo libre hasta traslado al aeropuerto. Fin de servicios."
        ],
        "includes": [
            "Tickets aéreos internos El Cairo – Luxor / Aswan – El Cairo en clase turista",
            "3 noches de alojamiento en hoteles indicados + 3 noches a bordo del crucero por el Nilo",
            "Pensión completa a bordo del crucero",
            "Desayunos en hotel (días 2 y 7)",
            "Almuerzo incluido en El Cairo (día 2)",
            "Seguro de viaje",
            "Guía acompañante de habla hispana durante el crucero por el Nilo",
            "Guía acompañante de habla hispana durante el recorrido terrestre",
            "Asistencia a llegada y salida en aeropuerto por personal de habla hispana",
            "Traslados llegada y salida del aeropuerto",
            "Paseo en calesa para visitar el Templo de Horus en Edfu",
            "Visitas indicadas en el itinerario (Presa de Aswan, Obelisco Inacabado, Templo de Kom Ombo, Valle de los Reyes, Colosos de Memnón, Templo de Hatsepsut)",
            "Servicio de asistencia telefónica 24 horas",
            "Tour exclusivo clientes Special Tours"
        ],
        "excludes": [
            "Vuelo internacional de origen/destino",
            "Entrada al interior de las Pirámides de Guiza",
            "Tumba de Tutankamón (en el Valle de los Reyes)",
            "Visita a los Templos de Abu Simbel",
            "Tasas hoteleras",
            "Visado",
            "Bebidas",
            "Propinas (maleteros, camaristas, meseros, etc.)",
            "Ningún servicio no especificado en el apartado \"Incluye\""
        ],
        "terms": [
            "Tarifas por persona en ocupación doble, sujetas a disponibilidad y cambios sin previo aviso.",
            "No aplican si el tipo de cambio USD/MXN supera los $20.25 MXN; pagos al tipo de cambio del día.",
            "El anticipo de $5,000 MXN no es reembolsable.",
            "Las tarifas pueden variar en temporada alta.",
            "Una vez confirmada la reserva, aplican cargos por cambios o cancelaciones.",
            "Modificación de fecha posible con posible cargo adicional.",
            "Es responsabilidad del viajero contar con pasaporte vigente (mínimo 6 meses), visas y documentos necesarios.",
            "Traza Travel no se hace responsable por cancelaciones derivadas de fuerza mayor (desastres naturales, guerras, cierres de fronteras, epidemias, quiebras, huelgas, conflictos bélicos/políticos).",
            "Una vez contratado el servicio, las tarifas no aceptan cambios ni reembolsos. Aplican restricciones."
        ],
        "image": "https://images.unsplash.com/photo-1539650116574-8efeb43e2b08?q=80&w=2000&auto=format&fit=crop"
    }
};

export function getTripById(id: string): Trip | null {
    return TRIPS_CATALOGUE[id] ?? null;
}
