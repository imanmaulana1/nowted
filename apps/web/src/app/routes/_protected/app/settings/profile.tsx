import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { meQueryOptions } from '@/features/auth/lib/query-options'
import { ProfileForm } from '@/features/users/components/profile-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

export const Route = createFileRoute('/_protected/app/settings/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user } = useSuspenseQuery(meQueryOptions())

  return (
    <Card className='border-muted/40 shadow-sm'>
      <CardHeader>
        <CardTitle className='text-xl tracking-tight'>
          Profile Information
        </CardTitle>
        <CardDescription>
          Update your public profile details and avatar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm user={user} />
      </CardContent>
    </Card>
  )
}
