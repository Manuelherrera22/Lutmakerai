'use client'

import React from 'react'
import { Palette, Zap, Download } from 'lucide-react'

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-purple-600/20 to-pink-600/20 animate-gradient"></div>
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl glass-effect">
              <Palette className="w-12 h-12 text-primary-400" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            LUT Maker AI
          </h1>
          
          <p className="text-xl md:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Genera LUTs profesionales para Premiere Pro y DaVinci Resolve
            <br />
            <span className="text-primary-400 font-semibold">a partir de cualquier imagen de referencia</span>
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-dark-400">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary-400" />
              <span>Procesamiento IA</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-purple-400" />
              <span>Formatos .cube & .3dl</span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-pink-400" />
              <span>Color Grading Avanzado</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
