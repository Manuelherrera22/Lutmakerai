// AI-powered image analysis for LUT generation

export interface ImageAnalysis {
  dominantColors: ColorData[]
  averageColor: { r: number; g: number; b: number }
  colorDistribution: { [key: string]: number }
  brightness: number
  contrast: number
  saturation: number
  mood: string
  style: string
  suggestedLUTs: string[]
  colorTemperature: 'warm' | 'cool' | 'neutral'
  exposure: 'underexposed' | 'well-exposed' | 'overexposed'
  composition: string[]
}

export interface ColorData {
  r: number
  g: number
  b: number
  frequency: number
  hex: string
  name: string
}

export class AIImageAnalyzer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!
  }

  async analyzeImage(file: File): Promise<ImageAnalysis> {
    const img = await this.loadImage(file)
    
    // Set canvas size
    this.canvas.width = img.width
    this.canvas.height = img.height
    
    // Draw image to canvas
    this.ctx.drawImage(img, 0, 0)
    
    // Get image data
    const imageData = this.ctx.getImageData(0, 0, img.width, img.height)
    const pixels = imageData.data
    
    // Analyze colors with AI-like processing
    const colorMap = new Map<string, number>()
    let totalR = 0, totalG = 0, totalB = 0
    let brightnessSum = 0
    let contrastSum = 0
    let saturationSum = 0
    
    // Sample every nth pixel for performance
    const sampleRate = Math.max(1, Math.floor(pixels.length / 4 / 10000))
    
    for (let i = 0; i < pixels.length; i += 4 * sampleRate) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]
      
      if (a < 128) continue // Skip transparent pixels
      
      const colorKey = `${Math.floor(r/16)}${Math.floor(g/16)}${Math.floor(b/16)}`
      colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1)
      
      totalR += r
      totalG += g
      totalB += b
      
      // Calculate brightness (luminance)
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b
      brightnessSum += brightness
      
      // Calculate saturation
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const saturation = max === 0 ? 0 : (max - min) / max
      saturationSum += saturation
    }
    
    const pixelCount = Math.floor(pixels.length / 4 / sampleRate)
    
    // Calculate dominant colors with AI-like naming
    const dominantColors: ColorData[] = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([colorKey, count]) => {
        const r = parseInt(colorKey.substr(0, 2), 16) * 16
        const g = parseInt(colorKey.substr(2, 2), 16) * 16
        const b = parseInt(colorKey.substr(4, 2), 16) * 16
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
        
        return {
          r, g, b,
          frequency: count / pixelCount,
          hex,
          name: this.getColorName(r, g, b)
        }
      })
    
    // Calculate average color
    const averageColor = {
      r: totalR / pixelCount,
      g: totalG / pixelCount,
      b: totalB / pixelCount
    }
    
    // Calculate contrast
    const brightness = brightnessSum / pixelCount
    const contrast = Math.sqrt(
      dominantColors.reduce((sum, color) => {
        const colorBrightness = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b
        return sum + Math.pow(colorBrightness - brightness, 2) * color.frequency
      }, 0)
    )
    
    const saturation = saturationSum / pixelCount
    
    // AI-powered analysis
    const mood = this.analyzeMood(dominantColors, brightness, contrast, saturation)
    const style = this.analyzeStyle(dominantColors, brightness, contrast)
    const colorTemperature = this.analyzeColorTemperature(averageColor)
    const exposure = this.analyzeExposure(brightness)
    const composition = this.analyzeComposition(dominantColors, brightness, contrast)
    const suggestedLUTs = this.suggestLUTs(mood, style, colorTemperature, exposure)
    
    return {
      dominantColors,
      averageColor,
      colorDistribution: Object.fromEntries(colorMap),
      brightness,
      contrast,
      saturation,
      mood,
      style,
      suggestedLUTs,
      colorTemperature,
      exposure,
      composition
    }
  }

  private loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        URL.revokeObjectURL(img.src)
        resolve(img)
      }
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  private getColorName(r: number, g: number, b: number): string {
    // Simple color naming based on RGB values
    if (r > 200 && g > 200 && b > 200) return 'Blanco'
    if (r < 50 && g < 50 && b < 50) return 'Negro'
    if (r > g && r > b) return 'Rojo'
    if (g > r && g > b) return 'Verde'
    if (b > r && b > g) return 'Azul'
    if (r > 200 && g > 150 && b < 100) return 'Naranja'
    if (r > 150 && g > 150 && b < 100) return 'Amarillo'
    if (r > 100 && g < 100 && b > 150) return 'Púrpura'
    if (r < 100 && g > 150 && b > 150) return 'Cian'
    if (r > 150 && g < 100 && b < 100) return 'Rosa'
    return 'Gris'
  }

  private analyzeMood(colors: ColorData[], brightness: number, contrast: number, saturation: number): string {
    const warmColors = colors.filter(c => c.r > c.b && c.g > c.b).length
    const coolColors = colors.filter(c => c.b > c.r && c.b > c.g).length
    
    if (brightness < 80 && contrast > 60) return 'Misterioso'
    if (brightness > 180 && saturation > 0.7) return 'Vibrante'
    if (warmColors > coolColors && brightness > 120) return 'Cálido'
    if (coolColors > warmColors && brightness < 150) return 'Frío'
    if (contrast > 70) return 'Dramático'
    if (saturation < 0.3) return 'Minimalista'
    if (brightness > 160) return 'Luminoso'
    return 'Equilibrado'
  }

  private analyzeStyle(colors: ColorData[], brightness: number, contrast: number): string {
    const uniqueColors = colors.length
    const avgSaturation = colors.reduce((sum, c) => sum + ((Math.max(c.r, c.g, c.b) - Math.min(c.r, c.g, c.b)) / Math.max(c.r, c.g, c.b)), 0) / colors.length
    
    if (contrast > 80 && brightness < 100) return 'Film Noir'
    if (avgSaturation > 0.8 && uniqueColors > 6) return 'Cyberpunk'
    if (brightness > 150 && avgSaturation < 0.4) return 'Minimalista'
    if (uniqueColors < 4 && contrast > 60) return 'Monocromático'
    if (avgSaturation > 0.6 && brightness > 120) return 'Vintage'
    return 'Natural'
  }

  private analyzeColorTemperature(averageColor: { r: number; g: number; b: number }): 'warm' | 'cool' | 'neutral' {
    const temp = (averageColor.r - averageColor.b) / 255
    if (temp > 0.1) return 'warm'
    if (temp < -0.1) return 'cool'
    return 'neutral'
  }

  private analyzeExposure(brightness: number): 'underexposed' | 'well-exposed' | 'overexposed' {
    if (brightness < 80) return 'underexposed'
    if (brightness > 200) return 'overexposed'
    return 'well-exposed'
  }

  private analyzeComposition(colors: ColorData[], brightness: number, contrast: number): string[] {
    const composition = []
    
    if (contrast > 70) composition.push('Alto contraste')
    if (brightness < 100) composition.push('Sombras profundas')
    if (brightness > 180) composition.push('Iluminación brillante')
    if (colors.length < 4) composition.push('Paleta limitada')
    if (colors.length > 8) composition.push('Paleta rica')
    
    return composition
  }

  private suggestLUTs(mood: string, style: string, temperature: string, exposure: string): string[] {
    const suggestions = []
    
    // Mood-based suggestions
    if (mood === 'Misterioso') suggestions.push('film-noir', 'cyberpunk')
    if (mood === 'Vibrante') suggestions.push('cyberpunk', 'fire-glow')
    if (mood === 'Cálido') suggestions.push('golden-hour', 'vintage-film')
    if (mood === 'Frío') suggestions.push('teal-orange', 'film-noir')
    if (mood === 'Dramático') suggestions.push('fire-glow', 'film-noir')
    
    // Style-based suggestions
    if (style === 'Film Noir') suggestions.push('film-noir', 'vintage-film')
    if (style === 'Cyberpunk') suggestions.push('cyberpunk', 'fire-glow')
    if (style === 'Vintage') suggestions.push('vintage-film', 'golden-hour')
    
    // Temperature-based suggestions
    if (temperature === 'warm') suggestions.push('golden-hour', 'vintage-film')
    if (temperature === 'cool') suggestions.push('teal-orange', 'cyberpunk')
    
    // Remove duplicates and return top 3
    return [...new Set(suggestions)].slice(0, 3)
  }

  async generateLUTFromAnalysis(
    referenceAnalysis: ImageAnalysis,
    targetAnalysis: ImageAnalysis,
    selectedLUT?: string
  ): Promise<{ cube: string; threeDL: string }> {
    // Generate LUT based on AI analysis
    const lutName = selectedLUT || 'AI_Generated_LUT'
    
    // Create color mapping based on analysis
    const colorMapping = this.createColorMapping(referenceAnalysis, targetAnalysis)
    
    // Generate LUT content
    const cubeContent = this.generateCUBELUT(lutName, colorMapping)
    const threeDLContent = this.generate3DLLUT(lutName, colorMapping)
    
    return { cube: cubeContent, threeDL: threeDLContent }
  }

  private createColorMapping(reference: ImageAnalysis, target: ImageAnalysis): Map<string, { r: number; g: number; b: number }> {
    const mapping = new Map<string, { r: number; g: number; b: number }>()
    
    // AI-powered color transformation
    reference.dominantColors.forEach(refColor => {
      const targetColor = this.findBestMatch(refColor, target.dominantColors)
      const transformation = this.calculateTransformation(refColor, targetColor, reference, target)
      
      const colorKey = `${refColor.r},${refColor.g},${refColor.b}`
      mapping.set(colorKey, transformation)
    })
    
    return mapping
  }

  private findBestMatch(refColor: ColorData, targetColors: ColorData[]): ColorData {
    let bestMatch = targetColors[0]
    let minDistance = Infinity
    
    targetColors.forEach(targetColor => {
      const distance = Math.sqrt(
        Math.pow(refColor.r - targetColor.r, 2) +
        Math.pow(refColor.g - targetColor.g, 2) +
        Math.pow(refColor.b - targetColor.b, 2)
      )
      
      if (distance < minDistance) {
        minDistance = distance
        bestMatch = targetColor
      }
    })
    
    return bestMatch
  }

  private calculateTransformation(
    refColor: ColorData,
    targetColor: ColorData,
    refAnalysis: ImageAnalysis,
    targetAnalysis: ImageAnalysis
  ): { r: number; g: number; b: number } {
    // AI-powered transformation calculation
    const moodFactor = this.getMoodFactor(refAnalysis.mood, targetAnalysis.mood)
    const styleFactor = this.getStyleFactor(refAnalysis.style, targetAnalysis.style)
    const temperatureFactor = this.getTemperatureFactor(refAnalysis.colorTemperature, targetAnalysis.colorTemperature)
    
    const r = Math.min(255, refColor.r + (targetColor.r - refColor.r) * moodFactor * styleFactor)
    const g = Math.min(255, refColor.g + (targetColor.g - refColor.g) * moodFactor * styleFactor)
    const b = Math.min(255, refColor.b + (targetColor.b - refColor.b) * temperatureFactor)
    
    return { r, g, b }
  }

  private getMoodFactor(refMood: string, targetMood: string): number {
    const moodMatrix: { [key: string]: { [key: string]: number } } = {
      'Misterioso': { 'Misterioso': 1.0, 'Dramático': 0.8, 'Vibrante': 0.3 },
      'Vibrante': { 'Vibrante': 1.0, 'Cálido': 0.7, 'Misterioso': 0.2 },
      'Cálido': { 'Cálido': 1.0, 'Vibrante': 0.6, 'Frío': 0.3 },
      'Frío': { 'Frío': 1.0, 'Misterioso': 0.7, 'Cálido': 0.2 },
      'Dramático': { 'Dramático': 1.0, 'Misterioso': 0.8, 'Vibrante': 0.5 }
    }
    
    return moodMatrix[refMood]?.[targetMood] || 0.5
  }

  private getStyleFactor(refStyle: string, targetStyle: string): number {
    const styleMatrix: { [key: string]: { [key: string]: number } } = {
      'Film Noir': { 'Film Noir': 1.0, 'Vintage': 0.8, 'Cyberpunk': 0.4 },
      'Cyberpunk': { 'Cyberpunk': 1.0, 'Vibrante': 0.7, 'Film Noir': 0.3 },
      'Vintage': { 'Vintage': 1.0, 'Film Noir': 0.8, 'Natural': 0.6 },
      'Natural': { 'Natural': 1.0, 'Vintage': 0.6, 'Minimalista': 0.8 }
    }
    
    return styleMatrix[refStyle]?.[targetStyle] || 0.5
  }

  private getTemperatureFactor(refTemp: string, targetTemp: string): number {
    if (refTemp === targetTemp) return 1.0
    if ((refTemp === 'warm' && targetTemp === 'cool') || (refTemp === 'cool' && targetTemp === 'warm')) return 0.3
    return 0.7
  }

  private generateCUBELUT(name: string, colorMapping: Map<string, { r: number; g: number; b: number }>): string {
    let content = `TITLE "${name}"\n\n`
    content += `LUT_3D_SIZE 32\n\n`
    
    for (let b = 0; b < 32; b++) {
      for (let g = 0; g < 32; g++) {
        for (let r = 0; r < 32; r++) {
          const inputR = r / 31
          const inputG = g / 31
          const inputB = b / 31
          
          // Apply AI transformation
          const transformedColor = this.applyAITransformation(
            { r: inputR, g: inputG, b: inputB },
            colorMapping
          )
          
          content += `${transformedColor.r.toFixed(6)} ${transformedColor.g.toFixed(6)} ${transformedColor.b.toFixed(6)}\n`
        }
      }
    }
    
    return content
  }

  private generate3DLLUT(name: string, colorMapping: Map<string, { r: number; g: number; b: number }>): string {
    let content = `3DMESH\n`
    content += `Mesh 0 32\n`
    
    const meshValues: number[] = []
    for (let i = 0; i < 32; i++) {
      meshValues.push(Math.round((i / 31) * 4095))
    }
    content += meshValues.join(' ') + '\n'
    
    for (let b = 0; b < 32; b++) {
      for (let g = 0; g < 32; g++) {
        for (let r = 0; r < 32; r++) {
          const inputR = r / 31
          const inputG = g / 31
          const inputB = b / 31
          
          const transformedColor = this.applyAITransformation(
            { r: inputR, g: inputG, b: inputB },
            colorMapping
          )
          
          const r12bit = Math.round(transformedColor.r * 4095)
          const g12bit = Math.round(transformedColor.g * 4095)
          const b12bit = Math.round(transformedColor.b * 4095)
          
          content += `${r12bit} ${g12bit} ${b12bit}\n`
        }
      }
    }
    
    return content
  }

  private applyAITransformation(
    inputColor: { r: number; g: number; b: number },
    colorMapping: Map<string, { r: number; g: number; b: number }>
  ): { r: number; g: number; b: number } {
    const inputR255 = Math.round(inputColor.r * 255)
    const inputG255 = Math.round(inputColor.g * 255)
    const inputB255 = Math.round(inputColor.b * 255)
    
    const colorKey = `${inputR255},${inputG255},${inputB255}`
    const exactMatch = colorMapping.get(colorKey)
    
    if (exactMatch) {
      return {
        r: exactMatch.r / 255,
        g: exactMatch.g / 255,
        b: exactMatch.b / 255
      }
    }
    
    // Find nearest color and apply transformation
    let nearestColor = { r: inputColor.r, g: inputColor.g, b: inputColor.b }
    let minDistance = Infinity
    
    for (const [key, mappedColor] of Array.from(colorMapping.entries())) {
      const [r, g, b] = key.split(',').map(Number)
      const distance = Math.sqrt(
        Math.pow(inputR255 - r, 2) +
        Math.pow(inputG255 - g, 2) +
        Math.pow(inputB255 - b, 2)
      )
      
      if (distance < minDistance) {
        minDistance = distance
        nearestColor = {
          r: mappedColor.r / 255,
          g: mappedColor.g / 255,
          b: mappedColor.b / 255
        }
      }
    }
    
    return nearestColor
  }
}
