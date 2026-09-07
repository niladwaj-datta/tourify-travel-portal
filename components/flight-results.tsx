'use client'

import { useState } from 'react'
import { LoaderCircle, Plane, Search } from 'lucide-react'

export function FlightResults() {
  const [origin, setOrigin] = useState('CCU')
  const [destination, setDestination] = useState('DEL')
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function searchFlights(event) {
    event.preventDefault()
    setStatus('loading')
    setError('')
    setResults([])

    try {
      const response = await fetch(`/api/flights?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`)
      const body = await response.json()
      if (!response.ok) throw new Error(body.error || 'Flight search failed')

      const flights = Object.values(body.data || {}).flatMap((destinationData) => Object.values(destinationData || {}))
      setResults(flights)
      setStatus('success')
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : 'Flight search failed')
      setStatus('error')
    }
  }

  return <div className="mt-8 rounded-3xl border border-border bg-card p-5 text-left">
    <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary"><Plane className="size-4" /></span><div><h3 className="font-semibold">Live flight fares</h3><p className="text-xs text-muted-foreground">Powered by Travelpayouts cached fare data</p></div></div>
    <form onSubmit={searchFlights} className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
      <label className="text-xs font-medium text-muted-foreground">Origin IATA<input aria-label="Flight origin" value={origin} onChange={(event) => setOrigin(event.target.value.toUpperCase())} maxLength={3} required className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm uppercase outline-none focus:border-primary" /></label>
      <label className="text-xs font-medium text-muted-foreground">Destination IATA<input aria-label="Flight destination" value={destination} onChange={(event) => setDestination(event.target.value.toUpperCase())} maxLength={3} required className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm uppercase outline-none focus:border-primary" /></label>
      <button type="submit" disabled={status === 'loading'} className="mt-auto flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-60"><Search className="size-4" />{status === 'loading' ? <LoaderCircle className="size-4 animate-spin" /> : 'Search fares'}</button>
    </form>
    {status === 'error' && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
    {status === 'success' && !results.length && <p className="mt-4 text-sm text-muted-foreground">No fares were returned for this route.</p>}
    {results.length > 0 && <div className="mt-5 divide-y divide-border rounded-xl border border-border">{results.map((flight, index) => <div key={`${flight.flight_number || 'flight'}-${index}`} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm"><div><p className="font-semibold">{flight.airline || 'Airline unavailable'} {flight.flight_number || ''}</p><p className="text-muted-foreground">{flight.departure_at ? new Date(flight.departure_at).toLocaleString() : 'Departure unavailable'}</p></div><p className="font-semibold text-primary">{flight.price ? `${flight.price} INR` : 'Price unavailable'}</p></div>)}</div>}
  </div>
}
