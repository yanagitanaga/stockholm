const clients = [
  { name: 'Оскар Хартманн', subs: '590K', niche: 'Business', platform: 'YouTube' },
  { name: 'Дмитрий Кокорев', subs: '121K', niche: 'Finance', platform: 'YouTube' },
  { name: 'Живой Путь', subs: '30K', niche: 'Finance', platform: 'YouTube' },
  { name: 'Живой Трейдер', subs: '22K', niche: 'Finance', platform: 'YouTube' },
  { name: 'Movies Explained', subs: '86K', niche: 'Movies', platform: 'YouTube' },
  { name: 'Music Explained', subs: '15K', niche: 'Music', platform: 'YouTube' },
  { name: 'Rap Thread', subs: '42K', niche: 'Music', platform: 'YouTube' },
  { name: 'Trap Explains', subs: '12K', niche: 'Music', platform: 'YouTube' },
  { name: 'Wishmaster', subs: '55K', niche: 'Technologies / News', platform: 'YouTube' },
  { name: 'irwwwin', subs: '68K', niche: 'Movies', platform: 'YouTube' },
  { name: 'ADDIS', subs: '3K', niche: 'Entertainment Show', platform: 'YouTube' },
  { name: 'ESN Golf', subs: '35K', niche: 'Sports', platform: 'YouTube' },
  { name: 'yuri.ai', subs: '92K', niche: 'Technologies / AI', platform: 'Instagram' },
  { name: 'dvdnl', subs: '9K', niche: 'Fashion & Style', platform: 'Instagram' },
  { name: 'makeichyk', subs: '2K', niche: 'Real Estate', platform: 'TikTok' },
  { name: 'мелоч', subs: '143K', niche: 'Entertainment', platform: 'YouTube' },
]

export function Clients() {
  return (
    <section
      id="clients"
      className="border-t border-border px-6 py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              03 — Clients
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              PEOPLE I&apos;VE WORKED WITH
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            Over 3+ years working with creators, channels, and brands across the
            world — trusted to deliver high-quality results.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {clients.map(({ name, subs, niche, platform }) => (
            <li
              key={name}
              className="flex flex-col justify-center gap-1 bg-card px-6 py-6 transition-colors hover:bg-secondary"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-medium tracking-tight text-foreground">
                    {name}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {subs} subscribers
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {niche}
                  </span>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {platform}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}