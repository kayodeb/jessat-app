'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Phone,
  MapPin,
  User,
  Mail,
  Building2,
  Globe,
  CreditCard,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react'
import { useCart } from '@/lib/context/cart-context'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'

export default function CheckoutPage() {
  const { items, clearCart, subtotal, totalItems } = useCart()

  // Checkout Form State
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: 'Abomey-Calavi',
    pays: 'Bénin',
    notes: '',
  })

  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [orderDetails, setOrderDetails] = useState<{
    id: string
    date: string
    items: typeof items
    subtotal: number
    customer: typeof formData
  } | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    const orderId = `JST-${Math.floor(100000 + Math.random() * 900000)}`
    const now = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    const details = {
      id: orderId,
      date: now,
      items: [...items],
      subtotal,
      customer: { ...formData },
    }

    setOrderDetails(details)
    setOrderConfirmed(true)
    clearCart()
  }

  // Construct WhatsApp order message
  const getWhatsAppMessage = () => {
    if (!orderDetails) return ''
    const { id, customer, items: orderItems, subtotal: total } = orderDetails

    let msg = `Bonjour *Jessat Multiservices*,\n\n`
    msg += `Je souhaite confirmer ma commande *N° ${id}*.\n\n`
    msg += `👤 *Informations Client :*\n`
    msg += `• Nom complet : ${customer.prenom} ${customer.nom}\n`
    msg += `• Téléphone : ${customer.telephone}\n`
    msg += `• Email : ${customer.email || 'Non renseigné'}\n`
    msg += `• Adresse de livraison : ${customer.adresse}, ${customer.ville}, ${customer.pays}\n`
    if (customer.notes) {
      msg += `• Instructions : ${customer.notes}\n`
    }
    msg += `\n💳 *Mode de Paiement :* Paiement à la livraison\n\n`
    msg += `📦 *Articles Commandés :*\n`

    orderItems.forEach((item) => {
      const price = item.customConfigurationTotal ?? item.product.price
      msg += `• ${item.product.name} (x${item.quantity}) : ${formatPrice(price * item.quantity)}\n`
    })

    msg += `\n💰 *Total à payer à la livraison :* ${formatPrice(total)}\n\n`
    msg += `Merci de me confirmer la prise en charge et la date de livraison !`

    return encodeURIComponent(msg)
  }

  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-950 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/panier" className="hover:text-zinc-950 transition-colors">
            Mon Panier
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-950 font-semibold">Paiement &amp; Finalisation</span>
        </nav>

        {/* Page Title */}
        <div className="mb-8">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mode Unique : Paiement 100% à la Livraison</span>
          </div> */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight">
            Finaliser ma Commande
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Renseignez vos coordonnées de livraison. Aucun paiement en ligne requis, payez à la livraison !
          </p>
        </div>

        {/* ORDER SUCCESS VIEW */}
        {orderConfirmed && orderDetails ? (
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-10 shadow-xl max-w-3xl mx-auto my-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 mb-6 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
              Commande Enregistrée avec Succès !
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 mb-2">
              Merci pour votre commande, {orderDetails.customer.prenom} !
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 max-w-lg mx-auto mb-6">
              Votre commande <strong className="text-zinc-900 font-bold">N° {orderDetails.id}</strong> a bien été prise en compte.
              Notre équipe vous contactera sous peu au <strong className="text-blue-700 font-bold">{orderDetails.customer.telephone}</strong> pour organiser la livraison.
            </p>

            {/* Order Summary Box */}
            <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200/80 text-left text-xs space-y-3 mb-8">
              <div className="flex flex-wrap justify-between items-center pb-3 border-b border-zinc-200 gap-2">
                <div>
                  <span className="text-zinc-500 block">N° de commande :</span>
                  <span className="font-bold text-zinc-950 text-sm">{orderDetails.id}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Mode de paiement :</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Paiement à la livraison
                  </span>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 block mb-1 font-semibold">Adresse de livraison :</span>
                <p className="text-zinc-800 font-medium leading-relaxed">
                  {orderDetails.customer.prenom} {orderDetails.customer.nom} <br />
                  {orderDetails.customer.adresse}, {orderDetails.customer.ville}, {orderDetails.customer.pays} <br />
                  Tél : {orderDetails.customer.telephone}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-200">
                <span className="text-zinc-500 block mb-2 font-semibold">Articles commandés :</span>
                <ul className="space-y-1.5 text-zinc-700">
                  {orderDetails.items.map((item) => {
                    const price = item.customConfigurationTotal ?? item.product.price
                    return (
                      <li key={item.id} className="flex justify-between items-center">
                        <span className="truncate pr-4">
                          • {item.product.name} <span className="text-zinc-500">x{item.quantity}</span>
                        </span>
                        <span className="font-bold text-zinc-900 flex-shrink-0">
                          {formatPrice(price * item.quantity)}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="pt-3 border-t border-zinc-200 flex justify-between items-center text-sm font-black text-zinc-950">
                <span>Total à régler à la livraison :</span>
                <span className="text-base text-blue-700">{formatPrice(orderDetails.subtotal)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/22997640758?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>Confirmer sur WhatsApp (+229 97 64 07 58)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Link href="/produits" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full text-xs font-semibold">
                  Continuer mes achats
                </Button>
              </Link>
            </div>
          </div>
        ) : items.length === 0 ? (
          /* EMPTY CHECKOUT VIEW */
          <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center max-w-xl mx-auto my-8 shadow-sm">
            <div className="w-20 h-20 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-blue-600 mb-5">
              <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 mb-2">Aucun article dans votre panier</h2>
            <p className="text-xs sm:text-sm text-zinc-500 mb-6 leading-relaxed">
              Veuillez ajouter au moins un produit à votre panier avant de procéder au paiement.
            </p>
            <Link href="/produits">
              <Button variant="primary" size="lg" className="gap-2 text-xs font-bold shadow-md">
                <span>Découvrir nos ordinateurs</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        ) : (
          /* CHECKOUT FORM & SUMMARY GRID */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Checkout Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-150">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <h2 className="text-base font-bold text-zinc-950">Informations de livraison</h2>
                  </div>
                  <Link href="/panier" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Retour au panier</span>
                  </Link>
                </div>

                <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4">
                  {/* Prénom & Nom */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Prénom *</span>
                      </label>
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        required
                        placeholder="Ex: Jean"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:bg-white focus:border-blue-600 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Nom *</span>
                      </label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        required
                        placeholder="Ex: Mensah"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:bg-white focus:border-blue-600 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Téléphone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Adresse Email *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="jean.mensah@example.com"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:bg-white focus:border-blue-600 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Téléphone / WhatsApp *</span>
                      </label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        required
                        placeholder="+229 97 00 00 00"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:bg-white focus:border-blue-600 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Adresse */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Adresse exacte de livraison *</span>
                    </label>
                    <input
                      type="text"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleInputChange}
                      required
                      placeholder="Ex: Quartier Zogbadjè, près du carrefour principal"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:bg-white focus:border-blue-600 outline-none transition-all"
                    />
                  </div>

                  {/* Ville & Pays */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Ville *</span>
                      </label>
                      <select
                        name="ville"
                        value={formData.ville}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:bg-white focus:border-blue-600 outline-none transition-all"
                      >
                        <option value="Abomey-Calavi">Abomey-Calavi</option>
                        <option value="Cotonou">Cotonou</option>
                        <option value="Porto-Novo">Porto-Novo</option>
                        <option value="Parakou">Parakou</option>
                        <option value="Bohicon">Bohicon</option>
                        <option value="Ouidah">Ouidah</option>
                        <option value="Natitingou">Natitingou</option>
                        <option value="Autre ville">Autre ville</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1 flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Pays *</span>
                      </label>
                      <input
                        type="text"
                        name="pays"
                        value={formData.pays}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:bg-white focus:border-blue-600 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Payment Method - Exclusive Paiement à la livraison */}
                  <div className="pt-3">
                    <label className="block text-xs font-semibold text-zinc-700 mb-2 flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Mode de paiement</span>
                    </label>

                    <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-300 flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 shadow-sm">
                        ✓
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-950">Paiement à la livraison</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold uppercase">
                            Unique mode accepté
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed">
                          Vous réglerez l'intégralité du montant à la réception de votre colis (en espèces ou par Mobile Money).
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary & Confirm Button (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-md sticky top-24 space-y-5">
                <h2 className="text-base font-bold text-zinc-950 pb-3 border-b border-zinc-150">
                  Récapitulatif des articles ({totalItems})
                </h2>

                <div className="divide-y divide-zinc-100 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => {
                    const price = item.customConfigurationTotal ?? item.product.price
                    return (
                      <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5 truncate pr-2">
                          <div className="relative w-10 h-10 rounded-lg bg-zinc-100 flex-shrink-0 overflow-hidden border border-zinc-100">
                            <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="40px" />
                          </div>
                          <div className="truncate">
                            <span className="font-semibold text-zinc-900 block truncate">{item.product.name}</span>
                            <span className="text-zinc-500 text-[10px]">Qté : {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-zinc-950 flex-shrink-0">
                          {formatPrice(price * item.quantity)}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <div className="pt-3 border-t border-zinc-200 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <span>Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Livraison</span>
                    <span className="text-emerald-600 font-bold">À la livraison</span>
                  </div>

                  <div className="pt-3 border-t border-zinc-200 flex justify-between items-center text-sm font-black text-zinc-950">
                    <span>Total à payer à la livraison :</span>
                    <span className="text-lg text-blue-700">
                      <AnimatedCounter value={subtotal} suffix=" FCFA" />
                    </span>
                  </div>
                </div>

                {/* Submit Checkout Button */}
                <Button
                  form="checkout-form"
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold py-3.5 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                >
                  <span>Confirmer &amp; Valider ma commande</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                {/* <p className="text-[11px] text-zinc-400 text-center flex items-center justify-center gap-1.5 pt-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Livraison express à Abomey-Calavi &amp; Cotonou</span>
                </p> */}
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
