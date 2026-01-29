export interface PortfolioItem {
  id: string
  title: string
  category: string
  image: string
  description: string
  desc?: string // For compatibility
  fullDescription?: string
  gallery?: string[]
}

export interface PortfolioData {
  categories: string[]
  items: PortfolioItem[]
}

export const portfolioItems: PortfolioItem[] = [
  // Maps
  {
    id: "glass-bridge",
    title: "Glass Bridge",
    category: "Maps",
    image: "/placeholder.svg?height=600&width=800",
    description: "Recreation of the Glass Bridge Minigame from the viral series 'Squid Game'.",
  },
  {
    id: "the-circle-map",
    title: "The Circle Map",
    category: "Maps",
    image: "/placeholder.svg?height=600&width=800",
    description: "Recreation of the map from the viral series 'The Circle'.",
  },
  {
    id: "stud-styled-map",
    title: "Stud Styled Map",
    category: "Maps",
    image: "/placeholder.svg?height=600&width=800",
    description: "A classic stud-styled map design.",
  },
  {
    id: "coruscant-city",
    title: "Coruscant City",
    category: "Maps",
    image: "/placeholder.svg?height=600&width=800",
    description: "Detailed recreation of Coruscant City from Star Wars.",
  },
  {
    id: "stud-styled-pirate-map",
    title: "Stud Styled Pirate Map",
    category: "Maps",
    image: "/placeholder.svg?height=600&width=800",
    description: "A pirate-themed map built in the classic stud style.",
  },
  {
    id: "squid-game-lobby",
    title: "Squid Game Lobby",
    category: "Maps",
    image: "/placeholder.svg?height=600&width=800",
    description: "Recreation of the Lobby from 'Squid Game'.",
  },
  {
    id: "realistic-house",
    title: "Realistic House",
    category: "Maps",
    image: "/placeholder.svg?height=600&width=800",
    description: "A realistic American Suburban House.",
  },
  {
    id: "ny-apartment-complex",
    title: "New York Apartment Complex",
    category: "Maps",
    image: "/placeholder.svg?height=600&width=800",
    description: "A New York Apartment Complex built out of studs.",
  },
  {
    id: "stylized-house",
    title: "Stylized House",
    category: "Maps",
    image: "/placeholder.svg?height=600&width=800",
    description: "A stylized house build.",
  },


  // Models
  {
    id: "highway-overpass",
    title: "Highway Overpass",
    category: "Models",
    image: "/placeholder.svg?height=600&width=800",
    description: "A detailed highway overpass model.",
  },
  {
    id: "ny-support-bars",
    title: "New York Support Bars",
    category: "Models",
    image: "/placeholder.svg?height=600&width=800",
    description: "New York Support Bars with a studded texture.",
  },
  {
    id: "pirate-ship-model",
    title: "Pirate Ship Model",
    category: "Models",
    image: "/placeholder.svg?height=600&width=800",
    description: "A detailed model of a pirate ship.",
  },
  {
    id: "bank-vault-moult",
    title: "Bank Vault Model",
    category: "Models",
    image: "/placeholder.svg?height=600&width=800",
    description: "A secure bank vault model.",
  },
  {
    id: "door-model",
    title: "Door Model",
    category: "Models",
    image: "/placeholder.svg?height=600&width=800",
    description: "A standard door model.",
  },
  {
    id: "blast-door-model",
    title: "Blast Door Model",
    category: "Models",
    image: "/placeholder.svg?height=600&width=800",
    description: "A heavy blast door model.",
  },
  {
    id: "crate-model",
    title: "Crate Model",
    category: "Models",
    image: "/placeholder.svg?height=600&width=800",
    description: "A set of crate models.",
  },
  {
    id: "advanced-bank-door",
    title: "Advanced Bank Door",
    category: "Models",
    image: "/placeholder.svg?height=600&width=800",
    description: "An advanced, detailed bank door model.",
  },

  // Interiors
  {
    id: "warehouse-building",
    title: "Warehouse Building",
    category: "Interiors",
    image: "/placeholder.svg?height=600&width=800",
    description: "A warehouse building in a roleplay style.",
  },
  {
    id: "detailed-room-structure",
    title: "Detailed Room Structure",
    category: "Interiors",
    image: "/placeholder.svg?height=600&width=800",
    description: "A detailed interior of a hallway.",
  },
  {
    id: "cafe-interior",
    title: "Cafe Interior",
    category: "Interiors",
    image: "/placeholder.svg?height=600&width=800",
    description: "A coffee shop interior.",
  },
  {
    id: "the-backrooms",
    title: "The Backrooms",
    category: "Interiors",
    image: "/placeholder.svg?height=600&width=800",
    description: "Interior of the first level of the Backrooms.",
  },
  {
    id: "stylized-cafe",
    title: "Stylized Cafe",
    category: "Interiors",
    image: "/placeholder.svg?height=600&width=800",
    description: "Interior of a Stylized Cafe.",
  },
  {
    id: "stylized-warehouse-interior",
    title: "Stylized Warehouse Interior",
    category: "Interiors",
    image: "/placeholder.svg?height=600&width=800",
    description: "Interior of a stylized warehouse.",
  },
  {
    id: "medieval-room-structure",
    title: "Medieval Room Structure",
    category: "Interiors",
    image: "/placeholder.svg?height=600&width=800",
    description: "Structure for a detailed medieval room.",
  }
]

export const portfolioData: PortfolioData = {
  categories: ["All", "Maps", "Models", "Interiors"],
  items: portfolioItems
}
