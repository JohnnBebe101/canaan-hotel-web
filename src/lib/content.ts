// Content management utilities for dynamic text and image content
// This allows easy updates to website content without touching component code

export interface ContentSection {
  id: string;
  title: string;
  description: string;
  image?: string;
  altText?: string;
}

export interface RoomContent {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  altText: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  image: string;
  altText: string;
}

export interface AttractionContent {
  id: string;
  title: string;
  description: string;
  image: string;
  altText: string;
  link: string;
}

// Dynamic content configuration
export const CONTENT_CONFIG = {
  // Hero section content
  hero: {
    title: "Your Gateway to Tigray's History and Comfort",
    subtitle: "Experience unparalleled hospitality in the heart of Adigrat.",
    image: "/assets/images/hotel-exterior.svg",
    altText: "Canaan International Hotel exterior view showing the beautiful architecture and welcoming entrance"
  } as HeroContent,

  // Featured rooms content
  rooms: [
    {
      id: "economy-single",
      title: "Economy Single Room",
      description: "Perfect for solo travelers with a stunning city view.",
      price: "From $50 / night",
      image: "/assets/images/hotel-entrance.svg",
      altText: "Economy Single Room with city view"
    },
    {
      id: "comfort-double",
      title: "Comfort Double Room",
      description: "Spacious comfort for couples, featuring a private balcony.",
      price: "From $75 / night",
      image: "/assets/images/hotel-team.svg",
      altText: "Comfort Double Room with private balcony"
    },
    {
      id: "family-suite",
      title: "Family Suite",
      description: "Ideal for families, with multiple beds and extra space.",
      price: "From $110 / night",
      image: "/assets/images/hotel-team.svg",
      altText: "Family Suite with multiple beds and extra space"
    }
  ] as RoomContent[],

  // Why book direct content
  whyBookDirect: [
    {
      id: "best-price",
      title: "Best Price Guarantee",
      description: "Always get the best available rate when you book directly with us.",
      icon: "sell"
    },
    {
      id: "exclusive-offers",
      title: "Exclusive Offers",
      description: "Access special packages and deals you won't find anywhere else.",
      icon: "star"
    },
    {
      id: "flexible-cancellation",
      title: "Flexible Cancellation",
      description: "Enjoy peace of mind with our flexible cancellation policies.",
      icon: "task_alt"
    }
  ],

  // Attractions content
  attractions: [
    {
      id: "debre-damo",
      title: "Debre Damo Monastery",
      description: "An ancient monastery perched atop a flat-topped mountain.",
      image: "/images/room-placeholder.jpg",
      altText: "The ancient cliff-face monastery of Debre Damo",
      link: "#debre-damo"
    },
    {
      id: "gheralta",
      title: "Gheralta Mountains",
      description: "Home to stunning rock-hewn churches and panoramic views.",
      image: "/images/room-placeholder.jpg",
      altText: "Dramatic sandstone cliffs of the Gheralta Mountains at sunset",
      link: "#gheralta"
    },
    {
      id: "al-nejashi",
      title: "Al-Nejashi Mosque",
      description: "One of the earliest mosques in Africa, a site of great historical importance.",
      image: "/images/room-placeholder.jpg",
      altText: "The historic Al-Nejashi Mosque with its white minarets",
      link: "#al-nejashi"
    }
  ] as AttractionContent[],

  // Footer content
  contact: {
    address: "123 Main Street, Adigrat, Tigray, Ethiopia",
    phone: "+251 123 456 789",
    email: "contact@cannanhotel.com",
    social: {
      facebook: "https://facebook.com/canaanhotel",
      instagram: "https://instagram.com/canaanhotel",
      twitter: "https://twitter.com/canaanhotel"
    }
  },

  // Trust badges
  partners: [
    {
      name: "TripAdvisor",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDrh16GHYlnaqEVWs2yuQQVY-cZT5cKmTV1Z5f7LMqcxHYmGPX83yGuWpIhyDz-sI0EAVDMOGKJnCixD6nRZlAy6VQqXlZbFWo4rHnIUKXbr8BQ0kl7vlX5LhG1fnX4EwM64cK3zcbvZi0NM2mRjJcl1Z6baJznFavNIXNy4miBiF4zDBFt5J9gWKqQofEwlQQBIcdyN2Mf7M34bZyDAl73Yq-ZQ3stdftFVktK5CtYpo4DqSZ2_KaBGf8rnHM_IuNuGkThbQzm3I3",
      width: 120,
      height: 32
    },
    {
      name: "Booking.com",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCER0_PlwABxBmlMMmAaU_yGix4gPIkXQKzPDFZ6WH5PJpJXSIbeFtD0JGKmaUlVh_-7MoJjGgDhuH29mzUNnuJvgaQreqY556Gp3nkbK-8SjpQsrPoEwWDUYBmYtnos7TgGUmaxFS61olFKtzfpsz8iClF-uuSJhKMddiHAoizkLTXluXZezNyqTerQ7pQfokpIAoQtyNxeNGanobXz8JodC-O06PRkK6NZgkk9JmF_Slaqhac-0YQHBuC-u-2ug-dYr85plGoSWtC",
      width: 120,
      height: 24
    },
    {
      name: "Expedia",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv1O8s218liaKe7XB8AYkqIOoVFhaQn3CA1T4eTN4yjx6SqOQJKjrQ_GfRjnndl1FOwYIkt6gKaTWC0Jh2BSTQ2S7xGxx-liXYIWNYirmSF_On39JZxpCwFi6Y3-U8yiXk9N_5ak-x2Mt1cNWYDeCyyDd8IyLStmBqqDhb8QTrRSv3jfFjy2UPcg3ubnwGq1TmBF0bK2NTmCVZqJqqt9JLSrkSwpATqQBdIAXgQBk8paHNYod4qefHI-I2BA3wb9zoOHQRX19rOI-q",
      width: 120,
      height: 32
    }
  ]
};

// Utility functions for content management
export const getContentById = (section: keyof typeof CONTENT_CONFIG, id: string) => {
  const sectionContent = CONTENT_CONFIG[section];
  
  if (Array.isArray(sectionContent)) {
    // Type guard to check if items have id property
    return sectionContent.find(item => 'id' in item && item.id === id);
  }
  
  return sectionContent;
};

export const getAllContentBySection = (section: keyof typeof CONTENT_CONFIG) => {
  return CONTENT_CONFIG[section];
};

export const updateContent = (section: keyof typeof CONTENT_CONFIG, id: string, updates: Partial<any>) => {
  // In a real implementation, this would update content in a database or CMS
  // For now, we'll just log the intended update
  console.log(`Updating ${section}.${id}:`, updates);
  return { success: true, message: "Content update queued for review" };
};

// Type guards for better TypeScript support
export const isRoomContent = (content: any): content is RoomContent => {
  return content && typeof content.title === 'string' && typeof content.price === 'string';
};

export const isAttractionContent = (content: any): content is AttractionContent => {
  return content && typeof content.link === 'string' && typeof content.image === 'string';
};