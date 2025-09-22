'use client'

import React from 'react'
import { Palette, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative mt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-800 to-transparent"></div>
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl glass-effect">
                <Palette className="w-6 h-6 text-primary-400" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                LUT Maker AI
              </span>
            </div>
            <p className="text-dark-300 mb-6">
              Generador profesional de LUTs para creadores de contenido, editores de video y profesionales del cine.
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
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-dark-300">
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-300">Cómo Usar</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-300">Formatos Soportados</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-300">Tutoriales</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>

          {/* Software Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Software Compatible</h4>
            <ul className="space-y-2 text-dark-300">
              <li><span className="text-primary-400">✓</span> DaVinci Resolve</li>
              <li><span className="text-primary-400">✓</span> Premiere Pro</li>
              <li><span className="text-primary-400">✓</span> After Effects</li>
              <li><span className="text-primary-400">✓</span> Final Cut Pro</li>
              <li><span className="text-primary-400">✓</span> Avid Media Composer</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-400 text-sm">
              © 2024 LUT Maker AI. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm text-dark-400">
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
