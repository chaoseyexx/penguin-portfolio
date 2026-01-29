
import { NextRequest, NextResponse } from 'next/server'
import { getReviews, saveReviews } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'
import { generateId } from '@/lib/data'

export const dynamic = 'force-dynamic'

export async function GET() {
    return NextResponse.json(await getReviews())
}

export async function POST(request: NextRequest) {
    if (!await verifyAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const review = await request.json()
        const reviews = await getReviews()
        const newReview = { ...review, id: generateId('rev') }

        reviews.push(newReview)
        await saveReviews(reviews)
        return NextResponse.json({ success: true, review: newReview })
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    if (!await verifyAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const body = await request.json()

        if (body.reorder && body.items) {
            await saveReviews(body.items)
            return NextResponse.json({ success: true })
        }

        const review = body
        const reviews = await getReviews()
        const index = reviews.findIndex(r => r.id === review.id)

        if (index !== -1) {
            reviews[index] = review
            await saveReviews(reviews)
            return NextResponse.json({ success: true, review })
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

        const reviews = await getReviews()
        const index = reviews.findIndex(r => r.id === id)

        if (index !== -1) {
            reviews.splice(index, 1)
            await saveReviews(reviews)
            return NextResponse.json({ success: true })
        }
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
