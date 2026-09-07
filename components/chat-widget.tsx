'use client'

import { useState } from 'react'
import { DefaultChatTransport } from 'ai'
import { useChat } from '@ai-sdk/react'
import { Bot, ChevronDown, Mail, MessageCircle, Phone, Send, Sparkles, X } from 'lucide-react'

const quickPrompts = ['How does live search work?', 'Can you help me find a cheaper route?', 'How do I contact Tourify?']

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const submit = (text: string) => {
    const value = text.trim()
    if (!value || status !== 'ready') return
    sendMessage({ text: value })
    setInput('')
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7">
      {open && (
        <section className="mb-3 flex h-[min(620px,calc(100vh-110px))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/20" aria-label="Tourify support assistant">
          <div className="flex items-center justify-between bg-primary px-5 py-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-primary-foreground/15"><Sparkles className="size-5" /></span>
              <div><p className="font-semibold">Tourify guide</p><p className="text-xs text-primary-foreground/70">Here to help you plan better</p></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-primary-foreground/10" aria-label="Close support assistant"><X className="size-4" /></button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <div className="mb-4 rounded-2xl bg-accent/60 p-3 text-sm leading-6 text-accent-foreground">Hi, I&apos;m Tourify&apos;s travel guide. Ask me about routes, fares, stays, or how to get in touch.</div>
            <div className="flex flex-col gap-3">
              {messages.map((message) => <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>{message.parts.map((part, index) => part.type === 'text' ? <span key={`${message.id}-${index}`}>{part.text}</span> : null)}</div></div>)}
              {(status === 'submitted' || status === 'streaming') && <div className="flex items-center gap-2 text-xs text-muted-foreground"><Bot className="size-3.5" /> Tourify is thinking...</div>}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">{quickPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => submit(prompt)} className="rounded-full border border-border px-3 py-1.5 text-left text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground">{prompt}</button>)}</div>
          </div>
          <div className="border-t border-border p-3">
            <form className="flex items-center gap-2" onSubmit={(event) => { event.preventDefault(); submit(input) }}>
              <label htmlFor="tourify-message" className="sr-only">Message Tourify</label>
              <input id="tourify-message" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask Tourify anything..." disabled={status !== 'ready'} className="min-w-0 flex-1 rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" />
              <button type="submit" disabled={!input.trim() || status !== 'ready'} className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40" aria-label="Send message"><Send className="size-4" /></button>
            </form>
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground"><span>Need a person?</span><span className="flex items-center gap-2"><a href="mailto:support@tourify.travel" aria-label="Email Tourify support"><Mail className="size-3.5" /></a><a href="tel:+911800000000" aria-label="Call Tourify support"><Phone className="size-3.5" /></a></span></div>
          </div>
        </section>
      )}
      <button type="button" onClick={() => setOpen(!open)} className="ml-auto flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition hover:opacity-90" aria-expanded={open}><MessageCircle className="size-4" /> {open ? 'Close guide' : 'Ask Tourify'}{open ? <ChevronDown className="size-4" /> : null}</button>
    </div>
  )
}
