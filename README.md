**Minimarket - React + TypeScript Project**

Este proyecto es una migración de un sitio web creado en HTML, CSS y JavaScript a React con TypeScript. La solución incluye componentes reutilizables, hooks personalizados y una arquitectura de carpetas escalable. El objetivo es ofrecer una experiencia de usuario optimizada, con funcionalidad como un carrito de compras, un buscador de productos y un filtro por categorías.

📝**Tabla de Contenidos**

**Requisitos**

**Instalación**

**Estructura de Carpetas**

**Características Principales**

**Uso**

**Tecnologías Utilizadas**

**Contribuciones**

**Autor**

📌**Requisitos**

    Node.js (v16 o superior)

    Gestor de paquetes

📌**Instalación**

**Clonar el repositorio:**

    git clone https://github.com/tu-usuario/minimarket.git
    cd minimarket

**Instalar dependencias:**

     npm install

**Iniciar el proyecto en modo desarrollo:**

    npm run dev

**Abrir la aplicación:**

    Ve al navegador y abre http://localhost:5173.

🔓**Estructura de Carpetas**

src/
    components/        # Componentes reutilizables

       Footer.tsx

       Header.tsx

       ProductCard.tsx

       SearchBar.tsx

       Slider.tsx

       Slider.css

    hooks/             
        useFetchProducts.ts

    pages/             # Páginas principales
       Home.tsx

     services/          # Llamadas a APIs
          api.ts

      types/             # Tipos e interfaces
          Product.ts

      App.tsx            # Componente raíz
      main.tsx           # Punto de entrada
      index.css          # Estilos globales

      index.html         # Archivo HTML 

✒️**Características Principales**

**Carrito de Compras:**
Contador dinámico que incrementa al agregar productos.

**Búsqueda en Tiempo Real:**
Permite buscar productos por título.

**Filtrado por Categorías:**
Selección de productos según categoría.

**Galería Interactiva:**
Slider para destacar ofertas especiales.

**Consumo de APIs:**
Llamadas a los servicios DummyJSON para productos y categorías.

**Arquitectura Escalable:**
Separación de lógica, componentes y páginas.

**Uso**:
Al abrir la aplicación, se mostrará un slider con ofertas.

La barra de búsqueda permite encontrar productos por su título.

Selecciona una categoría en el dropdown para filtrar productos.

Agrega productos al carrito haciendo clic en el botón Agregar al carrito.

✒️**Tecnologías Utilizadas**

**Framework:** React + TypeScript

**Herramienta de desarrollo:** Vite

**Consumo de APIs:** Fetch API con async/await

**Estilos:** CSS


📌**Contribuciones**

Si deseas contribuir:

Haz un fork del repositorio.

💼**Autor**

Nombre: [Yaritza Delgado]

GitHub: https://github.com/yaritzadelgado


