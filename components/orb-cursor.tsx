'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export function OrbCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.body.style.cursor = 'none'
    document.documentElement.style.cursor = 'none'
    return () => {
      document.body.style.cursor = ''
      document.documentElement.style.cursor = ''
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const target = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let raf = 0
    let pressed = false

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
    }
    const onDown = () => { pressed = true }
    const onUp = () => { pressed = false }

    const render = () => {
      pos.x += (target.x - pos.x) * 0.35
      pos.y += (target.y - pos.y) * 0.35
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${pressed ? 0.6 : 1})`
      }
      raf = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    raf = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return createPortal(
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: 'white',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 2147483647,
      }}
    />,
    document.body
  )
}