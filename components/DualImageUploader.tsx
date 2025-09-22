'use client'

import React, { useCallback, useState } from 'react'
import { Upload, Image as ImageIcon, X, Palette, Target } from 'lucide-react'

interface DualImageUploaderProps {
  onReferenceImageUpload: (file: File) => void
  onTargetImageUpload: (file: File) => void
  referenceImage: File | null
  targetImage: File | null
  onRemoveReferenceImage: () => void
  onRemoveTargetImage: () => void
}

export default function DualImageUploader({
  onReferenceImageUpload,
  onTargetImageUpload,
  referenceImage,
  targetImage,
  onRemoveReferenceImage,
  onRemoveTargetImage
}: DualImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState<'reference' | 'target' | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent, type: 'reference' | 'target') => {
    e.preventDefault()
    setIsDragOver(type)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(null)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, type: 'reference' | 'target') => {
    e.preventDefault()
    setIsDragOver(null)
    
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    
    if (imageFile) {
      if (type === 'reference') {
        onReferenceImageUpload(imageFile)
      } else {
        onTargetImageUpload(imageFile)
      }
    }
  }, [onReferenceImageUpload, onTargetImageUpload])

  const handleFileSelect = (file: File, type: 'reference' | 'target') => {
    if (type === 'reference') {
      onReferenceImageUpload(file)
    } else {
      onTargetImageUpload(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'reference' | 'target') => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file, type)
    }
  }

  return (
    <div className="space-y-6">
      {/* Reference Image Upload */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary-500/20">
            <Palette className="w-5 h-5 text-primary-400" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Imagen de Referencia de Color
          </h3>
        </div>
        <p className="text-dark-300 mb-4 text-sm">
          Sube una imagen que tenga el color que quieres aplicar
        </p>
        
        {!referenceImage ? (
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              isDragOver === 'reference'
                ? 'border-primary-400 bg-primary-500/10' 
                : 'border-dark-600 hover:border-primary-500 hover:bg-dark-800/50'
            }`}
            onDragOver={(e) => handleDragOver(e, 'reference')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'reference')}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileInput(e, 'reference')}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full glass-effect">
                <Upload className="w-6 h-6 text-primary-400" />
              </div>
              
              <div>
                <p className="text-lg font-semibold text-white mb-1">
                  Arrastra tu imagen aquí
                </p>
                <p className="text-dark-400 text-sm">
                  o haz clic para seleccionar
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="relative group">
              <img
                src={URL.createObjectURL(referenceImage)}
                alt="Imagen de referencia"
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
              <button
                onClick={onRemoveReferenceImage}
                className="absolute top-3 right-3 p-2 bg-red-500/80 hover:bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="mt-3 p-3 bg-dark-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary-400" />
                <div>
                  <p className="text-white font-medium text-sm">{referenceImage.name}</p>
                  <p className="text-dark-400 text-xs">
                    {(referenceImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Target Image Upload */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Target className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Imagen Objetivo
          </h3>
        </div>
        <p className="text-dark-300 mb-4 text-sm">
          Sube la imagen donde quieres aplicar el color
        </p>
        
        {!targetImage ? (
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              isDragOver === 'target'
                ? 'border-purple-400 bg-purple-500/10' 
                : 'border-dark-600 hover:border-purple-500 hover:bg-dark-800/50'
            }`}
            onDragOver={(e) => handleDragOver(e, 'target')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'target')}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileInput(e, 'target')}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full glass-effect">
                <Upload className="w-6 h-6 text-purple-400" />
              </div>
              
              <div>
                <p className="text-lg font-semibold text-white mb-1">
                  Arrastra tu imagen aquí
                </p>
                <p className="text-dark-400 text-sm">
                  o haz clic para seleccionar
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="relative group">
              <img
                src={URL.createObjectURL(targetImage)}
                alt="Imagen objetivo"
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
              <button
                onClick={onRemoveTargetImage}
                className="absolute top-3 right-3 p-2 bg-red-500/80 hover:bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="mt-3 p-3 bg-dark-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-400" />
                <div>
                  <p className="text-white font-medium text-sm">{targetImage.name}</p>
                  <p className="text-dark-400 text-xs">
                    {(targetImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
