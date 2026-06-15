import type { AuthUser } from '@/features/auth/types/auth.type'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { getInitialName } from '@/shared/lib/utils'

type AvatarUserProps = React.ComponentPropsWithoutRef<typeof Avatar> & {
  user: AuthUser
}

export function AvatarUser({ user, ...avatarProps }: AvatarUserProps) {
  return (
    <Avatar {...avatarProps}>
      <AvatarImage
        src={user.avatarUrl ?? undefined}
        alt={`${user.fullName}'s avatar`}
      />
      <AvatarFallback className='rounded-lg'>
        {getInitialName(user.fullName)}
      </AvatarFallback>
    </Avatar>
  )
}
