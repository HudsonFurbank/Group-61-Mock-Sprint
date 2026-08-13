'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail } = useAuth()
  const [credentialError, setCredentialError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    setCredentialError(null)
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/dashboard')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        setCredentialError('Incorrect email or password')
      }
    }
  }

  return (
    <div className="space-y-6 rounded-[12px] border border-surface-border bg-surface-card p-8 shadow-lg">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-text-primary">Sign in</h1>
        <p className="text-sm text-text-muted">Welcome back</p>
      </div>

      {credentialError && (
        <div
          role="alert"
          className="rounded-[6px] border border-error-border bg-error-border/10 px-4 py-2.5 text-sm text-error-text"
        >
          {credentialError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-text-primary">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="w-full rounded-[6px] border border-surface-border bg-surface-page px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-500 focus:outline-none aria-invalid:border-error-border"
            placeholder="you@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-error-text" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium text-text-primary">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className="w-full rounded-[6px] border border-surface-border bg-surface-page px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-500 focus:outline-none aria-invalid:border-error-border"
            placeholder="••••••••"
            {...register('password')}
          />
          {errors.password && (
            <p id="password-error" className="text-xs text-error-text" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-[6px] bg-brand-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-500/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-center text-sm text-text-muted">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="font-medium text-brand-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}