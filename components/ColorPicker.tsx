'use client'

import React, { useState } from 'react'
import { Palette, RotateCcw } from 'lucide-react'

interface ColorPickerProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

export default function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false)

  const predefinedColors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#000000',
    '#FFD700', '#008000', '#000080', '#FF6347', '#40E0D0', '#EE82EE'
  ]

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value)
  }

  const resetToDefault = () => {
    onColorChange('#FFFFFF')
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center text-white">
        Selecciona el Color Objetivo
      </h3>
      
      <div className="space-y-6">
        {/* Color Display */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <div
              className="w-32 h-32 rounded-2xl shadow-2xl border-4 border-white/20 cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: selectedColor }}
              onClick={() => setShowPicker(!showPicker)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Palette className="w-8 h-8 text-white/80" />
              </div>
            </div>
            
            {showPicker && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 p-4 glass-effect rounded-xl z-10">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={handleColorChange}
                  className="w-20 h-20 rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Color Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Código de Color
            </label>
            <input
              type="text"
              value={selectedColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="input-field w-full text-center font-mono text-lg"
              placeholder="#FFFFFF"
            />
          </div>

          {/* Predefined Colors */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-3">
              Colores Predefinidos
            </label>
            <div className="grid grid-cols-9 gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-lg border-2 transition-all duration-300 hover:scale-110 ${
                    selectedColor === color ? 'border-white shadow-lg' : 'border-dark-600'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => onColorChange(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-center">
            <button
              onClick={resetToDefault}
              className="flex items-center gap-2 px-4 py-2 text-dark-400 hover:text-white transition-colors duration-300"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restablecer</span>
            </button>
          </div>
        </div>

        {/* Color Info */}
        <div className="p-4 bg-dark-800/50 rounded-xl">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-dark-400">HEX:</span>
              <span className="ml-2 font-mono text-white">{selectedColor}</span>
            </div>
            <div>
              <span className="text-dark-400">RGB:</span>
              <span className="ml-2 font-mono text-white">
                {(() => {
                  const hex = selectedColor.replace('#', '')
                  const r = parseInt(hex.substr(0, 2), 16)
                  const g = parseInt(hex.substr(2, 2), 16)
                  const b = parseInt(hex.substr(4, 2), 16)
                  return `${r}, ${g}, ${b}`
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
