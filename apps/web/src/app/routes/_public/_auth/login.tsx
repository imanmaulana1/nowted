import { createFileRoute } from '@tanstack/react-router'

import { AuthCard } from '@/features/auth/components/auth-card'
import { LoginForm } from '@/features/auth/components/login-form'

export const Route = createFileRoute('/_public/_auth/login')({
  component: LoginPage,
})

function LoginPage() {
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
