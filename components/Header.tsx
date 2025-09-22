'use client'

import React from 'react'
import { Palette, Zap, Download } from 'lucide-react'

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-purple-600/20 to-pink-600/20 animate-gradient"></div>
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="p-3 md:p-4 rounded-2xl glass-effect">
              <Palette className="w-8 h-8 md:w-12 md:h-12 text-primary-400" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            LUT Maker AI
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-dark-300 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Genera LUTs cinematográficos profesionales
            <br className="hidden md:block" />
            <span className="text-primary-400 font-semibold">con análisis de IA avanzado</span>
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-dark-400 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary-400" />
              <span>IA Avanzada</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              <span>.cube & .3dl</span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
              <span>Cinematográfico</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
