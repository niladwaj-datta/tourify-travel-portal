import { NextResponse } from 'next/server'

const API_ENDPOINT = 'https://api.travelpayouts.com/v1/prices/cheap'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const origin = (searchParams.get('origin') || 'CCU').trim().toUpperCase()
  const destination = searchParams.get('destination')?.trim().toUpperCase()
  const currency = (searchParams.get('currency') || 'inr').trim().toLowerCase()

  if (!destination) {
    return NextResponse.json({ error: 'destination is required' }, { status: 400 })
  }

  if (!process.env.TRAVELPAYOUTS_TOKEN) {
    return NextResponse.json({ error: 'TRAVELPAYOUTS_TOKEN is not configured' }, { status: 503 })
  }

  const providerUrl = new URL(API_ENDPOINT)
  providerUrl.searchParams.set('origin', origin)
  providerUrl.searchParams.set('destination', destination)
  providerUrl.searchParams.set('currency', currency)
  providerUrl.searchParams.set('token', process.env.TRAVELPAYOUTS_TOKEN)

  try {
    const response = await fetch(providerUrl, { cache: 'no-store' })
    const body = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: body?.message || 'Travelpayouts returned an error' }, { status: 502 })
    }

    return NextResponse.json(body)
  } catch {
    return NextResponse.json({ error: 'Unable to reach the flight provider' }, { status: 500 })
  }
}
