'use client'

import React from 'react'
import { Palette, Zap, Download, Monitor, Camera, Settings } from 'lucide-react'

const features = [
  {
    icon: Palette,
    title: 'IA Avanzada',
    description: 'Análisis inteligente de imágenes con detección de mood, estilo y temperatura de color'
  },
  {
    icon: Zap,
    title: 'LUTs Cinematográficos',
    description: '6 estilos profesionales: Teal & Orange, Film Noir, Golden Hour, Cyberpunk, Vintage, Fire Glow'
  },
  {
    icon: Download,
    title: 'Dual Image Upload',
    description: 'Sube imagen de referencia de color + imagen objetivo para aplicar el estilo'
  },
  {
    icon: Monitor,
    title: 'Análisis en Tiempo Real',
    description: 'Visualiza análisis de colores, brillo, contraste y sugerencias automáticas'
  },
  {
    icon: Camera,
    title: 'Responsive Design',
    description: 'Optimizado para móviles con interfaz táctil intuitiva y drag & drop'
  },
  {
    icon: Settings,
    title: 'Formatos Profesionales',
    description: 'Exporta en .cube para Premiere Pro y .3dl para DaVinci Resolve'
  }
]

export default function Features() {
  return (
    <section className="py-12 md:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
            Características Avanzadas
          </h2>
          <p className="text-lg md:text-xl text-dark-300 max-w-3xl mx-auto px-4">
            Tecnología de vanguardia para crear LUTs cinematográficos con IA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group card hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="p-2 md:p-3 rounded-xl glass-effect group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-400" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-dark-300 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-primary-400 mb-1 md:mb-2">100%</div>
            <div className="text-dark-300 text-sm md:text-base">Precisión IA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-purple-400 mb-1 md:mb-2">6</div>
            <div className="text-dark-300 text-sm md:text-base">Estilos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-pink-400 mb-1 md:mb-2">2</div>
            <div className="text-dark-300 text-sm md:text-base">Formatos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-primary-400 mb-1 md:mb-2">∞</div>
            <div className="text-dark-300 text-sm md:text-base">LUTs</div>
          </div>
        </div>
      </div>
    </section>
  )
}
