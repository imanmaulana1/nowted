import { createFileRoute } from '@tanstack/react-router'

import { AuthCard } from '@/features/auth/components/auth-card'
import { RegisterForm } from '@/features/auth/components/register-form'

export const Route = createFileRoute('/_public/_auth/register')({
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <AuthCard
      title='Create an Account'
      description='Sign up to get started'
      direction='top'
      footer={{
        text: 'Already have an account?',
        linkHref: '/login',
        linkText: 'Login',
      }}>
      <RegisterForm />
    </AuthCard>
  )
}
