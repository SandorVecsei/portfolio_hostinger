export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectGalleryItem = {
  title: string;
  caption: string;
  palette: [string, string];
};

export type Project = {
  slug: string;
  name: string;
  client: string;
  year: string;
  headline: string;
  shortDescription: string;
  industry: string;
  services: string[];
  challenge: string;
  approach: string[];
  outcome: string;
  metrics: ProjectMetric[];
  heroPalette: [string, string];
  gallery: ProjectGalleryItem[];
};

export const projects: Project[] = [
  {
    slug: "solaris-beverages",
    name: "Solaris Beverages",
    client: "Solaris",
    year: "2025",
    headline: "Launching a bold sparkling tea brand for culture-first audiences.",
    shortDescription:
      "We built a complete identity and campaign platform that moved Solaris from niche shelves to national conversation.",
    industry: "Food & Beverage",
    services: ["Brand Strategy", "Visual Identity", "Campaign Art Direction", "3D Motion"],
    challenge:
      "The category was saturated with wellness cliches, and Solaris needed a brand system that felt fresh without becoming trend-dependent.",
    approach: [
      "Mapped audience rituals across nightlife, fitness, and streetwear communities.",
      "Built a modular identity around heat-reactive gradients and kinetic typography.",
      "Produced social launch assets with adaptable motion language for paid and organic channels."
    ],
    outcome:
      "The launch established a distinct voice, unlocked shelf expansion in 640 stores, and created repeatable campaign mechanics for seasonal drops.",
    metrics: [
      { label: "Launch Reach", value: "18.2M" },
      { label: "Retail Expansion", value: "+640 stores" },
      { label: "Engagement Lift", value: "+214%" }
    ],
    heroPalette: ["#ff6f3c", "#ffbe0b"],
    gallery: [
      {
        title: "Flavor Architecture",
        caption: "Packaging system exploring flavor as chromatic motion.",
        palette: ["#ff5a2b", "#ffc145"]
      },
      {
        title: "Launch Film Frames",
        caption: "Motion direction designed for social-first edits.",
        palette: ["#0f172a", "#fb5607"]
      },
      {
        title: "OOH Compositions",
        caption: "Flexible billboard layouts for multiple cities.",
        palette: ["#ffc145", "#5f0f40"]
      }
    ]
  },
  {
    slug: "northline-architecture",
    name: "Northline Architecture",
    client: "Northline Studio",
    year: "2024",
    headline: "Turning a respected architecture firm into a digital tastemaker.",
    shortDescription:
      "We crafted a premium website experience with cinematic transitions and project storytelling that mirrors physical space.",
    industry: "Architecture",
    services: ["Experience Design", "Creative Development", "Editorial Direction"],
    challenge:
      "Northline had world-class projects but no compelling digital presence to win global clients and talent.",
    approach: [
      "Created a narrative framework where each project reads like a spatial documentary.",
      "Designed a typography-led interface with measured pacing and immersive transitions.",
      "Implemented a scalable CMS-ready component system for future case studies."
    ],
    outcome:
      "The new platform increased inbound inquiries and became a key asset in pitch presentations and recruitment.",
    metrics: [
      { label: "Inquiry Growth", value: "+88%" },
      { label: "Avg. Session", value: "4m 12s" },
      { label: "Award Shortlists", value: "3" }
    ],
    heroPalette: ["#1a2a6c", "#b21f1f"],
    gallery: [
      {
        title: "Project Index",
        caption: "Editorial grid tuned for architectural photography.",
        palette: ["#1f2937", "#6b7280"]
      },
      {
        title: "Transition Studies",
        caption: "Micro-films informing interaction behavior.",
        palette: ["#111827", "#8b5cf6"]
      },
      {
        title: "Material Stories",
        caption: "Case study modules inspired by exhibition catalogues.",
        palette: ["#d1d5db", "#374151"]
      }
    ]
  },
  {
    slug: "flux-mobility",
    name: "Flux Mobility",
    client: "Flux",
    year: "2025",
    headline: "Designing a high-velocity launch for an urban EV platform.",
    shortDescription:
      "From positioning to launch event visuals, we built a flexible identity that felt engineered yet human.",
    industry: "Mobility",
    services: ["Positioning", "Identity Systems", "Launch Experience", "Motion Toolkit"],
    challenge:
      "Flux needed to appeal to city planners, commuters, and investors without fragmenting its message.",
    approach: [
      "Developed a visual language anchored in route topologies and pulse-based motion cues.",
      "Created presentation and product storytelling templates for fundraising and press.",
      "Directed launch event visuals with synchronized stage content and social assets."
    ],
    outcome:
      "Flux closed its next funding round and rapidly converted pilot city conversations into signed programs.",
    metrics: [
      { label: "Qualified Leads", value: "+172%" },
      { label: "Pilot Cities", value: "12" },
      { label: "Press Mentions", value: "94" }
    ],
    heroPalette: ["#0f9b8e", "#38ef7d"],
    gallery: [
      {
        title: "Signal System",
        caption: "Iconography and motion states for route intelligence.",
        palette: ["#0b132b", "#1c2541"]
      },
      {
        title: "Launch Stage",
        caption: "Immersive keynote environment with live data overlays.",
        palette: ["#06d6a0", "#118ab2"]
      },
      {
        title: "Operator Dashboard",
        caption: "Concept UI for fleet and infrastructure management.",
        palette: ["#1d3557", "#00b4d8"]
      }
    ]
  },
  {
    slug: "eden-hotels",
    name: "Eden Hotels",
    client: "Eden Group",
    year: "2024",
    headline: "Reimagining luxury booking as a cinematic digital journey.",
    shortDescription:
      "We merged editorial storytelling with performance-led UX to boost direct bookings and brand affinity.",
    industry: "Hospitality",
    services: ["Digital Strategy", "UI Design", "Frontend Architecture", "Content Direction"],
    challenge:
      "Eden relied heavily on third-party booking channels and needed a direct-to-brand experience guests would prefer.",
    approach: [
      "Reframed the booking path around mood, location, and occasion rather than room type alone.",
      "Built adaptive landing pages for seasonal campaigns across destinations.",
      "Introduced motion patterns that elevate brand perception without hurting performance."
    ],
    outcome:
      "Direct bookings grew steadily, and campaign pages converted at significantly higher rates than legacy templates.",
    metrics: [
      { label: "Direct Bookings", value: "+49%" },
      { label: "Conversion Rate", value: "+37%" },
      { label: "Revenue/Visitor", value: "+29%" }
    ],
    heroPalette: ["#f4c4f3", "#fc67fa"],
    gallery: [
      {
        title: "Destination Narrative",
        caption: "Immersive pages tailored to each property context.",
        palette: ["#3a0ca3", "#7209b7"]
      },
      {
        title: "Booking UX",
        caption: "A streamlined flow balancing luxury and speed.",
        palette: ["#4cc9f0", "#4361ee"]
      },
      {
        title: "Campaign Toolkit",
        caption: "Reusable templates for seasonal offers and launches.",
        palette: ["#f72585", "#b5179e"]
      }
    ]
  }
];

export const featuredProjects = projects.slice(0, 3);

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
