'use client'

import { useState } from 'react'
import { ChatWidget } from '@/components/chat-widget'
import { FlightResults } from '@/components/flight-results'
import {
  ArrowRight,
  BedDouble,
  Bus,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  CloudSun,
  Coffee,
  Globe2,
  Hotel,
  Plane,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrainFront,
  Users,
} from 'lucide-react'

const destinations = [
  { city: 'Delhi', code: 'DEL', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80' },
  { city: 'Goa', code: 'GOI', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80' },
  { city: 'Mumbai', code: 'BOM', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=900&q=80' },
]

const benefits = [
  { icon: Globe2, title: 'One search, every route', text: 'Compare flight, rail and bus options side by side.' },
  { icon: ShieldCheck, title: 'Clear, honest pricing', text: 'Live provider results only. No invented availability.' },
  { icon: Sparkles, title: 'Smarter alternatives', text: 'Get nearby stays and lower-cost route suggestions.' },
]

export default function Home() {
  const [tripType, setTripType] = useState('Round trip')
  const [searched, setSearched] = useState(false)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Tourify home">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Plane className="size-5 -rotate-12" /></span>
            <span className="font-sans text-lg font-semibold tracking-tight">Tourify</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex" aria-label="Primary navigation">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#routes" className="transition-colors hover:text-foreground">Explore India</a>
            <a href="#stays" className="transition-colors hover:text-foreground">Stays</a>
          </nav>
          <button className="flex items-center gap-2 text-sm font-medium text-foreground"><CircleHelp className="size-4" /> Help</button>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden border-b border-border bg-[linear-gradient(120deg,oklch(0.96_0.025_210),oklch(0.99_0.01_80))]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:pb-24 lg:pt-24">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1.5 text-xs font-medium text-primary"><Sparkles className="size-3.5" /> Travel planning, made clearer</div>
            <h1 className="max-w-xl text-balance font-sans text-5xl font-semibold tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl">Go farther.<br /><span className="text-primary">Spend wiser.</span></h1>
            <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-muted-foreground sm:text-lg">Compare live travel options across India, then discover the smartest way to get there and stay close to what matters.</p>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground"><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Flights, trains & buses</span><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Budget-aware stays</span></div>
          </div>
          <div className="relative hidden min-h-[370px] lg:block">
            <div className="absolute right-6 top-3 h-72 w-72 overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/10"><img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85" alt="Sunlit view of the Taj Mahal" className="size-full object-cover" /></div>
            <div className="absolute bottom-0 left-4 h-48 w-56 overflow-hidden rounded-[1.5rem] border-8 border-background shadow-xl"><img src="https://images.unsplash.com/photo-1532664189809-02133fee698d?auto=format&fit=crop&w=700&q=85" alt="Colorful Indian street architecture" className="size-full object-cover" /></div>
            <div className="absolute bottom-10 right-0 flex items-center gap-3 rounded-2xl border border-border bg-background/95 px-4 py-3 shadow-lg"><span className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary"><ShieldCheck className="size-4" /></span><span><strong className="block text-sm">Live-first search</strong><small className="text-xs text-muted-foreground">No made-up results</small></span></div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-8 lg:px-8"><SearchPanel tripType={tripType} setTripType={setTripType} onSearch={() => setSearched(true)} /></div>
      </section>

      {searched && <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><SearchStatus /></section>}

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="mb-10 max-w-xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Travel, without the tabs</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need to make a better call.</h2></div><div className="grid gap-4 md:grid-cols-3">{benefits.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-3xl border border-border bg-card p-6"><span className="mb-12 flex size-11 items-center justify-center rounded-2xl bg-accent text-primary"><Icon className="size-5" /></span><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></section>

      <section id="routes" className="border-y border-border bg-muted/30"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Start somewhere beautiful</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Popular across India</h2></div><a href="#search" className="flex items-center gap-2 text-sm font-medium text-primary">Search all routes <ArrowRight className="size-4" /></a></div><div className="mt-8 grid gap-5 md:grid-cols-3">{destinations.map((place) => <a href="#search" key={place.code} className="group relative aspect-[1.25] overflow-hidden rounded-3xl"><img src={place.image} alt={`${place.city} travel destination`} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" /><div className="absolute bottom-5 left-5 text-white"><p className="text-xl font-semibold">{place.city}</p><p className="mt-1 text-sm text-white/75">{place.code} · Explore the route</p></div></a>)}</div></div></section>

      <section id="stays" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid gap-8 rounded-[2rem] bg-primary px-7 py-10 text-primary-foreground sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/65">A better place to land</p><h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">Tell us your budget. We&apos;ll show you where to stay.</h2><p className="mt-4 max-w-lg leading-7 text-primary-foreground/75">We&apos;re building live stay discovery across hotels, homestays and vacation rentals, with the details you need to book confidently.</p></div><a href="#search" className="inline-flex items-center justify-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground">Plan a stay <ArrowRight className="size-4" /></a></div></section>

      <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8"><p>© 2026 Tourify. Plan with confidence.</p><p className="flex items-center gap-2"><CloudSun className="size-4" /> India-first travel planning</p></div></footer>
      <ChatWidget />
    </main>
  )
}

function SearchPanel({ tripType, setTripType, onSearch }: { tripType: string; setTripType: (value: string) => void; onSearch: () => void }) {
  const [from, setFrom] = useState('New Delhi (DEL)')
  const [to, setTo] = useState('Mumbai (BOM)')

  return <div id="search" className="rounded-[1.75rem] border border-border bg-card p-4 shadow-2xl shadow-primary/10 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4"><div className="flex gap-1 rounded-xl bg-muted p-1">{['Round trip', 'One way'].map((type) => <button key={type} onClick={() => setTripType(type)} className={`rounded-lg px-3 py-2 text-sm font-medium transition ${tripType === type ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}>{type}</button>)}</div><button className="flex items-center gap-2 text-sm text-muted-foreground"><SlidersHorizontal className="size-4" /> More filters</button></div><div className="grid gap-3 pt-4 md:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1fr_1fr_0.8fr_auto]"><SearchField icon={Plane} label="From" value={from} onChange={setFrom} placeholder="City or airport" /><SearchField icon={Globe2} label="To" value={to} onChange={setTo} placeholder="City or airport" /><SearchField icon={CalendarDays} label="Depart" value="24 Oct, 2026" /><SearchField icon={CalendarDays} label="Return" value="31 Oct, 2026" /><SearchField icon={Users} label="Travellers" value="1 Adult" /><button onClick={onSearch} className="flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 md:col-span-2 lg:col-span-1"><Search className="size-4" /> Search</button></div></div>
}

function SearchField({ icon: Icon, label, value, onChange, placeholder }: { icon: typeof Plane; label: string; value: string; onChange?: (value: string) => void; placeholder?: string }) { return onChange ? <label className="flex h-14 items-center gap-3 rounded-xl border border-input bg-background px-4 text-left transition focus-within:border-primary/50"><Icon className="size-4 shrink-0 text-primary" /><span className="min-w-0 flex-1"><span className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</span><input aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-0.5 block w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground" /></span><ChevronDown className="ml-auto size-4 shrink-0 text-muted-foreground" /></label> : <div className="flex h-14 items-center gap-3 rounded-xl border border-input bg-background px-4 text-left"><Icon className="size-4 shrink-0 text-primary" /><span className="min-w-0"><span className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</span><span className="mt-0.5 block truncate text-sm font-medium">{value}</span></span><ChevronDown className="ml-auto size-4 shrink-0 text-muted-foreground" /></div> }

function SearchStatus() { return <div className="rounded-3xl border border-dashed border-border bg-muted/20 p-8 text-center"><div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent text-primary"><Search className="size-6" /></div><h2 className="mt-5 text-xl font-semibold">Your live search is ready to connect</h2><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">No travel provider is connected yet. Once a free provider API is configured, Tourify will show live fares here rather than filling the page with sample inventory.</p><div className="mx-auto mt-7 grid max-w-3xl gap-3 text-left sm:grid-cols-3"><StatusItem icon={Plane} title="Flights" /><StatusItem icon={TrainFront} title="Rail alternatives" /><StatusItem icon={Hotel} title="Stays & rentals" /></div><FlightResults /></div> }
function StatusItem({ icon: Icon, title }: { icon: typeof Plane; title: string }) { return <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"><Icon className="size-4 text-primary" /><span className="text-sm font-medium">{title}</span><span className="ml-auto size-2 rounded-full bg-muted-foreground/40" aria-label="Not connected" /></div> }

void BedDouble
void Bus
void Coffee
void TrainFront
