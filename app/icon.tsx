import { ImageResponse } from 'next/og'

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontFamily: 'monospace',
        color: 'white',
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        letterSpacing: -2,
      }}
    >
      <span style={{ fontSize: 24 }}>\</span>
      <span style={{ fontSize: 20 }}>n</span>
    </div>,
    { width: 32, height: 32 },
  )
}
