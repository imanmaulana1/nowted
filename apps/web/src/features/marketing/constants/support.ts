import { HelpCircle } from 'lucide-react'

import type { FAQItem } from '../types/marketing.type'

export const faqItems: FAQItem[] = [
  {
    question: 'Is Nowted free to use?',
    answer:
      'Yes, Nowted is free for personal use! You can organize folders, write rich markdown notes, use shortcuts, and manage your trash/archive with no cost.',
    icon: HelpCircle,
  },
  {
    question: 'Can I export my notes?',
    answer:
      'Absolutely. You can export any note directly to Markdown format (.md) with a single click from the note detail action toolbar, ensuring you own your own content.',
    icon: HelpCircle,
  },
  {
    question: 'Where is my data stored?',
    answer:
      'Your notes are securely stored on our secure cloud database, synced automatically in real-time across your login sessions so you never lose progress.',
    icon: HelpCircle,
  },
]
