import { supabase } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

function ScoreRing({ score, label }) {
  const color = score >= 75 ? '#1D9E75' : score >= 60 ? '#FFC72C' : '#E24B4A'
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '80px', height: '80px', borderRadius: '50%',
        border: '3px solid ' + color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 8px',
      }}>
        <span style={{ fontSize: '22px', fontWeight: 800, color: color }}>{score}</span>
      </div>
      <div style={{ fontSize: '11px', color: '#555550', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  )
}

export default async function TeamPage({ params }) {
  const { slug } = await params

  const { data: team, error } = await supabase
    .from('teams')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !team) return notFound()

  const scoreColor = team.score_overall >= 75 ? '#1D9E75' : team.score_overall >= 60 ? '#FFC72C' : '#E24B4A'
  const accentColor = team.accent_color || '#0F6E56'

  return (
    <div>
      {/* Header */}
      <section style={{
        padding: '64px 40px 48px',
        borderBottom: '1px solid #2a2a2a',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '4px', height: '100%',
          background: accentColor,
        }} />
        <Link href="/teams" style={{
          fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#555550',
          display: 'inline-block', marginBottom: '32px',
          textDecoration: 'none',
        }}>
          Back to All Teams
        </Link>
        <div style={{
          fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: '#555550', marginBottom: '12px',
        }}>
          {team.league} · Contract Analysis
        </div>
        <h1 style={{
          fontSize: 'clamp(48px, 7vw, 96px)',
          fontWeight: 900, lineHeight: 0.92,
          textTransform: 'uppercase', letterSpacing: '-0.02em',
          marginBottom: '32px', color: '#F5F2EC',
        }}>
          {team.name}
        </h1>

        {/* Scores */}
        <div style={{
          display: 'flex', gap: '48px', flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%',
              border: '4px solid ' + scoreColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 8px',
            }}>
              <span style={{ fontSize: '42px', fontWeight: 900, color: scoreColor }}>
                {team.score_overall}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#555550', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Overall Score
            </div>
          </div>
          <div style={{ width: '1px', height: '80px', background: '#2a2a2a' }} />
          <ScoreRing score={team.score_value} label="Value" />
          <ScoreRing score={team.score_risk} label="Risk" />
          <ScoreRing score={team.score_flexibility} label="Flexibility" />
          <div style={{ marginLeft: 'auto' }}>
            <div style={{ fontSize: '11px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Total Payroll</div>
            <div style={{ fontSize: '36px', fontWeight: 900, color: '#F5F2EC' }}>
              {'$' + (team.total_payroll / 1000000).toFixed(0) + 'M'}
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section style={{
        padding: '48px 40px',
        borderBottom: '1px solid #2a2a2a',
        maxWidth: '720px',
      }}>
        <div style={{
          fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: '#555550', marginBottom: '16px',
        }}>
          Contract Year Analysis
        </div>
        <p style={{ fontSize: '18px', color: '#9a9894', lineHeight: 1.75 }}>
          {team.summary_text}
        </p>
      </section>

      {/* Full Analysis */}
      {team.full_analysis && (
        <section style={{
          padding: '48px 40px',
          borderBottom: '1px solid #2a2a2a',
          maxWidth: '720px',
        }}>
          <div style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: accentColor, marginBottom: '16px',
          }}>
            The Full Picture
          </div>
          <p style={{ fontSize: '17px', color: '#9a9894', lineHeight: 1.75 }}>
            {team.full_analysis}
          </p>
        </section>
      )}

      {/* Best + Worst Contract */}
      {(team.best_contract_player || team.worst_contract_player) && (
        <section style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid #2a2a2a',
          gap: '1px', background: '#2a2a2a',
        }}>
          {team.best_contract_player && (
            <div style={{ background: '#111', padding: '40px' }}>
              <div style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#1D9E75', marginBottom: '12px',
              }}>
                Best Contract
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#F5F2EC', marginBottom: '12px' }}>
                {team.best_contract_player}
              </div>
              <p style={{ fontSize: '15px', color: '#9a9894', lineHeight: 1.65 }}>
                {team.best_contract}
              </p>
            </div>
          )}
          {team.worst_contract_player && (
            <div style={{ background: '#111', padding: '40px' }}>
              <div style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#E24B4A', marginBottom: '12px',
              }}>
                Biggest Risk
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#F5F2EC', marginBottom: '12px' }}>
                {team.worst_contract_player}
              </div>
              <p style={{ fontSize: '15px', color: '#9a9894', lineHeight: 1.65 }}>
                {team.worst_contract}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Engage */}
      <section style={{ padding: '48px 40px', borderBottom: '1px solid #2a2a2a' }}>
        <div style={{ fontSize: '14px', color: '#555550', marginBottom: '16px' }}>
          Agree with the breakdown? Drop your verdict on Instagram.
        </div>
        <a
          href="https://instagram.com/contractyearhq"
          target="_blank"
          style={{
            display: 'inline-block',
            background: '#0F6E56', color: 'white',
            padding: '12px 24px', fontSize: '13px',
            fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', textDecoration: 'none',
          }}
        >
          @contractyearhq
        </a>
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
          <Link href="/" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Home</Link>
          <Link href="/teams" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Teams</Link>
          <Link href="/ratings" style={{ fontSize: '12px', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Ratings</Link>
        </div>
        <div style={{ fontSize: '12px', color: '#555550' }}>@contractyearhq · Show your work.</div>
      </footer>
    </div>
  )
}