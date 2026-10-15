'use client'

import React, { Suspense } from 'react'
import { AuthCardLayout } from '@/components/auth/AuthCardLayout'

function InscriptionContent() {
  return <AuthCardLayout initialMode="register" />
}

export default function InscriptionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1b154c]" />}>
      <InscriptionContent />
    </Suspense>
  )
}
