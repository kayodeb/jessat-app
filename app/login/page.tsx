'use client'

import React, { Suspense } from 'react'
import { AuthCardLayout } from '@/components/auth/AuthCardLayout'

function LoginContent() {
  return <AuthCardLayout initialMode="login" />
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LoginContent />
    </Suspense>
  )
}
