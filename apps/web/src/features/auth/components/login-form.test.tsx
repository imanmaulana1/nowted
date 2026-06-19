import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { LoginForm } from './login-form'

const mockNavigate = vi.fn()
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}))

const mockMutate = vi.fn()
let isPendingMock = false
vi.mock('../hooks/use-login', () => ({
  useLogin: () => ({
    mutate: mockMutate,
    isPending: isPendingMock,
  }),
}))

describe('LoginForm', () => {
  beforeEach(() => {
    isPendingMock = false
    vi.clearAllMocks()
  })

  it('should render form fields and sign-in button', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('should validate form and show error for empty fields on submit', async () => {
    render(<LoginForm />)

    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument()
      expect(
        screen.getByText(/Password must be at least 8 characters long/i)
      ).toBeInTheDocument()
    })
  })

  it('should show error when email format is invalid', async () => {
    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/^email$/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await userEvent.type(emailInput, 'invalid-email')
    await userEvent.type(passwordInput, 'password123')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument()
    })
  })

  it('should show error when password is too short', async () => {
    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/^email$/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await userEvent.type(emailInput, 'john.doe@gmail.com')
    await userEvent.type(passwordInput, '12345')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(/Password must be at least 8 characters long/i)
      ).toBeInTheDocument()
    })
  })

  it('should call useLogin mutation and navigate on successful submit', async () => {
    mockMutate.mockImplementation((_payload, options) => {
      if (options?.onSuccess) {
        options.onSuccess()
      }
    })

    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/^email$/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await userEvent.type(emailInput, 'john.doe@gmail.com')
    await userEvent.type(passwordInput, 'password123')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          email: 'john.doe@gmail.com',
          password: 'password123',
        },
        expect.any(Object)
      )
      expect(mockNavigate).toHaveBeenCalledWith({ to: '/app/notes' })
    })
  })

  it('should show loading spinner and disable submit when login is pending', () => {
    isPendingMock = true
    render(<LoginForm />)

    const submitButton = screen.getByRole('button', {
      name: /signing in\.\.\./i,
    })
    expect(submitButton).toBeDisabled()
    expect(screen.getByText(/signing in\.\.\./i)).toBeInTheDocument()
  })
})
