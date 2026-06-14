import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { cn } from '@/shared/lib/utils'

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = ['product', 'support', 'contact']

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('home')
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = [
    { href: '/', label: 'Home', isHash: false, id: 'home' },
    { href: '#product', label: 'Product', isHash: true, id: 'product' },
    { href: '#support', label: 'Support', isHash: true, id: 'support' },
    { href: '#contact', label: 'Contact Us', isHash: true, id: 'contact' },
  ]

  return (
    <nav className='hidden items-center gap-8 text-sm font-medium lg:flex'>
      {navLinks.map((link) => {
        const isActive = activeSection === link.id
        const linkClass = cn(
          'transition-all duration-200 relative py-1 border-b-2 border-transparent hover:text-foreground',
          isActive
            ? 'text-foreground border-indigo-600 dark:border-indigo-400'
            : 'text-muted-foreground'
        )

        return link.isHash ? (
          <a key={link.id} href={link.href} className={linkClass}>
            {link.label}
          </a>
        ) : (
          <Link key={link.id} to={link.href} className={linkClass}>
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
