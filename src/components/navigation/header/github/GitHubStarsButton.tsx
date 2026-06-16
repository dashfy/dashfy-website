import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import { GitHubStarsButtonClient } from './GitHubStarsButtonClient'

const fetchStarsCount = async () => {
  try {
    const data = await fetch('https://api.github.com/repos/dashfy/dashfy', {
      next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
    })

    if (!data.ok) {
      throw new Error(`GitHub API error: ${data.status}`)
    }

    const json = await data.json()
    const starsCount = json.stargazers_count

    if (typeof starsCount !== 'number' || starsCount < 0) {
      throw new Error('Invalid stars count')
    }

    return starsCount
  } catch {
    // Return nothing when GitHub API is unavailable or repo doesn't exist
    return null
  }
}

const StarsCount = async () => {
  const starsCount = await fetchStarsCount()

  if (starsCount === null) {
    return null
  }

  return (
    <span className="w-8 text-xs text-muted-foreground tabular-nums">
      {starsCount >= 1000 ? `${(starsCount / 1000).toFixed(1)}k` : starsCount.toLocaleString()}
    </span>
  )
}

export const GitHubStarsButton = () => {
  return (
    <GitHubStarsButtonClient
      stars={
        <Suspense fallback={<Skeleton className="h-8 w-12" />}>
          <StarsCount />
        </Suspense>
      }
    />
  )
}
