import { supabase } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const eraThemes = {
  '80s': {
    bg: '#1a1612', bgSecondary: '#221e19',
    accent: '#C8A882', textPrimary: '#E8DCC8',
    textSecondary: '#A89880', textMuted: '#6B5D4F',
    border: '#3a3228',
    headlineFont: '"Georgia", "Times New Roman", serif',
    bodyFont: '"Georgia", serif',
    labelTracking: '0.2em', headlineSize: 'clamp(72px, 11vw, 140px)',
    headlineWeight: 400, headlineTracking: '0.01em',
    stampRotate: '-1deg', grain: true, grainOpacity: 0.12,
    sepia: 'rgba(30,20,8,0.25)', divider: '1px solid',
  },
  '90s': {
    bg: '#0d0d0d', bgSecondary: '#111111',
    accent: '#E8192C', textPrimary: '#FFFFFF',
    textSecondary: '#CCCCCC', textMuted: '#666666',
    border: '#222222',
    headlineFont: '"Arial Black", "Arial", sans-serif',
    bodyFont: '"Arial", sans-serif',
    labelTracking: '0.08em', headlineSize: 'clamp(72px, 12vw, 150px)',
    headlineWeight: 900, headlineTracking: '-0.02em',
    stampRotate: '-2deg', grain: true, grainOpacity: 0.06,
    sepia: 'rgba(0,0,0,0)', divider: '3px solid',
  },
  '2000s': {
    bg: '#060810', bgSecondary: '#0a0d18',
    accent: '#00B4FF', textPrimary: '#FFFFFF',
    textSecondary: '#B0C4DE', textMuted: '#4A6080',
    border: '#1a2a3a',
    headlineFont: '"Impact", "Arial Black", sans-serif',
    bodyFont: '"Verdana", sans-serif',
    labelTracking: '0.14em', headlineSize: 'clamp(72px, 12vw, 150px)',
    headlineWeight: 900, headlineTracking: '0.01em',
    stampRotate: '-1.5deg', grain: false, grainOpacity: 0,
    sepia: 'rgba(0,20,40,0.15)', divider: '1px solid', gradient: true,
  },
  '2010s': {
    bg: '#0f0f0f', bgSecondary: '#1a1a1a',
    accent: '#FF3B30', textPrimary: '#FFFFFF',
    textSecondary: '#BBBBBB', textMuted: '#555555',
    border: '#222222',
    headlineFont: '"Helvetica Neue", "Arial", sans-serif',
    bodyFont: '"Helvetica Neue", sans-serif',
    labelTracking: '0.14em', headlineSize: 'clamp(72px, 11vw, 140px)',
    headlineWeight: 900, headlineTracking: '-0.03em',
    stampRotate: '-1.5deg', grain: false, grainOpacity: 0,
    sepia: 'rgba(0,0,0,0)', divider: '1px solid', cardStyle: true,
  },
}

