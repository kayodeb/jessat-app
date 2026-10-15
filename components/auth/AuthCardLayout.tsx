'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Truck,
  Headphones,
  X,
  Laptop,
  ArrowRight,
} from 'lucide-react'
import { useAuth } from '@/lib/context/auth-context'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Logo } from '@/components/ui/Logo'

interface AuthCardLayoutProps {
  initialMode?: 'login' | 'register' | 'forgot'
}

export function AuthCardLayout({ initialMode = 'login' }: AuthCardLayoutProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams?.get('redirect') || '/'

  const { loginCustomer, registerCustomer } = useAuth()

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode)

  // Form Fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // Status
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [infoModal, setInfoModal] = useState<'expect' | 'engagements' | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (mode === 'login') {
      if (!email.trim()) {
        setErrorMessage('Veuillez saisir votre adresse email.')
        return
      }
      if (!password) {
        setErrorMessage('Veuillez saisir votre mot de passe.')
        return
      }

      try {
        setLoading(true)
        await loginCustomer(email.trim(), password)
        setSuccessMessage('Connexion réussie ! Redirection en cours...')
        setTimeout(() => {
          router.push(redirectPath)
        }, 500)
      } catch (err: any) {
        setErrorMessage(err?.message || 'Identifiants incorrects. Veuillez vérifier vos accès.')
      } finally {
        setLoading(false)
      }
    } else if (mode === 'register') {
      if (!name.trim()) {
        setErrorMessage('Veuillez renseigner votre nom complet.')
        return
      }
      if (!email.trim()) {
        setErrorMessage('Veuillez renseigner une adresse email valide.')
        return
      }
      if (!password || password.length < 6) {
        setErrorMessage('Le mot de passe doit comporter au moins 6 caractères.')
        return
      }
      if (password !== confirmPassword) {
        setErrorMessage('Les deux mots de passe ne correspondent pas.')
        return
      }

      try {
        setLoading(true)
        await registerCustomer(
          name.trim(),
          email.trim(),
          phone.trim() || '',
          password
        )
        setSuccessMessage('Compte créé avec succès ! Connexion automatique...')
        setTimeout(() => {
          router.push(redirectPath)
        }, 600)
      } catch (err: any) {
        setErrorMessage(err?.message || 'Erreur lors de la création du compte.')
      } finally {
        setLoading(false)
      }
    } else if (mode === 'forgot') {
      if (!email.trim()) {
        setErrorMessage('Veuillez saisir votre adresse email.')
        return
      }
      setSuccessMessage('Si un compte est associé à cette adresse, vous recevrez un lien de réinitialisation sous peu.')
    }
  }

  const fillDemoCustomer = () => {
    setEmail('client@jessat.com')
    setPassword('ClientPassword123!')
  }

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900 flex flex-col justify-between selection:bg-zinc-900 selection:text-white font-sans">
      {/* ── Top Header Navigation (Identique au header du homepage) ── */}
      <header className="w-full border-b border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo du site identique au header du homepage */}
          <Logo variant="full" href="/" size="md" />

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-700 hover:text-zinc-950 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour à la boutique</span>
          </Link>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center justify-center">
        {/* Conteneur principal englobant les deux sections pour avoir la même section équilibrée */}
        <div className="w-full max-w-5xl bg-white border border-zinc-200/90 rounded-3xl shadow-sm overflow-hidden flex flex-col lg:flex-row items-stretch">
          
          {/* ── Section 1 : Message de bienvenue (flex-1) ── */}
          <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-100 bg-zinc-50/40">
            <div className="space-y-6">
              {/* Logo du site dans la section login */}
              <div>
                <Logo variant="full" href="/" size="md" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold border border-zinc-200 w-fit">
                <Laptop className="w-3.5 h-3.5 text-zinc-900" />
                <span>Matériel Informatique Pro &amp; Gaming • Bénin</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950 leading-tight">
                  {mode === 'login' && 'Bon retour parmi nous.'}
                  {mode === 'register' && 'Rejoignez la communauté Jessat™.'}
                  {mode === 'forgot' && 'Réinitialisez votre mot de passe.'}
                </h1>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Accédez au meilleur du matériel informatique au Bénin : PC portables pro, stations de travail, configurations gaming et accessoires certifiés avec garantie locale.
                </p>
              </div>

              {/* Points de réassurance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 pt-2">
                <div className="p-3 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900">Garantie 12 Mois</h4>
                    <p className="text-[11px] text-zinc-500">Matériel 100% inspecté &amp; certifié</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900">Livraison Rapide</h4>
                    <p className="text-[11px] text-zinc-500">Partout au Bénin (Calavi, Cotonou...)</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900">SAV &amp; Conseil Dédié</h4>
                    <p className="text-[11px] text-zinc-500">Accompagnement par des experts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons d'information */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-zinc-200/60 mt-6">
              <button
                type="button"
                onClick={() => setInfoModal('expect')}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-zinc-100 text-xs font-semibold text-zinc-800 border border-zinc-200 transition-colors shadow-2xs"
              >
                Ce qui vous attend ?
              </button>
              <button
                type="button"
                onClick={() => setInfoModal('engagements')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
              >
                Nos engagements qualité →
              </button>
            </div>
          </div>

          {/* ── Section 2 : Formulaire (flex-1) ── */}
          <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-white">
            
            {/* Sélecteur Onglets (Connexion / Inscription) */}
            <div className="flex items-center p-1 bg-zinc-100 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('login')
                  setErrorMessage('')
                  setSuccessMessage('')
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                  mode === 'login'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Connexion
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register')
                  setErrorMessage('')
                  setSuccessMessage('')
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                  mode === 'register'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Inscription
              </button>
            </div>

            {/* Titre & Sous-titre du Formulaire */}
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-tight text-zinc-950">
                {mode === 'login' && 'Connexion à votre compte'}
                {mode === 'register' && 'Créer un nouveau compte'}
                {mode === 'forgot' && 'Mot de passe oublié'}
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                {mode === 'login' && 'Accédez à votre panier, vos commandes et vos préférences.'}
                {mode === 'register' && 'Créez votre compte en moins d’une minute.'}
                {mode === 'forgot' && 'Saisissez votre adresse email pour recevoir le lien de réinitialisation.'}
              </p>
            </div>

            {/* Messages d'erreur & succès */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Formulaire avec composants Shadcn */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Nom complet (Inscription uniquement) */}
              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-zinc-700">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Marc Lawson"
                      required
                      className="pr-10"
                    />
                    <UserIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Adresse email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-700">
                  Adresse email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    required
                    className="pr-10"
                  />
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              {/* Téléphone (Inscription uniquement) */}
              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-zinc-700">
                    Numéro de téléphone <span className="text-zinc-400 font-normal">(optionnel)</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+229 97 00 11 22"
                      className="pr-10"
                    />
                    <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Mot de passe */}
              {mode !== 'forgot' && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-zinc-700">
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1"
                      tabIndex={-1}
                      aria-label="Afficher ou masquer le mot de passe"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirmation du mot de passe (Inscription uniquement) */}
              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-zinc-700">
                    Confirmer le mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="pr-10"
                    />
                    <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Se souvenir de moi & Mot de passe oublié */}
              {mode === 'login' && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-600 hover:text-zinc-900">
                    <Checkbox
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked)}
                    />
                    <span>Se souvenir de moi</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot')
                      setErrorMessage('')
                      setSuccessMessage('')
                    }}
                    className="text-zinc-600 hover:text-zinc-950 font-medium transition-colors"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              )}

              {/* Bouton de Soumission */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-6 rounded-xl bg-zinc-950 hover:bg-zinc-800 active:scale-[0.99] text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {mode === 'login' && 'Se connecter'}
                      {mode === 'register' && 'Créer mon compte'}
                      {mode === 'forgot' && 'Envoyer le lien'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Démo Rapide */}
            {mode === 'login' && (
              <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                <span className="text-zinc-500">Compte de test :</span>
                <button
                  type="button"
                  onClick={fillDemoCustomer}
                  className="font-semibold text-zinc-900 hover:underline hover:text-blue-600 transition-colors"
                >
                  Remplir compte démo
                </button>
              </div>
            )}

            {/* Retour pour le mode mot de passe oublié */}
            {mode === 'forgot' && (
              <div className="mt-5 pt-4 border-t border-zinc-100 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login')
                    setErrorMessage('')
                    setSuccessMessage('')
                  }}
                  className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors"
                >
                  ← Revenir à la page de connexion
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full border-t border-zinc-100 bg-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Jessat Multi Services • Abomey-Calavi, Bénin. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-zinc-900 transition-colors">
              Contact &amp; Assistance
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              Catalogue Produits
            </Link>
          </div>
        </div>
      </footer>

      {/* ── Boîte modale d'information ── */}
      {infoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
            <button
              onClick={() => setInfoModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center hover:bg-zinc-200 transition-colors"
              aria-label="Fermer la boîte de dialogue"
            >
              <X className="w-4 h-4" />
            </button>

            {infoModal === 'expect' ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-zinc-900 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-950">Ce qui vous attend chez Jessat™</h3>
                    <p className="text-xs text-zinc-500">Une expérience d'achat et un suivi exemplaires</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs text-zinc-600">
                  <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
                    <span className="font-bold text-zinc-900 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-zinc-900" /> Livraison Express au Bénin
                    </span>
                    <p className="text-zinc-600">Réception rapide et soignée à Abomey-Calavi, Cotonou et partout au Bénin.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
                    <span className="font-bold text-zinc-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-zinc-900" /> Garantie &amp; SAV Réactif
                    </span>
                    <p className="text-zinc-600">Chaque PC subit un contrôle technique complet avec garantie locale assurée.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
                    <span className="font-bold text-zinc-900 flex items-center gap-2">
                      <Headphones className="w-4 h-4 text-zinc-900" /> Assistance 7j/7
                    </span>
                    <p className="text-zinc-600">Notre équipe vous conseille par téléphone ou WhatsApp dans votre choix.</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-zinc-900 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-950">Nos Engagements Qualité</h3>
                    <p className="text-xs text-zinc-500">Transparence, performance et matériel certifié</p>
                  </div>
                </div>
                <div className="space-y-2.5 text-xs text-zinc-600 leading-relaxed">
                  <p>
                    Chez <strong className="text-zinc-900">Jessat Multi Services</strong> (situé à Carrefour Zogbadjè, Abomey-Calavi), nous mettons un point d'honneur à ne proposer que des machines testées et approuvées.
                  </p>
                  <p>
                    Que vous soyez étudiant, développeur, graphiste ou gamer exigeant, nous vous aidons à trouver la machine adaptée à votre budget et à vos ambitions.
                  </p>
                </div>
              </>
            )}

            <button
              onClick={() => setInfoModal(null)}
              className="w-full py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
