import { describe, expect, test } from 'bun:test'

import {
  dailyArchiveHref,
  dailyArchivePages,
  dailyIssueHref,
  groupDailyEntries,
  latestDailyEntries,
  publishedDailyEntries,
  type DailyEntry
} from './daily'

function entry(category: 'github' | 'ai', date: string, draft = false): DailyEntry {
  return {
    id: `${category}/${date}`,
    collection: 'daily',
    data: {
      title: date,
      description: '',
      category,
      date: new Date(date),
      issue: 1,
      itemCount: 5,
      headline: date,
      source: 'https://example.com/source',
      tags: [],
      draft
    }
  }
}

describe('daily publishing', () => {
  test('drafts never appear in listings or replace the latest published issue', () => {
    const entries = [
      entry('github', '2026-10-21'),
      entry('github', '2026-10-22', true),
      entry('ai', '2026-10-20')
    ]
    expect(publishedDailyEntries(entries)).toHaveLength(2)
    expect(latestDailyEntries(entries).map((issue) => issue.id)).toEqual([
      'github/2026-10-21',
      'ai/2026-10-20'
    ])
    expect(groupDailyEntries(entries).map((group) => group.date)).toEqual([
      '2026-10-21',
      '2026-10-20'
    ])
    expect(entries).toHaveLength(3)
  })

  test('groups both categories by publication day and filters before pagination', () => {
    const entries = [
      entry('ai', '2026-10-21'),
      entry('github', '2026-10-21'),
      entry('ai', '2026-10-20'),
      entry('github', '2026-10-19')
    ]
    const pages = dailyArchivePages(entries, 1)
    const firstPage = pages.find((page) => page.params.archive === undefined)!
    expect(firstPage.props.groups[0].entries.map((issue) => issue.data.category)).toEqual([
      'github',
      'ai'
    ])
    expect(firstPage.props.totalPages).toBe(3)
    const githubPage = pages.find((page) => page.params.archive === 'github/page/2')!
    expect(githubPage.props.totalPages).toBe(2)
    expect(githubPage.props.groups[0].date).toBe('2026-10-19')
    expect(pages.find((page) => page.params.archive === 'page/3')).toBeDefined()
  })

  test('empty categories still have an archive and no placeholder issues', () => {
    expect(latestDailyEntries([])).toEqual([])
    expect(dailyArchivePages([]).map((page) => page.params.archive)).toEqual([
      undefined,
      'github',
      'ai'
    ])
    expect(dailyArchivePages([]).every((page) => page.props.groups.length === 0)).toBe(true)
  })

  test('links preserve category and language across pagination', () => {
    expect(dailyIssueHref(entry('ai', '2026-10-21'))).toBe('/curated/ai/2026-10-21')
    expect(dailyArchiveHref()).toBe('/curated')
    expect(dailyArchiveHref('ai', 1, 'en')).toBe('/en/curated/ai')
    expect(dailyArchiveHref('github', 2)).toBe('/curated/github/page/2')
    expect(dailyArchiveHref('all', 2, 'en')).toBe('/en/curated/page/2')
  })
})
