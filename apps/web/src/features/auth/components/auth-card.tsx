import { Link } from '@tanstack/react-router'
import { cva, type VariantProps } from 'class-variance-authority'

import { Logo } from '@/shared/components/logo'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'

const authCardVariants = cva(
  'bg-background w-full shadow-xl sm:rounded-2xl border border-border/60',
  {
    variants: {
      animation: {
        none: '',
        fade: 'animate-in fade-in duration-500 ease-out',
      },
      direction: {
        none: '',
        top: 'slide-in-from-top-8',
        bottom: 'slide-in-from-bottom-8',
        left: 'slide-in-from-left-8',
        right: 'slide-in-from-right-8',
      },
    },
    defaultVariants: {
      animation: 'fade',
      direction: 'bottom',
    },
  }
)

type AuthCardProps = {
  title: string
  description: string
  children: React.ReactNode
  footer?: {
    text: string
    linkText: string
    linkHref: string
  }
} & VariantProps<typeof authCardVariants>

export function AuthCard({
  title,
  description,
  footer,
  children,
  animation,
  direction,
}: AuthCardProps) {
  return (
    <Card className={cn(authCardVariants({ animation, direction }))}>
      <CardHeader className='flex flex-col items-center pb-2 text-center'>
        <div className='mb-4 flex justify-center'>
          <Link to='/'>
            <Logo />
          </Link>
        </div>
        <CardTitle className='text-foreground text-2xl font-bold tracking-tight'>
          {title}
        </CardTitle>
        <CardDescription className='text-muted-foreground mt-1.5'>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && (
        <CardFooter className='border-border/40 justify-center border-t pt-6 pb-2'>
          <p className='text-muted-foreground text-sm font-light'>
            {footer.text}{' '}
            <Link
              to={footer.linkHref}
              className='font-semibold text-indigo-600 transition-colors hover:underline dark:text-indigo-400'>
              {footer.linkText}
            </Link>
          </p>
        </CardFooter>
      )}
    </Card>
  )
}
