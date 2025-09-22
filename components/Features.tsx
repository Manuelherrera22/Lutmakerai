'use client'

import React from 'react'
import { Palette, Zap, Download, Monitor, Camera, Settings } from 'lucide-react'

const features = [
  {
    icon: Palette,
    title: 'Análisis de Color Avanzado',
    description: 'IA que analiza automáticamente la paleta de colores de tu imagen de referencia'
  },
  {
    icon: Zap,
    title: 'Generación Instantánea',
    description: 'Crea LUTs profesionales en segundos usando algoritmos de machine learning'
  },
  {
    icon: Download,
    title: 'Múltiples Formatos',
    description: 'Descarga en .cube para DaVinci Resolve y .3dl para Premiere Pro'
  },
  {
    icon: Monitor,
    title: 'Vista Previa en Tiempo Real',
    description: 'Ve cómo se verá tu LUT aplicado antes de descargarlo'
  },
  {
    icon: Camera,
    title: 'Compatibilidad Universal',
    description: 'Funciona con cualquier tipo de imagen: fotos, videos, renders 3D'
  },
  {
    icon: Settings,
    title: 'Personalización Total',
    description: 'Ajusta parámetros como intensidad, saturación y contraste'
  }
]

export default function Features() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
            Características Avanzadas
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Tecnología de vanguardia para crear LUTs profesionales con la máxima calidad y precisión
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group card hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl glass-effect group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-dark-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-400 mb-2">100%</div>
            <div className="text-dark-300">Precisión</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">10s</div>
            <div className="text-dark-300">Tiempo Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-400 mb-2">∞</div>
            <div className="text-dark-300">LUTs Gratuitos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-400 mb-2">2</div>
            <div className="text-dark-300">Formatos</div>
          </div>
        </div>
      </div>
    </section>
  )
}
