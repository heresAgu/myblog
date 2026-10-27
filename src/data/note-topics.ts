export interface NoteTopic {
  id: string
  title: string
  description: string
  descriptionEn: string
  href: string
}

// Register a topic here when its notes and reading route are ready.
const topics: NoteTopic[] = [
  {
    id: 'csapp',
    title: 'CSAPP',
    description: '深入理解计算机系统',
    descriptionEn: 'Computer systems and machine-level programming',
    href: '/notes/csapp'
  }
]

export function getNoteTopics(entries: readonly { id: string }[]) {
  return topics
    .map((topic) => ({
      ...topic,
      count: entries.filter((entry) => entry.id.startsWith(`${topic.id}/`)).length
    }))
    .filter((topic) => topic.count > 0)
}
