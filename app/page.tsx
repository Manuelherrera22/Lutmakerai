'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import ImageUploader from '@/components/ImageUploader'
import ColorPicker from '@/components/ColorPicker'
import LutGenerator from '@/components/LutGenerator'
import Features from '@/components/Features'
import Footer from '@/components/Footer'

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [selectedColor, setSelectedColor] = useState('#FFFFFF')
  const [imageAnalysis, setImageAnalysis] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleImageUpload = async (file: File) => {
    setUploadedImage(file)
    setIsProcessing(true)
    setCurrentStep(2)

    try {
      // Simulate image analysis
      const analysis = {
        dominantColors: [
          { r: 255, g: 0, b: 0, frequency: 0.3 },
          { r: 0, g: 255, b: 0, frequency: 0.2 },
          { r: 0, g: 0, b: 255, frequency: 0.1 }
        ],
        averageColor: { r: 128, g: 128, b: 128 },
        brightness: 150,
        contrast: 50,
        saturation: 0.8
      }
      setImageAnalysis(analysis)
    } catch (error) {
      console.error('Error analyzing image:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
    setImageAnalysis(null)
    setCurrentStep(1)
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    if (currentStep === 2) {
      setCurrentStep(3)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="relative">
        {/* Progress Indicator */}
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                      currentStep >= step 
                        ? 'bg-primary-500 text-white shadow-lg' 
                        : 'bg-dark-800 text-dark-400'
                    }`}>
                      {currentStep > step ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6"
                        >
                          ✓
                        </motion.div>
                      ) : (
                        step
                      )}
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 rounded-full transition-all duration-300 ${
                        currentStep > step ? 'bg-primary-500' : 'bg-dark-700'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {currentStep === 1 && 'Paso 1: Sube tu imagen de referencia'}
                {currentStep === 2 && 'Paso 2: Selecciona el color objetivo'}
                {currentStep === 3 && 'Paso 3: Genera tu LUT'}
              </h2>
              <p className="text-dark-300">
                {currentStep === 1 && 'Arrastra y suelta una imagen o haz clic para seleccionar'}
                {currentStep === 2 && 'Elige el color que quieres aplicar a tu imagen'}
                {currentStep === 3 && 'Crea y descarga tu LUT personalizado'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ImageUploader
                onImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
                onRemoveImage={handleRemoveImage}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ColorPicker
                selectedColor={selectedColor}
                onColorChange={handleColorChange}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <LutGenerator
                referenceImage={uploadedImage}
                targetColor={selectedColor}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Analysis Results */}
        {imageAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-6 py-12"
          >
            <div className="max-w-4xl mx-auto">
              <div className="card">
                <h3 className="text-2xl font-bold mb-6 text-center text-white">
                  Análisis de Imagen
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-400 mb-2">
                      {Math.round(imageAnalysis.brightness)}
                    </div>
                    <div className="text-dark-300">Brillo Promedio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {imageAnalysis.contrast.toFixed(1)}
                    </div>
                    <div className="text-dark-300">Contraste</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-400 mb-2">
                      {(imageAnalysis.saturation * 100).toFixed(0)}%
                    </div>
                    <div className="text-dark-300">Saturación</div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Colores Dominantes
                  </h4>
                  <div className="grid grid-cols-5 gap-3">
                    {imageAnalysis.dominantColors.slice(0, 5).map((color: any, index: number) => (
                      <div key={index} className="text-center">
                        <div
                          className="w-16 h-16 rounded-xl mx-auto mb-2 shadow-lg"
                          style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                        />
                        <div className="text-xs text-dark-400">
                          {(color.frequency * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="card text-center">
              <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Analizando Imagen
              </h3>
              <p className="text-dark-300">
                Estamos procesando tu imagen para extraer la información de color...
              </p>
            </div>
          </motion.div>
        )}
      </main>

      <Features />
      <Footer />
    </div>
  )
}
