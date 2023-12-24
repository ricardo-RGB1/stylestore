import type { Metadata } from 'next'
import './globals.css'
import { Urbanist } from "next/font/google"
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

const font = Urbanist({ subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Style',
  description: 'Style store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  )
}
