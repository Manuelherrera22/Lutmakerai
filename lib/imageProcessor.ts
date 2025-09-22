// Image processing utilities for LUT generation

export interface ColorData {
  r: number
  g: number
  b: number
  frequency: number
}

export interface ImageAnalysis {
  dominantColors: ColorData[]
  averageColor: { r: number; g: number; b: number }
  colorDistribution: { [key: string]: number }
  brightness: number
  contrast: number
  saturation: number
}

export class ImageProcessor {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!
  }

  async loadImage(file: File): Promise<HTMLImageElement> {
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
    
    // Analyze colors
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
    
    // Calculate dominant colors
    const dominantColors: ColorData[] = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([colorKey, count]) => {
        const r = parseInt(colorKey.substr(0, 2), 16) * 16
        const g = parseInt(colorKey.substr(2, 2), 16) * 16
        const b = parseInt(colorKey.substr(4, 2), 16) * 16
        return {
          r, g, b,
          frequency: count / pixelCount
        }
      })
    
    // Calculate average color
    const averageColor = {
      r: totalR / pixelCount,
      g: totalG / pixelCount,
      b: totalB / pixelCount
    }
    
    // Calculate contrast (simplified)
    const brightness = brightnessSum / pixelCount
    const contrast = Math.sqrt(
      dominantColors.reduce((sum, color) => {
        const colorBrightness = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b
        return sum + Math.pow(colorBrightness - brightness, 2) * color.frequency
      }, 0)
    )
    
    return {
      dominantColors,
      averageColor,
      colorDistribution: Object.fromEntries(colorMap),
      brightness,
      contrast,
      saturation: saturationSum / pixelCount
    }
  }

  generateColorMapping(
    sourceColors: ColorData[], 
    targetColor: { r: number; g: number; b: number }
  ): Map<string, { r: number; g: number; b: number }> {
    const mapping = new Map<string, { r: number; g: number; b: number }>()
    
    // Create color transformation based on dominant colors
    sourceColors.forEach(sourceColor => {
      const colorKey = `${sourceColor.r},${sourceColor.g},${sourceColor.b}`
      
      // Calculate transformation based on color similarity and target
      const similarity = this.calculateColorSimilarity(sourceColor, targetColor)
      const transformationStrength = Math.min(similarity * 0.8, 1)
      
      const transformedColor = {
        r: Math.min(255, sourceColor.r + (targetColor.r - sourceColor.r) * transformationStrength),
        g: Math.min(255, sourceColor.g + (targetColor.g - sourceColor.g) * transformationStrength),
        b: Math.min(255, sourceColor.b + (targetColor.b - sourceColor.b) * transformationStrength)
      }
      
      mapping.set(colorKey, transformedColor)
    })
    
    return mapping
  }

  private calculateColorSimilarity(color1: { r: number; g: number; b: number }, color2: { r: number; g: number; b: number }): number {
    const deltaR = color1.r - color2.r
    const deltaG = color1.g - color2.g
    const deltaB = color1.b - color2.b
    const distance = Math.sqrt(deltaR * deltaR + deltaG * deltaG + deltaB * deltaB)
    return 1 - (distance / (255 * Math.sqrt(3)))
  }

  async generateLUTPreview(
    originalImage: HTMLImageElement,
    colorMapping: Map<string, { r: number; g: number; b: number }>
  ): Promise<string> {
    // Create a preview canvas
    const previewCanvas = document.createElement('canvas')
    const previewCtx = previewCanvas.getContext('2d')!
    
    previewCanvas.width = originalImage.width
    previewCanvas.height = originalImage.height
    
    // Draw original image
    previewCtx.drawImage(originalImage, 0, 0)
    
    // Get image data
    const imageData = previewCtx.getImageData(0, 0, previewCanvas.width, previewCanvas.height)
    const pixels = imageData.data
    
    // Apply color transformation
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      
      const colorKey = `${r},${g},${b}`
      const transformedColor = colorMapping.get(colorKey)
      
      if (transformedColor) {
        pixels[i] = transformedColor.r
        pixels[i + 1] = transformedColor.g
        pixels[i + 2] = transformedColor.b
      }
    }
    
    // Put modified image data back
    previewCtx.putImageData(imageData, 0, 0)
    
    return previewCanvas.toDataURL()
  }
}
