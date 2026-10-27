import type { CollectionEntry } from 'astro:content'
import type { Lang } from '@/i18n/ui'

export type DailyEntry = CollectionEntry<'daily'>
export type DailyCategory = 'github' | 'ai'
export type DailyFilter = 'all' | DailyCategory
export type DailyGroup = { date: string; entries: DailyEntry[] }

export const dailyCategories: DailyCategory[] = ['github', 'ai']
export const dailyPageSize = 7
export const dailyLabels = {
  zh: { all: '全部', github: 'GitHub 宝藏', ai: 'AI 前沿情报' },
  en: { all: 'All', github: 'GitHub finds', ai: 'AI briefing' }
} as const

export function dailyDateKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

export function dailyIssueHref(entry: DailyEntry) {
  return `/curated/${entry.data.category}/${dailyDateKey(entry.data.date)}`
}

export function dailyArchiveHref(filter: DailyFilter = 'all', page = 1, lang: Lang = 'zh') {
  const root = lang === 'en' ? '/en/curated' : '/curated'
  const category = filter === 'all' ? '' : `/${filter}`
  return `${root}${category}${page > 1 ? `/page/${page}` : ''}`
}

export function publishedDailyEntries(entries: DailyEntry[]) {
  return entries
    .filter((entry) => !entry.data.draft)
    .sort(
      (a, b) =>
        b.data.date.getTime() - a.data.date.getTime() ||
        dailyCategories.indexOf(a.data.category) - dailyCategories.indexOf(b.data.category)
    )
}

export function latestDailyEntries(entries: DailyEntry[]) {
  const published = publishedDailyEntries(entries)
  return dailyCategories.flatMap((category) => {
    const latest = published.find((entry) => entry.data.category === category)
    return latest ? [latest] : []
  })
}

export function groupDailyEntries(
  entries: DailyEntry[],
  filter: DailyFilter = 'all'
): DailyGroup[] {
  const groups = new Map<string, DailyEntry[]>()
  for (const entry of publishedDailyEntries(entries)) {
    if (filter !== 'all' && entry.data.category !== filter) continue
    const date = dailyDateKey(entry.data.date)
    const group = groups.get(date) ?? []
    group.push(entry)
    groups.set(date, group)
  }
  return [...groups].map(([date, entries]) => ({ date, entries }))
}

export function dailyArchivePages(entries: DailyEntry[], pageSize = dailyPageSize) {
  const filters: DailyFilter[] = ['all', ...dailyCategories]
  return filters.flatMap((filter) => {
    const groups = groupDailyEntries(entries, filter)
    const totalPages = Math.max(1, Math.ceil(groups.length / pageSize))
    return Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1
      const path = dailyArchiveHref(filter, page).replace(/^\/curated\/?/, '')
      return {
        params: { archive: path || undefined },
        props: {
          filter,
          page,
          totalPages,
          groups: groups.slice(index * pageSize, page * pageSize)
        }
      }
    })
  })
}
