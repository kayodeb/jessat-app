'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Ordinateur Portable ou Bureau',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Ordinateur Portable ou Bureau',
        message: '',
      })
    }, 1000)
  }

  const faqs = [
    {
      q: 'Où se trouve précisément votre boutique physique ?',
      a: 'Notre boutique Jessat Multi Services est idéalement située au Carrefour Zogbadjè à Abomey-Calavi, au Bénin. Vous pouvez y tester directement nos machines et accessoires.',
    },
    {
      q: 'Proposez-vous des ordinateurs d\'occasion et neufs ?',
      a: 'Oui, nous proposons une large sélection de PC portables et fixes neufs scellés ainsi que des modèles reconditionnés d\'occasion de grade A+, entièrement révisés et garantis.',
    },
    {
      q: 'Quels sont les modes de règlement disponibles ?',
      a: 'Nous acceptons les paiements en FCFA par Mobile Money (MTN MoMo, Moov Money), virement bancaire et espèces en magasin à la livraison.',
    },
    {
      q: 'Effectuez-vous la livraison à domicile ?',
      a: 'Oui, nous livrons rapidement sur Abomey-Calavi, Cotonou et ses environs en express (24h), ainsi que dans toutes les autres villes du Bénin par transporteurs agréés sécurisés.',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
        <Link href="/" className="hover:text-zinc-950 transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-950 font-semibold">Contact &amp; Accès</span>
      </nav>

        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>À votre écoute 6j/7</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight">
            Contactez Jessat Multi Services
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 leading-relaxed">
            Besoin d'un ordinateur neuf ou d'occasion, d'un accessoire informatique ou d'un conseil technique ? Notre équipe vous répond immédiatement.
          </p>
        </div>

        {/* Main Grid: Form + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Left Column: Formulaire */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-black text-zinc-950">Envoyez-nous un message</h2>
              <p className="text-xs text-zinc-500 mt-1">
                Remplissez ce formulaire et un conseiller Jessat vous recontactera dans les plus brefs délais.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-emerald-950">Message envoyé avec succès !</h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Merci de nous avoir contactés. Notre équipe à Abomey-Calavi traitera votre demande sous peu. Vous pouvez aussi nous écrire directement sur WhatsApp pour une réponse encore plus rapide.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://wa.me/22997640758?text=Bonjour%20Jessat%20Multi%20Services%2C%20je%20viens%20d%27envoyer%20un%20message%20sur%20votre%20site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    <span>Ouvrir WhatsApp (+229 97 64 07 58)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-zinc-600 hover:text-zinc-950 underline font-medium"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Nom &amp; Prénom <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Jean Houndé"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-blue-600 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Téléphone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+229 97 00 00 00"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-blue-600 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Adresse Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre.email@exemple.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-blue-600 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Objet de votre demande
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-blue-600 outline-none transition-colors text-zinc-800"
                    >
                      <option value="Ordinateurs neufs">Achat d'ordinateur neuf</option>
                      <option value="Ordinateurs d'occasion">Achat d'ordinateur d'occasion reconditionné</option>
                      <option value="Accessoires informatiques">Accessoires (claviers, souris, écrans)</option>
                      <option value="Imprimantes et Projecteurs">Imprimantes ou Projecteurs</option>
                      <option value="Devis entreprise">Demande de devis professionnel</option>
                      <option value="Maintenance et SAV">Maintenance &amp; Service après-vente</option>
                      <option value="Autre demande">Autre renseignement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                    Votre Message ou Configuration souhaitée <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Précisez votre besoin : budget en FCFA, usage (bureautique, programmation, gaming, infographie), modèle recherché..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-blue-600 outline-none transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="md"
                  className="w-full gap-2 text-xs font-bold shadow-md shadow-blue-600/20"
                >
                  {isSubmitting ? (
                    <span>Envoi en cours...</span>
                  ) : (
                    <>
                      <span>Envoyer la demande</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Right Column: Informations pratiques & Coordonnées */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quick Contact Box: WhatsApp */}
            <a
              href="https://wa.me/22997640758?text=Bonjour%20Jessat%20Multi%20Services%2C%20je%20souhaite%20des%20informations"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-700/20 hover:scale-[1.02] transition-transform group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
                  Réponse Instantanée
                </span>
              </div>
              <h3 className="text-lg font-black">Discuter sur WhatsApp</h3>
              <p className="text-xs text-white/90 mt-1 mb-3">
                Échangez directement avec un technicien-vendeur pour vos photos, devis et commandes immédiates.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:gap-3 transition-all">
                <span>+229 97 64 07 58</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Direct Call Card */}
            <a
              href="tel:+22997640758"
              className="block p-5 rounded-3xl bg-white border border-zinc-200/80 hover:border-blue-300 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-zinc-400 block uppercase tracking-wider">
                    Ligne téléphonique directe
                  </span>
                  <strong className="text-base font-black text-zinc-950 block">
                    +229 97 64 07 58
                  </strong>
                </div>
              </div>
            </a>

            {/* Store Location Card */}
            <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-zinc-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-zinc-950">Boutique &amp; Point de Vente</h4>
                  <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                    Carrefour Zogbadjè<br />
                    Abomey-Calavi, Bénin
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-zinc-100">
                <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-zinc-800 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-zinc-600" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-zinc-950">Horaires d'Ouverture</h4>
                  <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                    Lundi – Samedi : 08h30 – 19h30<br />
                    Dimanche : Sur rendez-vous ou assistance WhatsApp
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="p-5 rounded-3xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">Machines testées &amp; garanties</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">Livraison tout le Bénin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" />
                <span>Localisation Précise</span>
              </div>
              <h2 className="text-2xl font-black text-zinc-950 tracking-tight">
                Nous Trouver à Abomey-Calavi
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Point de vente situé au Carrefour Zogbadjè, facilement accessible depuis l'axe principal Cotonou – Calavi et la zone universitaire (UAC).
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Carrefour+Zogbadj%C3%A8,+Abomey-Calavi,+Benin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors self-start sm:self-auto border border-blue-200/60"
            >
              <span>Itinéraire Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Map Frame with overlay info */}
          <div className="relative w-full h-[360px] sm:h-[440px] rounded-3xl overflow-hidden border border-zinc-200/90 shadow-md">
            <iframe
              src="https://maps.google.com/maps?q=Carrefour+Zogbadj%C3%A8,+Abomey-Calavi,+Benin&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte Google Maps Jessat Multi Services au Carrefour Zogbadjè"
              className="w-full h-full"
            />

            {/* Floating Store Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200/80 shadow-xl pointer-events-auto">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-zinc-950">Jessat Multi Services</h4>
                  <p className="text-[11px] text-zinc-600 mt-0.5 leading-snug">
                    Carrefour Zogbadjè, Abomey-Calavi (Bénin)
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] font-semibold text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Boutique ouverte 08h30 – 19h30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pt-8 border-t border-zinc-200">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Foire aux Questions</span>
            </div>
            <h2 className="text-2xl font-black text-zinc-950 tracking-tight">
              Questions Fréquentes sur Jessat Multi Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs space-y-2"
              >
                <h3 className="text-sm font-bold text-zinc-950 flex items-start gap-2">
                  <span className="text-blue-600 font-black">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-zinc-600 pl-5 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
    </div>
  )
}
