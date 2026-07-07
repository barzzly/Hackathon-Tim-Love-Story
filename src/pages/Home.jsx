import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import jacketImg from '../assets/home.webp'
import sasiraLogo from '../assets/sasira_logo.webp'
import backgroundImg from '../assets/backround.webp'
import aboutBg from '../assets/backround2.webp'
import backgroundImg3 from '../assets/backround3.webp'
import { listProducts, formatPrice } from '../lib/products'
import { isSupabaseReady } from '../lib/supabase'
import { CardContainer, CardBody, CardItem } from '../components/ThreeDCard'
import Footer from '../components/Footer'

// '*' sentinel = render the sparkle glyph; strings render as tape labels.
const tapeItems = ['*', 'STREET WEAR', '*', 'SASIRANGAN', '*', 'TRADITION REBORN']
const tapeLoop = Array.from({ length: 10 }, () => tapeItems).flat()

const keywords = ['kreasi', 'street', 'modern', 'budaya', 'berani']
const goldKeyword = 'berani'

// [label, href, isRoute] — isRoute uses react-router <Link>, otherwise in-page anchor.
const navLinks = [
  ['Home', '#home', false],
  ['About', '#about', false],
  ['Philosophy', '#philosophy', false],
  ['Store', '#store', false],
]

function StarGlyph() {
  return (
    <svg className="tape-star-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z" />
    </svg>
  )
}

function CartGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

const aboutStats = [
  ['100%', 'Sasirangan'],
  ['2026', 'Est. Season'],
  ['∞', 'Street Culture'],
]

const featureCards = [
  ['01', 'Sasirangan Fabric', 'Bahan dan motif khas Kalimantan jadi bahasa visual utama.'],
  ['02', 'Oversized Fit', 'Siluet loose, bold, nyaman untuk gerak harian.'],
  ['03', 'Street Detail', 'Kontras grafis, layering, dan finishing modern.'],
]

const historyData = [
  {
    year: '12TH CENTURY',
    title: 'Akar Tradisional',
    content: 'Sasirangan awalnya adalah kain sakral untuk penyembuhan dan upacara adat di Kalimantan Selatan. Warna-warna alami menceritakan kisah magis dan doa.'
  },
  {
    year: 'VISUAL CULTURE',
    title: 'Motif & Alam',
    content: 'Motif Sasirangan terinspirasi dari alam Kalimantan. Mulai dari motif Bayam Raja (simbol kedudukan), Gigi Haruan (simbol ketajaman berpikir), hingga Kambang Kacang (simbol persahabatan). Setiap garis adalah cerita.'
  },
  {
    year: '2026 - PRESENT',
    title: 'Street Reborn',
    content: 'Kini, Sasira membawa DNA kuno ini ke jalanan. Oversized cuts, raw materials, dan streetwear vibes berpadu dengan motif sakral. Ini bukan sekadar fashion, ini adalah perlawanan kultural yang menjaga warisan tetap hidup dan bernapas.'
  }
]

// Only in-page anchors highlight on scroll; route links (Store) are excluded.
const anchorLinks = navLinks.filter(([, , isRoute]) => !isRoute)

