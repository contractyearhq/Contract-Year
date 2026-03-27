import { supabase } from '../lib/supabase'
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
    <span style={{ background: v.bg, color: v.color, padding: '3px 10px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
      {v.label}
    </span>
  )
}

export default async function HomePage() {
  const { data: ratings } = await supabase
    .from('ratings')
    .select('*')
    .order('published_at', { ascending: false })

  const featured = ratings ? ratings.find(r => r.featured) : null
  const rest = ratings ? ratings.filter(r => !r.featured) : []

  return (
    <div>
      <section style={{ padding: '100px 40px 80px', borderBottom: '1px solid #2a2a2a', maxWidth: '800px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1D9E75', marginBottom: '20px' }}>
          NFL + NBA · Contract Analysis
        </div>
        <h1 style={{ fontSize: 'clamp(64px, 10vw, 120px)', fontWeight: 900, lineHeight: 0.92, textTransform: 'uppercase', marginBottom: '28px', letterSpacing: '-0.02em' }}>
          Contract<br /><span style={{ color: '#1D9E75' }}>Year.</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#9a9894', lineHeight: 1.65, marginBottom: '48px', maxWidth: '480px' }}>
          Every contract gets a verdict. No vibes. No hot takes without receipts. We follow the money so you do not have to.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            { label: 'Pay Him', color: '#0F6E56' },
            { label: 'Fair Deal', color: '#4aabcc' },
            { label: 'Overpaid', color: '#E24B4A' },
            { label: 'Dead Money', color: '#666' },
          ].map(function(v) {
            return (
              <span key={v.label} style={{ border: '1px solid ' + v.color, color: v.color, padding: '7px 16px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {v.label}
              </span>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: '48px' }}>
          <div>
            <div style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1 }}>{ratings ? ratings.length : 0}</div>
            <div style={{ fontSize: '12px', color: '#555550', marginTop: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Contracts Rated</div>
          </div>
          <div>
            <div style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1 }}>$1.8B+</div>
            <div style={{ fontSize: '12px', color: '#555550', marginTop: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>In Contracts Analyzed</div>
          </div>
          <div>
            <div style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1 }}>0</div>
            <div style={{ fontSize: '12px', color: '#555550', marginTop: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Takes Without Receipts</div>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '48px 40px 24px', borderBottom: '1px solid #2a2a2a' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#555550' }}>Latest Ratings</span>
        <span style={{ fontSize: '13px', color: '#555550' }}>{ratings ? ratings.length : 0} contracts rated</span>
      </div>

      {featured && (
        <Link href={'/ratings/' + featured.slug} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #2a2a2a', position: 'relative', textDecoration: 'none' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#007A33' }} />
          <div style={{ padding: '48px 48px 48px 52px', borderRight: '1px solid #2a2a2a' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1D9E75', marginBottom: '16px' }}>
              Featured · {featured.league} · {featured.team_name}
            </div>
            <div style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 900, lineHeight: 0.95, color: '#F5F2EC', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              {featured.contract_value}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 500, color: '#9a9894', marginBottom: '20px' }}>
              {featured.player_name} — {featured.contract_detail}
            </div>
            <div style={{ fontSize: '16px', color: '#555550', lineHeight: 1.6, maxWidth: '400px' }}>
              {featured.summary}
            </div>
          </div>
          <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ paddingBottom: '20px', borderBottom: '1px solid #2a2a2a' }}>
              <VerdictBadge verdict={featured.verdict} />
              <div style={{ fontSize: '12px', color: '#555550', marginTop: '6px' }}>Our verdict</div>
            </div>
            <div style={{ paddingBottom: '20px', borderBottom: '1px solid #2a2a2a' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#F5F2EC', lineHeight: 1 }}>{featured.show_your_work_number}</div>
              <div style={{ fontSize: '12px', color: '#555550', marginTop: '4px' }}>Show your work metric</div>
            </div>
            <div style={{ fontSize: '14px', color: '#9a9894', lineHeight: 1.6 }}>{featured.show_your_work_desc}</div>
          </div>
        </Link>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1px', background: '#2a2a2a', borderBottom: '1px solid #2a2a2a' }}>
        {rest.map(function(rating) {
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

      <section style={{ padding: '64px 40px', borderBottom: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#555550', marginBottom: '12px' }}>New Feature</div>
          <div style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, marginBottom: '12px' }}>
            Team Contract <span style={{ color: '#1D9E75' }}>Scores</span>
          </div>
          <div style={{ fontSize: '16px', color: '#9a9894', maxWidth: '400px' }}>
            Search any NFL or NBA team and get an overall contract score, value rating, risk assessment, and cap flexibility grade.
          </div>
        </div>
        <Link href="/teams" style={{ background: '#0F6E56', color: 'white', padding: '16px 32px', fontSize: '14px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
          Analyze a Team →
        </Link>
      </section>

      <footer style={{ borderTop: '1px solid #2a2a2a', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ fontWeight: 800, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Contract <span style={{ color: '#1D9E75' }}>Year</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Home</Link>
          <Link href="/teams" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Teams</Link>
          <Link href="/ratings" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Ratings</Link>
          <a href="https://instagram.com/contractyearhq" target="_blank" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Instagram</a>
        </div>
        <div style={{ fontSize: '12px', color: '#555550' }}>@contractyearhq · Show your work.</div>
      </footer>
    </div>
  )
}
