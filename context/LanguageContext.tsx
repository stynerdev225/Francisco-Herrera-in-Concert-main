"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "es";

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
    translations: Record<string, Record<Language, string>>;
}

// Basic translations map
const translations: Record<string, Record<Language, string>> = {
    // Navigation with simple keys (to fix warnings)
    "home": {
        en: "Home",
        es: "Inicio",
    },
    "music": {
        en: "Music",
        es: "Música",
    },
    "buy tickets": {
        en: "Buy Tickets",
        es: "Comprar Boletos",
    },
    "contact": {
        en: "Contact",
        es: "Contacto",
    },

    // Navigation with prefixed keys
    "nav.home": {
        en: "Home",
        es: "Inicio",
    },
    "nav.about": {
        en: "About",
        es: "Sobre",
    },
    "nav.music": {
        en: "Music",
        es: "Música",
    },
    "nav.events": {
        en: "Events",
        es: "Eventos",
    },
    "nav.contact": {
        en: "Contact",
        es: "Contacto",
    },
    "nav.toggleMenu": {
        en: "Toggle Menu",
        es: "Alternar Menú",
    },
    "nav.concert": {
        en: "Francisco Herrera in Concert",
        es: "Francisco Herrera en Concierto",
    },

    // Ticket section
    "tickets.title": {
        en: "Francisco Herrera in Concert",
        es: "Francisco Herrera en Concierto",
    },
    "tickets.subtitle": {
        en: "La Migración Fortaleza la Nación / Migration Strengthens the Nation",
        es: "La Migración Fortaleza la Nación / Migration Strengthens the Nation",
    },
    "tickets.venue": {
        en: "Venue",
        es: "Lugar",
    },
    "tickets.date": {
        en: "Date",
        es: "Fecha",
    },
    "tickets.time": {
        en: "Time",
        es: "Hora",
    },
    "tickets.description": {
        en: "Event Description",
        es: "Descripción del Evento",
    },
    "tickets.standard": {
        en: "Standard Admission",
        es: "Entrada Estándar",
    },
    "tickets.premium": {
        en: "Premium Package",
        es: "Paquete Premium",
    },
    "tickets.remaining": {
        en: "Limited tickets remaining",
        es: "Quedan boletos limitados",
    },
    "tickets.selling": {
        en: "Selling fast",
        es: "Vendiéndose rápido",
    },
    "tickets.few": {
        en: "Few tickets left",
        es: "Pocos boletos restantes",
    },
    "tickets.note": {
        en: "Tickets will also be available at the door, but we recommend securing yours now as this event may sell out.",
        es: "Los boletos también estarán disponibles en la puerta, pero recomendamos asegurar el suyo ahora ya que este evento puede agotarse.",
    },
    "tickets.buyNow": {
        en: "BUY TICKETS NOW",
        es: "COMPRAR BOLETOS AHORA",
    },
    "tickets.featured": {
        en: "Featured Artists",
        es: "Artistas Destacados",
    },
    "tickets.mc": {
        en: "MC",
        es: "MC",
    },
    "tickets.opening": {
        en: "Opening act",
        es: "Acto de apertura",
    },
    "tickets.production": {
        en: "Production",
        es: "Producción",
    },
    "tickets.producedBy": {
        en: "Produced by",
        es: "Producido por",
    },
    "tickets.producer": {
        en: "Producer",
        es: "Productor",
    },
    "tickets.priceNote": {
        en: "Ticket prices include all fees",
        es: "Los precios de los boletos incluyen todas las tarifas",
    },
    "tickets.doorOpen": {
        en: "Doors Open at 6pm",
        es: "Puertas abren a las 6pm",
    },
    "tickets.runTime": {
        en: "Run time: 2 Hours",
        es: "Duración: 2 Horas",
    },
    "tickets.reserved": {
        en: "Reserved Seating",
        es: "Asientos Reservados",
    },
    "tickets.venue.name": {
        en: "Francisco Herrera Concert Venue",
        es: "Lugar del Concierto de Francisco Herrera",
    },
    "tickets.generalSeating": {
        en: "General seating, full access to all performances",
        es: "Asientos generales, acceso completo a todas las presentaciones",
    },
    "tickets.prioritySeating": {
        en: "Priority seating, exclusive meet & greet after the show",
        es: "Asientos prioritarios, encuentro exclusivo después del espectáculo",
    },

    // Language toggle
    "language.switch": {
        en: "Español",
        es: "English",
    },

    // Reserve buttons
    "reserve.button": {
        en: "RESERVE TICKETS NOW",
        es: "RESERVAR BOLETOS AHORA",
    },
    "reserve.fullButton": {
        en: "RESERVE TICKETS / RESERVAR BOLETOS",
        es: "RESERVAR BOLETOS / RESERVE TICKETS",
    },
    "form.submitError": {
        en: "Please fill in all required fields.",
        es: "Por favor complete todos los campos requeridos.",
    },
    "form.processingMessage": {
        en: "PROCESSING...",
        es: "PROCESANDO...",
    },
    "form.processing": {
        en: "PROCESSING...",
        es: "PROCESANDO...",
    },
    "form.notice": {
        en: "When you submit this form, you'll see a brief processing screen. A new tab may open to process your reservation.",
        es: "Al enviar este formulario, verá una breve pantalla de procesamiento. Es posible que se abra una nueva pestaña para procesar su reserva.",
    },
    "form.firstName": {
        en: "FIRST NAME",
        es: "NOMBRE",
    },
    "form.firstNamePlaceholder": {
        en: "First name",
        es: "Nombre",
    },
    "form.lastName": {
        en: "LAST NAME",
        es: "APELLIDO",
    },
    "form.lastNamePlaceholder": {
        en: "Last name",
        es: "Apellido",
    },
    "form.email": {
        en: "EMAIL",
        es: "CORREO",
    },
    "form.emailPlaceholder": {
        en: "Email address",
        es: "Correo electrónico",
    },
    "form.phone": {
        en: "PHONE",
        es: "TELÉFONO",
    },
    "form.phonePlaceholder": {
        en: "Phone number",
        es: "Número de teléfono",
    },
    "form.message": {
        en: "MESSAGE",
        es: "MENSAJE",
    },
    "form.messagePlaceholder": {
        en: "Message",
        es: "Mensaje",
    },
    "form.requiredFields": {
        en: "* Required fields",
        es: "* Campos obligatorios",
    },
    "form.alternativeMethod": {
        en: "If submission doesn't work, click here to try direct page redirect method",
        es: "Si el envío no funciona, haga clic aquí para probar el método de redirección de página directa",
    },
    "form.successMessage": {
        en: "Thank you! Your reservation has been submitted successfully.",
        es: "¡Gracias! Su reserva ha sido enviada con éxito.",
    },
    "section.title": {
        en: "Music Unites",
        es: "La Música Une",
    },
    "section.subtitle": {
        en: "Reserve your spot",
        es: "Reserve su lugar",
    },
    "section.description": {
        en: "for an unforgettable celebration of music and cultural heritage",
        es: "para una celebración inolvidable de música y patrimonio cultural",
    },

    // About page
    "about.title": {
        en: "About Francisco Herrera",
        es: "Sobre Francisco Herrera",
    },
    "about.subtitle": {
        en: "Musician, Activist, Community Leader",
        es: "Músico, Activista, Líder Comunitario",
    },
    "about.backButton": {
        en: "Back to Home",
        es: "Volver al Inicio",
    },
    "about.intro": {
        en: "Francisco Herrera is a renowned musician and community activist whose music bridges cultures and inspires action for social justice.",
        es: "Francisco Herrera es un reconocido músico y activista comunitario cuya música une culturas e inspira acción por la justicia social.",
    },
    "about.bio": {
        en: "For over three decades, Francisco has used his music to amplify the voices of marginalized communities, particularly focusing on immigration rights and cultural heritage preservation.",
        es: "Durante más de tres décadas, Francisco ha utilizado su música para amplificar las voces de comunidades marginadas, enfocándose especialmente en los derechos de inmigración y la preservación del patrimonio cultural.",
    },
    "about.section1.title": {
        en: "Musical Journey",
        es: "Trayectoria Musical",
    },
    "about.section1.content": {
        en: "Francisco's musical journey spans continents and traditions, blending Latin American folk, contemporary protest songs, and spiritual melodies that speak to the heart of community struggles and triumphs.",
        es: "La trayectoria musical de Francisco abarca continentes y tradiciones, combinando el folclore latinoamericano, canciones contemporáneas de protesta y melodías espirituales que hablan al corazón de las luchas y triunfos comunitarios.",
    },
    "about.section2.title": {
        en: "Community Impact",
        es: "Impacto Comunitario",
    },
    "about.section2.content": {
        en: "Through his performances and activism, Francisco has been at the forefront of movements advocating for immigrant rights, worker justice, and the celebration of cultural diversity in San Francisco and beyond.",
        es: "A través de sus actuaciones y activismo, Francisco ha estado a la vanguardia de movimientos que abogan por los derechos de los inmigrantes, la justicia laboral y la celebración de la diversidad cultural en San Francisco y más allá.",
    },
    "latest.music": {
        en: "LATEST MUSIC",
        es: "MÚSICA RECIENTE",
    },
    "music.listenButton": {
        en: "LISTEN + PURCHASE",
        es: "ESCUCHAR + COMPRAR",
    },
    // Special Guests and Sponsors translations
    "special.guests.title": {
        en: "Special Guests",
        es: "Invitados Especiales",
    },
    "special.guests.subtitle": {
        en: "Join us for an unforgettable concert featuring these talented musicians",
        es: "Únase a nosotros para un concierto inolvidable con estos talentosos músicos",
    },
    "special.guests.featured": {
        en: "Featured Guest",
        es: "Invitado Destacado",
    },
    "special.guests.week": {
        en: "Week",
        es: "Semana",
    },
    "special.guests.joining": {
        en: "Joining",
        es: "Acompaña a",
    },
    "special.guests.forConcert": {
        en: "for this special concert",
        es: "para este concierto especial",
    },
    "special.guests.previous": {
        en: "Previous Guest",
        es: "Invitado Anterior",
    },
    "special.guests.next": {
        en: "Next Guest",
        es: "Siguiente Invitado",
    },
    "special.guests.others": {
        en: "Other Special Guests",
        es: "Otros Invitados Especiales",
    },
    "sponsors.title": {
        en: "Weekly Sponsors",
        es: "Patrocinadores",
    },
    "sponsors.subtitle": {
        en: "We thank our sponsors for their generous support",
        es: "Agradecemos a nuestros patrocinadores por su generoso apoyo",
    },
    "sponsors.permanent": {
        en: "Permanent Sponsor",
        es: "Patrocinador Permanente",
    },
    "music.player": {
        en: "Play Music",
        es: "Reproducir Música",
    },
    "music.player.pause": {
        en: "Pause Music",
        es: "Pausar Música",
    },
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setLanguage: () => { },
    t: (key: string) => key,
    translations,
});

