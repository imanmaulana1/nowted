import type { JSONContent } from '@tiptap/react'
import { renderToReactElement } from '@tiptap/static-renderer'
import { useMemo } from 'react'

import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { cn } from '@/shared/lib/utils'

import { EXTENSIONS } from '../lib/tiptap-extensions'

type NoteDetailProps = {
  content: JSONContent
}

export function NoteDetail({ content }: NoteDetailProps) {
  const output = useMemo(
    () =>
      renderToReactElement({
        extensions: EXTENSIONS,
        content: content,
        options: {
          nodeMapping: {
            codeBlock: ({ children }) => (
              <pre className='not-prose bg-muted/50 dark:bg-muted/20 border-border max-w-2xl overflow-x-auto rounded-lg border p-4 font-mono text-sm shadow-sm'>
                <code className='text-foreground'>{children}</code>
              </pre>
            ),
            taskList: ({ children }) => (
              <ul className='not-prose my-6 list-none space-y-2 p-0'>
                {children}
              </ul>
            ),
            taskItem: ({ node, children }) => {
              const isChecked = node.attrs?.checked
              return (
                <li className='flex items-start gap-3'>
                  <div className='mt-1 flex h-5 items-center'>
                    <input
                      type='checkbox'
                      checked={isChecked}
                      disabled
                      className={cn(
                        'border-border bg-background text-primary accent-primary h-4 w-4 rounded shadow-sm',
                        {
                          'cursor-default': isChecked,
                          'cursor-not-allowed opacity-50': !isChecked,
                        }
                      )}
                    />
                  </div>
                  <div
                    className={cn('flex-1 leading-relaxed [&>p]:m-0', {
                      'text-muted-foreground line-through': isChecked,
                      'text-foreground': !isChecked,
                    })}>
                    {children}
                  </div>
                </li>
              )
            },
          },
          markMapping: {
            highlight: ({ children }) => (
              <mark className='rounded-sm bg-yellow-200 px-1 text-neutral-900 dark:bg-yellow-500/30 dark:text-yellow-200'>
                {children}
              </mark>
            ),
          },
        },
      }),
    [content]
  )

  return (
    <ScrollArea className='bg-background min-h-0 flex-1'>
      <div className='mx-auto w-full max-w-2xl px-8 pb-16'>
        <div className='prose prose-neutral dark:prose-invert text-foreground prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-3 prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2 prose-p:my-3 prose-p:leading-7 prose-a:text-primary hover:prose-a:text-primary/80 prose-a:underline-offset-4 prose-blockquote:my-5 prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-hr:my-8 prose-hr:border-border prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-li:marker:text-foreground/70 dark:prose-li:marker:text-foreground/70 prose-img:rounded-lg min-h-100 max-w-none pb-32 leading-relaxed outline-none focus:outline-none'>
          {output}
        </div>
      </div>
    </ScrollArea>
  )
}
