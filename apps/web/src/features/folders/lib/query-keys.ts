export const foldersQueryKeys = {
  all: ['folders'] as const,
  lists: () => [...foldersQueryKeys.all, 'list'] as const,
}
