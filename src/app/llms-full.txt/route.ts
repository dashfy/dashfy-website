import { getLlmsFullText } from '@/lib/llmsFull'

export const revalidate = false

export const GET = async () => {
  return new Response(await getLlmsFullText(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
