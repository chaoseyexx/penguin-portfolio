import { NextResponse } from "next/server"
import { getSettings, saveSettings } from "@/lib/db"
import { randomUUID } from "crypto"

export async function GET() {
    try {
        const settings = await getSettings()
        return NextResponse.json(settings.collaborations || [])
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch collaborations" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const settings = await getSettings()
        const { id, name, image, creator, role, memberCount } = body

        if (!name || !image) {
            return NextResponse.json({ error: "Name and image are required" }, { status: 400 })
        }

        const newCollab = {
            id: id || randomUUID(),
            name,
            image,
            creator: creator || "",
            role: role || "",
            memberCount: memberCount || ""
        }

        const updatedCollaborations = id
            ? settings.collaborations.map(c => c.id === id ? newCollab : c)
            : [...(settings.collaborations || []), newCollab]

        await saveSettings({
            ...settings,
            collaborations: updatedCollaborations
        })

        return NextResponse.json(newCollab)
    } catch (e) {
        return NextResponse.json({ error: "Failed to save collaboration" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 })
        }

        const settings = await getSettings()
        const updatedCollaborations = settings.collaborations.filter(c => c.id !== id)

        await saveSettings({
            ...settings,
            collaborations: updatedCollaborations
        })

        return NextResponse.json({ success: true })
    } catch (e) {
        return NextResponse.json({ error: "Failed to delete collaboration" }, { status: 500 })
    }
}
