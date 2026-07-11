'use client'

import dynamic from 'next/dynamic'

const LeaseAgreementGenerator = dynamic(() => import('./LeaseAgreementGenerator'), { ssr: false })

export default function LeaseAgreementGeneratorWrapper() {
  return <LeaseAgreementGenerator />
}
