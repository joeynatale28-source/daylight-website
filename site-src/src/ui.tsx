import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import { cn, SHOT } from './lib'

export const EASE = [0.16, 1, 0.3, 1] as const

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap transition-[transform,background-color,color] duration-150 ease-out hover:scale-[1.02] active:scale-[.98]',
  {
    variants: {
      variant: {
        solid: 'bg-foreground text-background hover:opacity-90',
        ghost: 'border border-border text-foreground hover:bg-card',
      },
      size: { sm: 'h-9 px-4 text-sm', lg: 'h-12 px-7 text-[15px] font-semibold' },
    },
    defaultVariants: { variant: 'solid', size: 'lg' },
  },
)
type BtnProps = VariantProps<typeof buttonVariants> & { href: string; children: ReactNode; className?: string }
export const Button = ({ variant, size, className, href, children }: BtnProps) => (
  <a href={href} className={cn(buttonVariants({ variant, size }), className)}>{children}</a>
)

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }} transition={{ duration: 0.25, ease: EASE, delay }}>
      {children}
    </motion.div>
  )
}

export const Section = ({ id, children }: { id: string; children: ReactNode }) => (
  <section id={id} className="mx-auto w-full max-w-[1200px] px-4 pt-20 sm:px-6 md:pt-28">{children}</section>
)

export const Head = ({ eyebrow, title, sub, center }: { eyebrow?: string; title: string; sub?: string; center?: boolean }) => (
  <Reveal className={cn('mb-8 max-w-[640px]', center && 'mx-auto text-center')}>
    {eyebrow && <p className="mb-3 text-[13px] font-semibold uppercase tracking-[.12em] text-muted">{eyebrow}</p>}
    <h2 className="text-[clamp(32px,4.4vw,48px)] font-bold leading-[1.1] tracking-[-0.035em]">{title}</h2>
    {sub && <p className="mt-4 text-muted">{sub}</p>}
  </Reveal>
)

export const Card = ({ children, className, lift = true }: { children: ReactNode; className?: string; lift?: boolean }) => (
  <div className={cn('h-full rounded-2xl border bg-card p-5 sm:p-7 transition-[transform,box-shadow,background-color,border-color] duration-150 ease-out', lift && 'hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,.10)] dark:hover:shadow-[0_14px_32px_rgba(0,0,0,.5)]', className)}>{children}</div>
)

export const Win = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('overflow-hidden rounded-2xl border bg-background shadow-[0_1px_2px_rgba(0,0,0,.05),0_12px_32px_rgba(0,0,0,.08)] dark:shadow-[0_1px_2px_rgba(0,0,0,.4),0_16px_40px_rgba(0,0,0,.5)]', className)}>{children}</div>
)

type CropProps = { src: string; alt: string; x: number; y: number; w: number; h: number; className?: string; eager?: boolean }
export const Crop = ({ src, alt, x, y, w, h, className, eager }: CropProps) => (
  <div className={cn('crop', className)} style={{ '--cx': x, '--cy': y, '--cw': w, '--ch': h } as CSSProperties}>
    <img src={SHOT(src)} alt={alt} loading={eager ? 'eager' : 'lazy'} />
  </div>
)

/* Stacked crossfade stage: layers share one box, only the active one is visible. */
export function Stage({ ratio, layers, active }: { ratio: number; layers: { key: string; node: ReactNode }[]; active: string }) {
  return (
    <Win>
      <div className="relative w-full" style={{ aspectRatio: ratio }}>
        {layers.map((l) => (
          <motion.div key={l.key} className="absolute inset-0 [&>.crop]:h-full [&>.crop]:w-full" initial={false}
            animate={{ opacity: l.key === active ? 1 : 0 }} transition={{ duration: 0.3, ease: EASE }}
            aria-hidden={l.key !== active} style={{ pointerEvents: l.key === active ? 'auto' : 'none' }}>
            {l.node}
          </motion.div>
        ))}
      </div>
    </Win>
  )
}

export function Tabs<T extends string>({ items, value, onChange, label }: { items: { k: T; label: string }[]; value: T; onChange: (k: T) => void; label: string }) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  return (
    <div role="tablist" aria-label={label} className="inline-flex gap-0.5 rounded-full border bg-background p-1">
      {items.map((it, i) => (
        <button key={it.k} ref={(el) => { refs.current[it.k] = el }} role="tab" aria-selected={value === it.k} tabIndex={value === it.k ? 0 : -1}
          onClick={() => onChange(it.k)}
          onKeyDown={(e) => {
            const n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
            if (!n) return
            e.preventDefault()
            const nx = items[(i + n + items.length) % items.length].k
            onChange(nx); refs.current[nx]?.focus()
          }}
          className={cn('rounded-full px-4 py-2 text-[15px] font-semibold transition-[background-color,color] duration-150 sm:px-5',
            value === it.k ? 'bg-foreground text-background' : 'text-muted hover:bg-card hover:text-foreground')}>
          {it.label}
        </button>
      ))}
    </div>
  )
}

export function Accordion({ items, className, rowClass }: { items: { q: ReactNode; a: ReactNode }[]; className?: string; rowClass?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className={className}>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i} className={cn('border-b last:border-b-0', rowClass)}>
            <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}
              className="-mx-3 my-0.5 flex w-[calc(100%+24px)] items-center gap-3.5 rounded-full px-3 py-3 text-left text-[18px] font-semibold transition-colors duration-150 hover:bg-foreground/5">
              {it.q}
              <ChevronDown className={cn('ml-auto size-[18px] shrink-0 transition-transform duration-200 ease-out', isOpen && 'rotate-180')} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div key="p" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }} className="overflow-hidden">
                  <div className="pb-4 pt-0.5 text-muted">{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export function useSystemDark() {
  const [d, setD] = useState(() => typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches)
  useEffect(() => {
    const m = matchMedia('(prefers-color-scheme: dark)'); const f = () => setD(m.matches)
    m.addEventListener('change', f); return () => m.removeEventListener('change', f)
  }, [])
  return d
}
