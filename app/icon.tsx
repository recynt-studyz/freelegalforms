import { ImageResponse } from 'next/og'

export const size = { width: 48, height: 48 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #14532d, #16a34a)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: 'white',
            fontFamily: 'serif',
            lineHeight: 1,
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          §
        </span>
      </div>
    ),
    { ...size }
  )
}
