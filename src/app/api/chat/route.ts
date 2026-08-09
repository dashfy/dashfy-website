import { openai } from '@ai-sdk/openai'
import type { UIMessage } from 'ai'
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai'

import { siteConfig } from '@/config/site'
import { getLlmsFullText } from '@/lib/llmsFull'
import { rateLimit } from '@/lib/rateLimit'

export const maxDuration = 30

const DEFAULT_MODEL = 'gpt-4o-mini'
/** Older turns are dropped so a long conversation cannot keep inflating the bill. */
const MAX_HISTORY_MESSAGES = 10

const INSTRUCTIONS = `You are the ${siteConfig.name} documentation assistant. The documentation above is your only source of truth.

- Answer strictly from that documentation. If it does not cover the question, say so plainly and point to the closest relevant page instead of guessing.
- Never invent commands, configuration keys, package names, or APIs. If you are unsure whether something exists, say you are unsure.
- Cite the pages you used as markdown links with their root-relative URLs, for example [CLI](/docs/cli). Each page's URL is in the heading that introduces it.
- Prefer short answers with a code block when a command or snippet answers the question. Match the package manager the user asks about; default to npm.
- Format responses as markdown. The documentation writes terminal commands in \`npm\` code fences, which is an internal authoring convention — use \`bash\` fences in your answers instead.`

interface ChatRequestBody {
  messages?: UIMessage[]
}

/** A blank env var or header carries no more meaning than a missing one. */
const blankToUndefined = (value: string | null | undefined) => {
  const trimmed = value?.trim()

  return trimmed !== undefined && trimmed.length > 0 ? trimmed : undefined
}

const getClientId = (request: Request) =>
  blankToUndefined(request.headers.get('x-forwarded-for')?.split(',')[0]) ?? 'unknown'

export const POST = async (request: Request) => {
  if (!process.env.OPENAI_API_KEY) {
    return new Response('Ask AI is not configured on this deployment.', { status: 503 })
  }

  const { allowed, retryAfterSeconds } = rateLimit(getClientId(request))

  if (!allowed) {
    return new Response('Too many questions in a short time. Please wait a moment.', {
      status: 429,
      headers: {
        'Retry-After': String(retryAfterSeconds),
      },
    })
  }

  const body = (await request.json().catch(() => null)) as ChatRequestBody | null

  if (!Array.isArray(body?.messages)) {
    return new Response('Expected a JSON body with a messages array.', { status: 400 })
  }

  const result = streamText({
    // The corpus goes first so the static prefix stays cacheable, with the
    // instructions last where they sit closest to the user's question.
    system: `${await getLlmsFullText()}\n\n${INSTRUCTIONS}`,
    model: openai(blankToUndefined(process.env.OPENAI_MODEL) ?? DEFAULT_MODEL),
    messages: await convertToModelMessages(body.messages.slice(-MAX_HISTORY_MESSAGES)),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  })
}
