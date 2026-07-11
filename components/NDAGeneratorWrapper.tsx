'use client'

import dynamic from 'next/dynamic'

const NDAGenerator = dynamic(() => import('./NDAGenerator'), { ssr: false })

export default function NDAGeneratorWrapper() {
  return <NDAGenerator />
}
