import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LUT Maker AI - Generador Profesional de LUTs',
  description: 'Crea LUTs profesionales para Premiere Pro y DaVinci Resolve a partir de imágenes de referencia',
  keywords: 'LUT, color grading, Premiere Pro, DaVinci Resolve, color correction, filmmaking',
  authors: [{ name: 'LUT Maker AI' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
