import React, {useEffect, useRef} from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string
}

function random(min: number, max: number) {
    return Math.random() * (max - min) + min
}

export default function FireworksCanvas({active}: { active: boolean }) {
    const ref = useRef<HTMLCanvasElement | null>(null)
    const parentRef = useRef<HTMLDivElement | null>(null)
    const particles = useRef<Particle[]>([])
    const raf = useRef<number | null>(null)
    const palette = ['#00E47A', '#1EE8B7', '#9FFFD9', '#FFFFFF']

    const createBurst = (x: number, y: number) => {
        const count = 60
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2 + random(-0.05, 0.05)
            const speed = random(0.75, 1.5)
            particles.current.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: random(120, 500),
                color: palette[Math.floor(random(0, palette.length))]
            })
        }
    }

    const loop = () => {
        const canvas = ref.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return
        const dpr = window.devicePixelRatio || 1
        const parent = parentRef.current
        if (parent) {
            const {width, height} = parent.getBoundingClientRect()
            if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
                canvas.width = Math.floor(width * dpr)
                canvas.height = Math.floor(height * dpr)
                canvas.style.width = width + 'px'
                canvas.style.height = height + 'px'
                ctx.setTransform(1, 0, 0, 1, 0, 0)
                ctx.scale(dpr, dpr)
            }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = particles.current.length - 1; i >= 0; i--) {
            const p = particles.current[i]
            p.x += p.vx
            p.y += p.vy
            p.vy += 0.01
            p.vx *= 0.998
            p.vy *= 0.998
            p.life -= 1
            const alpha = Math.max(0, Math.min(1, p.life / 180))
            ctx.globalAlpha = alpha
            ctx.beginPath()
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
            ctx.fillStyle = p.color
            ctx.fill()
            if (p.life <= 0) particles.current.splice(i, 1)
        }
        ctx.globalAlpha = 1
        raf.current = requestAnimationFrame(loop)
    }

    useEffect(() => {
        raf.current = requestAnimationFrame(loop)
        return () => {
            if (raf.current) cancelAnimationFrame(raf.current)
        }
    }, [])

    useEffect(() => {
        if (!active) return
        const id = setInterval(() => {
            const canvas = ref.current
            if (!canvas) return
            const dpr = window.devicePixelRatio || 1
            const w = (canvas.width || 0) / dpr
            const h = (canvas.height || 0) / dpr
            createBurst(random(w * 0.2, w * 0.8), random(0, h * 0.5))
        }, random(200, 2000))
        return () => clearInterval(id)
    }, [active])

    return (
        <div ref={parentRef} className="absolute inset-0 overflow-hidden z-0">
            <canvas ref={ref} className="absolute inset-0 pointer-events-none"/>
        </div>
    )
}