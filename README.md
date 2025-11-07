# 🐾 Animalis – Gestión de Veterinaria (React + Node API)

Aplicación web para gestionar clientes y mascotas, consumiendo tu API real del módulo integrador (Node + MongoDB).
Permite listar, crear, editar y eliminar clientes, además de crear mascotas asociadas y ver su detalle.
UI moderna con Material UI, notificaciones integradas y ruteo protegido.

Backend en producción: usa VITE_API_URL (ej.: https://api-nodejs-veterinarias.vercel.app/api).

Para saber el estado: https://api-nodejs-veterinarias.vercel.app/api/status

## 🚀 Features

- Autenticación básica / Rutas protegidas (layout + guard).

- Clientes

  - Listado, búsqueda local.

  - Crear, editar, eliminar, detalle individual.

- Mascotas (negocio)

  - Listado general.

  - Crear mascota asociada a un cliente.

  - Detalle simple (modal) con dueño y email.

  - Filtro por cliente con ?cliente_id= (desde la página de detalle del cliente).

- UI/UX

  - Tema oscuro con Material UI.

  - Navbar + Sidebar responsivos (Drawer).

  - Notificaciones (éxito/error) con notistack.

  - Imágenes de banner y assets locales con fallback.

## 🧩 Tecnologías utilizadas

| Categoría      | Tech                                               |
| -------------- | -------------------------------------------------- |
| Framework      | React 18 + Vite                                    |
| UI             | Material UI (MUI)                                  |
| Routing        | React Router DOM v6                                |
| Estado         | React Context + Custom Hooks                       |
| Notificaciones | notistack                                          |
| Build          | Vite                                               |
| Backend (API)  | Node.js + Express + MongoDB (desplegado en Vercel) |

## 🧠 Decisiones técnicas

- Separación de responsabilidades

  - /services encapsula todas las llamadas HTTP con un helper único apiFetch.

  - Custom hooks (useClientes, useClienteDetail, useMascotas) aíslan la lógica de datos/estado desde los componentes de UI.

  - Contexto global de clientes (ClientesContext) para compartir estado entre páginas y optimizar renders.

- MUI + notistack

  - MUI simplifica layout responsivo (AppBar, Drawer, Grid, Cards).

  - notistack da feedback inmediato de operaciones (crear/editar/borrar).

- Ruteo protegido (ProtectedRoute)

  - Mantiene la estructura del proyecto realista y lista para ampliar auth.

- Accesibilidad / UX

  - Ajustes de enfoque/focus al usar Drawer (sidebar) para evitar advertencias de aria-hidden y asegurar navegación con teclado.

## 🗂️ Estructura del proyecto

```
src/
├─ auth/
│  └─ ProtectedRoute.jsx
├─ layout/
│  ├─ AppNavbar.jsx
│  └─ AppSidebar.jsx
├─ pages/
│  ├─ Inicio/
│  │  └─ Inicio.jsx
│  ├─ Login/
│  │  └─ Login.jsx
│  ├─ Clientes/
│  │  ├─ ClientesList.jsx
│  │  ├─ ClienteDetail.jsx
│  │  └─ components/
│  │     ├─ ClienteCard.jsx
│  │     ├─ ClienteForm.jsx
│  │     └─ ClienteEditDialog.jsx
│  └─ Mascotas/
│     ├─ MascotasList.jsx
│     └─ components/
│        └─ MascotaCard.jsx
├─ hooks/
│  ├─ useClientes.js
│  ├─ useClienteDetail.js
│  └─ useMascotas.js
├─ context/
│  ├─ AuthContext.jsx
│  └─ ClientesContext.jsx
├─ services/
│  ├─ api.js                 # apiFetch (helper base)
│  ├─ clientes/
│  │  ├─ GetClientes.js
│  │  ├─ GetClienteById.js
│  │  ├─ CreateCliente.js
│  │  ├─ UpdateCliente.js
│  │  └─ DeleteCliente.js
│  └─ mascotas/
│     ├─ GetMascotas.js
│     └─ CreateMascota.js
├─ assets/                   # imágenes locales opcionales
├─ theme.js                  # MUI theme (oscuro)
├─ App.jsx
└─ main.jsx
```

## 🔌 Endpoints utilizados

### Clientes

- GET /api/clientes – listado

- GET /api/clientes/:id – detalle

- POST /api/clientes – crear

- PUT /api/clientes/:id – actualizar

- DELETE /api/clientes/:id – eliminar

### Mascotas (negocio)

- POST /api/mascotas – crear y vincular (body: { nombre, especie, raza?, edad?, cliente_id })

- GET /api/mascotas – listado general

- GET /api/mascotas?cliente_id=<id> – filtrar por cliente (se usa en la vista de detalle del cliente)

Nota: especie se valida contra el enum del backend: Perro, Gato, Ave, Roedor, Reptil, Otro (se ofrece un Select para evitar errores).

## ⚙️ Variables de entorno

Crear un archivo .env en la raíz del proyecto:

VITE_API_URL=https://api-nodejs-veterinarias.vercel.app/api

No pongas / final extra; apiFetch lo normaliza.

## ▶️ Cómo correr el proyecto

- Clonar el repositorio: git clone

- Instalar dependencias: npm install

- Inspeccionar Back end : https://github.com/Diesoft584/api-nodejs-veterinarias  
  carpeta Config/corsOptions.js
- Ejecutar el proyecto (local): npm run dev

- http://react-veterinarias-app.vercel.app (para usar desde vercel)

- Demo:

  - usuario: admin

  - contraseña: admin

## 🧭 Rutas principales (SPA)

| Ruta            | Descripción                               |
| --------------- | ----------------------------------------- |
| `/login`        | Login (placeholder)                       |
| `/inicio`       | Dashboard simple                          |
| `/clientes`     | Listado + alta + edición + borrado        |
| `/clientes/:id` | Detalle + listado de mascotas del cliente |
| `/mascotas`     | Listado general + detalle (modal)         |

## ✅ Buenas prácticas aplicadas

- Arquitectura modular y clara (UI vs datos).

- Custom hooks para reutilización y testabilidad.

- Manejo de errores uniforme con apiFetch + notistack.

- Layout responsivo (MUI) + Sidebar accesible.

- Imágenes externas con query params ?auto=format&fit=crop&w=... para rendimiento.

## 🧭 Próximos pasos (opcional)

- “Adopción” de mascotas huérfanas (cuando se borra un cliente).

- Subida de imágenes reales (campo foto + storage).

- Borrado/edición de mascotas.

- Paginación y búsqueda por servidor.

## 🧑‍💻 Créditos_2025:

- OD = [OviedoDiego](https://github.com/Diesoft584)
