'use client'

import React, { Suspense } from 'react'
import { AuthCardLayout } from '@/components/auth/AuthCardLayout'

function RegisterContent() {
  return <AuthCardLayout initialMode="register" />
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <RegisterContent />
    </Suspense>
  )
}
