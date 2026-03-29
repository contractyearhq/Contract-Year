'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

/*
 * ShowYourWork — expandable accordion for the headline stat + calculation breakdown
 *
 * Props:
 *   stat         — string, the big number/headline (e.g. "$18,800 per yard")
 *   formula      — string, optional, the formula expression (e.g. "AAV / Receiving Yards")
 *   inputs       — string, optional, the formula with real values (e.g. "$42.15M / 1,793 yards")
 *   explanation  — string, the plain-English description of what the stat means
 *   accentColor  — string, accent color for the section label
 */

// --- TIMING --- adjust these to tune the animation feel (in ms)
const EXPAND_DURATION = 280       // height transition on expand
const COLLAPSE_DURATION = 250     // height transition on collapse
const FADE_DELAY = 80             // delay before content fades in (lets height open first)
const FADE_DURATION = 200         // opacity transition for inner content

// --- COLORS --- matches existing site design tokens
const BG_SECTION = '#161616'      // section background (matches current Show Your Work)
const BORDER_COLOR = '#2a2a2a'    // site-wide divider color
const TEXT_PRIMARY = '#F5F2EC'     // headline text
const TEXT_SECONDARY = '#9a9894'  // body text
const TEXT_MUTED = '#555550'      // hint text / labels

export default function ShowYourWork({ stat, formula, inputs, explanation, accentColor }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const [isFadedIn, setIsFadedIn] = useState(false)
  const innerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  // Measure the hidden content's natural height
  useEffect(() => {
    if (innerRef.current) {
      setContentHeight(innerRef.current.scrollHeight)
    }
  }, [formula, inputs, explanation])

  // Re-measure on window resize (content may reflow)
  useEffect(() => {
    function handleResize() {
      if (innerRef.current) {
        setContentHeight(innerRef.current.scrollHeight)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle the fade-in delay after expand begins
  useEffect(() => {
    if (isExpanded) {
      if (prefersReducedMotion) {
        setIsFadedIn(true)
        return
      }
      const timer = setTimeout(() => setIsFadedIn(true), FADE_DELAY)
      return () => clearTimeout(timer)
    } else {
      setIsFadedIn(false)
    }
  }, [isExpanded, prefersReducedMotion])

  const toggle = useCallback(() => setIsExpanded(prev => !prev), [])

  // Determine if there's any expandable content at all
  const hasExpandableContent = formula || inputs || explanation

  return (
    <section style={{
      padding: '48px 40px',
      borderBottom: `1px solid ${BORDER_COLOR}`,
      background: BG_SECTION,
    }}>
      {/* Section label */}
      <div style={{
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: accentColor,
        marginBottom: '16px',
      }}>
        Show Your Work.
      </div>

      {/* Clickable stat area */}
      <div
        onClick={hasExpandableContent ? toggle : undefined}
        role={hasExpandableContent ? 'button' : undefined}
        tabIndex={hasExpandableContent ? 0 : undefined}
        onKeyDown={hasExpandableContent ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() }
        } : undefined}
        aria-expanded={hasExpandableContent ? isExpanded : undefined}
        style={{
          cursor: hasExpandableContent ? 'pointer' : 'default',
          userSelect: 'none',
        }}
      >
        {/* The big stat — visual anchor */}
        <div style={{
          fontSize: 'clamp(48px, 8vw, 96px)',
          fontWeight: 900,
          lineHeight: 1,
          color: TEXT_PRIMARY,
          marginBottom: hasExpandableContent ? '12px' : '16px',
          letterSpacing: '-0.02em',
        }}>
          {stat}
        </div>

        {/* "Tap to see" hint — only shown when there's expandable content */}
        {hasExpandableContent && (
          <div style={{
            fontSize: '12px',
            color: TEXT_MUTED,
            letterSpacing: '0.06em',
            marginBottom: '8px',
          }}>
            Tap to {isExpanded ? 'hide' : 'see'} the calculation{' '}
            <span style={{
              display: 'inline-block',
              transition: prefersReducedMotion ? 'none' : `transform ${EXPAND_DURATION}ms ease`,
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              /* Arrow character: ↓ flips to ↑ via rotation */
            }}>
              ↓
            </span>
          </div>
        )}
      </div>

      {/* Expandable content area — accordion with measured height */}
      {hasExpandableContent && (
        <div style={{
          overflow: 'hidden',
          height: isExpanded ? `${contentHeight}px` : '0px',
          transition: prefersReducedMotion
            ? 'none'
            : `height ${isExpanded ? EXPAND_DURATION : COLLAPSE_DURATION}ms ${isExpanded ? 'ease-out' : 'ease-in'}`,
        }}>
          <div
            ref={innerRef}
            style={{
              paddingTop: '24px',        // spacing between stat and details
              opacity: isFadedIn ? 1 : 0,
              transition: prefersReducedMotion
                ? 'none'
                : `opacity ${FADE_DURATION}ms ease`,
            }}
          >
            {/* Formula */}
            {formula && (
              <div style={{ marginBottom: '12px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: TEXT_MUTED,
                }}>
                  Formula
                </span>
                <div style={{
                  fontSize: '17px',
                  color: TEXT_PRIMARY,
                  marginTop: '6px',
                  fontWeight: 600,
                }}>
                  {formula}
                </div>
              </div>
            )}

            {/* Inputs with real values */}
            {inputs && (
              <div style={{ marginBottom: '16px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: TEXT_MUTED,
                }}>
                  Inputs
                </span>
                <div style={{
                  fontSize: '17px',
                  color: accentColor,
                  marginTop: '6px',
                  fontWeight: 600,
                }}>
                  {inputs}
                </div>
              </div>
            )}

            {/* Plain-English explanation */}
            {explanation && (
              <p style={{
                fontSize: '17px',
                color: TEXT_SECONDARY,
                lineHeight: 1.75,
                maxWidth: '620px',
                margin: 0,
              }}>
                {explanation}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Fallback: if no expandable content, show explanation inline (current behavior) */}
      {!hasExpandableContent && explanation && (
        <p style={{
          fontSize: '17px',
          color: TEXT_SECONDARY,
          lineHeight: 1.75,
          maxWidth: '620px',
        }}>
          {explanation}
        </p>
      )}
    </section>
  )
}

/*
 * Hook: detects prefers-reduced-motion media query
 * Returns true if the user prefers reduced motion
 */
function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    function handler(e) { setPrefersReduced(e.matches) }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
