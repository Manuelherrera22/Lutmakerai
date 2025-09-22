'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import DualImageUploader from '@/components/DualImageUploader'
import CinematicLUTs from '@/components/CinematicLUTs'
import LutGenerator from '@/components/LutGenerator'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import { AIImageAnalyzer, ImageAnalysis } from '@/lib/aiImageAnalyzer'

export default function Home() {
  const [referenceImage, setReferenceImage] = useState<File | null>(null)
  const [targetImage, setTargetImage] = useState<File | null>(null)
  const [referenceAnalysis, setReferenceAnalysis] = useState<ImageAnalysis | null>(null)
  const [targetAnalysis, setTargetAnalysis] = useState<ImageAnalysis | null>(null)
  const [selectedLUT, setSelectedLUT] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [aiAnalyzer, setAiAnalyzer] = useState<AIImageAnalyzer | null>(null)

  useEffect(() => {
    setAiAnalyzer(new AIImageAnalyzer())
  }, [])

  const handleReferenceImageUpload = async (file: File) => {
    if (!aiAnalyzer) return
    
    setReferenceImage(file)
    setIsProcessing(true)

    try {
      const analysis = await aiAnalyzer.analyzeImage(file)
      setReferenceAnalysis(analysis)
      if (targetImage) {
        setCurrentStep(3)
      } else {
        setCurrentStep(2)
      }
    } catch (error) {
      console.error('Error analyzing reference image:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleTargetImageUpload = async (file: File) => {
    if (!aiAnalyzer) return
    
    setTargetImage(file)
    setIsProcessing(true)

    try {
      const analysis = await aiAnalyzer.analyzeImage(file)
      setTargetAnalysis(analysis)
      if (referenceImage) {
        setCurrentStep(3)
      } else {
        setCurrentStep(2)
      }
    } catch (error) {
      console.error('Error analyzing target image:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRemoveReferenceImage = () => {
    setReferenceImage(null)
    setReferenceAnalysis(null)
    if (!targetImage) {
      setCurrentStep(1)
    }
  }

  const handleRemoveTargetImage = () => {
    setTargetImage(null)
    setTargetAnalysis(null)
    if (!referenceImage) {
      setCurrentStep(1)
    }
  }

  const handleLUTSelect = (lut: any) => {
    setSelectedLUT(lut)
    setCurrentStep(4)
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="relative">
        {/* Progress Indicator */}
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-8 overflow-x-auto">
              <div className="flex items-center space-x-2 md:space-x-4">
                {[1, 2, 3, 4].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300 text-sm md:text-base ${
                      currentStep >= step 
                        ? 'bg-primary-500 text-white shadow-lg' 
                        : 'bg-dark-800 text-dark-400'
                    }`}>
                      {currentStep > step ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 md:w-6 md:h-6"
                        >
                          ✓
                        </motion.div>
                      ) : (
                        step
                      )}
                    </div>
                    {step < 4 && (
                      <div className={`w-8 md:w-16 h-1 rounded-full transition-all duration-300 ${
                        currentStep > step ? 'bg-primary-500' : 'bg-dark-700'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                {currentStep === 1 && 'Paso 1: Sube tus imágenes'}
                {currentStep === 2 && 'Paso 2: Análisis de IA'}
                {currentStep === 3 && 'Paso 3: Selecciona estilo cinematográfico'}
                {currentStep === 4 && 'Paso 4: Genera tu LUT'}
              </h2>
              <p className="text-dark-300 text-sm md:text-base px-4">
                {currentStep === 1 && 'Sube una imagen de referencia de color y la imagen donde quieres aplicarlo'}
                {currentStep === 2 && 'Nuestra IA analiza las imágenes y sugiere estilos'}
                {currentStep === 3 && 'Elige entre nuestros LUTs cinematográficos profesionales'}
                {currentStep === 4 && 'Crea y descarga tu LUT personalizado'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <DualImageUploader
                  onReferenceImageUpload={handleReferenceImageUpload}
                  onTargetImageUpload={handleTargetImageUpload}
                  referenceImage={referenceImage}
                  targetImage={targetImage}
                  onRemoveReferenceImage={handleRemoveReferenceImage}
                  onRemoveTargetImage={handleRemoveTargetImage}
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
                className="max-w-4xl mx-auto"
              >
                <div className="card">
                  <h3 className="text-2xl font-bold mb-6 text-center text-white">
                    Análisis de IA en Progreso
                  </h3>
                  <div className="text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-dark-300">
                      Analizando colores, estilos y sugiriendo LUTs cinematográficos...
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto"
              >
                <CinematicLUTs
                  onLUTSelect={handleLUTSelect}
                  selectedLUT={selectedLUT}
                />
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <LutGenerator
                  referenceImage={referenceImage}
                  targetImage={targetImage}
                  selectedLUT={selectedLUT}
                  referenceAnalysis={referenceAnalysis}
                  targetAnalysis={targetAnalysis}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Image Analysis Results */}
        {(referenceAnalysis || targetAnalysis) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4 py-8"
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Reference Image Analysis */}
                {referenceAnalysis && (
                  <div className="card">
                    <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                      Análisis Imagen de Referencia
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-400 mb-1">
                          {Math.round(referenceAnalysis.brightness)}
                        </div>
                        <div className="text-dark-300 text-sm">Brillo</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          {referenceAnalysis.contrast.toFixed(1)}
                        </div>
                        <div className="text-dark-300 text-sm">Contraste</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-dark-300">Mood:</span>
                        <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full">
                          {referenceAnalysis.mood}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-dark-300">Estilo:</span>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                          {referenceAnalysis.style}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">
                        Colores Dominantes
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        {referenceAnalysis.dominantColors.slice(0, 4).map((color: any, index: number) => (
                          <div key={index} className="text-center">
                            <div
                              className="w-8 h-8 rounded-lg mx-auto mb-1 shadow-lg"
                              style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                            />
                            <div className="text-xs text-dark-400">
                              {(color.frequency * 100).toFixed(0)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Target Image Analysis */}
                {targetAnalysis && (
                  <div className="card">
                    <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Análisis Imagen Objetivo
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-400 mb-1">
                          {Math.round(targetAnalysis.brightness)}
                        </div>
                        <div className="text-dark-300 text-sm">Brillo</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          {targetAnalysis.contrast.toFixed(1)}
                        </div>
                        <div className="text-dark-300 text-sm">Contraste</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-dark-300">Mood:</span>
                        <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full">
                          {targetAnalysis.mood}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-dark-300">Estilo:</span>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                          {targetAnalysis.style}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">
                        Colores Dominantes
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        {targetAnalysis.dominantColors.slice(0, 4).map((color: any, index: number) => (
                          <div key={index} className="text-center">
                            <div
                              className="w-8 h-8 rounded-lg mx-auto mb-1 shadow-lg"
                              style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                            />
                            <div className="text-xs text-dark-400">
                              {(color.frequency * 100).toFixed(0)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
