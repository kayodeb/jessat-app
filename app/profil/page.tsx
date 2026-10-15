'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/auth-context'
import {
  User,
  Package,
  ShieldCheck,
  Heart,
  LogOut,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Clock,
  Truck,
  Lock,
  ArrowLeft
} from 'lucide-react'
import { Input } from '@/components/ui/input'

// Mock customer orders for demonstration
const MOCK_ORDERS = [
  {
    id: 'JES-9842',
    date: '08 Septembre 2026',
    status: 'Livré',
    statusBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    total: 450000,
    items: [
      { name: 'HP EliteBook 840 G5 - Core i5 8è Gen', qty: 1, price: 320000 },
      { name: 'Imprimante HP LaserJet Pro M15w', qty: 1, price: 130000 }
    ],
    paymentMethod: 'MTN Mobile Money'
  },
  {
    id: 'JES-9104',
    date: '24 Août 2026',
    status: 'En cours de livraison',
    statusBg: 'bg-blue-50 text-blue-700 border-blue-200',
    total: 25000,
    items: [
      { name: 'Souris Sans Fil Logitech M185', qty: 2, price: 25000 }
    ],
    paymentMethod: 'Paiement à la livraison'
  }
]

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, updateUserProfile, logoutCustomer, loginCustomer } = useAuth()

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'security'>('profile')

  // Edit profile form states
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [address, setAddress] = useState(user?.address || '')
  const [city, setCity] = useState(user?.city || 'Abomey-Calavi')

  // Password change states
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!name || !email) {
      setErrorMessage('Le nom et l\'email sont requis.')
      return
    }

    updateUserProfile({ name, email, phone, address, city })
    showToast('Profil mis à jour avec succès !')
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!newPassword || !confirmNewPassword) {
      setErrorMessage('Veuillez remplir les nouveaux mots de passe.')
      return
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Les nouveaux mots de passe ne correspondent pas.')
      return
    }

    setCurrentPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
    showToast('Votre mot de passe a été modifié avec succès.')
  }

  // Unauthenticated fallback prompt
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-zinc-200 rounded-3xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-950 mb-2">Connectez-vous à votre espace</h2>
          <p className="text-xs text-zinc-500 mb-6 font-medium">
            Accédez à vos informations personnelles, à vos commandes récentes et à vos préférences.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/login')}
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/25"
            >
              Se connecter
            </button>
            <button
              onClick={async () => {
                await loginCustomer('marc.lawson@gmail.com')
              }}
              className="w-full py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl text-xs transition-all border border-indigo-200/60"
            >
              ⚡ Activer le compte Démo Marc Lawson
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à la boutique</span>
          </Link>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Espace Client Membre
          </span>
        </div>

        {/* PROFILE HEADER CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-zinc-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-600 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" title="Compte Actif" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-950">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold uppercase border border-emerald-200">
                  Client Vérifié
                </span>
              </div>
              <p className="text-xs font-medium text-zinc-500 mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  {user.email}
                </span>
                {user.phone && (
                  <span className="hidden sm:flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-zinc-400" />
                    {user.phone}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-zinc-100">
            <Link
              href="/wishlist"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-all"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Favoris</span>
            </Link>
            <button
              onClick={() => {
                logoutCustomer()
                router.push('/')
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* TOAST NOTIFICATION */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* MAIN TABS & CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar Nav Tabs */}
          <div className="lg:col-span-1 space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/80'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Mon Profil</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Mes Commandes</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold">
                {MOCK_ORDERS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'security'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/80'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sécurité</span>
            </button>
          </div>

          {/* Tab Contents Area */}
          <div className="lg:col-span-3">
            
            {/* TAB 1: INFORMATIONS PERSONNELLES */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-zinc-200/80">
                <h2 className="text-lg font-extrabold text-zinc-950 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  <span>Informations Personnelles</span>
                </h2>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">
                        Nom Complet
                      </label>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="py-2.5 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">
                        Adresse Email
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">
                        Téléphone (WhatsApp)
                      </label>
                      <Input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+229 97 00 00 00"
                        className="py-2.5 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">
                        Ville
                      </label>
                      <Input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Abomey-Calavi / Cotonou"
                        className="py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">
                      Adresse de livraison principale
                    </label>
                    <Input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Carrefour Zogbadjè, Rue 12.04"
                      className="py-2.5 text-sm"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-indigo-600/20"
                    >
                      Enregistrer les modifications
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: MES COMMANDES */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="text-lg font-extrabold text-zinc-950 mb-2 flex items-center gap-2">
                  <Package className="w-5 h-5 text-indigo-600" />
                  <span>Historique des Commandes ({MOCK_ORDERS.length})</span>
                </h2>

                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200/80 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                      <div>
                        <span className="text-xs font-bold text-zinc-400">Commande</span>
                        <h3 className="text-sm font-extrabold text-zinc-950">#{order.id}</h3>
                        <p className="text-xs text-zinc-500 font-medium mt-0.5">{order.date}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-extrabold border ${order.statusBg}`}
                        >
                          {order.status}
                        </span>
                        <span className="text-sm font-extrabold text-zinc-950">
                          {order.total.toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs font-semibold py-1.5 text-zinc-700"
                        >
                          <span>
                            {item.qty}x {item.name}
                          </span>
                          <span className="text-zinc-500">
                            {(item.qty * item.price).toLocaleString()} FCFA
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                      <span>Paiement: {order.paymentMethod}</span>
                      <span className="text-indigo-600 font-bold hover:underline cursor-pointer">
                        Voir détails & Facture ↗
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: SÉCURITÉ */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-zinc-200/80">
                <h2 className="text-lg font-extrabold text-zinc-950 mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  <span>Sécurité du Compte</span>
                </h2>

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">
                      Mot de passe actuel
                    </label>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">
                      Nouveau mot de passe
                    </label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">
                      Confirmer le nouveau mot de passe
                    </label>
                    <Input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="py-2.5 text-sm"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-indigo-600/20"
                    >
                      Mettre à jour le mot de passe
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}
