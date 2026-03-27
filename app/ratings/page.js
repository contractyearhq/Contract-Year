import { supabase } from '../../lib/supabase'
import Link from 'next/link'
 
function VerdictBadge({ verdict }) {
  const map = {
    pay: { label: 'Pay Him', color: '#1D9E75', bg: 'rgba(29,158,117,0.15)' },
    fair: { label: 'Fair Deal', color: '#4aabcc', bg: 'rgba(74,171,204,0.15)' },
    over: { label: 'Overpaid', color: '#E24B4A', bg: 'rgba(226,75,74,0.15)' },
    dead: { label: 'Dead Money', color: '#999', bg: 'rgba(85,85,80,0.2)' },
  }
  const v = map[verdict] || map.fair
  return (
    <span style={{
      background: v.bg, color: v.color,
      padding: '3px 10px', fontSize: '12px',
      fontWeight: 700, letterSpacing: '0.08em',
      textTransform: 'uppercase',
    }}>
      {v.label}
    </span>
  )
}
 
export default async function RatingsPage() {
  const { data: ratings } = await supabase
    .from('ratings')
    .select('*')
    .order('published_at', { ascending: false })
 
  const nflRatings = ratings ? ratings.filter(r => r.league === 'NFL') : []
  const nbaRatings = ratings ? ratings.filter(r => r.league === 'NBA') : []
 
  return (
    <div>
      <section style={{
        padding: '64px 40px 48px',
        borderBottom: '1px solid #2a2a2a',
      }}>
        <div style={{
          fontSize: '13px', fontWeight: 600, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: '#1D9E75', marginBottom: '16px',
        }}>
          All Ratings
        </div>
        <h1 style={{
          fontSize: 'clamp(48px, 7vw, 96px)',
          fontWeight: 900, lineHeight: 0.92,
          textTransform: 'uppercase', marginBottom: '20px',
          letterSpacing: '-0.02em',
        }}>
          Every Contract<br />
          <span style={{ color: '#1D9E75' }}>Rated.</span>
        </h1>
        <p style={{ fontSize: '16px', color: '#9a9894', maxWidth: '500px' }}>
          {ratings ? ratings.length : 0} contracts rated. Every verdict defended. No hedging.
        </p>
      </section>
 
      {/* NFL Ratings */}
      {nflRatings.length > 0 && (
        <section style={{ borderBottom: '1px solid #2a2a2a' }}>
          <div style={{
            padding: '32px 40px 16px',
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: '#555550',
            borderBottom: '1px solid #2a2a2a',
          }}>
            NFL — {nflRatings.length} Ratings
          </div>
          {nflRatings.map(function(rating) {
            return (
              <Link key={rating.slug} href={'/ratings/' + rating.slug} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 120px',
                padding: '24px 40px',
                borderBottom: '1px solid #2a2a2a',
                textDecoration: 'none',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '16px', color: '#F5F2EC' }}>{rating.player_name}</div>
                  <div style={{ fontSize: '12px', color: '#555550', marginTop: '2px' }}>{rating.team_name}</div>
                </div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#F5F2EC' }}>{rating.contract_value}</div>
                <div style={{ fontSize: '13px', color: '#9a9894' }}>{rating.contract_detail}</div>
                <div><VerdictBadge verdict={rating.verdict} /></div>
              </Link>
            )
          })}
        </section>
      )}
 
      {/* NBA Ratings */}
      {nbaRatings.length > 0 && (
        <section style={{ borderBottom: '1px solid #2a2a2a' }}>
          <div style={{
            padding: '32px 40px 16px',
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: '#555550',
            borderBottom: '1px solid #2a2a2a',
          }}>
            NBA — {nbaRatings.length} Ratings
          </div>
          {nbaRatings.map(function(rating) {
            return (
              <Link key={rating.slug} href={'/ratings/' + rating.slug} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 120px',
                padding: '24px 40px',
                borderBottom: '1px solid #2a2a2a',
                textDecoration: 'none',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '16px', color: '#F5F2EC' }}>{rating.player_name}</div>
                  <div style={{ fontSize: '12px', color: '#555550', marginTop: '2px' }}>{rating.team_name}</div>
                </div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#F5F2EC' }}>{rating.contract_value}</div>
                <div style={{ fontSize: '13px', color: '#9a9894' }}>{rating.contract_detail}</div>
                <div><VerdictBadge verdict={rating.verdict} /></div>
              </Link>
            )
          })}
        </section>
      )}
 
      <footer style={{
        borderTop: '1px solid #2a2a2a',
        padding: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <div style={{ fontWeight: 800, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Contract <span style={{ color: '#1D9E75' }}>Year</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Home</Link>
          <Link href="/teams" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Teams</Link>
          <a href="https://instagram.com/contractyearhq" target="_blank" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Instagram</a>
        </div>
        <div style={{ fontSize: '12px', color: '#555550' }}>@contractyearhq · Show your work.</div>
      </footer>
    </div>
  )
}
 