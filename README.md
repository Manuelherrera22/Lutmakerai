# LUT Maker AI - Generador Profesional de LUTs

Una aplicación web moderna para generar LUTs (Look-Up Tables) profesionales a partir de imágenes de referencia, compatible con Premiere Pro, DaVinci Resolve, After Effects y otros software de edición de video.

## 🎨 Características

- **Análisis de Color Avanzado**: IA que analiza automáticamente la paleta de colores de tu imagen de referencia
- **Generación Instantánea**: Crea LUTs profesionales en segundos usando algoritmos de machine learning
- **Múltiples Formatos**: Descarga en .cube para DaVinci Resolve y .3dl para Premiere Pro
- **Vista Previa en Tiempo Real**: Ve cómo se verá tu LUT aplicado antes de descargarlo
- **Compatibilidad Universal**: Funciona con cualquier tipo de imagen: fotos, videos, renders 3D
- **Personalización Total**: Ajusta parámetros como intensidad, saturación y contraste

## 🚀 Tecnologías Utilizadas

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Estilos utilitarios y tema oscuro elegante
- **Framer Motion** - Animaciones fluidas y transiciones
- **Canvas API** - Procesamiento de imágenes en el navegador
- **Lucide React** - Iconografía moderna y consistente

## 🛠️ Instalación

1. **Clona el repositorio**:
```bash
git clone [repository-url]
cd lut-maker-ai
```

2. **Instala las dependencias**:
```bash
npm install
```

3. **Ejecuta en modo desarrollo**:
```bash
npm run dev
```

4. **Abre tu navegador**:
```
http://localhost:3000
```

## 📖 Uso

### Paso 1: Subir Imagen de Referencia
- Arrastra y suelta una imagen o haz clic para seleccionar
- Formatos soportados: JPG, PNG, TIFF, BMP
- La aplicación analizará automáticamente los colores dominantes

### Paso 2: Seleccionar Color Objetivo
- Elige el color que quieres aplicar a tu imagen
- Usa el selector de color o introduce un código HEX
- Selecciona entre colores predefinidos o personaliza el tuyo

### Paso 3: Generar LUT
- Haz clic en "Generar LUT" para crear tu tabla de colores
- Visualiza el antes y después en tiempo real
- Descarga en formato .cube o .3dl según tu software

## 🎬 Software Compatible

### DaVinci Resolve
1. Ve a **Color → LUTs → Importar LUTs**
2. Selecciona el archivo .cube descargado
3. Aplica el LUT desde el panel de Color

### Premiere Pro
1. Selecciona tu clip en la línea de tiempo
2. Ve a **Efectos → Color Correction → Lumetri Color**
3. En la pestaña **Creative**, carga tu archivo .3dl

### After Effects
1. Aplica el efecto **Lumetri Color** a tu capa
2. En **Creative**, selecciona tu archivo .3dl
3. Ajusta la intensidad según necesites

### Final Cut Pro
1. Selecciona tu clip
2. En el **Inspector**, ve a **Color → LUT**
3. Importa tu archivo .cube

## 🔧 Configuración Avanzada

### Personalización del LUT
```typescript
const lutConfig: LUTConfig = {
  size: 32,           // Tamaño de la tabla (32x32x32)
  name: 'Mi_LUT',     // Nombre personalizado
  description: 'LUT creado con LUT Maker AI'
}
```

### Parámetros de Análisis
- **Brillo**: Ajuste automático basado en la luminancia promedio
- **Contraste**: Optimización según la distribución de colores
- **Saturación**: Preservación de la saturación original

## 📁 Estructura del Proyecto

```
lut-maker-ai/
├── app/
│   ├── globals.css          # Estilos globales y tema oscuro
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal
├── components/
│   ├── Header.tsx           # Encabezado con animaciones
│   ├── ImageUploader.tsx    # Componente de subida de imágenes
│   ├── ColorPicker.tsx      # Selector de color avanzado
│   ├── LutGenerator.tsx     # Generador principal de LUTs
│   ├── Features.tsx         # Sección de características
│   └── Footer.tsx           # Pie de página
├── lib/
│   ├── imageProcessor.ts    # Procesamiento de imágenes
│   └── lutGenerator.ts      # Generación de LUTs
└── README.md
```

## 🎯 Algoritmo de Generación

1. **Análisis de Imagen**: Extracción de colores dominantes y distribución
2. **Mapeo de Colores**: Creación de transformaciones basadas en el color objetivo
3. **Generación 3D**: Construcción de la tabla de lookup tridimensional
4. **Optimización**: Ajuste de parámetros para mejor calidad visual
5. **Validación**: Verificación de la integridad del LUT generado

## 🌟 Características Técnicas

- **Procesamiento en Tiempo Real**: Análisis instantáneo de imágenes
- **Optimización de Rendimiento**: Muestreo inteligente para imágenes grandes
- **Compatibilidad Multi-formato**: Soporte para diferentes estándares de LUT
- **Validación Automática**: Verificación de integridad de datos
- **Responsive Design**: Optimizado para desktop y móvil

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construcción para producción
npm run start    # Servidor de producción
npm run lint     # Verificación de código
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🎨 Diseño

- **Tema Oscuro Elegante**: Interfaz moderna con gradientes y efectos glass
- **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **UX Optimizada**: Flujo de trabajo intuitivo en 3 pasos
- **Responsive**: Adaptable a cualquier dispositivo

## 🚀 Despliegue

El proyecto está optimizado para despliegue en Netlify con:
- Build automático en cada commit
- Optimización de imágenes
- Compresión de assets
- Cache headers optimizados

---

**Creado con ❤️ para la comunidad de creadores de contenido**