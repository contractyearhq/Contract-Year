export const revalidate = 0
import { supabase } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import BullBearToggle from './BullBearToggle'

export default async function RatingPage({ params }) {
  const { slug } = await params

  const { data: rating, error } = await supabase
    .from('ratings')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !rating) return notFound()

  const verdictMap = {
    pay: { label: 'Pay Him', color: rating.accent_color || '#1D9E75' },
    fair: { label: 'Fair Deal', color: rating.accent_color || '#1D9E75' },
    over: { label: 'Overpaid', color: '#E24B4A' },
    dead: { label: 'Dead Money', color: '#E24B4A' },
  }
  const verdict = verdictMap[rating.verdict] || verdictMap.fair
  const accentColor = rating.verdict === 'over' || rating.verdict === 'dead' ? '#E24B4A' : (rating.accent_color || '#1D9E75')

  return (
    <div>
      <section style={{ padding: '64px 40px 48px', borderBottom: '1px solid #2a2a2a', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: accentColor }} />
        <Link href="/ratings" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555550', display: 'inline-block', marginBottom: '32px', textDecoration: 'none' }}>
          Back to All Ratings
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555550' }}>
            {rating.league} · {rating.team_name}
          </span>
          <span style={{ background: accentColor + '22', color: accentColor, padding: '3px 10px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {verdict.label}
          </span>
        </div>
        <div style={{ fontSize: 'clamp(64px, 10vw, 130px)', fontWeight: 900, lineHeight: 0.9, color: '#F5F2EC', letterSpacing: '-0.02em', marginBottom: '16px' }}>
          {rating.contract_value}
        </div>
        <div style={{ fontSize: '20px', color: '#9a9894', marginBottom: '8px', fontWeight: 500 }}>
          {rating.player_name} — {rating.contract_detail}
        </div>
        <div style={{ fontSize: '13px', color: '#555550' }}>
          Contract Year · @contractyearhq · Show your work.
        </div>
      </section>

      <section style={{ padding: '48px 40px', borderBottom: '1px solid #2a2a2a', maxWidth: '720px' }}>
        <p style={{ fontSize: '18px', color: '#9a9894', lineHeight: 1.75 }}>{rating.summary}</p>
      </section>

      <BullBearToggle
        bullCase={rating.bull_case}
        bearCase={rating.bear_case}
        accentColor={accentColor}
      />

      <section style={{ padding: '48px 40px', borderBottom: '1px solid #2a2a2a', background: '#161616' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: accentColor, marginBottom: '16px' }}>
          Show Your Work.
        </div>
        <div style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, lineHeight: 1, color: '#F5F2EC', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          {rating.show_your_work_number}
        </div>
        <p style={{ fontSize: '17px', color: '#9a9894', lineHeight: 1.75, maxWidth: '620px' }}>{rating.show_your_work_desc}</p>
      </section>

      {rating.full_analysis && (
        <section style={{ padding: '48px 40px', borderBottom: '1px solid #2a2a2a', maxWidth: '720px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#555550', marginBottom: '16px' }}>
            Full Analysis
          </div>
          <p style={{ fontSize: '17px', color: '#9a9894', lineHeight: 1.75 }}>{rating.full_analysis}</p>
        </section>
      )}

      <section style={{ padding: '48px 40px', borderBottom: '1px solid #2a2a2a' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#555550', marginBottom: '16px' }}>
          Contract Year Verdict
        </div>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', padding: '32px', marginBottom: '24px', display: 'inline-block' }}>
          <div style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 900, textTransform: 'uppercase', color: accentColor, lineHeight: 1 }}>
            {verdict.label}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: '24px' }}>
          <div style={{ fontSize: '14px', color: '#555550', marginBottom: '8px' }}>Agree? Drop your rating on Instagram.</div>
          <div style={{ fontSize: '14px', color: '#555550', marginBottom: '16px', letterSpacing: '0.04em' }}>PAY HIM · FAIR DEAL · OVERPAID · DEAD MONEY</div>
          <a href="https://instagram.com/contractyearhq" target="_blank" style={{ display: 'inline-block', background: '#0F6E56', color: 'white', padding: '12px 24px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
            @contractyearhq
          </a>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #2a2a2a', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ fontWeight: 800, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Contract <span style={{ color: '#1D9E75' }}>Year</span>
        </div>
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
