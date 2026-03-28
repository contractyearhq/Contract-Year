'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const eraColors = {
  '80s': '#C8A882',
  '90s': '#E8192C',
  '2000s': '#00B4FF',
  '2010s': '#FF3B30',
}

const eraThemes = {
  '80s': {
    font: '"Georgia", "Times New Roman", serif',
    labelFont: '"Georgia", serif',
    bg: '#221e19',
    valueSize: '52px',
    valueWeight: 400,
    valueTracking: '0.02em',
    labelStyle: { fontStyle: 'italic', letterSpacing: '0.16em' },
    tag: '◆ 1980s ◆',
  },
  '90s': {
    font: '"Arial Black", "Arial", sans-serif',
    labelFont: '"Arial Black", sans-serif',
    bg: '#0d0d0d',
    valueSize: '58px',
    valueWeight: 900,
    valueTracking: '-0.02em',
    labelStyle: { fontWeight: 900, letterSpacing: '0.06em' },
    tag: '★ 1990s ★',
  },
  '2000s': {
    font: '"Impact", "Arial Black", sans-serif',
    labelFont: '"Verdana", sans-serif',
    bg: '#0a0d18',
    valueSize: '58px',
    valueWeight: 900,
    valueTracking: '0.02em',
    labelStyle: { letterSpacing: '0.14em' },
    tag: '▶ 2000s',
    gradient: true,
  },
  '2010s': {
    font: '"Helvetica Neue", "Arial", sans-serif',
    labelFont: '"Helvetica Neue", sans-serif',
    bg: '#141414',
    valueSize: '54px',
    valueWeight: 900,
    valueTracking: '-0.03em',
    labelStyle: { letterSpacing: '0.1em' },
    tag: 'THROWBACK · 2010s',
  },
}

const verdictMap = {
  pay: { label: 'Pay Him', color: '#1D9E75' },
  fair: { label: 'Fair Deal', color: '#4aabcc' },
  over: { label: 'Overpaid', color: '#E24B4A' },
  dead: { label: 'Dead Money', color: '#E24B4A' },
}

