import { createFileRoute } from '@tanstack/react-router'

import { ChangePasswordForm } from '@/features/auth/components/change-password.form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

export const Route = createFileRoute('/_protected/app/settings/account')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card className='border-muted/40 shadow-sm'>
      <CardHeader>
        <CardTitle className='text-xl tracking-tight'>
          Change Password
        </CardTitle>
        <CardDescription>
          Ensure your account is using a long, random password to stay secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm />
      </CardContent>
    </Card>
  )
}
