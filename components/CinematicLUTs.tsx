'use client'

import React, { useState } from 'react'
import { Film, Download, Star, Zap, Camera, Moon, Sun, Flame } from 'lucide-react'

interface CinematicLUT {
  id: string
  name: string
  description: string
  category: string
  icon: React.ReactNode
  preview: string
  intensity: number
  mood: string
}

const cinematicLUTs: CinematicLUT[] = [
  {
    id: 'teal-orange',
    name: 'Teal & Orange',
    description: 'Clásico cinematográfico con contrastes cálidos y fríos',
    category: 'Cinematic',
    icon: <Film className="w-5 h-5" />,
    preview: 'linear-gradient(135deg, #00d4aa, #ff6b35)',
    intensity: 85,
    mood: 'Dramático'
  },
  {
    id: 'film-noir',
    name: 'Film Noir',
    description: 'Blanco y negro con altos contrastes y sombras profundas',
    category: 'Vintage',
    icon: <Moon className="w-5 h-5" />,
    preview: 'linear-gradient(135deg, #2c2c2c, #ffffff)',
    intensity: 90,
    mood: 'Misterioso'
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    description: 'Cálidos tonos dorados perfectos para retratos',
    category: 'Warm',
    icon: <Sun className="w-5 h-5" />,
    preview: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    intensity: 75,
    mood: 'Romántico'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neones vibrantes y colores futuristas',
    category: 'Futuristic',
    icon: <Zap className="w-5 h-5" />,
    preview: 'linear-gradient(135deg, #00ffff, #ff00ff)',
    intensity: 95,
    mood: 'Futurista'
  },
  {
    id: 'vintage-film',
    name: 'Vintage Film',
    description: 'Simulación de película analógica con grano',
    category: 'Vintage',
    icon: <Camera className="w-5 h-5" />,
    preview: 'linear-gradient(135deg, #8b4513, #f4e4bc)',
    intensity: 70,
    mood: 'Nostálgico'
  },
  {
    id: 'fire-glow',
    name: 'Fire Glow',
    description: 'Efectos de fuego y resplandor dramático',
    category: 'Dramatic',
    icon: <Flame className="w-5 h-5" />,
    preview: 'linear-gradient(135deg, #ff4500, #ffd700)',
    intensity: 88,
    mood: 'Intenso'
  }
]

interface CinematicLUTsProps {
  onLUTSelect: (lut: CinematicLUT) => void
  selectedLUT: CinematicLUT | null
}

export default function CinematicLUTs({ onLUTSelect, selectedLUT }: CinematicLUTsProps) {
  const [filter, setFilter] = useState<string>('all')

  const filteredLUTs = filter === 'all' 
    ? cinematicLUTs 
    : cinematicLUTs.filter(lut => lut.category === filter)

  const categories = [
    { id: 'all', name: 'Todos', count: cinematicLUTs.length },
    { id: 'Cinematic', name: 'Cinematográfico', count: cinematicLUTs.filter(l => l.category === 'Cinematic').length },
    { id: 'Vintage', name: 'Vintage', count: cinematicLUTs.filter(l => l.category === 'Vintage').length },
    { id: 'Warm', name: 'Cálidos', count: cinematicLUTs.filter(l => l.category === 'Warm').length },
    { id: 'Futuristic', name: 'Futurista', count: cinematicLUTs.filter(l => l.category === 'Futuristic').length },
    { id: 'Dramatic', name: 'Dramático', count: cinematicLUTs.filter(l => l.category === 'Dramatic').length }
  ]

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
          <Film className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">
            LUTs Cinematográficos
          </h3>
          <p className="text-dark-300 text-sm">
            Selecciona un estilo cinematográfico para tu imagen
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* LUT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLUTs.map((lut) => (
          <div
            key={lut.id}
            onClick={() => onLUTSelect(lut)}
            className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
              selectedLUT?.id === lut.id
                ? 'ring-2 ring-primary-400 shadow-xl scale-105'
                : 'hover:scale-105 hover:shadow-lg'
            }`}
          >
            {/* Preview Gradient */}
            <div 
              className="h-32 w-full"
              style={{ background: lut.preview }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                {lut.icon}
                <span className="text-white font-semibold text-sm">{lut.name}</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center justify-between text-white text-xs">
                  <span>{lut.mood}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400" />
                    <span>{lut.intensity}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 bg-dark-800/80 backdrop-blur-sm">
              <p className="text-white font-medium text-sm mb-1">{lut.name}</p>
              <p className="text-dark-300 text-xs leading-relaxed">{lut.description}</p>
              
              {/* Intensity Bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-dark-400 mb-1">
                  <span>Intensidad</span>
                  <span>{lut.intensity}%</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${lut.intensity}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedLUT?.id === lut.id && (
              <div className="absolute top-2 right-2 p-1 bg-primary-500 rounded-full">
                <Star className="w-3 h-3 text-white fill-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected LUT Info */}
      {selectedLUT && (
        <div className="mt-6 p-4 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-xl border border-primary-500/20">
          <div className="flex items-center gap-3 mb-3">
            {selectedLUT.icon}
            <h4 className="text-lg font-bold text-white">{selectedLUT.name}</h4>
            <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full">
              {selectedLUT.category}
            </span>
          </div>
          <p className="text-dark-300 text-sm mb-3">{selectedLUT.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-dark-400">
              <span>Mood: <span className="text-white">{selectedLUT.mood}</span></span>
              <span>Intensidad: <span className="text-white">{selectedLUT.intensity}%</span></span>
            </div>
            <button className="btn-primary text-sm px-4 py-2">
              <Download className="w-4 h-4 mr-2" />
              Aplicar LUT
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
