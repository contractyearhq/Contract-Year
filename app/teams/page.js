import { supabase } from '../../lib/supabase'
import Link from 'next/link'

function ScoreBadge({ score }) {
  const color = score >= 75 ? '#1D9E75' : score >= 60 ? '#FFC72C' : '#E24B4A'
  return (
    <span style={{
      background: color + '22', color: color,
      padding: '4px 12px', fontSize: '14px',
      fontWeight: 700, letterSpacing: '0.06em',
    }}>
      {score}
    </span>
  )
}

export default async function TeamsPage() {
  const { data: teams } = await supabase
    .from('teams')
    .select('*')
    .order('score_overall', { ascending: false })

  const nflTeams = teams ? teams.filter(t => t.league === 'NFL') : []
  const nbaTeams = teams ? teams.filter(t => t.league === 'NBA') : []

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
          Team Analysis Tool
        </div>
        <h1 style={{
          fontSize: 'clamp(48px, 7vw, 96px)',
          fontWeight: 900, lineHeight: 0.92,
          textTransform: 'uppercase', marginBottom: '20px',
          letterSpacing: '-0.02em',
        }}>
          Team Contract<br />
          <span style={{ color: '#1D9E75' }}>Scores.</span>
        </h1>
        <p style={{ fontSize: '16px', color: '#9a9894', maxWidth: '500px' }}>
          Every team rated on value, risk, and cap flexibility. Click any team to see the full breakdown.
        </p>
      </section>

      {/* NFL */}
      <section style={{ borderBottom: '1px solid #2a2a2a' }}>
        <div style={{
          padding: '32px 40px 16px',
          fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: '#555550',
          borderBottom: '1px solid #2a2a2a',
        }}>
          NFL — {nflTeams.length} Teams Rated
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          padding: '10px 40px',
          borderBottom: '1px solid #1a1a1a',
        }}>
          {['Team', 'Overall', 'Value', 'Risk', 'Flexibility'].map(h => (
            <div key={h} style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555550' }}>
              {h}
            </div>
          ))}
        </div>

        {nflTeams.map(function(team) {
          return (
            <Link key={team.slug} href={'/team/' + team.slug} style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
              padding: '20px 40px',
              borderBottom: '1px solid #2a2a2a',
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
            
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '16px', color: '#F5F2EC' }}>{team.name}</div>
                <div style={{ fontSize: '12px', color: '#555550', marginTop: '2px' }}>NFL</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}><ScoreBadge score={team.score_overall} /></div>
              <div style={{ display: 'flex', alignItems: 'center' }}><ScoreBadge score={team.score_value} /></div>
              <div style={{ display: 'flex', alignItems: 'center' }}><ScoreBadge score={team.score_risk} /></div>
              <div style={{ display: 'flex', alignItems: 'center' }}><ScoreBadge score={team.score_flexibility} /></div>
            </Link>
          )
        })}
      </section>

      {/* NBA */}
      <section style={{ borderBottom: '1px solid #2a2a2a' }}>
        <div style={{
          padding: '32px 40px 16px',
          fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: '#555550',
          borderBottom: '1px solid #2a2a2a',
        }}>
          NBA — {nbaTeams.length} Teams Rated
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          padding: '10px 40px',
          borderBottom: '1px solid #1a1a1a',
        }}>
          {['Team', 'Overall', 'Value', 'Risk', 'Flexibility'].map(h => (
            <div key={h} style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555550' }}>
              {h}
            </div>
          ))}
        </div>

        {nbaTeams.map(function(team) {
          return (
            <Link key={team.slug} href={'/team/' + team.slug} style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
              padding: '20px 40px',
              borderBottom: '1px solid #2a2a2a',
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
            
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '16px', color: '#F5F2EC' }}>{team.name}</div>
                <div style={{ fontSize: '12px', color: '#555550', marginTop: '2px' }}>NBA</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}><ScoreBadge score={team.score_overall} /></div>
              <div style={{ display: 'flex', alignItems: 'center' }}><ScoreBadge score={team.score_value} /></div>
              <div style={{ display: 'flex', alignItems: 'center' }}><ScoreBadge score={team.score_risk} /></div>
              <div style={{ display: 'flex', alignItems: 'center' }}><ScoreBadge score={team.score_flexibility} /></div>
            </Link>
          )
        })}
      </section>

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
          <Link href="/" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Home</Link>
          <Link href="/teams" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Teams</Link>
          <a href="https://instagram.com/contractyearhq" target="_blank" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Instagram</a>
        </div>
        <div style={{ fontSize: '12px', color: '#555550' }}>@contractyearhq · Show your work.</div>
      </footer>
    </div>
  )
}
