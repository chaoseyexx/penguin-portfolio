
import { NextRequest, NextResponse } from 'next/server'
import { getSkills, saveSkills } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'
import { generateId } from '@/lib/data'

export const dynamic = 'force-dynamic'

export async function GET() {
    return NextResponse.json(await getSkills())
}

export async function POST(request: NextRequest) {
    if (!await verifyAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const skill = await request.json()
        const skills = await getSkills()
        const newSkill = { ...skill, id: generateId('skill') }

        skills.push(newSkill)
        await saveSkills(skills)
        return NextResponse.json({ success: true, skill: newSkill })
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    if (!await verifyAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const body = await request.json()

        if (body.reorder && body.items) {
            await saveSkills(body.items)
            return NextResponse.json({ success: true })
        }

        const skill = body
        const skills = await getSkills()
        const index = skills.findIndex(s => s.id === skill.id)

        if (index !== -1) {
            skills[index] = skill
            await saveSkills(skills)
            return NextResponse.json({ success: true, skill })
        }
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    if (!await verifyAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

        const skills = await getSkills()
        const index = skills.findIndex(s => s.id === id)

        if (index !== -1) {
            skills.splice(index, 1)
            await saveSkills(skills)
            return NextResponse.json({ success: true })
        }
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
