'use client'

import { useState } from 'react'

/*
 * BullBearToggle — sliding pill toggle between Bull Case and Bear Case
 *
 * Props:
 *   bullCase    — string, the bull case analysis text
 *   bearCase    — string, the bear case analysis text
 *   accentColor — string, the green accent color for bull state (e.g. '#1D9E75')
 *
 * Tunable constants below:
 */

// --- COLORS --- adjust these to change accent tones
const BULL_COLOR = '#1D9E75'       // green accent for bull state
const BEAR_COLOR = '#E24B4A'       // red accent for bear state
const BG_INACTIVE = '#1a1a1a'      // toggle track background
const BORDER_COLOR = '#2a2a2a'     // border color (matches site dividers)
const TEXT_PRIMARY = '#F5F2EC'      // primary text
const TEXT_SECONDARY = '#9a9894'   // body text
const TEXT_MUTED = '#555550'       // muted/inactive text

// --- TIMING --- adjust these to change transition feel (in ms)
const FADE_DURATION = 220          // content fade in/out
const SLIDE_DURATION = 250         // toggle slider transition

export default function BullBearToggle({ bullCase, bearCase, accentColor }) {
  const [isBull, setIsBull] = useState(true)           // true = Bull, false = Bear
  const [isTransitioning, setIsTransitioning] = useState(false)

  const activeColor = isBull ? (accentColor || BULL_COLOR) : BEAR_COLOR

  function handleToggle(toBull) {
    if (toBull === isBull || isTransitioning) return
    setIsTransitioning(true)

    // After fade-out completes, swap content and fade back in
    setTimeout(() => {
      setIsBull(toBull)
      // Small delay to ensure DOM update before fade-in
      requestAnimationFrame(() => {
        setIsTransitioning(false)
      })
    }, FADE_DURATION)
  }

  return (
    <section style={{
      padding: '48px 40px',
      borderBottom: `1px solid ${BORDER_COLOR}`,
      maxWidth: '720px',
    }}>

      {/* --- TOGGLE SWITCH --- */}
      <div style={{
        display: 'inline-flex',
        position: 'relative',
        background: BG_INACTIVE,
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: '40px',       // pill shape
        padding: '4px',
        marginBottom: '32px',
        cursor: 'pointer',
        userSelect: 'none',
      }}>

        {/* Sliding pill background */}
        <div style={{
          position: 'absolute',
          top: '4px',
          left: isBull ? '4px' : '50%',
          width: 'calc(50% - 4px)',
          height: 'calc(100% - 8px)',
          background: activeColor + '22',   // 13% opacity tint
          border: `1px solid ${activeColor}`,
          borderRadius: '36px',
          transition: `left ${SLIDE_DURATION}ms ease, background ${SLIDE_DURATION}ms ease, border-color ${SLIDE_DURATION}ms ease`,
        }} />

        {/* Bull button */}
        <button
          onClick={() => handleToggle(true)}
          style={{
            position: 'relative',
            zIndex: 1,
            background: 'transparent',
            border: 'none',
            padding: '8px 24px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: isBull ? (accentColor || BULL_COLOR) : TEXT_MUTED,
            cursor: 'pointer',
            transition: `color ${SLIDE_DURATION}ms ease`,
            fontFamily: 'inherit',
            // Responsive: smaller padding on mobile
            minWidth: '0',
          }}
        >
          Bull Case
        </button>

        {/* Bear button */}
        <button
          onClick={() => handleToggle(false)}
          style={{
            position: 'relative',
            zIndex: 1,
            background: 'transparent',
            border: 'none',
            padding: '8px 24px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: !isBull ? BEAR_COLOR : TEXT_MUTED,
            cursor: 'pointer',
            transition: `color ${SLIDE_DURATION}ms ease`,
            fontFamily: 'inherit',
            minWidth: '0',
          }}
        >
          Bear Case
        </button>
      </div>

      {/* --- CONTENT AREA --- */}
      <div style={{
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning
          ? `translateX(${isBull ? '-12px' : '12px'})`   // slide out in direction of old state
          : 'translateX(0)',
        transition: `opacity ${FADE_DURATION}ms ease, transform ${FADE_DURATION}ms ease`,
      }}>
        {/* Section label */}
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: activeColor,
          marginBottom: '16px',
          transition: `color ${FADE_DURATION}ms ease`,
        }}>
          {isBull ? 'The Bull Case' : 'The Bear Case'}
        </div>

        {/* Analysis text */}
        <p style={{
          fontSize: '17px',
          color: TEXT_SECONDARY,
          lineHeight: 1.75,
          margin: 0,
        }}>
          {isBull ? bullCase : bearCase}
        </p>
      </div>

      {/* --- RESPONSIVE STYLES --- */}
      <style>{`
        @media (max-width: 600px) {
          /* Tighten padding on mobile */
          section > div:first-child {
            /* handled by inline padding, but buttons get smaller */
          }
        }
      `}</style>
    </section>
  )
}