function Home() {
  const shellRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [error, setError] = useState('')

  useEffect(() => {
    setStatus('loading')
    listProducts()
      .then((rows) => {
        setProducts(rows)
        setStatus('ready')
      })
      .catch((err) => {
        setError(err.message || 'Gagal memuat produk.')
        setStatus('error')
      })
  }, [])

  const handleCheckout = (p) => {
    const phoneNumber = '6282287930695'
    const message = `Halo Sasira! Saya tertarik untuk memesan produk ini:

Nama: ${p.name}
Kategori: ${p.category || '-'}
Harga: ${formatPrice(p.price)}

Apakah produk ini masih tersedia? Terima kasih!`
    const encodedText = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank')
  }

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

      // Left typography stays pinned to the gutter — no vertical drift, only a
      // slight scale/opacity ease. The right panel fades out entirely on scroll
      // so it doesn't ride down into the About section.
      const leftX = -dock * window.innerWidth * 0.015
      const leftScale = 1 - dock * 0.08
      const leftOpacity = clamp(1 - dock * 0.22, 0.78, 1)
      const rightOpacity = clamp(1 - dock * 2.2, 0, 1)

      left.style.transform = `translate3d(${leftX}px, 0, 0) scale(${leftScale})`
      left.style.opacity = leftOpacity.toFixed(3)
      right.style.opacity = rightOpacity.toFixed(3)
      right.style.pointerEvents = rightOpacity < 0.05 ? 'none' : ''

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

  // Track which section is in view - highlight the matching nav link (barzzly pill).
  useEffect(() => {
    const ids = anchorLinks.map(([, href]) => href.slice(1))
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
            {navLinks.map(([label, href, isRoute]) =>
              isRoute ? (
                <Link className="nav-link" to={href} key={label}>
                  <span>{label}</span>
                </Link>
              ) : (
                <a
                  className={`nav-link ${activeSection === href.slice(1) ? 'is-active' : ''}`}
                  href={href}
                  key={label}
                  aria-current={activeSection === href.slice(1) ? 'true' : undefined}
                  onClick={(event) => handleNavClick(event, href)}
                >
                  <span>{label}</span>
                </a>
              ),
            )}
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
          {navLinks.map(([label, href, isRoute], index) =>
            isRoute ? (
              <Link
                className="mobile-menu-link"
                to={href}
                key={label}
                style={{ '--i': index }}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mobile-menu-index">0{index + 1}</span>
                <span className="mobile-menu-label">{label}</span>
              </Link>
            ) : (
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
            ),
          )}
        </nav>
        <p className="mobile-menu-foot">SASIRA - Sasirangan Street Wear / 2026</p>
      </div>

      <div className="page-content" style={{ position: 'relative' }}>
        <div className="poster-copy-wrapper" style={{ position: 'absolute', top: 0, bottom: '4rem', left: 0, right: 0, pointerEvents: 'none', zIndex: 30 }}>
          <section className="poster-copy" aria-label="Sasira apparel headline">
            <p className="vertical-title reveal-title">
              <span>SASIRA</span>
            </p>
            <p className="vertical-apparel reveal-title delay-1">
              <span>APPAREL</span>
            </p>
          </section>
        </div>

        <main
          ref={shellRef}
          id="home"
          className="poster-shell"
          style={{ '--home-bg': `url(${backgroundImg})` }}
          aria-label="Sasira streetwear home"
        >
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
            <span className="season-text">SASIRA 2026</span>
          </p>
          <ul>
            {keywords.map((keyword, index) => (
              <li className={keyword === goldKeyword ? 'is-gold' : ''} key={keyword} style={{ '--delay': `${1 + index * 0.12}s` }}>
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
            <h2 className="about-title">ABOUT US</h2>
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

      <section className="about-shell philosophy-shell" id="philosophy" aria-label="Philosophy & History" style={{ '--about-bg': `url(${aboutBg})` }}>
        <div className="about-inner reveal-on-scroll">
          <header className="about-header reveal-on-scroll">
            <p className="eyebrow text-pop">Warisan & Identitas</p>
            <h2 className="about-title">PHILOSOPHY</h2>
            <p className="about-lead text-pop">Lebih dari sekadar kain, ini adalah identitas kultural yang direkonstruksi.</p>
          </header>
        </div>

        <div className="philosophy-marquee reveal-on-scroll">
            <div className="philosophy-track">
              {[...historyData, ...historyData].map((item, i) => (
                <article className="philosophy-card" key={`${item.title}-${i}`}>
                  <div className="phil-card-header">
                    <span className="phil-year">{item.year}</span>
                    <h4>{item.title}</h4>
                  </div>
                  <p className="phil-text">
                    {item.content}
                  </p>
                </article>
              ))}
            </div>
          </div>
      </section>

      <section className="about-shell" id="store" aria-label="Featured Products" style={{ '--about-bg': `url(${backgroundImg3})` }}>
        <div className="about-inner reveal-on-scroll">
          <header className="about-header reveal-on-scroll">
            <p className="eyebrow text-pop">Sasira / 2026</p>
            <h2 className="about-title">OUR PRODUCTS</h2>
            <p className="about-lead text-pop">Koleksi streetwear sasirangan terpopuler — tambahkan via Admin.</p>
          </header>

          {status === 'loading' && (
            <div className="store-grid" aria-hidden="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <div className="product-card is-skeleton" key={i}>
                  <div className="product-media skeleton-box" />
                  <div className="product-body">
                    <span className="skeleton-line short" />
                    <span className="skeleton-line" />
                    <span className="skeleton-line med" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {status === 'error' && (
            <div className="store-empty" role="alert">
              <h2>Gagal memuat</h2>
              <p>{error}</p>
            </div>
          )}

          {status === 'ready' && (() => {
            const featured = [
              products.find((p) => p.badge?.toUpperCase() === 'BEST SELLER'),
              products.find((p) => p.badge?.toUpperCase() === 'TRENDING'),
              products.find((p) => p.badge?.toUpperCase() === 'NEW ARRIVAL'),
            ].filter(Boolean)

            if (featured.length === 0) {
              return (
                <div className="store-empty">
                  <h2>Belum ada produk unggulan</h2>
                  <p style={{ color: 'var(--smoke)' }}>
                    {isSupabaseReady
                      ? 'Produk dengan badge BEST SELLER, TRENDING, atau NEW ARRIVAL akan tampil di sini.'
                      : 'Supabase belum dikonfigurasi. Isi .env.local dulu (lihat .env.example).'}
                  </p>
                  <Link className="btn-ghost" to="/admin/login">
                    Masuk admin
                  </Link>
                </div>
              )
            }

            return (
              <>
                <div className="store-grid">
                  {featured.map((p) => (
                    <CardContainer className="product-card" key={p.id}>
                      <CardBody>
                        <div className="product-media" style={{ width: '100%', position: 'relative', transformStyle: 'preserve-3d', overflow: 'visible' }}>
                          {p.badge && (
                            <CardItem translateZ={120} className="product-badge" as="span" style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10 }}>
                              {p.badge}
                            </CardItem>
                          )}
                          {p.image_url ? (
                            <CardItem translateZ={100} as="img" src={p.image_url} alt={p.name} loading="lazy" />
                          ) : (
                            <CardItem translateZ={100} className="product-media-placeholder" aria-hidden="true" style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, #1a1c18, #0d0e0c)', borderRadius: '16px' }}>
                              SASIRA
                            </CardItem>
                          )}
                        </div>
                        <div className="product-body" style={{ transformStyle: 'preserve-3d' }}>
                          {p.category && (
                            <CardItem translateZ={30} className="product-category" as="span">
                              {p.category}
                            </CardItem>
                          )}
                          <CardItem translateZ={50} className="product-name" as="h3">
                            {p.name}
                          </CardItem>
                          {p.description && (
                            <CardItem translateZ={40} as="p" style={{ fontSize: '0.8rem', color: 'var(--smoke)', marginTop: '4px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {p.description}
                            </CardItem>
                          )}
                          <CardItem translateZ={70} className="product-foot" style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                            <span className="product-price">{formatPrice(p.price)}</span>
                            <button type="button" className="product-cart" aria-label={`Tambah ${p.name} ke keranjang`} onClick={() => handleCheckout(p)}>
                              <CartGlyph />
                            </button>
                          </CardItem>
                        </div>
                      </CardBody>
                    </CardContainer>
                  ))}
                </div>
                <div className="about-cta" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3rem' }}>
                  <Link className="btn-primary" to="/store">
                    Lihat Semua Produk
                  </Link>
                </div>
              </>
            )
          })()}
        </div>
      </section>
      </div>
      <Footer />
    </div>
  )
}

export default Home
