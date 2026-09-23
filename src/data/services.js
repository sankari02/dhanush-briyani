import briyani from "../assets/about-briyani.png";
import firewood from "../assets/about-firewood.png";
import weddingEvent from "../assets/images/wedding-catering.png";
import corporateEvent from "../assets/images/corporate-catering.png";
import birthdayEvent from "../assets/images/birthday-catering.png";

// Reuse the site's food photography and local assets.
export const services = [
  { id: "wedding", title: "Wedding Catering", image: briyani, alt: "Aromatic briyani with rice and spices", text: "Firewood-cooked briyani and thoughtfully planned catering for wedding celebrations and memorable gatherings." },
  { id: "engagement", title: "Engagement & Reception", image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=90", alt: "A colourful spread of freshly prepared food", text: "Thoughtfully prepared catering for engagements and receptions, bringing family and friends together over a memorable meal." },
  { id: "birthday", title: "Birthday Celebrations", image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1200&q=90", alt: "Golden savoury snacks ready to share", text: "Warm, flavourful catering for birthdays, with food prepared for a celebration shared with the people who matter." },
  { id: "family", title: "Family Functions", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=90", alt: "Traditional Indian food served with accompaniments", text: "Traditional flavours and thoughtful catering for family gatherings, functions and special moments around the table." },
  { id: "corporate", title: "Corporate Events", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=90", alt: "Richly spiced Indian curry prepared for a meal", text: "Freshly prepared catering for corporate gatherings, team celebrations, business events and special occasions." },
  { id: "bulk", title: "Bulk Orders", image: firewood, alt: "Traditional cooking pot over a firewood flame", text: "Briyani and catering prepared for larger orders, with care for quality ingredients, great taste and your gathering’s requirements." },
];

export const servicePreviews = [
  { ...services[0], image: weddingEvent, alt: "Wedding celebration catering" },
  { ...services[4], title: "Corporate Catering", image: corporateEvent, alt: "Corporate event catering", text: "Freshly prepared catering for corporate gatherings, team celebrations and special occasions." },
  { ...services[2], title: "Birthday & Family Celebrations", image: birthdayEvent, alt: "Birthday celebration catering", text: "Warm, flavourful catering created for birthdays, family functions and celebrations shared together." },
];
