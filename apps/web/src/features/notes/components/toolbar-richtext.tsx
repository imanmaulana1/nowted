import { Separator } from '@/shared/components/ui/separator'
import { useEditorState, type Editor } from '@tiptap/react'
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  ListTodo,
  SeparatorHorizontal,
  Strikethrough,
  Underline,
} from 'lucide-react'

import type { ToolbarItem } from '../types/toolbar.type'
import { ToolbarRichTextGroup } from './toolbar-richtext-group'

type ToolbarRichTextProps = {
  editor: Editor
}

export function ToolbarRichText({ editor }: ToolbarRichTextProps) {
  const activeStates = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) return null
      return {
        h1: ctx.editor.isActive('heading', { level: 1 }),
        h2: ctx.editor.isActive('heading', { level: 2 }),
        h3: ctx.editor.isActive('heading', { level: 3 }),
        h4: ctx.editor.isActive('heading', { level: 4 }),
        bold: ctx.editor.isActive('bold'),
        italic: ctx.editor.isActive('italic'),
        underline: ctx.editor.isActive('underline'),
        strike: ctx.editor.isActive('strike'),
        highlight: ctx.editor.isActive('highlight'),
        bulletList: ctx.editor.isActive('bulletList'),
        orderedList: ctx.editor.isActive('orderedList'),
        taskList: ctx.editor.isActive('taskList'),
      }
    },
    equalityFn: (prev, next) => JSON.stringify(prev) === JSON.stringify(next),
  })

  const groups: Record<string, ToolbarItem[]> = {
    headings: [
      {
        title: 'Heading 1',
        icon: Heading1,
        onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: activeStates?.h1,
      },
      {
        title: 'Heading 2',
        icon: Heading2,
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: activeStates?.h2,
      },
      {
        title: 'Heading 3',
        icon: Heading3,
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: activeStates?.h3,
      },
      {
        title: 'Heading 4',
        icon: Heading4,
        onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
        isActive: activeStates?.h4,
      },
    ],
    inline: [
      {
        title: 'Bold',
        icon: Bold,
        onClick: () => editor.chain().focus().toggleBold().run(),
        isActive: activeStates?.bold,
      },
      {
        title: 'Italic',
        icon: Italic,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        isActive: activeStates?.italic,
      },
      {
        title: 'Underline',
        icon: Underline,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        isActive: activeStates?.underline,
      },
      {
        title: 'Strikethrough',
        icon: Strikethrough,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        isActive: activeStates?.strike,
      },
      {
        title: 'Highlight',
        icon: Highlighter,
        onClick: () => editor.chain().focus().toggleHighlight().run(),
        isActive: activeStates?.highlight,
      },
    ],
    lists: [
      {
        title: 'Bullet List',
        icon: List,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        isActive: activeStates?.bulletList,
      },
      {
        title: 'Numbered List',
        icon: ListOrdered,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: activeStates?.orderedList,
      },
      {
        title: 'Task List',
        icon: ListTodo,
        onClick: () => editor.chain().focus().toggleTaskList().run(),
        isActive: activeStates?.taskList,
      },
    ],
    insert: [
      {
        title: 'Horizontal Line',
        icon: SeparatorHorizontal,
        onClick: () => editor.chain().focus().setHorizontalRule().run(),
      },
      {
        title: 'Code Block',
        icon: Code,
        onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      },
    ],
  }

  return (
    <div className='border-border/50 bg-card/30 flex items-center gap-1 overflow-x-auto border-b p-2 backdrop-blur-sm'>
      <ToolbarRichTextGroup items={groups.headings} />
      <Separator orientation='vertical' className='my-auto h-5' />

      <ToolbarRichTextGroup items={groups.inline} />
      <Separator orientation='vertical' className='my-auto h-5' />

      <ToolbarRichTextGroup items={groups.lists} />
      <Separator orientation='vertical' className='my-auto h-5' />

      <ToolbarRichTextGroup items={groups.insert} />
    </div>
  )
}
