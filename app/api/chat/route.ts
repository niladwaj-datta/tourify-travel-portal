import { convertToModelMessages, createUIMessageStream, createUIMessageStreamResponse, generateText, type UIMessage } from 'ai'

export const maxDuration = 30

const fallbackAnswer = (text: string) => {
  const normalized = text.toLowerCase()
  if (normalized.includes('contact') || normalized.includes('phone') || normalized.includes('email')) return 'You can reach the Tourify team at support@tourify.travel. Phone support is being configured for the launch. For live travel results, connect a provider from the project settings and Tourify will keep every fare and availability result honest.'
  if (normalized.includes('cheap') || normalized.includes('budget') || normalized.includes('route')) return 'Tourify compares available flight options first, then highlights lower-cost train and bus alternatives when providers return them. Add your origin, destination, dates, and budget in the search panel to start.'
  if (normalized.includes('live') || normalized.includes('fare') || normalized.includes('price')) return 'Tourify is designed for live-first search. It only displays fares and availability returned by connected providers, so unconfigured categories are marked clearly instead of showing sample inventory.'
  return 'I can help with route comparisons, budget-aware stays, live search setup, and contacting Tourify. Try asking about cheaper routes, live fares, or support.'
}

function messageResponse(text: string) {
  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      execute({ writer }) {
        writer.write({ type: 'start' })
        writer.write({ type: 'text-start', id: 'tourify-answer' })
        writer.write({ type: 'text-delta', id: 'tourify-answer', delta: text })
        writer.write({ type: 'text-end', id: 'tourify-answer' })
        writer.write({ type: 'finish-step' })
        writer.write({ type: 'finish', finishReason: 'stop' })
      },
    }),
  })
}

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json()
  const latest = messages.at(-1)
  const latestText = latest?.parts?.filter((part) => part.type === 'text').map((part) => part.text).join(' ') ?? ''

  if (!process.env.AI_GATEWAY_API_KEY) return messageResponse(fallbackAnswer(latestText))

  try {
    const result = await generateText({
      model: 'openai/gpt-5-mini',
      system: 'You are Tourify guide, a concise and trustworthy travel customer-support assistant for India-first route comparison. Never invent current fares, availability, hotel contacts, or provider results. Explain that live data depends on connected providers. Help with flights, trains, buses, stays, budgets, and Tourify support. Official support email: support@tourify.travel. Phone support is being configured.',
      messages: await convertToModelMessages(messages),
      temperature: 0.3,
    })
    return messageResponse(result.text)
  } catch {
    return messageResponse(fallbackAnswer(latestText))
  }
}
