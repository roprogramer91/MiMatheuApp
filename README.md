# MiMatheu

Aplicación móvil desarrollada con Expo y React Native para proveer información local de Matheu.

## 🚀 Características

- 💊 **Farmacias de turno**: Consulta rápida de la farmacia de turno actual
- 🏪 **Locales comerciales**: Directorio de negocios locales
- 🔔 **Notificaciones**: Alertas sobre farmacias y novedades
- 👤 **Perfil**: Configuración personalizada de la app

## 📱 Tecnologías

- **Frontend**: React Native con Expo
- **Navegación**: Expo Router con navegación por tabs
- **UI**: Componentes nativos con diseño moderno
- **Notificaciones**: Expo Notifications
- **TypeScript**: Tipado estático para mayor seguridad

## 🎨 Paleta de Colores

- **Primario**: `#0078d7` (Azul)
- **Blanco**: `#ffffff`
- **Gris**: `#f1f5f9`
- **Texto**: `#1e293b`

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npx expo start

# Ejecutar en Android
npx expo start --android

# Ejecutar en iOS
npx expo start --ios
```

## 📁 Estructura del Proyecto

```
MiMatheu/
├── app/                    # Pantallas de la aplicación
│   ├── (tabs)/            # Navegación por tabs
│   │   ├── index.tsx      # Pantalla de inicio
│   │   ├── farmacias.tsx  # Farmacias de turno
│   │   ├── locales.tsx    # Locales comerciales
│   │   └── perfil.tsx     # Perfil de usuario
│   └── _layout.tsx        # Layout principal
├── services/              # Servicios de API
│   ├── farmaciaService.ts
│   └── notificationService.ts
├── src/
│   ├── constants/         # Constantes (colores, config)
│   ├── styles/           # Estilos globales
│   └── utils/            # Utilidades
├── components/           # Componentes reutilizables
├── Back/                 # Backend API (a migrar)
└── assets/              # Imágenes, fuentes, iconos
```

## 🔗 API

La aplicación consume una API REST que proporciona información sobre:

- Farmacias de turno
- Locales comerciales
- Notificaciones y alertas

## 📝 Próximas Funcionalidades

- [ ] Sistema de autenticación
- [ ] Favoritos y guardados
- [ ] Búsqueda avanzada de locales
- [ ] Sistema de publicidad para comercios
- [ ] Integración con redes sociales
- [ ] Modo oscuro

## 👨‍💻 Desarrollo

Este proyecto fue creado con `create-expo-app` usando el template TypeScript.

Para más información sobre desarrollo con Expo, visita la [documentación oficial](https://docs.expo.dev/).

## 📄 Licencia

Proyecto privado - MiMatheu © 2025
