import { useEffect, useRef, useState } from 'react'
import jacketImg from './assets/home.png'
import sasiraLogo from './assets/sasira_logo.png'
import backgroundImg from './assets/backround.jpg'
import aboutBg from './assets/backround2.jpg'

// '*' sentinel = render the sparkle glyph; strings render as tape labels.
const tapeItems = ['*', 'STREET WEAR', '*', 'SASIRANGAN', '*', 'TRADITION REBORN']
const tapeLoop = Array.from({ length: 10 }, () => tapeItems).flat()

const keywords = ['inovasi', 'street', 'wear', 'sasirangan', 'culture']

const navLinks = [
  ['Home', '#home'],
  ['About', '#about'],
]

function StarGlyph() {
  return (
    <svg className="tape-star-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z" />
    </svg>
  )
}

const aboutStats = [
  ['100%', 'Sasirangan'],
  ['2026', 'Est. Season'],
  ['8', 'Street Culture'],
]

const featureCards = [
  ['01', 'Sasirangan Fabric', 'Bahan dan motif khas Kalimantan jadi bahasa visual utama.'],
  ['02', 'Oversized Fit', 'Siluet loose, bold, nyaman untuk gerak harian.'],
  ['03', 'Street Detail', 'Kontras grafis, layering, dan finishing modern.'],
]

