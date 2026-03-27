import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Contract Year — Show Your Work.',
  description: 'NFL and NBA contract analysis with a finance lens. Pay Him. Fair Deal. Overpaid. Dead Money.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 40px',
          height: '64px',
          background: 'rgba(17,17,17,0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #2a2a2a',
        }}>
          <a href="/" style={{
            fontWeight: 800, fontSize: '20px',
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>
            Contract <span style={{ color: '#1D9E75' }}>Year</span>
          </a>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="/" style={{ fontSize: '13px', color: '#9a9894', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Home</a>
            <a href="/ratings" style={{ fontSize: '13px', color: '#9a9894', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ratings</a>
            <a href="https://instagram.com/contractyearhq" target="_blank" style={{
              background: '#0F6E56', color: 'white',
              padding: '8px 18px', fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              @contractyearhq
            </a>
          </div>
        </nav>
        <main style={{ paddingTop: '64px' }}>
          {children}
        </main>
      </body>
    </html>
  )
}