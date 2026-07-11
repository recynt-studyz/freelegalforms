import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Free Legal Document Generator'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a2e1a 0%, #14532d 50%, #166534 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#4ade80',
            marginBottom: 24,
            lineHeight: 1,
            fontFamily: 'serif',
          }}
        >
          §
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          Free Legal Document Generator
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.75)',
            textAlign: 'center',
            marginBottom: 40,
            maxWidth: 800,
          }}
        >
          Invoice, NDA, Bill of Sale, Lease Agreement and Contractor Agreement. Free PDF download, no signup.
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Free', 'No Signup', 'PDF Download', 'Private'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 100,
                padding: '8px 22px',
                color: 'white',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