// Kinetic per-character reveal. `trigger="load"` plays on mount; `trigger="scroll"`
// stays hidden until an ancestor with `.is-visible` enters the viewport.
function SplitReveal({
  text,
  className = '',
  trigger = 'load',
  baseDelay = 0,
  stagger = 0.05,
}) {
  const chars = Array.from(text)
  const mode = trigger === 'scroll' ? 'reveal-scroll' : 'reveal-load'

  return (
    <span className={`split ${mode} ${className}`.trim()} aria-label={text}>
      {chars.map((char, index) => (
        <span className="split-char" aria-hidden="true" key={`${char}-${index}`}>
          <span
            className="split-inner"
            style={{ '--d': `${(baseDelay + index * stagger).toFixed(3)}s` }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        </span>
      ))}
    </span>
  )
}

function App() {
  const shellRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const fine = window.matchMedia('(pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return

    let frame = 0
    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0

    const render = () => {
      curX += (targetX - curX) * 0.08
      curY += (targetY - curY) * 0.08
      shell.style.setProperty('--mx', curX.toFixed(3))
      shell.style.setProperty('--my', curY.toFixed(3))

      if (Math.abs(targetX - curX) > 0.001 || Math.abs(targetY - curY) > 0.001) {
        frame = requestAnimationFrame(render)
      } else {
        frame = 0
      }
    }

    const onMove = (event) => {
      const rect = shell.getBoundingClientRect()
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      if (!frame) frame = requestAnimationFrame(render)
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      if (!frame) frame = requestAnimationFrame(render)
    }

    shell.addEventListener('pointermove', onMove)
    shell.addEventListener('pointerleave', onLeave)

    return () => {
      shell.removeEventListener('pointermove', onMove)
      shell.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 901px)')
    if (reduce.matches || !desktop.matches) return

    const left = document.querySelector('.poster-copy')
    const right = document.querySelector('.right-panel')
    if (!left || !right) return

    let frame = 0
    let current = 0
    let target = 0

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
    const ease = (value) => 1 - Math.pow(1 - value, 3)

    const render = () => {
      target = clamp(window.scrollY / window.innerHeight, 0, 1)
      current += (target - current) * 0.09
      const p = ease(current)
      const dock = Math.max((p - 0.18) / 0.82, 0)

      // Keep the side typography pinned to the left/right gutters while the user
      // scrolls. It should follow the viewport, not sink deep into the About area.
      const leftX = -dock * window.innerWidth * 0.015
      const leftY = dock * window.innerHeight * 0.045
      const leftScale = 1 - dock * 0.08
      const rightX = dock * window.innerWidth * 0.015
      const rightY = dock * window.innerHeight * 0.045
      const rightScale = 1 - dock * 0.06
      const opacity = clamp(1 - dock * 0.22, 0.78, 1)

      left.style.transform = `translate3d(${leftX}px, ${leftY}px, 0) scale(${leftScale})`
      right.style.transform = `translate3d(${rightX}px, ${rightY}px, 0) scale(${rightScale})`
      left.style.opacity = opacity.toFixed(3)
      right.style.opacity = opacity.toFixed(3)

      if (Math.abs(target - current) > 0.001) {
        frame = requestAnimationFrame(render)
      } else {
        frame = 0
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    const onResize = () => {
      if (!desktop.matches) {
        left.removeAttribute('style')
        right.removeAttribute('style')
        return
      }
      onScroll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    render()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (frame) cancelAnimationFrame(frame)
      left.removeAttribute('style')
      right.removeAttribute('style')
    }
  }, [])
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return

    const items = document.querySelectorAll('.reveal-on-scroll')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  // Magnetic pull on [data-magnetic] + pointer tilt on [data-tilt]. Desktop pointer only.
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return

    const cleanups = []

    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const strength = Number(el.dataset.magnetic) || 0.3
      const onMove = (event) => {
        const rect = el.getBoundingClientRect()
        const x = event.clientX - rect.left - rect.width / 2
        const y = event.clientY - rect.top - rect.height / 2
        el.style.setProperty('--magx', `${(x * strength).toFixed(2)}px`)
        el.style.setProperty('--magy', `${(y * strength).toFixed(2)}px`)
      }
      const onLeave = () => {
        el.style.setProperty('--magx', '0px')
        el.style.setProperty('--magy', '0px')
      }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
        onLeave()
      })
    })

    document.querySelectorAll('[data-tilt]').forEach((el) => {
      const max = Number(el.dataset.tilt) || 10
      const onMove = (event) => {
        const rect = el.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width - 0.5
        const py = (event.clientY - rect.top) / rect.height - 0.5
        el.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`)
        el.style.setProperty('--ry', `${(px * max).toFixed(2)}deg`)
        el.style.setProperty('--tz', '6px')
        // glow spot tracks the pointer in px (barzzly-style)
        el.style.setProperty('--gx', `${(event.clientX - rect.left).toFixed(0)}px`)
        el.style.setProperty('--gy', `${(event.clientY - rect.top).toFixed(0)}px`)
        el.style.setProperty('--glow', '1')
      }
      const onLeave = () => {
        el.style.setProperty('--rx', '0deg')
        el.style.setProperty('--ry', '0deg')
        el.style.setProperty('--tz', '0px')
        el.style.setProperty('--glow', '0')
      }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
        onLeave()
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  // Navbar collapse-on-scroll + scroll-progress bar (rAF-throttled).
  useEffect(() => {
    const bar = document.querySelector('.scroll-progress-fill')
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      setScrolled(y > 40)
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? y / max : 0
      if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Track which section is in view ? highlight the matching nav link (barzzly pill).
  useEffect(() => {
    const ids = navLinks.map(([, href]) => href.slice(1))
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll + close menu on Escape while the mobile overlay is open.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  // Smooth-scroll to the target section, then strip the #hash from the URL.
  const handleNavClick = (event, href) => {
    event.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    setMenuOpen(false)
  }

  return (
    <div className="app-container">
      <header className={`site-nav ${scrolled ? 'is-docked' : ''}`}>
        <nav className="site-nav-inner">
          <a
            className="nav-brand hover-lift"
            href="#home"
            aria-label="Back to Sasira home"
            data-magnetic="0.35"
            onClick={(event) => handleNavClick(event, '#home')}
          >
            <img src={sasiraLogo} alt="Sasira" />
          </a>

          <div className="nav-links" aria-label="Primary">
            {navLinks.map(([label, href]) => (
              <a
                className={`nav-link ${activeSection === href.slice(1) ? 'is-active' : ''}`}
                href={href}
                key={label}
                aria-current={activeSection === href.slice(1) ? 'true' : undefined}
                onClick={(event) => handleNavClick(event, href)}
              >
                <span>{label}</span>
              </a>
            ))}
          </div>

          <button
            type="button"
            className={`nav-burger ${menuOpen ? 'is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="scroll-progress" aria-hidden="true">
            <span className="scroll-progress-fill" />
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu-links" aria-label="Mobile">
          {navLinks.map(([label, href], index) => (
            <a
              className="mobile-menu-link"
              href={href}
              key={label}
              style={{ '--i': index }}
              onClick={(event) => handleNavClick(event, href)}
            >
              <span className="mobile-menu-index">0{index + 1}</span>
              <span className="mobile-menu-label">{label}</span>
            </a>
          ))}
        </nav>
        <p className="mobile-menu-foot">SASIRA — Sasirangan Street Wear · 2026</p>
      </div>

      <main
        ref={shellRef}
        className="poster-shell"
        style={{ '--home-bg': `url(${backgroundImg})` }}
        aria-label="Sasira streetwear home"
      >
        <section className="poster-copy" id="home" aria-label="Sasira apparel headline">
          <p className="vertical-title reveal-title">
            <span>SASIRA</span>
          </p>
          <p className="vertical-apparel reveal-title delay-1">
            <span>APPAREL</span>
          </p>
        </section>

        <section className="model-stage" aria-label="Inovasi streetwear dari Sasirangan">
          <img
            src={jacketImg}
            alt="Inovasi streetwear dari Sasirangan"
            className="model-image"
          />
          <div className="model-shadow" aria-hidden="true" />
        </section>

        <aside className="right-panel" aria-label="Sasira keywords">
          <img src={sasiraLogo} alt="" className="panel-logo hover-lift" data-magnetic="0.4" />
          <p className="season text-pop">
            <span className="season-rule" aria-hidden="true" />
            <span className="season-text">SASIRA 2026</span>
            <span className="season-rule" aria-hidden="true" />
          </p>
          <ul>
            {keywords.map((keyword, index) => (
              <li className={keyword === 'wear' ? 'is-gold' : ''} key={keyword} style={{ '--delay': `${1 + index * 0.12}s` }}>
                {keyword}
              </li>
            ))}
          </ul>
        </aside>

        <div className="yellow-tape" aria-hidden="true">
          <div className="tape-track">
            {tapeLoop.map((item, index) => (
              <span
                className={item === '*' ? 'tape-segment tape-star' : 'tape-segment'}
                key={`${item}-${index}`}
              >
                {item === '*' ? <StarGlyph /> : item}
              </span>
            ))}
          </div>
        </div>

        <footer className="poster-footer">
          <p className="text-pop">
            Sasira adalah toko baju streetwear yang mengangkat bahan batik sasirangan
            khas Kalimantan ke siluet urban, oversized, berani, dan siap dipakai harian.
          </p>
          <strong className="text-shine">BUILT DIFFERENT</strong>
        </footer>
      </main>

      <section className="about-shell" id="about" aria-label="About Sasira" style={{ '--about-bg': `url(${aboutBg})` }}>
        <div className="about-inner reveal-on-scroll">
          <header className="about-header reveal-on-scroll">
            <p className="eyebrow text-pop">Kalimantan streetwear label</p>
            <h2 className="text-shine">
              <SplitReveal text="ABOUT US" trigger="scroll" stagger={0.055} />
            </h2>
            <p className="about-lead text-pop">Batik sasirangan dibawa ke gaya jalanan modern.</p>
          </header>

          <div className="about-copy-grid">
            <article className="about-card reveal-on-scroll hover-card" data-tilt="10" style={{ '--delay': '0.05s' }}>
              <span className="card-kicker">Origin</span>
              <p>
                Sasira adalah toko baju streetwear yang mengambil inspirasi dari batik
                sasirangan khas Kalimantan. Setiap koleksi membawa karakter lokal ke
                potongan modern, oversized, nyaman, dan kuat untuk gaya jalanan masa kini.
              </p>
            </article>

            <article className="about-card reveal-on-scroll hover-card" data-tilt="10" style={{ '--delay': '0.15s' }}>
              <span className="card-kicker">Vision</span>
              <p>
                Sasira menggabungkan motif tradisional, bahan pilihan, dan detail visual
                berani supaya budaya daerah terasa relevan di keseharian, bebas dipakai,
                percaya diri, tetap membawa identitas.
              </p>
            </article>
          </div>

          <div className="feature-grid" aria-label="Sasira features">
            {featureCards.map(([number, title, text], index) => (
              <article className="feature-card reveal-on-scroll hover-card" data-tilt="10" key={title} style={{ '--delay': `${index * 0.1}s` }}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="about-stats reveal-on-scroll" aria-label="Sasira figures">
            {aboutStats.map(([value, label], index) => (
              <div className="stat-item" key={label} style={{ '--delay': `${index * 0.12}s` }}>
                <span className="stat-value text-shine">{value}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="about-tape reveal-on-scroll" aria-hidden="true">
            <div className="tape-track about-tape-track">
              {tapeLoop.map((item, index) => (
                <span
                  className={item === '*' ? 'tape-segment tape-star' : 'tape-segment'}
                  key={`${item}-${index}`}
                >
                  {item === '*' ? <StarGlyph /> : item}
                </span>
              ))}
            </div>
          </div>

          <p className="about-signature reveal-on-scroll">
            <strong className="text-shine">BUILT DIFFERENT</strong>
          </p>
        </div>
      </section>
    </div>
  )
}

export default App


