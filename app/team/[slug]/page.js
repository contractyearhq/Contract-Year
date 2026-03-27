import { supabase } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
 
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
 
  return (
    <div>
      <section style={{
        padding: '64px 40px 48px',
        borderBottom: '1px solid #2a2a2a',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '4px', height: '100%',
          background: scoreColor,
        }} />
        <a href="/teams" style={{
          fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#555550',
          display: 'inline-block', marginBottom: '32px',
        }}>
          Back to All Teams
        </a>
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
          marginBottom: '32px',
        }}>
          {team.name}
        </h1>
 
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
        </div>
      </section>
 
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
 
      <section style={{ padding: '48px 40px', borderBottom: '1px solid #2a2a2a' }}>
        <div style={{
          fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: '#555550', marginBottom: '8px',
        }}>
          Total Payroll
        </div>
        <div style={{ fontSize: '48px', fontWeight: 900, color: '#F5F2EC' }}>
          {'$' + (team.total_payroll / 1000000).toFixed(0) + 'M'}
        </div>
      </section>
 
      <section style={{ padding: '48px 40px' }}>
        <div style={{ fontSize: '14px', color: '#555550' }}>
          Agree with the breakdown? Drop your verdict on Instagram.
        </div>
        <a
          href="https://instagram.com/contractyearhq"
          target="_blank"
          style={{
            display: 'inline-block', marginTop: '16px',
            background: '#0F6E56', color: 'white',
            padding: '12px 24px', fontSize: '13px',
            fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          @contractyearhq
        </a>
      </section>
    </div>
  )
}
 