export default async function ThrowbackPage({ params }) {
  const { slug } = await params
  const { data: throwback, error } = await supabase
    .from('throwbacks')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error || !throwback) return notFound()
  const theme = eraThemes[throwback.era] || eraThemes['2010s']
  const accentColor = throwback.accent_color || theme.accent
  const verdictMap = {
    pay: { label: 'Pay Him', color: '#1D9E75' },
    fair: { label: 'Fair Deal', color: '#4aabcc' },
    over: { label: 'Overpaid', color: '#E24B4A' },
    dead: { label: 'Dead Money', color: '#E24B4A' },
  }
  const verdict = verdictMap[throwback.verdict] || verdictMap.fair
  const gradientText = theme.gradient ? {
    WebkitTextFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    backgroundImage: 'linear-gradient(180deg, #FFFFFF 60%, #8888AA 100%)',
    backgroundClip: 'text',
  } : {}

  return (
    <div style={{ position: 'relative', background: theme.bg, minHeight: '100vh' }}>
      <style>{`
        @keyframes riverFlow {
          0%   { background-position: 50% 0%; }
          100% { background-position: 50% 200%; }
        }
        .river-stripe {
          background: linear-gradient(
            180deg,
            #C8A882 0%,
            #E8192C 25%,
            #00B4FF 50%,
            #FF3B30 75%,
            #C8A882 100%
          );
          background-size: 100% 400%;
          animation: riverFlow 3s linear infinite;
        }
      `}</style>

      {theme.grain && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat', backgroundSize: '150px',
          pointerEvents: 'none', zIndex: 0, opacity: theme.grainOpacity, mixBlendMode: 'overlay',
        }} />
      )}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: theme.sepia, pointerEvents: 'none', zIndex: 0 }} />
      {theme.gradient && (
        <div style={{ position: 'fixed', top: 64, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #00B4FF, #FF6600, #00B4FF)', zIndex: 2 }} />
      )}
      {theme.cardStyle && (
        <div style={{ position: 'fixed', top: 64, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF3B30, #FF9500, #FF3B30)', zIndex: 2 }} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <section style={{ padding: '64px 40px 48px', borderBottom: theme.divider + ' ' + theme.border, position: 'relative', background: theme.bg }}>
          <div className="river-stripe" style={{ position: 'absolute', top: 0, left: 0, width: throwback.era === '90s' ? '8px' : '4px', height: '100%' }} />
          <Link href="/throwbacks" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: theme.textMuted, display: 'inline-block', marginBottom: '32px', textDecoration: 'none', fontFamily: theme.bodyFont }}>
            Back to Throwbacks
          </Link>
          {throwback.era === '80s' && (
            <div style={{ borderTop: '3px solid ' + theme.textPrimary, borderBottom: '1px solid ' + theme.textPrimary, padding: '6px 0', marginBottom: '28px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: theme.textSecondary }}>Contract Year — Throwback</span>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '10px', color: theme.textMuted }}>{throwback.league} · {throwback.team_name} · {throwback.contract_year}</span>
            </div>
          )}
          {throwback.era === '90s' && (
            <div style={{ background: theme.accent, padding: '8px 16px', marginBottom: '24px', display: 'inline-block' }}>
              <span style={{ fontFamily: '"Arial Black", sans-serif', fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>
                THROWBACK CONTRACT · {throwback.contract_year}
              </span>
            </div>
          )}
          {throwback.era === '2000s' && (
            <div style={{ background: 'linear-gradient(90deg, #00B4FF22, transparent)', border: '1px solid #00B4FF44', padding: '8px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ background: '#00B4FF', color: '#000', padding: '2px 8px', fontSize: '10px', fontWeight: 700, fontFamily: 'Verdana, sans-serif', letterSpacing: '0.1em' }}>THROWBACK</span>
              <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '11px', color: theme.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{throwback.league} · {throwback.team_name} · {throwback.contract_year}</span>
            </div>
          )}
          {throwback.era === '2010s' && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
              <span style={{ background: '#FF3B30', color: '#fff', padding: '5px 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>THROWBACK</span>
              <span style={{ background: '#222', color: '#fff', padding: '5px 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>2010s</span>
              <span style={{ fontSize: '12px', color: theme.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{throwback.league} · {throwback.team_name} · {throwback.contract_year}</span>
            </div>
          )}
          <div style={{ fontFamily: theme.headlineFont, fontSize: theme.headlineSize, fontWeight: theme.headlineWeight, lineHeight: 0.88, letterSpacing: theme.headlineTracking, color: theme.textPrimary, marginBottom: '20px', ...gradientText }}>
            {throwback.contract_value}
          </div>
          <div style={{ fontFamily: theme.bodyFont, fontSize: '18px', color: theme.textSecondary, marginBottom: '8px', ...(throwback.era === '80s' ? { fontStyle: 'italic' } : {}) }}>
            {throwback.player_name} — {throwback.contract_detail}
          </div>
          <div style={{ fontFamily: theme.bodyFont, fontSize: '12px', color: theme.textMuted, letterSpacing: '0.06em' }}>
            Contract Year · @contractyearhq · Show your work.
          </div>
        </section>

        <section style={{ padding: '48px 40px', borderBottom: theme.divider + ' ' + theme.border, maxWidth: '720px', background: theme.cardStyle ? '#141414' : theme.bg, ...(theme.cardStyle ? { borderLeft: '4px solid #FF3B30' } : {}) }}>
          <div style={{ fontFamily: theme.bodyFont, fontSize: '10px', fontWeight: 700, letterSpacing: theme.labelTracking, textTransform: 'uppercase', color: theme.accent, marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid ' + theme.accent + '44' }}>
            The Context
          </div>
          <p style={{ fontFamily: theme.bodyFont, fontSize: '18px', color: theme.textSecondary, lineHeight: 1.8, ...(throwback.era === '80s' ? { fontStyle: 'italic' } : {}) }}>
            {throwback.context}
          </p>
        </section>

        <section style={{ padding: '48px 40px', borderBottom: theme.divider + ' ' + theme.border, maxWidth: '720px', background: theme.cardStyle ? '#111' : theme.bg, ...(theme.cardStyle ? { borderLeft: '4px solid #555' } : {}) }}>
          <div style={{ fontFamily: theme.bodyFont, fontSize: '10px', fontWeight: 700, letterSpacing: theme.labelTracking, textTransform: 'uppercase', color: theme.accent, marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid ' + theme.accent + '44' }}>
            How It Played Out
          </div>
          <p style={{ fontFamily: theme.bodyFont, fontSize: '17px', color: theme.textSecondary, lineHeight: 1.8 }}>
            {throwback.how_it_played_out}
          </p>
        </section>

        <section style={{ padding: '48px 40px', borderBottom: theme.divider + ' ' + theme.border, background: theme.cardStyle ? 'linear-gradient(135deg, #1a1a1a 0%, #111 100%)' : theme.gradient ? 'linear-gradient(135deg, #0a0d18 0%, #060d1a 100%)' : theme.bgSecondary, ...(theme.cardStyle ? { borderLeft: '4px solid #FF9500' } : {}) }}>
          <div style={{ fontFamily: theme.bodyFont, fontSize: '10px', fontWeight: 700, letterSpacing: theme.labelTracking, textTransform: 'uppercase', color: theme.accent, marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid ' + theme.accent + '44' }}>
            Show Your Work.
          </div>
          <div style={{ fontFamily: theme.headlineFont, fontSize: 'clamp(64px, 10vw, 120px)', fontWeight: theme.headlineWeight, lineHeight: 1, color: theme.textPrimary, marginBottom: '16px', letterSpacing: theme.headlineTracking, ...gradientText }}>
            {throwback.show_your_work_number}
          </div>
          <p style={{ fontFamily: theme.bodyFont, fontSize: '17px', color: theme.textSecondary, lineHeight: 1.8, maxWidth: '620px' }}>
            {throwback.show_your_work_desc}
          </p>
        </section>

        <section style={{ padding: '48px 40px', borderBottom: theme.divider + ' ' + theme.border, background: theme.bg }}>
          <div style={{ fontFamily: theme.bodyFont, fontSize: '10px', fontWeight: 700, letterSpacing: theme.labelTracking, textTransform: 'uppercase', color: theme.textMuted, marginBottom: '24px', paddingBottom: '10px', borderBottom: theme.divider + ' ' + theme.border }}>
            Contract Year Verdict
          </div>
          <div style={{ display: 'inline-block', marginBottom: '32px' }}>
            <div style={{ border: throwback.era === '90s' ? '5px solid ' + verdict.color : '3px solid ' + verdict.color, padding: '16px 32px', transform: 'rotate(' + theme.stampRotate + ')', position: 'relative', background: verdict.color + '08', boxShadow: (theme.gradient || theme.cardStyle) ? '0 0 24px ' + verdict.color + '33' : 'none' }}>
              <div style={{ position: 'absolute', top: '4px', left: '4px', width: '12px', height: '12px', borderTop: '2px solid ' + verdict.color, borderLeft: '2px solid ' + verdict.color }} />
              <div style={{ position: 'absolute', top: '4px', right: '4px', width: '12px', height: '12px', borderTop: '2px solid ' + verdict.color, borderRight: '2px solid ' + verdict.color }} />
              <div style={{ position: 'absolute', bottom: '4px', left: '4px', width: '12px', height: '12px', borderBottom: '2px solid ' + verdict.color, borderLeft: '2px solid ' + verdict.color }} />
              <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '12px', height: '12px', borderBottom: '2px solid ' + verdict.color, borderRight: '2px solid ' + verdict.color }} />
              <div style={{ fontFamily: theme.headlineFont, fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: theme.headlineWeight, textTransform: 'uppercase', color: verdict.color, lineHeight: 1, letterSpacing: '0.02em', opacity: 0.92 }}>
                {verdict.label}
              </div>
            </div>
          </div>
          <div style={{ borderTop: theme.divider + ' ' + theme.border, paddingTop: '24px' }}>
            <div style={{ fontFamily: theme.bodyFont, fontSize: '14px', color: theme.textMuted, marginBottom: '8px' }}>Agree? Drop your rating on Instagram.</div>
            <div style={{ fontSize: '13px', color: theme.textMuted, marginBottom: '16px', letterSpacing: '0.1em', fontFamily: theme.bodyFont }}>PAY HIM · FAIR DEAL · OVERPAID · DEAD MONEY</div>
            <a href="https://instagram.com/contractyearhq" target="_blank" style={{ display: 'inline-block', background: '#0F6E56', color: 'white', padding: '12px 24px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
              @contractyearhq
            </a>
          </div>
        </section>

        <footer style={{ borderTop: theme.divider + ' ' + theme.border, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', background: theme.bg }}>
          <div style={{ fontFamily: theme.headlineFont, fontSize: '22px', fontWeight: theme.headlineWeight, textTransform: 'uppercase', color: theme.textPrimary }}>
            Contract <span style={{ color: '#1D9E75' }}>Year</span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/" style={{ fontSize: '12px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Home</Link>
            <Link href="/throwbacks" style={{ fontSize: '12px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Throwbacks</Link>
            <Link href="/ratings" style={{ fontSize: '12px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>Ratings</Link>
          </div>
          <div style={{ fontFamily: theme.bodyFont, fontSize: '12px', color: theme.textMuted }}>@contractyearhq · Show your work.</div>
        </footer>
      </div>
    </div>
  )
}
