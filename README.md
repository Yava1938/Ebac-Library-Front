
# 📚 Central Library Frontend

Frontend del sistema de gestión de biblioteca. Permite administrar libros, autores y usuarios, así como el préstamo y devolución de libros. La aplicación está desarrollada con React y consume una API REST entregable como primer MVP.

---

## 🚀 Tecnologías utilizadas

- React 18
- React Router DOM
- Context API
- Custom Hooks
- SCSS (Sass)
- Lucide React
- LocalStorage
- Arquitectura modular por capas

---

## 📦 Requisitos previos

- Node.js v18 o superior
- npm o yarn
- Backend (API REST) en ejecución

---

## ⚙️ Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd library-frontend

npm install
```


## Configuracion de conexion Backend
2. Configurar entorno
```js
//src/config/api.js
export const API_URL = "http://localhost:3000";
```
3. Ejecutar servicio
```bash
npm run dev
```
## Estructura del proyecto
```bash
src/
├── auth/
│   ├── AuthContext.jsx
│   ├── ProtectedRoute.jsx
│   └── PublicRoute.jsx
│
├── components/
│   ├── Modal.jsx
│   ├── ConfirmModal.jsx
│   ├── CreateRecordModal.jsx
│   ├── MainLayout.jsx
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── form/
│       ├── DynamicForm.jsx
│       └── SearchSelect.jsx
│
├── config/
│   ├── crudFormulario.js
│   └── api.js
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Books.jsx
│   ├── Authors.jsx
│   ├── Users.jsx
│   ├── BookDetail.jsx
│   └── BookForm.jsx
│
├── services/
│   ├── api.js
│   ├── crudService.js
│   ├── authService.js
│   ├── bookService.js
│   ├── authorService.js
│   ├── userService.js
│   ├── dashboardService.js
│   └── events.js
│
├── hooks/
│   ├── useAuth.js
│   ├── useBooks.js
│   ├── useAuthors.js
│   ├── useUsers.js
│   └── useDashboardStats.js
│
├── styles/
│   ├── main.scss
│   ├── components/
│   ├── pages/
│   └── layout/
│
├── App.jsx
└── index.js
```


## Autenticacion
La autenticación se maneja mediante Context API y se persiste usando LocalStorage. Se implementan rutas públicas y protegidas para controlar el acceso según el estado de sesión.

## Rutas principales

	- /login → Inicio de sesión
	- /dashboard → Estadísticas generales
	- /books → Gestión de libros
	- /authors → Gestión de autores
	- /users → Gestión de usuarios
	- /books/:id → Detalle de libro


## Gestion de libros

    - Crear, editar y eliminar libros
	- Asociación con autores
	- Visualización del nombre del autor
	- Estados: disponible / prestado
	- Préstamo de libros a usuarios
	- Devolución de libros
	- Confirmación antes de eliminar

## Gestion de autores
	- CRUD completo
	- Selección mediante SearchSelect
	- Precarga correcta al editar libros
	- Cacheo en LocalStorage

## Gestion de usuarios
	- CRUD completo
	- Selección para préstamos
	- Preparado para extenderse con correo electrónico e historial de préstamos

## Formularios dinamicos
Los formularios se generan dinámicamente a partir de una configuración centralizada (crudFormulario.js). Incluyen validación automática de campos requeridos y soporte para inputs normales y campos de búsqueda (SearchSelect).

	- Búsqueda en tiempo real
	- Dropdown interactivo
	- Mensaje “Sin resultados”
	- Precarga del valor seleccionado
	- Cierre automático al perder foco
	- Manejo correcto de estados inválidos

## Sincronizacion de datos

Se utiliza un Event Bus para sincronizar vistas y refrescar estadísticas sin recargar la aplicación.

## Estilos
	- SCSS modular
	- Layout con Sidebar y Navbar
	- Componentes reutilizables
	- Interfaz clara y consistente

## Comunicacion con Backend
La comunicación se realiza mediante API REST, enviando el identificador de sesión en los headers:
```js
X-SESSION-ID: <sessionId>
```


👨‍💻 Autor Yael Vargas - EBAC Project

