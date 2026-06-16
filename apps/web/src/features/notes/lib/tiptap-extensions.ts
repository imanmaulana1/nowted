import Highlight from '@tiptap/extension-highlight'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'

export const EXTENSIONS = [
  StarterKit.configure({
    codeBlock: {
      HTMLAttributes: {
        class:
          'not-prose w-full bg-muted/50 dark:bg-muted/20 border-border max-w-2xl whitespace-pre-wrap break-words rounded-lg border p-4 font-mono text-sm shadow-sm text-foreground',
      },
    },
    link: {
      openOnClick: true,
      enableClickSelection: true,
      autolink: true,
      defaultProtocol: 'https',
    },
  }),
  Highlight.configure({
    HTMLAttributes: {
      class:
        'rounded-sm bg-yellow-200 px-1 text-neutral-900 dark:bg-yellow-500/30 dark:text-yellow-200',
    },
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: 'not-prose my-6 list-none space-y-2 p-0',
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: 'flex items-start gap-3',
    },
    nested: true,
  }),
  Placeholder.configure({
    placeholder: 'Start writing your note here...',
  }),
  Typography,
]
