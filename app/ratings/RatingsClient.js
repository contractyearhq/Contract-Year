'use client'

import { useState } from 'react'
import Link from 'next/link'

const CARDS_PER_PAGE = 12

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

export default function RatingsClient({ ratings }) {
  const [search, setSearch] = useState('')
  const [league, setLeague] = useState('all')
  const [verdict, setVerdict] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = ratings.filter(r => {
    const searchMatch = !search || r.player_name.toLowerCase().includes(search.toLowerCase()) || r.team_name.toLowerCase().includes(search.toLowerCase())
    const leagueMatch = league === 'all' || r.league === league
    const verdictMatch = verdict === 'all' || r.verdict === verdict
    return searchMatch && leagueMatch && verdictMatch
  })

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE)

  const handleFilter = (type, val) => {
    setPage(1)
    if (type === 'league') setLeague(val)
    if (type === 'verdict') setVerdict(val)
  }

  const handleSearch = (val) => {
    setSearch(val)
    setPage(1)
  }

  return (
    <div>
      {/* Header */}
      <section style={{ padding: '64px 40px 48px', borderBottom: '1px solid #2a2a2a' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1D9E75', marginBottom: '16px' }}>
          All Ratings
        </div>
        <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 900, lineHeight: 0.92, textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '-0.02em' }}>
          Every Contract<br /><span style={{ color: '#1D9E75' }}>Rated.</span>
        </h1>
        <p style={{ fontSize: '16px', color: '#9a9894', maxWidth: '500px' }}>
          {ratings.length} contracts rated. Every verdict defended. No hedging.
        </p>
      </section>

      {/* Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: '20px 40px', borderBottom: '1px solid #2a2a2a', background: '#161616' }}>
        <input
          type="text"
          placeholder="Search player or team..."
          value={search}
          onChange={e => handleSearch(e.target.value)}
          style={{
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            color: '#F5F2EC', fontSize: '13px', padding: '8px 16px',
            outline: 'none', fontFamily: 'inherit', width: '220px',
          }}
        />
        <div style={{ width: '1px', height: '28px', background: '#2a2a2a' }} />
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['all', 'NFL', 'NBA'].map(l => (
            <button key={l} onClick={() => handleFilter('league', l)} style={{
              padding: '7px 14px', fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
              border: '1px solid ' + (league === l ? '#1D9E75' : '#2a2a2a'),
              color: league === l ? '#1D9E75' : '#555550',
              background: league === l ? 'rgba(29,158,117,0.15)' : 'transparent',
              fontFamily: 'inherit',
            }}>
              {l === 'all' ? 'All Sports' : l}
            </button>
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
            <button key={v.val} onClick={() => handleFilter('verdict', v.val)} style={{
              padding: '7px 14px', fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
              border: '1px solid ' + (verdict === v.val ? '#E24B4A' : '#2a2a2a'),
              color: verdict === v.val ? '#E24B4A' : '#555550',
              background: verdict === v.val ? 'rgba(226,75,74,0.15)' : 'transparent',
              fontFamily: 'inherit',
            }}>
              {v.label}
            </button>
          ))}
        </div>
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#555550' }}>
          {filtered.length} contracts
        </span>
      </div>

      {/* Cards Grid */}
      {paginated.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1px', background: '#2a2a2a', borderBottom: '1px solid #2a2a2a' }}>
          {paginated.map(function(rating) {
            return (
              <Link key={rating.slug} href={'/ratings/' + rating.slug} style={{ background: '#111111', padding: '32px', textDecoration: 'none', display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555550' }}>
                    {rating.league} · {rating.team_name}
                  </span>
                  <VerdictBadge verdict={rating.verdict} />
                </div>
                <div style={{ fontSize: '38px', fontWeight: 900, lineHeight: 1, color: '#F5F2EC', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                  {rating.contract_value}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#9a9894', marginBottom: '14px' }}>
                  {rating.player_name} — {rating.contract_detail}
                </div>
                <div style={{ fontSize: '14px', color: '#555550', lineHeight: 1.55, marginBottom: '20px' }}>
                  {rating.summary}
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1D9E75' }}>
                  Read the breakdown →
                </span>
              </Link>
            )
          })}
        </div>
      ) : (
        <div style={{ padding: '80px 40px', textAlign: 'center', borderBottom: '1px solid #2a2a2a' }}>
          <div style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', color: '#555550', marginBottom: '8px' }}>No contracts found</div>
          <div style={{ fontSize: '14px', color: '#555550' }}>Try a different filter or search term</div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '40px', borderBottom: '1px solid #2a2a2a' }}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: '8px 16px', fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', cursor: page === 1 ? 'default' : 'pointer',
              border: '1px solid #2a2a2a', color: page === 1 ? '#333' : '#555550',
              background: 'transparent', fontFamily: 'inherit',
            }}
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                width: '36px', height: '36px', fontSize: '13px', fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit',
                border: '1px solid ' + (page === p ? '#1D9E75' : '#2a2a2a'),
                color: page === p ? '#1D9E75' : '#555550',
                background: page === p ? 'rgba(29,158,117,0.15)' : 'transparent',
              }}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              padding: '8px 16px', fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', cursor: page === totalPages ? 'default' : 'pointer',
              border: '1px solid #2a2a2a', color: page === totalPages ? '#333' : '#555550',
              background: 'transparent', fontFamily: 'inherit',
            }}
          >
            Next →
          </button>
        </div>
      )}

      <footer style={{ borderTop: '1px solid #2a2a2a', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ fontWeight: 800, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Contract <span style={{ color: '#1D9E75' }}>Year</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Home</Link>
          <Link href="/teams" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Teams</Link>
          <Link href="/throwbacks" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Throwbacks</Link>
        </div>
        <div style={{ fontSize: '12px', color: '#555550' }}>@contractyearhq · Show your work.</div>
      </footer>
    </div>
  )
}
