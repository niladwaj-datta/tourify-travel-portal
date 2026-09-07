import { NextResponse } from 'next/server'

const queryKeys = ['from', 'to', 'depart', 'return', 'travellers', 'class'] as const

type SearchQuery = Record<(typeof queryKeys)[number], string>

function readQuery(request: Request): SearchQuery {
  const url = new URL(request.url)
  return Object.fromEntries(queryKeys.map((key) => [key, url.searchParams.get(key)?.trim() ?? ''])) as SearchQuery
}

export async function GET(request: Request) {
  const query = readQuery(request)
  const missing = queryKeys.filter((key) => !query[key])

  if (missing.length) {
    return NextResponse.json({ error: 'Missing search fields', missing }, { status: 400 })
  }

  if (!process.env.AVIATIONSTACK_ACCESS_KEY) {
    return NextResponse.json({
      status: 'not_configured',
      message: 'Connect a live flight provider to return current inventory. No sample results are generated.',
      providers: { flights: 'not_configured', rail: 'not_configured', bus: 'not_configured', stays: 'not_configured' },
    }, { status: 503 })
  }

  const providerUrl = new URL('https://api.aviationstack.com/v1/flights')
  providerUrl.searchParams.set('access_key', process.env.AVIATIONSTACK_ACCESS_KEY)
  providerUrl.searchParams.set('dep_iata', query.from)
  providerUrl.searchParams.set('arr_iata', query.to)
  providerUrl.searchParams.set('flight_date', query.depart)

  const response = await fetch(providerUrl, { next: { revalidate: 0 } })
  if (!response.ok) {
    return NextResponse.json({ status: 'provider_error', message: 'The live flight provider returned an error.' }, { status: 502 })
  }

  const data = await response.json()
  return NextResponse.json({ status: 'ok', query, source: 'Aviationstack', flights: data.data ?? [] })
}
