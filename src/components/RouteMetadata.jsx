import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const metadataByPath = {
  "/": {
    title: "Dhanush Briyani | Firewood Briyani & Catering in Puducherry",
    description: "Dhanush Briyani serves authentic firewood-cooked briyani in Puducherry and provides catering for weddings, celebrations, corporate events and more.",
  },
  "/about": {
    title: "About Dhanush Briyani | Firewood Briyani in Puducherry",
    description: "Learn about Dhanush Briyani, our firewood cooking tradition, story and passion for serving authentic briyani in Puducherry.",
  },
  "/services": {
    title: "Catering Services | Dhanush Briyani Puducherry",
    description: "Explore Dhanush Briyani catering services for weddings, receptions, birthdays, family functions, corporate events and bulk orders in Puducherry.",
  },
  "/contact": {
    title: "Contact Dhanush Briyani | Catering in Puducherry",
    description: "Contact Dhanush Briyani for firewood briyani catering enquiries, event bookings and quotation requests in Puducherry.",
  },
};

function updateHeadTag(selector, tagName, attributes) {
  const [existing, ...duplicates] = document.head.querySelectorAll(selector);
  const element = existing || document.createElement(tagName);
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
  if (!existing) document.head.appendChild(element);
  duplicates.forEach((duplicate) => duplicate.remove());
}

export default function RouteMetadata() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Match the router's case-insensitive paths and optional trailing slash.
    // Queries and fragments never become part of the canonical URL.
    const path = pathname.toLowerCase().replace(/\/+$/, "") || "/";
    const metadata = metadataByPath[path];
    if (!metadata) return;

    document.title = metadata.title;
    updateHeadTag('meta[name="description"]', "meta", {
      name: "description",
      content: metadata.description,
    });
    updateHeadTag('link[rel="canonical"]', "link", {
      rel: "canonical",
      href: `https://dhanushbriyani.in${path}`,
    });
  }, [pathname]);

  return null;
}
