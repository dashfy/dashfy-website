import { getLlmsIndex } from '@/lib/llmsIndex'

export const revalidate = false

export const GET = () =>
  new Response(getLlmsIndex(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
