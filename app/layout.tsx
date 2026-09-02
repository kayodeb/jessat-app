import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/context/cart-context'
import { WishlistProvider } from '@/lib/context/wishlist-context'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AERO RIGS | Boutique Informatique Haut de Gamme & PC Sur-Mesure',
  description:
    'Concepteur de machines informatiques de pointe. PC Gaming 4K, Workstations IA, Laptops OLED et composants haute fidélité. Configurateur en direct avec pièces garanties 3 ans.',
  keywords: [
    'PC Gaming',
    'RTX 5090',
    'Ryzen 7 9800X3D',
    'Ordinateur sur mesure',
    'Boutique informatique haut de gamme',
    'Workstation IA',
  ],
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
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
