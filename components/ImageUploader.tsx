'use client'

import React, { useCallback, useState } from 'react'
import { Upload, Image as ImageIcon, X } from 'lucide-react'

interface ImageUploaderProps {
  onImageUpload: (file: File) => void
  uploadedImage: File | null
  onRemoveImage: () => void
}

export default function ImageUploader({ onImageUpload, uploadedImage, onRemoveImage }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    
    if (imageFile) {
      handleFileSelect(imageFile)
    }
  }, [])

  const handleFileSelect = (file: File) => {
    onImageUpload(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center text-white">
        Sube tu Imagen de Referencia
      </h3>
      
      {!uploadedImage ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            isDragOver 
              ? 'border-primary-400 bg-primary-500/10' 
              : 'border-dark-600 hover:border-primary-500 hover:bg-dark-800/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-full glass-effect">
              <Upload className="w-8 h-8 text-primary-400" />
            </div>
            
            <div>
              <p className="text-lg font-semibold text-white mb-2">
                Arrastra tu imagen aquí
              </p>
              <p className="text-dark-400">
                o haz clic para seleccionar un archivo
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 text-sm text-dark-500">
              <span>JPG</span>
              <span>•</span>
              <span>PNG</span>
              <span>•</span>
              <span>TIFF</span>
              <span>•</span>
              <span>BMP</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative group">
            <img
              src={preview || ''}
              alt="Imagen de referencia"
              className="w-full h-auto rounded-xl shadow-2xl"
            />
            <button
              onClick={onRemoveImage}
              className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-dark-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-primary-400" />
              <div>
                <p className="text-white font-medium">{uploadedImage.name}</p>
                <p className="text-dark-400 text-sm">
                  {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
