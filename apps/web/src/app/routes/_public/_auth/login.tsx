import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { AuthCard } from '@/features/auth/components/auth-card'
import { LoginForm } from '@/features/auth/components/login-form'
import { loginSearchSchema } from '@/features/auth/schemas/login-search-query.schema'

export const Route = createFileRoute('/_public/_auth/login')({
  validateSearch: (search) => loginSearchSchema.parse(search),
  component: LoginPage,
})

function LoginPage() {
  const { reason } = Route.useSearch()
  const router = useRouter()

  useEffect(() => {
    if (reason === 'session_expired') {
      toast.error('Session expired', {
        description: 'Please sign in again to continue accessing your notes',
      })

      router.navigate({
        to: '/login',
        search: (prev) => ({ ...prev, reason: undefined }),
        replace: true,
      })
    }
  }, [reason, router])

  return (
    <AuthCard
      title='Welcome back'
      description='Sign in to your account'
      direction='bottom'
      footer={{
        text: "Dont't have an account?",
        linkHref: '/register',
        linkText: 'register',
      }}>
      <LoginForm />
    </AuthCard>
  )
}
