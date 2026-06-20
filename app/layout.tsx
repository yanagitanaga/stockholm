import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'yanagitanaga — Motion Designer & Video Editor',
  description:
    'Portfolio website of freelance motion designer and video editor — yanagitanaga',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon.ico',
        type: 'image/svg+xml',
      },
    ],
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
