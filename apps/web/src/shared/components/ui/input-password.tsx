import { useId, useState, type ComponentProps } from 'react'

import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'

type InputPasswordProps = Omit<ComponentProps<'input'>, 'type'>

const InputPassword = ({
  placeholder = '********',
  className,
  value,
  id,
  ...props
}: InputPasswordProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className='relative'>
      <Input
        id={inputId}
        type={isVisible ? 'text' : 'password'}
        placeholder={placeholder}
        className={cn('pr-9', className)}
        value={value ?? ''}
        {...props}
      />
      <Button
        type='button'
        variant='ghost'
        size='icon'
        onClick={() => setIsVisible((prevState) => !prevState)}
        tabIndex={-1}
        className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
        aria-label={isVisible ? 'Hide password' : 'Show password'}>
        {isVisible ? (
          <EyeOffIcon aria-hidden='true' />
        ) : (
          <EyeIcon aria-hidden='true' />
        )}
        <span className='sr-only'>
          {isVisible ? 'Hide password' : 'Show password'}
        </span>
      </Button>
    </div>
  )
}

InputPassword.displayName = 'InputPassword'

export { InputPassword }
