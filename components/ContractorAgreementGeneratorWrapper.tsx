'use client'

import dynamic from 'next/dynamic'

const ContractorAgreementGenerator = dynamic(() => import('./ContractorAgreementGenerator'), { ssr: false })

export default function ContractorAgreementGeneratorWrapper() {
  return <ContractorAgreementGenerator />
}
