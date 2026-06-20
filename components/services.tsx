import {
  Clapperboard,
  Scissors,
  Layers,
  Sparkles,
  Share2,
  Compass,
} from 'lucide-react'

const services = [
  {
    no: '01',
    title: 'Motion Graphics',
    icon: Clapperboard,
    desc: 'Kinetic typography, animated logos, and graphic systems that move with intent.',
  },
  {
    no: '02',
    title: 'Video Editing',
    icon: Scissors,
    desc: 'Story-first editing - pacing, rhythm, and cuts that hold attention end to end.',
  },
  {
    no: '03',
    title: 'Retention & Conversion',
    icon: Layers,
    desc: 'Content engineered to maximize watch time and convert - from paid ads to long-form commercial content.',
  },
  {
    no: '04',
    title: 'Color Grading',
    icon: Sparkles,
    desc: 'Mood-first grading - shot consistency, deepened atmosphere, that makes every frame feel intentional.',
  },
  {
    no: '05',
    title: 'Social Content',
    icon: Share2,
    desc: 'Short-form vertical edits and performative creatives designed to stop the scroll and drive engagement.',
  },
  {
    no: '06',
    title: 'Creative Direction',
    icon: Compass,
    desc: 'Concept to delivery - shaping the visual language behind the whole piece.',
  },
]

export function Services() {
  return (
    <section id="services" className="border-t border-border bg-background px-6 py-28">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              02 — Services
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              WHAT I DO
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            Complete video production — every skill needed to grab the attention and sell the product.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.no}
              className="group flex flex-col bg-card p-8 transition-colors hover:bg-secondary"
            >
              <div className="mb-8 flex items-center justify-between">
                <s.icon className="h-6 w-6 text-foreground" />
                <span className="font-mono text-sm text-muted-foreground">
                  {s.no}
                </span>
              </div>
              <h3 className="mb-3 text-xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}