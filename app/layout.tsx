import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/context/cart-context'
import { WishlistProvider } from '@/lib/context/wishlist-context'
import { MainLayoutShell } from '@/components/layout/MainLayoutShell'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Jessat Multi Services | Ordinateurs Neufs & Occasion, Accessoires à Abomey-Calavi (Bénin)',
  description:
    'Jessat Multi Services — Carrefour Zogbadjè, Abomey-Calavi, Bénin. Spécialiste de la vente d\'ordinateurs neufs et d\'occasion, imprimantes, projecteurs, claviers, souris et accessoires informatiques. Livraison tout le Bénin.',
  keywords: [
    'Jessat Multi Services',
    'ordinateurs portables Abomey-Calavi',
    'ordinateurs occasion Bénin',
    'PC portables neufs Cotonou',
    'accessoires informatiques Bénin',
    'Carrefour Zogbadjè Calavi',
    'imprimantes Bénin',
    'boutique informatique Abomey-Calavi',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/jessat-icon-transparent.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/jessat-icon.png' },
    ],
  },
  openGraph: {
    title: 'Jessat Multi Services | Votre partenaire en informatique',
    description: 'Vente d\'ordinateurs neufs et d\'occasion, imprimantes et accessoires informatiques à Abomey-Calavi.',
    images: [{ url: '/images/jessat-logo-blue.png', width: 260, height: 102, alt: 'Jessat Multi Services Logo' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#fafafa] text-zinc-950">
        <CartProvider>
          <WishlistProvider>
            <MainLayoutShell>{children}</MainLayoutShell>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
