
import { NextRequest, NextResponse } from 'next/server'
import { getSettings, saveSettings } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
    return NextResponse.json(await getSettings())
}

export async function PUT(request: NextRequest) {
    if (!await verifyAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const settings = await request.json()
        await saveSettings(settings)
        return NextResponse.json({ success: true, settings })
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
