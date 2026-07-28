# 🌿 NutriPuerta — Frontend (React 18 + Vite + TailwindCSS)

**NutriPuerta** es una aplicación web integral diseñada para brindar orientación nutricional accesible, transparente y basada en evidencia científica. Permite a los usuarios calcular sus parámetros corporales, derribar mitos alimentarios habituales, conectar con nutricionistas especializados y recibir informes personalizados directamente en su correo electrónico.

---

## 🌟 Visión General del Proyecto

NutriPuerta no es solo una calculadora, es una **puerta de entrada a la educación nutricional**. La plataforma guía al usuario a través de un flujo intuitivo:

1. **Calcula**: Obtiene su IMC, Gasto Energético Diario (RED) y distribución de macronutrientes.
2. **Aprende**: Descubre la verdad sobre mitos comunes de la alimentación con información científica.
3. **Conecta**: Explora perfiles de nutricionistas certificados por especialidad.
4. **Consulta**: Envía sus dudas junto a sus resultados calculados en un informe formateado automáticamente por email.

---

## ✨ Funcionalidades del Frontend

- **📊 Calculadora Nutricional Inteligente (`/calculator`)**:
  - Cálculo de IMC según rangos de la OMS.
  - Cálculo del RED (Requerimiento Energético Diario) usando la fórmula de *Mifflin-St Jeor*.
  - Rango estimado de macronutrientes diarios en gramos (Carbohidratos 45-65%, Proteínas 10-35%, Grasas 20-35%).
  - Persistencia de datos en `localStorage` para cargarlos automáticamente en el formulario de contacto.

- **🥑 Desmitificador de Alimentos (`/myths`)**:
  - Carrusel interactivo que desmiente mitos alimentarios comunes (el huevo y el colesterol, grasas saludables de la palta, etc.).

- **👩‍⚕️ Directorio de Profesionales (`/professionals`)**:
  - Perfiles de nutricionistas categorizados por especialidad con accesos directos a WhatsApp e Instagram.

- **📧 Formulario de Consulta & Captura de Leads (`/contact`)**:
  - Permite redactar consultas, seleccionar áreas de interés y enviar la petición al Backend.
  - Adjunta de forma transparente el informe nutricional obtenido previamente.

---

## 🛠️ Tecnologías Utilizadas

- **React 18**
- **Vite 5** (Build Tool)
- **React Router DOM 7** (Enrutamiento SPA)
- **TailwindCSS 3** (Diseño responsivo basado en Material Design 3)
- **Axios** (Peticiones HTTP hacia la API REST)

---

## ⚙️ Configuración e Instalación

### 1. Clonar el repositorio e instalar dependencias:
```bash
git clone https://github.com/SantyPalacios/NutriPuerta-FrontEnd.git
cd NutriPuerta-FrontEnd
npm install
```

### 2. Configurar Variables de Entorno:
Crea un archivo `.env` en la raíz del proyecto:

```env
# En desarrollo (apunta a tu servidor Express local)
VITE_API_URL=http://localhost:3000

# En producción (apunta a tu backend desplegado en Render)
# VITE_API_URL=https://nutripuerta-backend.onrender.com
```

> ⚠️ **En Vercel**, esta variable no alcanza con ponerla en un `.env` local: hay que cargarla en el dashboard (Settings → Environment Variables) para el ambiente Production, y luego hacer un **redeploy** — Vite la incluye en el bundle en build time, no en runtime.

**Demo en producción**: https://nutripuerta.vercel.app

### 3. Scripts Disponibles:

- **Iniciar en desarrollo**:
  ```bash
  npm run dev
  ```
- **Compilar para producción**:
  ```bash
  npm run build
  ```
- **Previsualizar build de producción**:
  ```bash
  npm run preview
  ```

---

## 🔗 Repositorio Relacionado
- **Backend API**: [NutriPuerta-BackEnd](https://github.com/SantyPalacios/NutriPuerta-BackEnd) (Servidor Node.js/Express + Nodemailer + Supabase)
