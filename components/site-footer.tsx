const navLinks = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'Twitter', href: 'https://x.com/yanagitanaga' },
  { label: 'Telegram', href: 'https://t.me/yanagitanaga' },
  { label: 'Instagram', href: 'https://instagram.com/yanagitanaga' },
  { label: 'YouTube', href: 'https://www.youtube.com/@yanagitanaga' },
  { label: 'Email', href: 'mailto:yanagitanaga@gmail.com' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start">
          <div>
            <p className="text-lg font-extrabold tracking-tight text-foreground">
              yanagitanaga
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 md:justify-center">
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

          <div className="flex flex-wrap gap-6 md:justify-end">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 yanagitanaga. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
