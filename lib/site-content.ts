export const services = [
  { slug: "boundary-walls", number: "01", name: "Boundary walls", short: "A strong line. A better finish.", description: "Precast concrete panels and poles for residential plots, gardens and larger site boundaries.", image: "/images/boundary-texture.webp", label: "PRECAST CONCRETE", points: ["Panel and pole construction", "Plain and textured finishes", "Site-specific layouts"], detail: "Secure the edge of your property with a boundary planned around your land, access and preferred finish. We discuss panel quantities, pole placement and installation before work begins." },
  { slug: "washrooms", number: "02", name: "Washrooms & bathrooms", short: "Essential spaces, thoughtfully made.", description: "Practical washroom and bathroom construction for everyday use on your property.", image: null, label: "EVERYDAY ESSENTIALS", points: ["Compact, practical layouts", "Requirements discussed on site", "Clear scope before construction"], detail: "A useful washroom starts with the right layout. We discuss your space, water access, drainage and intended use to agree on a practical construction plan." },
  { slug: "rooms", number: "03", name: "Rooms & small homes", short: "Room for your next beginning.", description: "Compact homes and site rooms, built around the space you have and the way you use it.", image: null, label: "SPACES TO LIVE & WORK", points: ["Site rooms and compact homes", "Layouts based on your needs", "Materials and scope agreed upfront"], detail: "Whether you need a room at your site or a small home, we begin with how you plan to use it. Layout, access, materials and the agreed scope guide the construction." },
] as const;

export const projects = [
  { slug: "textured-boundary", title: "A little texture. A strong impression.", category: "Textured", image: "/images/boundary-texture.webp", subtitle: "Brick-pattern precast panels", description: "A close look at a brick-pattern finish, with repeating panels set between concrete poles. A useful reference when exploring a more detailed boundary finish." },
  { slug: "residential-boundary", title: "A clean edge for a home.", category: "Decorative", image: "/images/boundary-modern.webp", subtitle: "Decorative residential boundary", description: "Light-coloured panels, warm accents and a shaped top bring a more decorative finish to a residential boundary." },
  { slug: "garden-boundary", title: "A quieter backdrop for green spaces.", category: "Plain", image: "/images/boundary-garden.jpg", subtitle: "Garden-side panel boundary", description: "A simple concrete panel wall offers a neutral backdrop to a garden and keeps the site edge visually consistent." },
  { slug: "site-perimeter", title: "One continuous, considered line.", category: "Plain", image: "/images/boundary-industrial.jpg", subtitle: "Long site perimeter", description: "Repeating panels and poles follow the edge of a larger site. This reference helps illustrate the rhythm of a long precast perimeter." },
] as const;

export const people = [
  { name: "Gajanand Prajapat", role: "Founder", initials: "GP", note: "The person behind RMD Gajanand and its construction work.", color: "sand" },
  { name: "Ashish Prajapat", role: "Chief Executive Officer", initials: "AP", note: "Helping shape the company's direction and customer experience.", color: "sage" },
  { name: "Silender", role: "Head of Management", initials: "S", note: "Supporting the coordination of people and work.", color: "clay" },
] as const;
