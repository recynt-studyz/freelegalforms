'use client'

import dynamic from 'next/dynamic'

const BillOfSaleGenerator = dynamic(() => import('./BillOfSaleGenerator'), { ssr: false })

export default function BillOfSaleGeneratorWrapper() {
  return <BillOfSaleGenerator />
}
