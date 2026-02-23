# MiMatheu Backend

Esta carpeta está preparada para recibir el backend de la aplicación MiMatheu.

## Estructura Planeada

```
Back/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
├── package.json
├── tsconfig.json
└── README.md
```

## Próximos Pasos

1. Migrar tu API existente a esta carpeta
2. Configurar las variables de entorno
3. Conectar con la base de datos
4. Integrar con el frontend

## Endpoints Necesarios

- `GET /api/farmacia/turno` - Farmacia de turno actual
- `GET /api/farmacia/ayerhoymaniana` - Farmacias de ayer, hoy y mañana
- `GET /api/locales` - Listado de locales comerciales
- `POST /api/locales` - Crear nuevo local (admin)
- APIs de autenticación y perfil (futuro)
