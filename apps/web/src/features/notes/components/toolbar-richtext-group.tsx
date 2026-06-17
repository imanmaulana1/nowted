import type { ToolbarItem } from '../types/toolbar.type'
import { ToolbarAction } from './toolbar-action'

type ToolbarRichTextGroupProps = {
  items: ToolbarItem[]
}

export function ToolbarRichTextGroup({ items }: ToolbarRichTextGroupProps) {
  return (
    <>
      {items.map((item) => {
        const Icon = item.icon
        return (
          <ToolbarAction
            key={item.title}
            title={item.title}
            onClick={item.onClick}
            className={
              item.isActive ? 'bg-muted text-foreground border-border/50' : ''
            }>
            <Icon className='size-4' />
          </ToolbarAction>
        )
      })}
    </>
  )
}
