
import { NextRequest, NextResponse } from 'next/server'
import { getPortfolio, savePortfolio, PortfolioData, PortfolioItem } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'
import { generateId } from '@/lib/data' // Keep generateId from utils

export const dynamic = 'force-dynamic'

export async function GET() {
    const data = await getPortfolio()
    return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
    if (!await verifyAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { category, item } = await request.json()
        const data = await getPortfolio()

        if (!(category in data)) return NextResponse.json({ error: 'Invalid category' }, { status: 400 })

        const newItem = { ...item, id: generateId(category.slice(0, 3)) }
        data[category as keyof PortfolioData].push(newItem)

        await savePortfolio(data)
        return NextResponse.json({ success: true, item: newItem })
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    if (!await verifyAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const body = await request.json()
        const { category, item, items, reorder } = body
        const data = await getPortfolio()

        if (!(category in data)) return NextResponse.json({ error: 'Invalid category' }, { status: 400 })

        const catKey = category as keyof PortfolioData

        if (reorder && items) {
            data[catKey] = items
            await savePortfolio(data)
            return NextResponse.json({ success: true })
        }

        if (item) {
            const index = data[catKey].findIndex(i => i.id === item.id)
            if (index !== -1) {
                data[catKey][index] = item
                await savePortfolio(data)
                return NextResponse.json({ success: true, item })
            }
        }
        return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    if (!await verifyAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const id = searchParams.get('id')
        if (!category || !id) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

        const data = await getPortfolio()
        if (!(category in data)) return NextResponse.json({ error: 'Invalid category' }, { status: 400 })

        const catKey = category as keyof PortfolioData
        const index = data[catKey].findIndex(i => i.id === id)

        if (index !== -1) {
            data[catKey].splice(index, 1)
            await savePortfolio(data)
            return NextResponse.json({ success: true })
        }
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
