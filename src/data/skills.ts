import { Code, Cuboid, Palette, Zap, Box, Layout, Smartphone, Lock } from 'lucide-react'

export interface Skill {
    name: string
    description: string
    iconName: string // Store string name instead of component
}

export const initialSkills: Skill[] = [
    {
        name: "Roblox Studio",
        description: "Expert mastery of scanning, building, and terrain tools.",
        iconName: "Cuboid"
    },
    {
        name: "3D Modeling",
        description: "Creating high-fidelity custom assets and intricate props.",
        iconName: "Box"
    },
    {
        name: "Stylized Design",
        description: "Specializing in unique, artistic visual styles",
        iconName: "Palette"
    },
    {
        name: "Optimization",
        description: "Efficient building techniques for high-performance games.",
        iconName: "Zap"
    },
    {
        name: "Environment Design",
        description: "Crafting immersive worlds and atmospheric settings.",
        iconName: "Layout"
    },
    {
        name: "Security Oriented",
        description: "Building secure structures like vaults and fortified doors.",
        iconName: "Lock"
    }
]
