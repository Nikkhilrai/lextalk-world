export function OrganizationJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'LexTalk World',
        alternateName: 'Lextalk World',
        url: 'https://lextalkworld.in',
        logo: 'https://lextalkworld.in/logo/Lextalk-Logo.png',
        description: 'LexTalk World is the Global Authority on Legal Tech, organizing premier legal conferences and connecting legal professionals worldwide.',
        sameAs: [
            // Add social media links here when available
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'info@lextalkworld.in',
            contactType: 'customer service',
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

export function EventJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'LexTalk World Dubai 2026 - Global Legal Conference',
        description: 'Asia\'s Premier Legal Tech Conference bringing together 500+ legal minds from 30+ countries at Atlantis The Royal, Dubai.',
        startDate: '2026-05-13',
        endDate: '2026-05-14',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
            '@type': 'Place',
            name: 'Atlantis The Royal',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Dubai',
                addressCountry: 'UAE',
            },
        },
        organizer: {
            '@type': 'Organization',
            name: 'LexTalk World',
            url: 'https://lextalkworld.in',
        },
        offers: {
            '@type': 'Offer',
            url: 'https://lextalkworld.in/tickets',
            availability: 'https://schema.org/InStock',
        },
        image: 'https://lextalkworld.in/dubai-event/dubai-hero.jpg',
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
