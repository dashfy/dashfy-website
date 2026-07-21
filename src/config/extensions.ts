import type { LucideIcon } from 'lucide-react'
import aws from 'thesvg/aws'
import claudeAi from 'thesvg/claude-ai'
import cloudflare from 'thesvg/cloudflare'
import cursor from 'thesvg/cursor'
import datadog from 'thesvg/datadog'
import discord from 'thesvg/discord'
import docker from 'thesvg/docker'
import firebase from 'thesvg/firebase'
import gemini from 'thesvg/gemini'
import github from 'thesvg/github'
import gitlab from 'thesvg/gitlab'
import googleSheets from 'thesvg/google-sheets'
import grafana from 'thesvg/grafana'
import jira from 'thesvg/jira'
import json from 'thesvg/json'
import kubernetes from 'thesvg/kubernetes'
import mongodb from 'thesvg/mongodb'
import nba from 'thesvg/nba'
import notion from 'thesvg/notion'
import openAi from 'thesvg/openai'
import openClaw from 'thesvg/openclaw'
import postgresql from 'thesvg/postgresql'
import prometheus from 'thesvg/prometheus'
import redis from 'thesvg/redis'
import resend from 'thesvg/resend'
import sentry from 'thesvg/sentry'
import slack from 'thesvg/slack'
import stripe from 'thesvg/stripe'
import supabase from 'thesvg/supabase'
import telegram from 'thesvg/telegram'
import vercel from 'thesvg/vercel'

import { CpuIcon, TrendingUpIcon } from '@/components/common/Icons'
import { siteConfig } from '@/config/site'
import type { ThemedSvg } from '@/lib/thesvg'
import { getThemedSvg } from '@/lib/thesvg'

export type ExtensionLogo =
  | LucideIcon
  | React.ComponentType<{ className?: string }>
  | string
  | ThemedSvg

export interface Extension {
  id: string
  label: string
  logo?: ExtensionLogo
  available?: boolean
}

export const EXTENSION_PREFIX = 'dashfy-'

const byLabel = (a: Extension, b: Extension) =>
  a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })

export const EXTENSIONS_ROW_ONE: Extension[] = [
  { id: 'ext-aws', label: 'AWS', logo: aws.svg },
  { id: 'ext-claude-ai', label: 'Claude AI', logo: claudeAi.svg },
  { id: 'ext-github', label: 'GitHub', logo: getThemedSvg(github), available: true },
  { id: 'ext-grafana', label: 'Grafana', logo: grafana.svg },
  { id: 'ext-json', label: 'JSON / REST', logo: json.svg, available: true },
  { id: 'ext-market-live', label: 'Market Live', logo: TrendingUpIcon, available: true },
  { id: 'ext-mongodb', label: 'MongoDB', logo: mongodb.svg },
  { id: 'ext-nba', label: 'NBA', logo: nba.svg, available: true },
  { id: 'ext-notion', label: 'Notion', logo: notion.svg },
  { id: 'ext-postgresql', label: 'PostgreSQL', logo: postgresql.svg },
  { id: 'ext-prometheus', label: 'Prometheus', logo: prometheus.svg },
  { id: 'ext-sentry', label: 'Sentry', logo: sentry.svg },
  { id: 'ext-slack', label: 'Slack', logo: slack.svg },
  { id: 'ext-stripe', label: 'Stripe', logo: stripe.svg },
  { id: 'ext-system', label: 'System Monitoring', logo: CpuIcon, available: true },
  { id: 'ext-vercel', label: 'Vercel', logo: getThemedSvg(vercel) },
].sort(byLabel)

export const EXTENSIONS_ROW_TWO: Extension[] = [
  { id: 'ext-cloudflare', label: 'Cloudflare', logo: cloudflare.svg },
  { id: 'ext-cursor', label: 'Cursor', logo: cursor.svg },
  { id: 'ext-datadog', label: 'Datadog', logo: datadog.svg },
  { id: 'ext-discord', label: 'Discord', logo: discord.svg },
  { id: 'ext-docker', label: 'Docker', logo: docker.svg },
  { id: 'ext-firebase', label: 'Firebase', logo: firebase.svg },
  { id: 'ext-gemini', label: 'Gemini', logo: gemini.svg },
  { id: 'ext-gitlab', label: 'GitLab', logo: gitlab.svg },
  { id: 'ext-google-sheets', label: 'Google Sheets', logo: googleSheets.svg },
  { id: 'ext-jira', label: 'Jira', logo: jira.svg },
  { id: 'ext-kubernetes', label: 'Kubernetes', logo: kubernetes.svg },
  { id: 'ext-open-claw', label: 'Open Claw', logo: openClaw.svg },
  { id: 'ext-openai', label: 'OpenAI', logo: getThemedSvg(openAi) },
  { id: 'ext-redis', label: 'Redis', logo: redis.svg },
  { id: 'ext-resend', label: 'Resend', logo: getThemedSvg(resend) },
  { id: 'ext-supabase', label: 'Supabase', logo: supabase.svg },
  { id: 'ext-telegram', label: 'Telegram', logo: telegram.svg },
].sort(byLabel)

export const EXTENSIONS: Extension[] = [...EXTENSIONS_ROW_ONE, ...EXTENSIONS_ROW_TWO].sort(byLabel)

export const getExtensionGitHubUrl = (id: string) =>
  `${siteConfig.links.github}/${EXTENSION_PREFIX}${id}`
