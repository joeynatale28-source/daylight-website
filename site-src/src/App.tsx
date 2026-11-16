import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowUpRight, Check, Menu, Sparkles } from 'lucide-react'
import { Accordion, Button, Card, Crop, EASE, Head, Reveal, Section, Stage, Tabs, Win, useSystemDark } from './ui'
import { LOGIN, SHOT, cn } from './lib'

const NAV = [['Features', '#features'], ['Views', '#views'], ['AI access', '#ai'], ['Sharing', '#sharing'], ['Themes', '#themes'], ['FAQ', '#faq']]

const Mark = ({ className }: { className?: string }) => (
  <svg viewBox="36 170 426 188" className={cn('h-[15px] w-auto', className)} aria-hidden="true">
    <path fill="currentColor" d="M100 326a149 149 0 0 1 298 0z" /><path fill="currentColor" d="M36 339h426v12H36z" />
  </svg>
)
const Logo = ({ href = '#top' }: { href?: string }) => (
  <a href={href} className="inline-flex items-center gap-2 text-[20px] font-semibold tracking-[-0.03em]" aria-label="Daylight home"><Mark />Daylight</a>
)

function Banner() {
  const [shown, setShown] = useState(() => { try { return sessionStorage.getItem('dl-banner') !== '1' } catch { return true } })
  if (!shown) return null
  return (
    <div className="relative flex min-h-10 items-center justify-center bg-foreground px-11 text-[13px] font-medium text-background sm:text-sm">
      <a href={LOGIN} className="truncate hover:underline">Daylight is free — open it in your browser <ArrowRight className="inline size-3.5 align-[-2px]" /></a>
      <button aria-label="Dismiss banner" onClick={() => { setShown(false); try { sessionStorage.setItem('dl-banner', '1') } catch { /* */ } }}
        className="absolute right-2.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full transition-colors duration-150 hover:bg-background/20">
        <X className="size-3.5" />
      </button>
    </div>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  useEffect(() => { const f = () => setStuck(scrollY > 40); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  return (
    <header className="sticky top-3 z-30 px-3 pt-3 sm:px-4">
      <div className={cn('mx-auto flex h-14 max-w-[1080px] items-center justify-between rounded-full border bg-[hsl(var(--glass)/.72)] pl-5 pr-2 backdrop-blur-xl transition-shadow duration-150',
        stuck ? 'shadow-[0_12px_32px_rgba(0,0,0,.12)] dark:shadow-[0_12px_32px_rgba(0,0,0,.55)]' : 'shadow-[0_1px_2px_rgba(0,0,0,.05)]')}>
        <Logo />
        <nav aria-label="Sections" className="hidden gap-0.5 md:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="rounded-full px-3.5 py-2 text-[15px] font-medium text-muted transition-colors duration-150 hover:bg-foreground/[.07] hover:text-foreground">{l}</a>)}
        </nav>
        <div className="flex items-center gap-1.5">
          <Button href={LOGIN} size="sm">Open Daylight</Button>
          <button className="grid size-10 place-items-center rounded-full transition-colors duration-150 hover:bg-foreground/[.07] md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav aria-label="Sections" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.16, ease: EASE }}
            className="mx-auto mt-2 flex max-w-[1080px] flex-col rounded-3xl border bg-[hsl(var(--glass)/.9)] p-2 shadow-[0_12px_32px_rgba(0,0,0,.12)] backdrop-blur-xl md:hidden">
            {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-full px-4 py-3 text-[17px] font-medium text-muted hover:bg-foreground/[.07] hover:text-foreground">{l}</a>)}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

const WORDS = ['clutter.', 'noise.', 'chaos.', 'mess.']
function Rotator() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => { if (reduce) return; const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2600); return () => clearInterval(t) }, [reduce])
  return (
    <span className="inline-grid text-left align-top">
      {WORDS.map((w, k) => (
        <motion.span key={w} className="whitespace-nowrap [grid-area:1/1]" initial={false}
          animate={{ opacity: k === i ? 1 : 0, y: k === i ? '0em' : '0.25em' }} transition={{ duration: 0.25, ease: EASE }}
          aria-hidden={k !== i}>{w}</motion.span>
      ))}
    </span>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, -24])
  const scale = useTransform(scrollY, [0, 700], [1, 0.94])
  const st = (i: number, extra = {}) => reduce ? {} : { initial: { opacity: 0.55, y: 12, ...extra }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.4, ease: EASE, delay: i * 0.06 } }
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 pb-6 pt-12 text-center sm:px-6 md:pt-14">
      <motion.span {...st(0)} className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium text-muted"><Sparkles className="size-3.5" />Free. No install. No card.</motion.span>
      <motion.h1 {...st(1)} className="mx-auto mt-6 text-[clamp(38px,6.2vw,72px)] font-semibold leading-[1.06] tracking-[-0.04em]">
        Your calendar,<br />minus the <Rotator />
      </motion.h1>
      <motion.p {...st(2)} className="mx-auto mt-5 max-w-[560px] text-[clamp(17px,2vw,20px)] text-muted">The calendar for the things you actually do. Events, tasks and reminders in one calm, fast place.</motion.p>
      <motion.div {...st(3)} className="mt-8 flex flex-wrap justify-center gap-3 max-sm:[&>a]:basis-full">
        <Button href={LOGIN}>Open Daylight</Button><Button href="#features" variant="ghost">Explore features</Button>
      </motion.div>
      <motion.p {...st(4)} className="mt-4 text-sm text-muted">Free. No install. Your data stays yours.</motion.p>
      <motion.div {...st(5, { scale: 0.98 })} className="mx-auto mt-12 max-w-[1200px] text-left">
        <motion.div style={reduce ? undefined : { y, scale, transformOrigin: '50% 0' }}>
          <div className="overflow-hidden rounded-[20px] border bg-background shadow-[0_2px_4px_rgba(0,0,0,.05),0_24px_60px_rgba(0,0,0,.14)] dark:shadow-[0_24px_60px_rgba(0,0,0,.6)]">
            <div className="flex h-9 items-center gap-1.5 border-b px-4">
              {[0, 1, 2].map((n) => <i key={n} className="size-2.5 rounded-full bg-border" />)}
              <span className="mx-auto rounded-full border px-10 py-0.5 text-xs text-muted">Daylight</span><span className="w-[42px]" />
            </div>
            <picture>
              <source media="(prefers-color-scheme: dark)" srcSet={SHOT('theme-dark')} />
              <img src={SHOT('month')} width={1600} height={1000} alt="Daylight Month view with colored events across November 2026" fetchPriority="high" className="w-full" />
            </picture>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

const Txt = ({ t, p }: { t: string; p: string }) => (<div><h3 className="mb-2 text-[22px] font-semibold leading-tight tracking-[-0.02em]">{t}</h3><p className="text-muted">{p}</p></div>)

function Features() {
  return (
    <Section id="features">
      <Head eyebrow="Features" title="Plan the day, not the tool" />
      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal className="lg:col-span-3"><Card className="grid items-center gap-6 lg:grid-cols-[1fr_2.3fr] lg:gap-10">
          <Txt t="Events" p="Add anything in seconds — title, time, place, and a note. Repeating events let you change one day, this and following, or the whole series." />
          <Win><Crop src="event" alt="An event open in Daylight: Team practice, Sunday 6:00pm, Riverside Fields" x={300} y={392} w={734} h={390} /></Win>
        </Card></Reveal>
        <Reveal delay={0.06} className="lg:col-span-2"><Card className="flex flex-col gap-6">
          <Txt t="Tasks" p="Tasks live inside Daylight, not in another app. Add one, check it off, move on." />
          <Win className="mt-auto"><Crop src="tasks" alt="The Daylight task list with an Add a task field and upcoming tasks" x={500} y={65} w={890} h={605} /></Win>
        </Card></Reveal>
        <Reveal delay={0.12}><Card className="flex flex-col gap-6">
          <Txt t="Reminders" p="Set a default reminder for each calendar, so the important things never slip past. Reminders ride along with the event." />
          <Win className="mt-auto max-w-[360px]"><Crop src="week" alt="The Daylight sidebar listing the Everyday, Work and Family calendars and US Holidays" x={10} y={365} w={280} h={337} /></Win>
        </Card></Reveal>
      </div>
    </Section>
  )
}

const VIEWS = [
  { k: 'month', label: 'Month', p: 'The whole month at a glance — click a date to open that day.' },
  { k: 'week', label: 'Week', p: 'Seven days, side by side, with room to breathe.' },
  { k: 'day', label: 'Day', p: 'One day, hour by hour, all-day events on top.' },
  { k: 'agenda', label: 'Agenda', p: 'What’s next, in a simple list.' },
] as const
type VK = (typeof VIEWS)[number]['k']
function Views() {
  const [v, setV] = useState<VK>('month')
  return (
    <Section id="views">
      <Head eyebrow="Views" title="See your week your way." sub="Four ways to look at the same calendar. Pick the one that fits the moment." />
      <Reveal><Card lift={false} className="flex flex-col items-center gap-5 !p-4 sm:!p-6">
        <Tabs label="Calendar views" items={VIEWS.map((x) => ({ k: x.k, label: x.label }))} value={v} onChange={setV} />
        <div className="w-full">
          <Stage ratio={1300 / 1000} active={v} layers={VIEWS.map((x) => ({ key: x.k, node: <Crop src={x.k} alt={`${x.label} view`} x={300} y={0} w={1300} h={1000} /> }))} />
        </div>
      </Card></Reveal>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VIEWS.map((x, i) => (
          <Reveal key={x.k} delay={i * 0.06}>
            <button onClick={() => setV(x.k)} aria-pressed={v === x.k}
              className={cn('flex h-full w-full flex-col items-start justify-start rounded-2xl border bg-card p-5 text-left transition-[transform,box-shadow,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,.10)] dark:hover:shadow-[0_14px_32px_rgba(0,0,0,.5)]',
                v === x.k && 'border-foreground')}>
              <h3 className="mb-1 text-[18px] font-semibold tracking-[-0.02em]">{x.label}</h3>
              <p className="text-[15px] text-muted">{x.p}</p>
            </button>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

const chip = (y: number) => <span className="block size-9 shrink-0 overflow-hidden rounded-[10px]"><Crop src="ai-access" alt="" x={648} y={y} w={42} h={42} /></span>
function AI() {
  return (
    <Section id="ai">
      <Head eyebrow="AI access" title="Your AI can use your calendar." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Reveal><Card className="flex items-center !p-4 sm:!p-6"><Win className="w-full"><Crop src="ai-access" alt="Settings, AI access: Claude and ChatGPT connected, Gemini not connected, with Recent AI activity" x={586} y={100} w={664} h={670} /></Win></Card></Reveal>
        <Reveal delay={0.06} className="flex flex-col gap-4">
          <Card lift={false} className="!h-auto">
            <Accordion items={[
              { q: <>{chip(315)}Claude</>, a: 'Ask Claude what’s on your day, or tell it to add an event.' },
              { q: <>{chip(386)}ChatGPT</>, a: 'Same for ChatGPT — your calendar, in conversation.' },
              { q: <>{chip(446)}Gemini</>, a: 'Gemini connects the same way.' },
            ]} />
          </Card>
          <Card lift={false} className="flex !h-auto flex-1 flex-col justify-center gap-5 !p-6">
            {[['Connect', 'Link Claude, ChatGPT, or Gemini over MCP from Settings → AI access.'], ['Choose what it can do', 'Read, write, or delete. Your call, changeable anytime.'], ['Just ask', 'What’s on my day, move lunch to 1, add a dentist appointment.']].map(([t, p], n) => (
              <div key={t} className="flex items-start gap-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-sm font-semibold text-background">{n + 1}</span>
                <div><h3 className="text-[17px] font-semibold leading-snug tracking-[-0.02em]">{t}</h3><p className="text-[15px] text-muted">{p}</p></div></div>
            ))}
          </Card>
        </Reveal>
      </div>
      <Reveal><p className="mx-auto mt-6 max-w-[760px] text-center text-[15px] text-muted">Daylight connects to your AI over MCP (Model Context Protocol) — one standard link for Claude, ChatGPT, and Gemini. Every action shows up in Recent AI activity. Disconnect anytime.</p></Reveal>
    </Section>
  )
}

function Sharing() {
  return (
    <Section id="sharing">
      <Reveal><Card className="grid items-center gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-10 lg:!p-8">
        <div className="lg:px-2">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[.12em] text-muted">Sharing</p>
          <h2 className="text-[clamp(32px,4.4vw,48px)] font-bold leading-[1.1] tracking-[-0.035em]">Share the plan, not your whole life.</h2>
          <p className="mt-4 max-w-[420px] text-muted">Share a whole calendar with family, or a single event with anyone. They see what you share — nothing else.</p>
        </div>
        <Win><Crop src="sharing" alt="Sharing the Everyday calendar, with View only and Can edit permissions per person" x={520} y={80} w={560} h={432} /></Win>
      </Card></Reveal>
    </Section>
  )
}

function ThemeCard({ start, label }: { start: 'light' | 'dark'; label: string }) {
  const [t, setT] = useState<'light' | 'dark'>(start)
  return (
    <Card lift={false} className="flex flex-col items-center gap-4 !p-4 sm:!p-6">
      <Tabs label={label} items={[{ k: 'light', label: 'Light' }, { k: 'dark', label: 'Dark' }]} value={t} onChange={setT} />
      <div className="w-full"><Stage ratio={667 / 365} active={t} layers={(['light', 'dark'] as const).map((k) => ({ key: k, node: <Crop src={`theme-${k}`} alt={`Daylight in ${k} mode`} x={0} y={0} w={667} h={365} /> }))} /></div>
    </Card>
  )
}
function Themes() {
  const dark = useSystemDark()
  return (
    <Section id="themes">
      <Head eyebrow="Themes" title="Everything in your control." sub="Light or dark, following your system. Daylight looks right either way." />
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal><ThemeCard key={'a' + dark} start="light" label="Left preview theme" /></Reveal>
        <Reveal delay={0.06}><ThemeCard key={'b' + dark} start="dark" label="Right preview theme" /></Reveal>
      </div>
    </Section>
  )
}

const DETAILS: [string, string][] = [
  ['Search', 'Find any event in seconds.'], ['Drag and drop', 'Drag an event to move it.'], ['Undo', 'Bring back something you deleted by mistake.'],
  ['Duplicate', 'Duplicate an event instead of retyping it.'], ['Multi-day events', 'Long events show as one bar across the days.'],
  ['Calendars', 'As many calendars as you need, each with its own color.'], ['Subscriptions', 'Add any calendar with an iCal link or an ICS file.'],
  ['US holidays', 'US holidays built in, through 2030.'], ['Places', 'Search for a place when you add a location.'],
  ['Notifications', 'Notifications for shares and updates, right in the app.'], ['Sign-in', 'Sign in with email, Google, or a passkey.'],
  ['Birthdays', 'Birthdays show the age they’ll turn.'], ['Time', '12-hour or 24-hour time, your choice.'], ['Shortcuts', 'Keyboard shortcuts for the things you do most.'],
]
const BARS: [string, string][] = [['1/2/2/5', '#4f86f7'], ['1/6/2/8', '#2fb37a'], ['2/3/3/8', '#f2b21f'], ['2/1/3/3', '#9a77e8'], ['3/1/4/3', '#2fb37a'], ['3/4/4/6', '#4f86f7'], ['3/7/4/8', '#f2b21f']]
function Details() {
  return (
    <Section id="details">
      <Head eyebrow="Details" title="Small details, done right." />
      <ul className="grid grid-cols-1 gap-4 min-[521px]:grid-cols-2 lg:grid-cols-4">
        {DETAILS.map(([b, s], i) => (
          <li key={b}><Reveal delay={(i % 4) * 0.04} className="h-full"><Card className="!p-5"><b className="mb-1 block text-base font-semibold">{b}</b><span className="text-[15px] leading-snug text-muted">{s}</span></Card></Reveal></li>
        ))}
        <li className="min-[521px]:col-span-2" aria-hidden="true"><Reveal className="h-full"><Card lift={false} className="flex items-center !p-3.5">
          <div className="relative grid w-full grid-cols-7 overflow-hidden rounded-xl border bg-background" style={{ gridTemplateRows: 'repeat(3,30px)' }}>
            {Array.from({ length: 6 }).map((_, c) => <i key={c} className="pointer-events-none absolute inset-y-0 border-r" style={{ left: `${((c + 1) / 7) * 100}%` }} />)}
            {BARS.map(([a, c]) => <i key={a} className="rounded-md" style={{ gridArea: a, margin: '5px 3px', borderLeft: `3px solid ${c}`, background: `color-mix(in srgb, ${c} 22%, hsl(var(--background)))` }} />)}
          </div>
        </Card></Reveal></li>
      </ul>
    </Section>
  )
}

function FAQ() {
  return (
    <Section id="faq">
      <Head eyebrow="FAQ" title="Questions, answered." />
      <Reveal><Card lift={false} className="!px-5 !py-3 sm:!px-7">
        <Accordion items={[
          { q: 'Is Daylight free?', a: 'Yes. Daylight is free to use, with no trial and no card needed. Create an account and everything on this page is yours.' },
          { q: 'Do I need to install anything?', a: 'No. Daylight runs in your browser, on a computer or a phone, so there is nothing to download or update. Open it, sign in, and your calendar is there.' },
          { q: 'Who can see my calendars and tasks?', a: 'Only you, unless you choose to share a calendar or an event. Everything is saved to your own Daylight account, and when you do share, you pick what each person can do and can stop sharing at any time.' },
          { q: 'How do I sign in?', a: 'With an email and password, with Google, or with a passkey. You can add or change a sign-in method later in Settings.' },
          { q: 'How does AI access work?', a: 'In Settings, open AI access and connect Claude, ChatGPT or Gemini over MCP with the link shown there, then pick what it may do: read, write or delete. You can disconnect it at any time.' },
        ]} />
      </Card></Reveal>
    </Section>
  )
}

const ROWS = [
  ['Events scattered across three apps', 'Events, tasks, and reminders in one calm place'],
  ['Reminders that don’t remind you', 'Reminders ride along with the event'],
  ['Sharing that shows your whole life', 'Share a calendar or a single event — nothing else'],
]
function Why() {
  return (
    <Section id="why">
      <Head title="Why switch?" center />
      <Reveal><div className="overflow-hidden rounded-2xl border bg-card">
        {ROWS.map(([pain, gain]) => (
          <div key={pain} className="grid border-b last:border-b-0 md:grid-cols-2">
            <div className="flex items-center gap-4 px-6 py-6 md:px-9 md:py-8"><span className="grid size-8 shrink-0 place-items-center rounded-full border text-muted"><X className="size-4" /></span><p className="text-[clamp(17px,1.8vw,21px)] leading-snug text-muted">{pain}</p></div>
            <div className="flex items-center gap-4 border-t bg-background px-6 py-6 md:border-l md:border-t-0 md:px-9 md:py-8"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-background"><Check className="size-4" strokeWidth={2.5} /></span><p className="text-[clamp(17px,1.8vw,21px)] font-semibold leading-snug">{gain}</p></div>
          </div>
        ))}
      </div></Reveal>
      <Reveal className="mt-8 flex justify-center"><Button href={LOGIN}>Open Daylight</Button></Reveal>
    </Section>
  )
}

const FCol = ({ h, links }: { h: string; links: [string, string][] }) => (
  <div><h4 className="mb-3.5 text-[13px] font-semibold uppercase tracking-[.12em] text-muted">{h}</h4>
    {links.map(([l, href]) => <a key={l} href={href} className="block w-fit py-1 hover:underline">{l}</a>)}</div>
)
function Footer() {
  return (
    <footer className="mt-24 border-t pb-8 pt-14 text-[15px] md:mt-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1"><Logo /><p className="mt-3 text-muted">Your calendar, minus the clutter.</p>
            <a href="https://github.com/joeynatale28-source/daylight-website" className="mt-3 inline-flex items-center gap-1 text-muted hover:text-foreground hover:underline">GitHub <ArrowUpRight className="size-3.5" /></a></div>
          <FCol h="Product" links={[['Open Daylight', LOGIN], ['Features', '#features'], ['AI access', '#ai']]} />
          <FCol h="Explore" links={[['Sharing', '#sharing'], ['Themes', '#themes'], ['FAQ', '#faq']]} />
          <FCol h="Legal" links={[['Privacy', 'privacy/'], ['Terms', 'tos/']]} />
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t pt-6 text-muted"><span>© 2026 Daylight. All rights reserved.</span><a href="#top" className="text-foreground hover:underline">Back to top ↑</a></div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div id="top">
      <Banner />
      <Nav />
      <main>
        <Hero /><Features /><Views /><AI /><Sharing /><Themes /><Details /><FAQ /><Why />
      </main>
      <Footer />
    </div>
  )
}
