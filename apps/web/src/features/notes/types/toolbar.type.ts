export type ToolbarItem = {
  title: string
  icon: React.ComponentType<{ className?: string }>
  onClick: () => void
  isActive?: boolean
}