// Hook for components to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Provider component to wrap the app
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    // Default to English, but check localStorage if available
    const [language, setLanguageState] = useState<Language>("en");
    const [isInitialized, setIsInitialized] = useState(false);

    // Load saved language preference on initial render
    useEffect(() => {
        const loadLanguagePreference = async () => {
            try {
                // First check localStorage (client-side)
                if (typeof window !== 'undefined') {
                    const savedLanguage = localStorage.getItem("language") as Language;
                    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
                        setLanguageState(savedLanguage);
                        setIsInitialized(true);
                        return;
                    }
                }

                // If no localStorage, try to get from API/cookies
                const response = await fetch('/api/language');
                if (response.ok) {
                    const data = await response.json();
                    if (data.language && (data.language === "en" || data.language === "es")) {
                        setLanguageState(data.language);
                    }
                }
            } catch (error) {
                console.error("Error loading language preference:", error);
            } finally {
                setIsInitialized(true);
            }
        };

        loadLanguagePreference();
    }, []);

    // Update language and save to localStorage and API
    const setLanguage = async (newLanguage: Language) => {
        setLanguageState(newLanguage);

        // Save to localStorage for client-side persistence
        if (typeof window !== 'undefined') {
            localStorage.setItem("language", newLanguage);
        }

        // Save to API for server-side persistence (cookies)
        try {
            await fetch('/api/language', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ language: newLanguage }),
            });
        } catch (error) {
            console.error("Error saving language preference to API:", error);
        }
    };

    // Translation function
    const t = (key: string): string => {
        // If there's no translation, return the key itself
        if (!translations[key]) {
            console.warn(`Translation missing for key: ${key}`);
            return key;
        }

        // Return translated text or fall back to English if not available
        return translations[key][language] || translations[key].en || key;
    };

    // Add more translations dynamically for pages that need it
    const addTranslations = (newTranslations: Record<string, Record<Language, string>>) => {
        Object.assign(translations, newTranslations);
    };

    // Show loading state while initializing language
    if (!isInitialized) {
        return <>{children}</>;
    }

    // Provide the language context to all children
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;