function VerdictBadge({ verdict }) {
  const map = {
    pay: { label: 'Pay Him', color: '#1D9E75', bg: 'rgba(29,158,117,0.15)' },
    fair: { label: 'Fair Deal', color: '#4aabcc', bg: 'rgba(74,171,204,0.15)' },
    over: { label: 'Overpaid', color: '#E24B4A', bg: 'rgba(226,75,74,0.15)' },
    dead: { label: 'Dead Money', color: '#999', bg: 'rgba(85,85,80,0.2)' },
  }
  const v = map[verdict] || map.fair
  return (
    <span style={{ background: v.bg, color: v.color, padding: '3px 10px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
      {v.label}
    </span>
  )
}

function EraBadge({ era }) {
  const color = eraColors[era] || '#9a9894'
  return (
    <span style={{ background: color + '22', color: color, padding: '3px 10px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid ' + color + '44' }}>
      {era}
    </span>
  )
}

function SpotlightCycler({ throwbacks }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (throwbacks.length < 2) return
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % throwbacks.length)
        setVisible(true)
      }, 700)
    }, 4000)
    return () => clearInterval(interval)
  }, [throwbacks.length])

  if (!throwbacks.length) return null
  const current = throwbacks[index]
  const color = eraColors[current.era] || '#7B68EE'
  const t = eraThemes[current.era] || eraThemes['2010s']
  const v = verdictMap[current.verdict] || verdictMap.fair

  return (
    <div style={{
      border: '1px solid ' + color + '55',
      background: t.bg,
      minWidth: '480px',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* River stripe top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(90deg, #C8A882, #E8192C, #00B4FF, #FF3B30, #C8A882)',
        backgroundSize: '300% 100%',
        animation: 'riverFlowH 3s linear infinite',
      }} />

      {/* Era tag bar */}
      <div style={{
        background: color + '18',
        borderBottom: '1px solid ' + color + '33',
        padding: '10px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: t.labelFont, fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: color, ...t.labelStyle }}>
          {t.tag}
        </span>
        <span style={{ fontSize: '11px', color: color + '88', fontFamily: t.labelFont }}>{current.league}</span>
      </div>

      {/* Main content */}
      <div style={{
        padding: '28px 24px 24px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(12px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px',
      }}>

        {/* Left — name + value */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: t.font,
            fontSize: t.valueSize,
            fontWeight: t.valueWeight,
            lineHeight: 0.92,
            letterSpacing: t.valueTracking,
            color: '#F5F2EC',
            marginBottom: '14px',
            ...(t.gradient ? {
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundImage: 'linear-gradient(180deg, #FFFFFF 50%, #8888AA 100%)',
              backgroundClip: 'text',
            } : {}),
          }}>
            {current.contract_value}
          </div>
          <div style={{
            fontFamily: t.font,
            fontSize: '18px',
            fontWeight: t.valueWeight,
            color: color,
            marginBottom: '6px',
            letterSpacing: t.valueTracking,
            ...(current.era === '80s' ? { fontStyle: 'italic', fontWeight: 400 } : {}),
          }}>
            {current.player_name}
          </div>
          <div style={{ fontFamily: t.labelFont, fontSize: '11px', color: '#555550', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {current.team_name} · {current.contract_year}
          </div>
        </div>

        {/* Right — verdict stamp */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '4px' }}>
          <div style={{
            border: '3px solid ' + v.color,
            padding: '10px 16px',
            transform: 'rotate(-3deg)',
            position: 'relative',
            background: v.color + '08',
            boxShadow: '0 0 16px ' + v.color + '22',
          }}>
            <div style={{ position: 'absolute', top: '3px', left: '3px', width: '8px', height: '8px', borderTop: '2px solid ' + v.color, borderLeft: '2px solid ' + v.color }} />
            <div style={{ position: 'absolute', top: '3px', right: '3px', width: '8px', height: '8px', borderTop: '2px solid ' + v.color, borderRight: '2px solid ' + v.color }} />
            <div style={{ position: 'absolute', bottom: '3px', left: '3px', width: '8px', height: '8px', borderBottom: '2px solid ' + v.color, borderLeft: '2px solid ' + v.color }} />
            <div style={{ position: 'absolute', bottom: '3px', right: '3px', width: '8px', height: '8px', borderBottom: '2px solid ' + v.color, borderRight: '2px solid ' + v.color }} />
            <div style={{
              fontFamily: t.font,
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontWeight: t.valueWeight,
              textTransform: 'uppercase',
              color: v.color,
              lineHeight: 1,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              opacity: 0.92,
            }}>
              {v.label}
            </div>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ padding: '0 24px 20px', display: 'flex', gap: '6px', alignItems: 'center' }}>
        {throwbacks.map((_, i) => (
          <div key={i} style={{
            width: i === index ? '24px' : '6px',
            height: '4px',
            borderRadius: '2px',
            background: i === index ? color : '#2a2a2a',
            transition: 'all 0.5s ease',
          }} />
        ))}
        <span style={{ marginLeft: 'auto', fontFamily: t.labelFont, fontSize: '10px', color: '#333', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {index + 1} / {throwbacks.length}
        </span>
      </div>
    </div>
  )
}

export default function ThrowbacksClient({ throwbacks, eraFilter, leagueFilter, verdictFilter }) {
  const filtered = throwbacks.filter(t => {
    const eraMatch = eraFilter === 'all' || t.era === eraFilter
    const leagueMatch = leagueFilter === 'all' || t.league === leagueFilter
    const verdictMatch = verdictFilter === 'all' || t.verdict === verdictFilter
    return eraMatch && leagueMatch && verdictMatch
  })

  return (
    <div>
      <style>{`
        @keyframes riverFlowH {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        @keyframes riverFlow {
          0%   { background-position: 50% 0%; }
          100% { background-position: 50% 200%; }
        }
        .throwback-card {
          position: relative;
          background: #111;
          padding: 32px;
          text-decoration: none;
          display: block;
          transition: background 0.2s;
        }
        .throwback-card:hover { background: #161616; }
        .throwback-card .era-stripe {
          position: absolute; top: 0; left: 0;
          width: 3px; height: 100%;
          background: var(--stripe-color, #7B68EE);
          transition: width 0.2s;
        }
        .throwback-card:hover .era-stripe {
          width: 4px;
          background: linear-gradient(180deg, #C8A882 0%, #E8192C 25%, #00B4FF 50%, #FF3B30 75%, #C8A882 100%);
          background-size: 100% 400%;
          animation: riverFlow 2s linear infinite;
        }
      `}</style>

      <section style={{ padding: '64px 40px 48px', borderBottom: '1px solid #2a2a2a', position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#7B68EE' }} />
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7B68EE', marginBottom: '16px' }}>
            Throwback Thursday
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 900, lineHeight: 0.92, textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Throwback<br /><span style={{ color: '#7B68EE' }}>Contracts.</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#9a9894', maxWidth: '460px' }}>
            Historic deals rated with the same lens. Pay Him. Fair Deal. Overpaid. Dead Money. The verdict does not expire.
          </p>
        </div>
        <SpotlightCycler throwbacks={throwbacks} />
      </section>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: '20px 40px', borderBottom: '1px solid #2a2a2a', background: '#161616' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['all', '80s', '90s', '2000s', '2010s'].map(era => (
            <Link key={era} href={'?' + new URLSearchParams({ era, league: leagueFilter, verdict: verdictFilter }).toString()} style={{
              padding: '7px 14px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              border: '1px solid ' + (eraFilter === era ? '#7B68EE' : '#2a2a2a'),
              color: eraFilter === era ? '#7B68EE' : '#555550',
              background: eraFilter === era ? 'rgba(123,104,238,0.15)' : 'transparent',
              textDecoration: 'none',
            }}>
              {era === 'all' ? 'All Eras' : era}
            </Link>
          ))}
        </div>
        <div style={{ width: '1px', height: '28px', background: '#2a2a2a' }} />
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['all', 'NFL', 'NBA'].map(league => (
            <Link key={league} href={'?' + new URLSearchParams({ era: eraFilter, league, verdict: verdictFilter }).toString()} style={{
              padding: '7px 14px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              border: '1px solid ' + (leagueFilter === league ? '#1D9E75' : '#2a2a2a'),
              color: leagueFilter === league ? '#1D9E75' : '#555550',
              background: leagueFilter === league ? 'rgba(29,158,117,0.15)' : 'transparent',
              textDecoration: 'none',
            }}>
              {league === 'all' ? 'All Sports' : league}
            </Link>
          ))}
        </div>
        <div style={{ width: '1px', height: '28px', background: '#2a2a2a' }} />
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { val: 'all', label: 'All Verdicts' },
            { val: 'pay', label: 'Pay Him' },
            { val: 'fair', label: 'Fair Deal' },
            { val: 'over', label: 'Overpaid' },
            { val: 'dead', label: 'Dead Money' },
          ].map(v => (
            <Link key={v.val} href={'?' + new URLSearchParams({ era: eraFilter, league: leagueFilter, verdict: v.val }).toString()} style={{
              padding: '7px 14px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              border: '1px solid ' + (verdictFilter === v.val ? '#E24B4A' : '#2a2a2a'),
              color: verdictFilter === v.val ? '#E24B4A' : '#555550',
              background: verdictFilter === v.val ? 'rgba(226,75,74,0.15)' : 'transparent',
              textDecoration: 'none',
            }}>
              {v.label}
            </Link>
          ))}
        </div>
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#555550' }}>{filtered.length} contracts</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1px', background: '#2a2a2a', borderBottom: '1px solid #2a2a2a' }}>
        {filtered.map(function(t) {
          const stripeColor = eraColors[t.era] || '#7B68EE'
          return (
            <Link key={t.slug} href={'/throwbacks/' + t.slug} className="throwback-card" style={{ '--stripe-color': stripeColor }}>
              <div className="era-stripe" />
              <div style={{ paddingLeft: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <EraBadge era={t.era} />
                  <span style={{ fontSize: '11px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.league} · {t.team_name}</span>
                </div>
                <div style={{ fontSize: '38px', fontWeight: 900, lineHeight: 1, color: '#F5F2EC', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                  {t.contract_value}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#9a9894', marginBottom: '8px' }}>
                  {t.player_name} — {t.contract_detail}
                </div>
                <div style={{ fontSize: '13px', color: '#555550', lineHeight: 1.5, marginBottom: '20px' }}>
                  {t.context}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <VerdictBadge verdict={t.verdict} />
                  <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7B68EE' }}>Read →</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: '80px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', color: '#555550', marginBottom: '8px' }}>No contracts found</div>
          <div style={{ fontSize: '14px', color: '#555550' }}>Try a different filter</div>
        </div>
      )}

      <footer style={{ borderTop: '1px solid #2a2a2a', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ fontWeight: 800, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Contract <span style={{ color: '#1D9E75' }}>Year</span></div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Home</Link>
          <Link href="/ratings" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Ratings</Link>
          <Link href="/teams" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Teams</Link>
        </div>
        <div style={{ fontSize: '12px', color: '#555550' }}>@contractyearhq · Show your work.</div>
      </footer>
    </div>
  )
}
