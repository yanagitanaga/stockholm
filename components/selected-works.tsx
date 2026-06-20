"use client"
import { useRef, useState, useEffect, useCallback, memo } from "react"
type Work = {
  title: string
  category: string
  year: string
  description: string
  poster: string
  video?: string
  className: string
  aspect: string
}
const BASE = 'https://pub-b325cd7755c74afeb7bad689e6c2a752.r2.dev'
const works: Work[] = [
  {
    title: 'Yung Lean Documentary',
    category: 'Documentary',
    year: '2025',
    description: "An intimate portrait of Yung Lean — tracing the artist's journey through creativity, isolation, and reinvention on his own terms.",
    poster: `${BASE}/preview_01.png`,
    video: `${BASE}/01_Yung_Lean.mp4`,
    className: 'md:col-span-3',
    aspect: 'aspect-[16/9]',
  },
  {
    title: 'Your Phone Ain`t Yours',
    category: 'Social Media Content',
    year: '2026',
    description: 'A client project exploring how device ownership ends at the hardware — and why your phone was never fully yours.',
    poster: `${BASE}/preview_02.png`,
    video: `${BASE}/01 Your Phone Ain't Yours.mp4`,
    className: 'md:col-span-1',
    aspect: 'aspect-[9/16]',
  },
  {
    title: 'Movie Budget',
    category: 'Motion Graphics',
    year: '2026',
    description: 'A breakdown of how film budgets are built — from pre-production to the final cut, every line item explained.',
    poster: `${BASE}/preview_03.png`,
    video: `${BASE}/02 Movie Budget.mp4`,
    className: 'md:col-span-1',
    aspect: 'aspect-[9/16]',
  },
  {
    title: 'Luxury Villa Tour',
    category: 'Real Estate Content',
    year: '2026',
    description: 'A client project showcasing a luxury villa — architectural details, interiors, and atmosphere captured on camera.',
    poster: `${BASE}/preview_04.png`,
    video: `${BASE}/03 Vila.mp4`,
    className: 'md:col-span-1',
    aspect: 'aspect-[9/16]',
  },
  {
    title: 'Dean Blunt Documentary',
    category: 'Documentary',
    year: '2024',
    description: 'I tried to find out who Dean Blunt is. He made sure I couldn`t',
    poster: `${BASE}/preview_05.png`,
    video: `${BASE}/02_Dean_Blunt.mp4`,
    className: 'md:col-span-3',
    aspect: 'aspect-[16/9]',
  },
]
// ─── Icons ────────────────────────────────────────────────────────────────────
function IconPlay() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M3 2.5l10 5-10 5z" />
    </svg>
  )
}
function IconPause() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <rect x="3" y="2" width="3" height="11" rx="1" />
      <rect x="9" y="2" width="3" height="11" rx="1" />
    </svg>
  )
}
function IconVolume() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M2.5 5.5H5l3.5-3v10l-3.5-3H2.5v-4z" />
      <path d="M10.5 4.5a4 4 0 010 6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  )
}
function IconMute() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M2.5 5.5H5l3.5-3v10l-3.5-3H2.5v-4z" />
      <path d="M11 5.5l2.5 4M13.5 5.5L11 9.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  )
}
function IconFullscreen() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M1 4.5V1h3.5M9.5 1H13v3.5M13 9.5V13H9.5M4.5 13H1V9.5" />
    </svg>
  )
}
function IconExitFullscreen() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4.5 1v3.5H1M9.5 1v3.5H13M9.5 13V9.5H13M4.5 13V9.5H1" />
    </svg>
  )
}
function fmt(s: number) {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}
// ─── Custom Video Player ──────────────────────────────────────────────────────
function VideoPlayer({ src, poster }: { src: string; poster: string }) {
  const videoRef       = useRef<HTMLVideoElement>(null)
  const containerRef   = useRef<HTMLDivElement>(null)
  const barRef         = useRef<HTMLDivElement>(null)
  const ctrlOverlayRef = useRef<HTMLDivElement>(null)
  const hideTimerRef   = useRef<ReturnType<typeof setTimeout>>()
  const rafRef         = useRef<number>()
  const moveRafRef     = useRef<number>()
  const isPlayingRef   = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted,   setMuted]   = useState(false)
  const [fs,      setFs]      = useState(false)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const timeDisplayRef  = useRef<HTMLSpanElement>(null)
  const showControls = useCallback(() => {
    if (ctrlOverlayRef.current) ctrlOverlayRef.current.style.opacity = '1'
  }, [])
  const hideControls = useCallback(() => {
    if (ctrlOverlayRef.current) ctrlOverlayRef.current.style.opacity = '0'
  }, [])
  // FIX: ignore AbortError, no cleanup needed — browser handles it on unmount
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch((err) => {
      if (err.name !== 'AbortError') console.error(err)
    })
  }, [])
  useEffect(() => {
    const onChange = () => setFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])
  useEffect(() => {
    return () => {
      if (rafRef.current)     cancelAnimationFrame(rafRef.current)
      if (moveRafRef.current) cancelAnimationFrame(moveRafRef.current)
      clearTimeout(hideTimerRef.current)
    }
  }, [])
  const nudgeControls = useCallback(() => {
    if (moveRafRef.current) return
    moveRafRef.current = requestAnimationFrame(() => {
      moveRafRef.current = undefined
      showControls()
      clearTimeout(hideTimerRef.current)
      hideTimerRef.current = setTimeout(() => {
        if (isPlayingRef.current) hideControls()
      }, 2500)
    })
  }, [showControls, hideControls])
  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.paused ? v.play() : v.pause()
  }, [])
  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])
  const toggleFs = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      // blocked in iframe previews — fine on production
    }
  }, [])
  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v   = videoRef.current
    const bar = barRef.current
    if (!v || !bar || !isFinite(v.duration)) return
    const pct = Math.max(0, Math.min(1, (e.clientX - bar.getBoundingClientRect().left) / bar.offsetWidth))
    v.currentTime = pct * v.duration
  }, [])
  const handleTimeUpdate = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = undefined
      const v = videoRef.current
      if (!v || !isFinite(v.duration)) return
      const pct = (v.currentTime / v.duration) * 100
      if (progressFillRef.current) progressFillRef.current.style.width = `${pct}%`
      if (timeDisplayRef.current)  timeDisplayRef.current.textContent  = `${fmt(v.currentTime)} / ${fmt(v.duration)}`
    })
  }, [])
  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl bg-black ring-1 ring-white/10 cursor-none"
      onMouseMove={nudgeControls}
      onMouseLeave={() => {
        clearTimeout(hideTimerRef.current)
        if (isPlayingRef.current) hideControls()
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        className="block w-full cursor-none"
        onClick={togglePlay}
        onPlay={() => {
          isPlayingRef.current = true
          setPlaying(true)
          nudgeControls()
        }}
        onPause={() => {
          isPlayingRef.current = false
          setPlaying(false)
          showControls()
        }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          const v = videoRef.current
          if (v && timeDisplayRef.current) timeDisplayRef.current.textContent = `0:00 / ${fmt(v.duration)}`
        }}
      />
      {/* Controls overlay */}
      <div
        ref={ctrlOverlayRef}
        className="absolute inset-x-0 bottom-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
          paddingTop: '56px',
        }}
      >
        {/* Scrubber */}
        <div
          ref={barRef}
          className="mx-4 mb-2.5 h-[3px] rounded-full bg-white/20 cursor-none pointer-events-auto hover:h-[5px] transition-[height] duration-150"
          onClick={seek}
        >
          <div ref={progressFillRef} className="h-full rounded-full bg-white" style={{ width: '0%' }} />
        </div>
        {/* Buttons row */}
        <div className="flex items-center justify-between px-4 pb-4 pointer-events-auto">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="text-white/75 hover:text-white transition-colors">
              {playing ? <IconPause /> : <IconPlay />}
            </button>
            <span ref={timeDisplayRef} className="font-mono text-[10px] tabular-nums text-white/45 select-none">
              0:00 / 0:00
            </span>
            <button onClick={toggleMute} className="text-white/75 hover:text-white transition-colors">
              {muted ? <IconMute /> : <IconVolume />}
            </button>
          </div>
          <button onClick={toggleFs} className="text-white/75 hover:text-white transition-colors">
            {fs ? <IconExitFullscreen /> : <IconFullscreen />}
          </button>
        </div>
      </div>
    </div>
  )
}
// ─── Modal ────────────────────────────────────────────────────────────────────
function WorkModal({ work, onClose }: { work: Work; onClose: () => void }) {
  const [visible, setVisible] = useState(false)
  const isVertical = work.aspect === 'aspect-[9/16]'

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6 cursor-none"
      style={{
        backgroundColor: visible ? 'rgba(0,0,0,0.88)' : 'rgba(0,0,0,0)',
        transition: 'background-color 0.3s ease',
      }}
      onClick={onClose}
    >
      <div
        className={`relative w-full cursor-none my-auto ${isVertical ? 'max-w-[380px]' : 'max-w-6xl'}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <div className="mb-3 flex justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-200 text-[10px] uppercase tracking-[0.25em]"
          >
            Close
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {/* Player */}
        {work.video && <VideoPlayer src={work.video} poster={work.poster} />}
        {/* Info */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-white/35">
              {work.category}
            </p>
            <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              {work.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
              {work.description}
            </p>
          </div>
          <span className="font-mono text-xs text-white/30 sm:mt-1 shrink-0">{work.year}</span>
        </div>
      </div>
    </div>
  )
}
// ─── Card ─────────────────────────────────────────────────────────────────────
const WorkCard = memo(function WorkCard({ work, onOpen }: { work: Work; onOpen: (w: Work) => void }) {
  const videoRef      = useRef<HTMLVideoElement>(null)
  // FIX: track play promise to avoid AbortError on fast hover-out
  const playPromiseRef = useRef<Promise<void> | undefined>()

  const handleMouseEnter = useCallback(() => {
    playPromiseRef.current = videoRef.current?.play() ?? undefined
    playPromiseRef.current?.catch(() => {})
  }, [])

  const handleMouseLeave = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    const stop = () => { v.pause(); v.currentTime = 0 }
    playPromiseRef.current
      ? playPromiseRef.current.then(stop).catch(() => {})
      : stop()
  }, [])

  const handleClick = useCallback(() => onOpen(work), [onOpen, work])
  return (
    <article
      className={`group relative cursor-none overflow-hidden rounded-xl border border-border bg-card ${work.className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={`relative w-full overflow-hidden ${work.aspect}`}>
        <img
          src={work.poster}
          alt={`${work.title} — ${work.category}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {work.video && (
          <video
            ref={videoRef}
            src={work.video}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
        {/* Watch pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="white">
              <path d="M2.5 1.5l8 4-8 4z" />
            </svg>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">Watch</span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-white">{work.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">{work.category}</p>
          </div>
          <span className="font-mono text-xs text-white/50">{work.year}</span>
        </div>
      </div>
    </article>
  )
})
// ─── Section ──────────────────────────────────────────────────────────────────
export function SelectedWorks() {
  const [selected, setSelected] = useState<Work | null>(null)
  const handleOpen  = useCallback((work: Work) => setSelected(work), [])
  const handleClose = useCallback(() => setSelected(null), [])
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
            01 — Portfolio
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            SELECTED PROJECTS
          </h2>
        </div>
        <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          A curated selection of my projects — crafted for brands, creators, and
          campaigns that demand attention.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {works.map((work) => (
          <WorkCard key={work.title} work={work} onOpen={handleOpen} />
        ))}
      </div>
      {selected && (
        <WorkModal work={selected} onClose={handleClose} />
      )}
    </section>
  )
}