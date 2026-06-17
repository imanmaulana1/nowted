import { useForm } from '@tanstack/react-form'
import { EditorContent, useEditor } from '@tiptap/react'

import { Field, FieldError } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Separator } from '@/shared/components/ui/separator'

import { EMPTY_DOC } from '../constants/note-content'
import { EXTENSIONS } from '../lib/tiptap-extensions'
import { noteInputSchema, type NoteInput } from '../schemas/note-input.schema'
import { ToolbarCreateOrUpdate } from './toolbar-create-or-update'
import { ToolbarRichText } from './toolbar-richtext'

type NoteFormProps = {
  mode: 'create' | 'update'
  defaultValues?: NoteInput
  isFullscreen: boolean
  onFullscreen: () => void
  onSubmit: (values: NoteInput) => Promise<void> | void
  onCancel: () => void
  isLoading: boolean
  submitLabel?: string
}

export function NoteForm({
  mode,
  defaultValues = {
    title: 'Untitled',
    content: EMPTY_DOC,
    plainText: '',
    folderId: null,
  },
  isFullscreen,
  onFullscreen,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: NoteFormProps) {
  const form = useForm({
    defaultValues: defaultValues as NoteInput,
    validators: {
      onSubmit: noteInputSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value)
    },
  })

  const editor = useEditor({
    extensions: EXTENSIONS,
    content: defaultValues.content || EMPTY_DOC,
    editorProps: {
      attributes: {
        class:
          'prose prose-neutral dark:prose-invert text-foreground prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-3 prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2 prose-p:my-3 prose-p:leading-7 prose-a:text-primary hover:prose-a:text-primary/80 prose-a:underline-offset-4 prose-blockquote:my-5 prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-hr:my-8 prose-hr:border-border prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-li:marker:text-foreground/70 dark:prose-li:marker:text-foreground/70 prose-img:rounded-lg max-w-none leading-relaxed outline-none min-h-[400px] pb-32 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      form.setFieldValue('content', editor.getJSON())
      form.setFieldValue('plainText', editor.getText().trim())
    },
  })

  const activeSubmitLabel =
    submitLabel || (mode === 'create' ? 'Save Note' : 'Update Note')

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    form.handleSubmit()
  }

  return (
    <div className='bg-background flex h-full flex-col overflow-hidden'>
      <form id='note-form' className='flex h-full flex-col overflow-hidden'>
        <header className='border-border/50 bg-card/10 border-b p-3 backdrop-blur-sm'>
          <form.Field
            name='folderId'
            children={() => (
              <ToolbarCreateOrUpdate
                isLoading={isLoading}
                isFullscreen={isFullscreen}
                onFullscreen={onFullscreen}
                onClose={onCancel}
                onSubmit={handleSubmit}
                submitLabel={activeSubmitLabel}
              />
            )}
          />
        </header>

        <ToolbarRichText editor={editor} />

        <ScrollArea className='min-h-0 flex-1'>
          <main className='mx-auto w-full max-w-2xl px-8 py-10 pb-24'>
            <div className='space-y-6'>
              <form.Field
                name='title'
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  const handleChange = (
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    field.handleChange(e.target.value)
                  }

                  return (
                    <Field
                      data-invalid={isInvalid}
                      className='w-full space-y-1'>
                      <label
                        htmlFor={field.name}
                        className='text-muted-foreground/50 text-[10px] font-semibold tracking-wider uppercase'>
                        Note Title
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={handleChange}
                        placeholder='Untitled Note'
                        aria-invalid={isInvalid}
                        className='placeholder:text-muted-foreground/20 h-auto w-full border-none bg-transparent p-0 text-lg font-semibold tracking-tight shadow-none focus-visible:ring-0 dark:bg-transparent'
                        autoFocus
                      />
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                          className='mt-1'
                        />
                      )}
                    </Field>
                  )
                }}
              />

              <Separator />

              <form.Field
                name='content'
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid} className='w-full'>
                      <EditorContent editor={editor} />
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                          className='mt-1'
                        />
                      )}
                    </Field>
                  )
                }}
              />
            </div>
          </main>
        </ScrollArea>
      </form>
    </div>
  )
}
