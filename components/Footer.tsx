'use client'

import React from 'react'
import { Palette, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative mt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-800 to-transparent"></div>
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="p-2 rounded-xl glass-effect">
                <Palette className="w-5 h-5 md:w-6 md:h-6 text-primary-400" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                LUT Maker AI
              </span>
            </div>
            <p className="text-dark-300 mb-4 md:mb-6 text-sm md:text-base">
              Generador cinematográfico de LUTs con IA para creadores profesionales.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 glass-effect rounded-lg hover:scale-110 transition-transform duration-300">
                <Github className="w-5 h-5 text-dark-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 glass-effect rounded-lg hover:scale-110 transition-transform duration-300">
                <Twitter className="w-5 h-5 text-dark-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 glass-effect rounded-lg hover:scale-110 transition-transform duration-300">
                <Mail className="w-5 h-5 text-dark-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-dark-300">
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-300 text-sm md:text-base">Cómo Usar</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-300 text-sm md:text-base">LUTs Cinematográficos</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-300 text-sm md:text-base">Tutoriales</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-300 text-sm md:text-base">FAQ</a></li>
            </ul>
          </div>

          {/* Software Support */}
          <div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Software Compatible</h4>
            <ul className="space-y-2 text-dark-300">
              <li><span className="text-primary-400">✓</span> <span className="text-sm md:text-base">DaVinci Resolve</span></li>
              <li><span className="text-primary-400">✓</span> <span className="text-sm md:text-base">Premiere Pro</span></li>
              <li><span className="text-primary-400">✓</span> <span className="text-sm md:text-base">After Effects</span></li>
              <li><span className="text-primary-400">✓</span> <span className="text-sm md:text-base">Final Cut Pro</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-dark-400 text-xs md:text-sm text-center md:text-left">
              © 2024 LUT Maker AI. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-dark-400">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Términos</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
