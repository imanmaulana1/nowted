import type { JSONContent } from '@tiptap/react'
import { renderToMarkdown } from '@tiptap/static-renderer'

import { EXTENSIONS } from './tiptap-extensions'

export function jsonToMarkdown(content: JSONContent): string {
  if (!content) return ''

  return renderToMarkdown({
    content,
    extensions: EXTENSIONS,
  })
}
