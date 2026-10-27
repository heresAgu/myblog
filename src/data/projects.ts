import type { Lang } from '@/i18n/ui'

type LocalizedText = Record<Lang, string>

interface ProjectSummary {
  id: string
  name: LocalizedText
  description: LocalizedText
  href: string
  technologies: string[]
}

export const tablensProject = {
  id: 'tablens',
  name: 'TabLens',
  href: 'https://github.com/heresAgu/TabLens',
  guideHref: 'https://github.com/heresAgu/TabLens/blob/main/docs/USER_GUIDE.md',
  subtitle: {
    zh: '吉他六线谱编辑与跟练工具',
    en: 'A guitar TAB editor and practice workspace'
  },
  description: {
    zh: '导入谱图或 PDF，识别后对照原图校正弦号与品位、补录节奏；也可以从空白小节开始写谱，再用播放光标、慢速循环和节拍器跟练。',
    en: 'Import a score image or PDF, then review the recognized notes against the original. Edit strings, frets, and rhythm, or write from a blank measure and practice with a playback cursor, slow loops, and a metronome.'
  },
  technologies: ['Python', 'JavaScript', 'NumPy', 'Pillow'],
  summary: {
    zh: '导入、校对与编辑吉他六线谱，再用变速播放、分段循环和节拍器跟练。',
    en: 'Import, review, and edit guitar TAB, then practice with slower playback, measure loops, and a metronome.'
  },
  usage: {
    zh: '编辑、保存和播放在本机完成。识别新谱图需配置模型接口，识别结果需人工校对。',
    en: 'Editing, saving, and playback run locally. Image recognition needs a configured model API, and recognized notes need manual review.'
  },
  features: [
    {
      title: { zh: '谱图导入', en: 'Import a score' },
      description: {
        zh: '支持图片与 PDF，按小节选择识别范围，也可导入 Agent 生成的乐谱 JSON。',
        en: 'Import images and PDFs, select measures for recognition, or open score JSON prepared by an agent.'
      }
    },
    {
      title: { zh: '对照校谱', en: 'Review and edit' },
      description: {
        zh: '原图与 TAB 对照，逐音编辑弦号、品位和节奏，通过校对清单定位待确认的位置。',
        en: 'Compare TAB with the source image, edit notes and rhythm, and use the review list to find unresolved details.'
      }
    },
    {
      title: { zh: '播放跟练', en: 'Play and practice' },
      description: {
        zh: '本地吉他采样、变速、分段循环与节拍器，配合播放光标跟随当前小节。',
        en: 'Practice with local guitar samples, adjustable speed, measure loops, a metronome, and a moving playback cursor.'
      }
    }
  ]
}

export const learningProjects: ProjectSummary[] = [
  {
    id: 'pytorch-project',
    name: { zh: '经典模型实现', en: 'Classic models in PyTorch' },
    description: {
      zh: 'Transformer、ViT、LLaMA 等经典深度学习模型的实现与学习。',
      en: 'Implementations and study notes for Transformer, ViT, LLaMA, and other deep learning models.'
    },
    href: 'https://github.com/heresAgu/pytorch-project',
    technologies: ['PyTorch', 'Transformer']
  },
  {
    id: 'deep-learning',
    name: { zh: 'Deep Learning / CS224N', en: 'Deep Learning / CS224N' },
    description: {
      zh: '深度学习模型与实验，记录模型实现、训练和相关实验。',
      en: 'Deep learning implementations, training experiments, and coursework.'
    },
    href: 'https://github.com/heresAgu/deep-learning',
    technologies: ['Deep Learning', 'CS224N']
  },
  {
    id: 'fundamental-algorithm',
    name: { zh: '算法基础', en: 'Fundamental algorithms' },
    description: {
      zh: '数据结构与经典算法的学习、实现与练习。',
      en: 'Study, implementation, and practice of data structures and classic algorithms.'
    },
    href: 'https://github.com/heresAgu/Fundamental-Algorithm-Learning-FromAgu',
    technologies: ['C++', 'Algorithms']
  }
]

export const personalProjects: ProjectSummary[] = [
  {
    id: 'bupt-intelligence-calendar',
    name: { zh: '北邮日历', en: 'BUPT Calendar' },
    description: {
      zh: '面向北邮学生的学习与校园日历小程序。',
      en: 'A study and campus calendar mini app for BUPT students.'
    },
    href: 'https://github.com/heresAgu/BUPT-intelligence-calendar',
    technologies: ['Mini Program', 'BUPT']
  }
]
