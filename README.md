# NutriPuerta

> Plataforma digital de nutrición personalizada para Argentina.

NutriPuerta es una aplicación web que ayuda a los usuarios a descubrir hábitos alimenticios saludables mediante herramientas interactivas como calculadoras de IMC, guías de mitos alimenticios y recomendaciones personalizadas de nutrición.

## 🎯 Propósito

NutriPuerta busca educar y empoderar a usuarios de 25-35 años en Argentina mediante:

- **Cálculo de IMC** con recomendaciones personalizadas
- **Deshaz de mitos alimentarios** comunes
- **Registro de progreso** alimentario
- **Recomendaciones nutricionales** basadas en datos

## 🌐 Tecnología

### Frontend
| Tecnología | Versión |
|------------|---------|
| React | 18.2.0 |
| Vite | 5.4.0 |
| TailwindCSS | 3.4.19 |
| React Router | 7.18.1 |
| Axios | 1.5.1 |

### Backend
| Tecnología | Versión |
|------------|---------|
| Node.js | ES Modules |
| Express | 4.19.2 |
| CORS | 2.8.5 |
| dotenv | 16.4.5 |

## 📁 Estructura del Proyecto

```
NutriPuerta/
├── NutriPuerta-BackEnd/          # API REST con Node.js + Express
│   ├── src/
│   │   ├── controllers/           # Lógica de negocio por recurso
│   │   ├── models/                # Modelos de datos
│   │   ├── routes/                # Definición de rutas API
│   │   └── app.js                 # Configuración del servidor
│   ├── index.js                   # Punto de entrada
│   └── package.json
│
├── NutriPuerta-FrontEnd/         # Aplicación React + Vite
│   ├── src/
│   │   ├── components/            # Componentes reutilizables
│   │   ├── pages/                 # Páginas principales
│   │   ├── services/              # Servicios de API
│   │   ├── App.jsx               # Componente raíz
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── stitch_nutripuerta_nutrition_guide/
    ├── nutripuerta_bmi_entry/    # Componente de entrada IMC
    ├── nutripuerta_design_system/ # Sistema de diseño
    ├── nutripuerta_mitos_alimentarios/
    ├── nutripuerta_recomendacion_personalizada/
    ├── nutripuerta_registro_opcional/
    └── nutripuerta_resultado_saludable/
```

## 🚀 Instalación

### Requisitos Previos
- **Node.js** 18+ instalado
- **npm** o **yarn**

### Backend

```bash
cd NutriPuerta-BackEnd
npm install
npm run dev      # Desarrollo
npm start        # Producción
```

### Frontend

```bash
cd NutriPuerta-FrontEnd
npm install
npm run dev      # Desarrollo (http://localhost:5173)
npm run build     # Construcción para producción
npm run preview   # Preview en producción
```

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Usuarios
```
GET  /api/users              # Listar todos los usuarios
GET  /api/users/:id          # Obtener usuario por ID
POST /api/users              # Crear nuevo usuario
PUT  /api/users/:id          # Actualizar usuario
DELETE /api/users/:id        # Eliminar usuario
```

### Perfiles
```
GET  /api/profiles           # Obtener perfil del usuario actual
```

### Evaluaciones
```
GET  /api/assessments        # Listar evaluaciones
POST /api/assessments        # Crear evaluación (IMC, preguntas)
```

### Alimentos
```
GET  /api/foods              # Listar alimentos
POST /api/foods              # Registrar alimento
```

### Leads (Registro)
```
GET  /api/leads              # Listar leads
POST /api/leads              # Registrar nuevo lead
```

## 🎨 Sistema de Diseño

NutriPuerta utiliza un sistema de diseño enfocado en **"Gentle Nutrition"** — una estética moderna-minimalista con calidez y empatía.

### Paleta de Colores

| Color | Uso |
|-------|-----|
| **Honey Gold** (`#785900`) | Acciones primarias |
| **Eucalyptus Green** (`#456554`) | Acentos secundarios |
| **Almond Cream** (`#FFFDF5`) | Fondos |
| **Slate Warmth** (`#706D6B`) | Textos |

### Tipografía

- **Títulos:** Montserrat (Bold/Semi-Bold)
- **Cuerpo:** Inter (Regular)

### Principios Clave

1. **Espaciado generoso** — Ambiente "aireado"
2. **Bordes redondeados** — 0.5rem - 1.5rem
3. **Sombras suaves** — Efecto "soft glow"
4. **Evitar rojo** — Usar terracota para errores

Ver el [Sistema de Diseño Completo](./stitch_nutripuerta_nutrition_guide/nutriPuerta_design_system/DESIGN.md) para detalles completos.

## 📱 Páginas Principales

| Ruta | Descripción |
|------|-------------|
| `/bmi` | Calculadora de IMC + recomendaciones |
| `/myths` | Mitos alimentarios comunes |
| `/register` | Registro de progreso (opcional) |
| `/recommendation` | Recomendaciones personalizadas |
| `/result` | Resultados saludables |

## 🛠️ Comandos Útiles

```bash
# Backend
npm run dev      # Modos de desarrollo
npm start        # Modo de producción

# Frontend
npm run dev      # Servidor Vite
npm run build    # Construcción
npm run preview  # Preview
```

## 📝 Licencia

MIT License

---

**Desarrollado con ❤️ para la comunidad de nutrición argentina**
