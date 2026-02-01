
import { getCollection } from './mongodb'

// Types
export interface PortfolioItem { id: string; title: string; desc: string; image: string }
export interface PortfolioData { environments: PortfolioItem[]; structures: PortfolioItem[]; interiors: PortfolioItem[]; models: PortfolioItem[] }

export interface Review { id: string; name: string; role: string; content: string; avatarColor: string; rating: number; price: string; project: string }
export interface Skill { id: string; title: string; desc: string; icon: string; skills: string[] }

export interface Settings {
    site: { title: string; description: string }
    hero: { subtitle: string; title: string; description: string; featuredImage: string; featuredTitle: string; featuredDescription: string }
    about: { name: string; age: string; experience: string; profileImage: string; bio: string[]; whyHireMe: string[] }
    contact: { email: string; robloxUsername: string; discordUsername: string; discordLink: string; availability: string }
    collaborations: { id: string; name: string; image: string; creator: string; role: string; memberCount: string }[]
}

// Defaults
const DEFAULT_PORTFOLIO: PortfolioData = { environments: [], structures: [], interiors: [], models: [] }
const DEFAULT_SETTINGS: Settings = {
    site: { title: "Pingu Portfolio", description: "Roblox Developer Portfolio" },
    hero: { subtitle: "ROBLOX DEVELOPER", title: "Building Immersive Worlds", description: "Specializing in high-fidelity environments, detailed structures, and immersive experiences on Roblox.", featuredImage: "", featuredTitle: "Featured Project", featuredDescription: "Check this out" },
    about: {
        name: "Pingu",
        age: "20",
        experience: "3+ Years",
        profileImage: "/pingu-profile.png",
        bio: [
            "Hi, I'm Pingu, a professional Roblox Builder and Developer with 3+ years of building experience designing a wide variety of high-quality builds for experiences of all types. I specialize in all Roblox styles while focusing on creating amazing experiences by bringing ideas to life.",
            "I am able to create high quality builds while also keeping the optimization throughout the builds.",
            "I know what players want and what players like so I can create an attracting experience for all players."
        ],
        whyHireMe: ["Quick Turnaround", "High Quality", "Optimized Builds", "Player Focused"]
    },
    contact: {
        email: "danteolmeo@gmail.com",
        robloxUsername: "MadCityGamer57746",
        discordUsername: "penguin57746",
        discordLink: "https://discord.com/invite/nAFq5RzajF",
        availability: "Available"
    },
    collaborations: []
}

// Helpers
export async function getPortfolio(): Promise<PortfolioData> {
    try {
        const col = await getCollection('portfolio')
        const doc = await col.findOne({ _type: 'data' })
        if (!doc) return DEFAULT_PORTFOLIO
        const { _id, _type, ...data } = doc as any
        // Merge with default to ensure all arrays exist even if DB has partial data
        return { ...DEFAULT_PORTFOLIO, ...data }
    } catch (e) {
        console.error("DB Error (getPortfolio):", e)
        return DEFAULT_PORTFOLIO
    }
}

export async function savePortfolio(data: PortfolioData): Promise<void> {
    const col = await getCollection('portfolio')
    await col.updateOne({ _type: 'data' }, { $set: { _type: 'data', ...data } }, { upsert: true })
}

export async function getSettings(): Promise<Settings> {
    try {
        const col = await getCollection('settings')
        const doc = await col.findOne({ _type: 'data' })
        if (!doc) return DEFAULT_SETTINGS
        const { _id, _type, ...data } = doc as any
        return { ...DEFAULT_SETTINGS, ...data }
    } catch (e) {
        console.error("DB Error (getSettings):", e)
        return DEFAULT_SETTINGS
    }
}

export async function saveSettings(data: Settings): Promise<void> {
    const col = await getCollection('settings')
    await col.updateOne({ _type: 'data' }, { $set: { _type: 'data', ...data } }, { upsert: true })
}

export async function getReviews(): Promise<Review[]> {
    try {
        const col = await getCollection('reviews')
        const docs = await col.find({}).toArray()
        return docs.map(({ _id, ...rest }) => rest as Review)
    } catch (e) {
        console.error("DB Error (getReviews):", e)
        return []
    }
}

export async function saveReviews(data: Review[]): Promise<void> {
    const col = await getCollection('reviews')
    await col.deleteMany({})
    if (data.length > 0) await col.insertMany(data)
}

export async function getSkills(): Promise<Skill[]> {
    try {
        const col = await getCollection('skills')
        const docs = await col.find({}).toArray()
        return docs.map(({ _id, ...rest }) => rest as Skill)
    } catch (e) {
        console.error("DB Error (getSkills):", e)
        return []
    }
}

export async function saveSkills(data: Skill[]): Promise<void> {
    const col = await getCollection('skills')
    await col.deleteMany({})
    if (data.length > 0) await col.insertMany(data)
}
