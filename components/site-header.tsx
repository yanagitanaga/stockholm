'use client'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Clients', href: '#clients' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'border-b border-border bg-black/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:grid md:grid-cols-3 lg:px-8">
        <a
          href="#top"
          className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl"
        >
          yanagitanaga
        </a>
        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex justify-end">
          <a
            href="#contact"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  )
}
