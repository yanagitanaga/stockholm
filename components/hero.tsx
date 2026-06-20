'use client'

function FloatingShapes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* circle - upper left */}
      <div className="animate-float-y absolute left-[8%] top-[22%]">
        <div className="animate-spin-slow h-40 w-40 rounded-full border border-white/15 md:h-56 md:w-56" />
      </div>

      {/* square - upper right */}
      <div className="animate-float-y absolute right-[10%] top-[18%] [animation-delay:-3s]">
        <div className="animate-spin-slower h-32 w-32 border border-white/15 md:h-44 md:w-44" />
      </div>

      {/* octagon - lower left */}
      <div className="animate-float-y absolute bottom-[14%] left-[16%] [animation-delay:-5s]">
        <svg viewBox="0 0 100 100" className="animate-spin-slow h-36 w-36 md:h-52 md:w-52">
          <polygon
            points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30"
            fill="none"
            stroke="white"
            strokeOpacity="0.15"
            strokeWidth="0.6"
          />
        </svg>
      </div>

      {/* small circle - lower right */}
      <div className="animate-float-y absolute bottom-[20%] right-[14%] [animation-delay:-2s]">
        <div className="animate-spin-slower h-24 w-24 rounded-full border border-white/10 md:h-32 md:w-32" />
      </div>

      {/* star - left center */}
      <div className="animate-float-y absolute left-[2%] top-[50%] [animation-delay:-7s]">
        <svg viewBox="0 0 100 100" className="animate-spin-slower h-28 w-28 md:h-40 md:w-40">
          <polygon
            points="50,3 62,34 95,36 69,56 78,88 50,70 22,88 31,56 5,36 38,34"
            fill="none"
            stroke="white"
            strokeOpacity="0.12"
            strokeWidth="0.7"
          />
        </svg>
      </div>

      {/* triangle - right center */}
      <div className="animate-float-y absolute right-[3%] top-[44%] [animation-delay:-4s]">
        <svg viewBox="0 0 100 100" className="animate-spin-slow h-24 w-24 md:h-36 md:w-36">
          <polygon
            points="50,5 95,88 5,88"
            fill="none"
            stroke="white"
            strokeOpacity="0.12"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* diamond - top center-right */}
      <div className="animate-float-y absolute right-[30%] top-[6%] [animation-delay:-6s]">
        <svg viewBox="0 0 100 100" className="animate-spin-slower h-16 w-16 md:h-24 md:w-24">
          <polygon
            points="50,5 95,50 50,95 5,50"
            fill="none"
            stroke="white"
            strokeOpacity="0.10"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* pentagon - bottom center */}
      <div className="animate-float-y absolute bottom-[5%] left-[44%] [animation-delay:-8s]">
        <svg viewBox="0 0 100 100" className="animate-spin-slow h-16 w-16 md:h-20 md:w-20">
          <polygon
            points="50,3 97,35 79,91 21,91 3,35"
            fill="none"
            stroke="white"
            strokeOpacity="0.10"
            strokeWidth="0.8"
          />
        </svg>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <FloatingShapes />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
          Motion Designer &amp; Video Editor
        </p>
        <h1 className="text-balance text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          RAW FOOTAGE
          <br />
          INTO{' '}
          <span className="font-serif text-[1.08em] font-normal italic">
            sales
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Hello Partner. I turn your footage into engaging and dynamic stories that grow audiences
          and boost your sales.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#portfolio"
            className="rounded-full bg-primary px-7 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-85"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-7 py-3 text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
          >
            Start a Project
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Scroll
      </div>
    </section>
  )
}