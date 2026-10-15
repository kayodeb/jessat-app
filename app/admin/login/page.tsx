'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/ui/Logo'
import { useAuth } from '@/lib/context/auth-context'
import { Input } from '@/components/ui/input'
import { ShieldCheck, Eye, EyeOff, Lock, AlertCircle, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const { loginAdmin } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!email) {
      setErrorMessage("Veuillez remplir l'adresse email administrateur.")
      return
    }
    if (!password) {
      setErrorMessage('Veuillez saisir votre mot de passe.')
      return
    }

    try {
      setLoading(true)
      await loginAdmin(email, password)
      setSuccessMessage('Accès administrateur confirmé ! Redirection en cours...')
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    } catch {
      setErrorMessage('Erreur lors de la connexion au portail admin.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoAdminLogin = async () => {
    setLoading(true)
    await loginAdmin('admin@jessat.com', 'admin123')
    setSuccessMessage('Connexion administrateur démo validée ! Redirection...')
    setTimeout(() => {
      router.push('/admin')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-2">
        <Logo variant="full" href="/" size="md" />
        <Link
          href="/"
          className="text-xs sm:text-sm font-semibold text-zinc-600 hover:text-zinc-950 transition-colors flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-200 hover:bg-zinc-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Boutique publique</span>
        </Link>
      </div>

      {/* Main Admin Card */}
      <div className="w-full max-w-md mx-auto my-auto py-8">
        <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-sm border border-zinc-200 transition-all">
          
          {/* Header & Admin Badge */}
          <div className="mb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-bold mb-4">
              <ShieldCheck className="w-4 h-4 text-zinc-900" />
              <span>Portail Administration Jessat</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              Connexion Admin
            </h1>
            <p className="text-xs sm:text-sm font-medium text-zinc-500 mt-2">
              Saisissez vos identifiants pour gérer les produits, commandes et utilisateurs.
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                Identifiant / Email Admin
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jessat.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                Mot de passe
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1"
                  aria-label="Afficher ou masquer le mot de passe"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl shadow-sm active:scale-[0.99] transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'Vérification en cours...' : 'Accéder au Dashboard'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {/* One-click Demo Admin Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleDemoAdminLogin}
                className="w-full py-2.5 px-4 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 font-semibold rounded-xl text-xs transition-all border border-zinc-200 text-center"
              >
                ⚡ Connexion Démo Admin Directe (1 Clic)
              </button>
            </div>
          </form>

          {/* Security footnote */}
          <div className="mt-8 pt-6 border-t border-zinc-100 text-center text-xs text-zinc-400">
            Session sécurisée avec chiffrement de bout en bout • Jessat v1.0
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-7xl mx-auto text-center py-2 text-xs text-zinc-400">
        © {new Date().getFullYear()} Jessat Multi Services • Administration système
      </div>
    </div>
  )
}
