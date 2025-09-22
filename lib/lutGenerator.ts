// LUT generation utilities

export interface LUTConfig {
  size: number
  name: string
  description?: string
}

export interface ColorTransform {
  r: number
  g: number
  b: number
}

export class LUTGenerator {
  private config: LUTConfig

  constructor(config: LUTConfig) {
    this.config = config
  }

  generateCUBELUT(
    colorMapping: Map<string, { r: number; g: number; b: number }>,
    imageAnalysis: any
  ): string {
    let lutContent = `TITLE "${this.config.name}"\n\n`
    lutContent += `LUT_3D_SIZE ${this.config.size}\n\n`
    
    // Generate 3D LUT entries
    for (let b = 0; b < this.config.size; b++) {
      for (let g = 0; g < this.config.size; g++) {
        for (let r = 0; r < this.config.size; r++) {
          // Convert LUT coordinates to RGB values (0-1 range)
          const inputR = r / (this.config.size - 1)
          const inputG = g / (this.config.size - 1)
          const inputB = b / (this.config.size - 1)
          
          // Apply color transformation
          const transformedColor = this.applyColorTransformation(
            { r: inputR, g: inputG, b: inputB },
            colorMapping,
            imageAnalysis
          )
          
          // Format output values
          lutContent += `${transformedColor.r.toFixed(6)} ${transformedColor.g.toFixed(6)} ${transformedColor.b.toFixed(6)}\n`
        }
      }
    }
    
    return lutContent
  }

  generate3DLLUT(
    colorMapping: Map<string, { r: number; g: number; b: number }>,
    imageAnalysis: any
  ): string {
    let lutContent = `3DMESH\n`
    lutContent += `Mesh 0 ${this.config.size}\n`
    
    // Generate mesh values
    const meshValues: number[] = []
    for (let i = 0; i < this.config.size; i++) {
      meshValues.push(Math.round((i / (this.config.size - 1)) * 4095))
    }
    lutContent += meshValues.join(' ') + '\n'
    
    // Generate color transformations
    for (let b = 0; b < this.config.size; b++) {
      for (let g = 0; g < this.config.size; g++) {
        for (let r = 0; r < this.config.size; r++) {
          const inputR = r / (this.config.size - 1)
          const inputG = g / (this.config.size - 1)
          const inputB = b / (this.config.size - 1)
          
          const transformedColor = this.applyColorTransformation(
            { r: inputR, g: inputG, b: inputB },
            colorMapping,
            imageAnalysis
          )
          
          // Convert to 12-bit values for 3DL format
          const r12bit = Math.round(transformedColor.r * 4095)
          const g12bit = Math.round(transformedColor.g * 4095)
          const b12bit = Math.round(transformedColor.b * 4095)
          
          lutContent += `${r12bit} ${g12bit} ${b12bit}\n`
        }
      }
    }
    
    return lutContent
  }

  private applyColorTransformation(
    inputColor: { r: number; g: number; b: number },
    colorMapping: Map<string, { r: number; g: number; b: number }>,
    imageAnalysis: any
  ): ColorTransform {
    // Convert to 0-255 range for lookup
    const inputR255 = Math.round(inputColor.r * 255)
    const inputG255 = Math.round(inputColor.g * 255)
    const inputB255 = Math.round(inputColor.b * 255)
    
    // Check for exact match in color mapping
    const colorKey = `${inputR255},${inputG255},${inputB255}`
    const exactMatch = colorMapping.get(colorKey)
    
    if (exactMatch) {
      return {
        r: exactMatch.r / 255,
        g: exactMatch.g / 255,
        b: exactMatch.b / 255
      }
    }
    
    // Find nearest color in mapping
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
    
    // Apply additional transformations based on image analysis
    if (imageAnalysis) {
      // Adjust based on brightness and contrast
      const brightnessFactor = Math.max(0.5, Math.min(1.5, imageAnalysis.brightness / 128))
      const contrastFactor = Math.max(0.8, Math.min(1.2, imageAnalysis.contrast / 100))
      
      // Apply brightness adjustment
      nearestColor.r = Math.min(1, nearestColor.r * brightnessFactor)
      nearestColor.g = Math.min(1, nearestColor.g * brightnessFactor)
      nearestColor.b = Math.min(1, nearestColor.b * brightnessFactor)
      
      // Apply contrast adjustment
      const midPoint = 0.5
      nearestColor.r = midPoint + (nearestColor.r - midPoint) * contrastFactor
      nearestColor.g = midPoint + (nearestColor.g - midPoint) * contrastFactor
      nearestColor.b = midPoint + (nearestColor.b - midPoint) * contrastFactor
      
      // Ensure values stay in range
      nearestColor.r = Math.max(0, Math.min(1, nearestColor.r))
      nearestColor.g = Math.max(0, Math.min(1, nearestColor.g))
      nearestColor.b = Math.max(0, Math.min(1, nearestColor.b))
    }
    
    return nearestColor
  }

  generateACESLUT(
    colorMapping: Map<string, { r: number; g: number; b: number }>,
    imageAnalysis: any
  ): string {
    // ACES format for professional color grading
    let lutContent = `# ACES 1.0 LUT generated by LUT Maker AI\n`
    lutContent += `# Title: ${this.config.name}\n`
    lutContent += `# Description: ${this.config.description || 'Generated LUT'}\n\n`
    
    lutContent += `# ACES Transform\n`
    lutContent += `# Input: ACES2065-1\n`
    lutContent += `# Output: ACES2065-1\n\n`
    
    // Generate simplified ACES-compatible LUT
    for (let b = 0; b < this.config.size; b++) {
      for (let g = 0; g < this.config.size; g++) {
        for (let r = 0; r < this.config.size; r++) {
          const inputR = r / (this.config.size - 1)
          const inputG = g / (this.config.size - 1)
          const inputB = b / (this.config.size - 1)
          
          const transformedColor = this.applyColorTransformation(
            { r: inputR, g: inputG, b: inputB },
            colorMapping,
            imageAnalysis
          )
          
          lutContent += `${transformedColor.r.toFixed(6)} ${transformedColor.g.toFixed(6)} ${transformedColor.b.toFixed(6)}\n`
        }
      }
    }
    
    return lutContent
  }

  // Utility method to validate LUT content
  validateLUT(lutContent: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!lutContent || lutContent.trim().length === 0) {
      errors.push('LUT content is empty')
      return { isValid: false, errors }
    }
    
    const lines = lutContent.split('\n')
    let dataLines = 0
    
    for (const line of lines) {
      const trimmedLine = line.trim()
      
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue
      }
      
      if (trimmedLine.includes('TITLE') || trimmedLine.includes('LUT_3D_SIZE') || trimmedLine.includes('3DMESH')) {
        continue
      }
      
      const values = trimmedLine.split(/\s+/)
      if (values.length >= 3) {
        const r = parseFloat(values[0])
        const g = parseFloat(values[1])
        const b = parseFloat(values[2])
        
        if (isNaN(r) || isNaN(g) || isNaN(b)) {
          errors.push(`Invalid color values: ${trimmedLine}`)
        } else if (r < 0 || r > 1 || g < 0 || g > 1 || b < 0 || b > 1) {
          errors.push(`Color values out of range (0-1): ${trimmedLine}`)
        }
        
        dataLines++
      }
    }
    
    const expectedLines = this.config.size * this.config.size * this.config.size
    if (dataLines !== expectedLines) {
      errors.push(`Expected ${expectedLines} data lines, found ${dataLines}`)
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
}
