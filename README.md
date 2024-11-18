<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="30" height="30" />

**Migración de JavaScript a TypeScript**

Este documento describe el proceso de migración de un proyecto de JavaScript a TypeScript, abordando los principales cambios, configuraciones y buenas prácticas implementadas en el proyecto.

:memo: **Descripción del Proyecto**

Este proyecto consiste en una aplicación web que muestra productos de un mercado en línea. Los usuarios pueden ver los productos, filtrarlos por categorías, realizar búsquedas en tiempo real y agregar productos al carrito de compras.

La migración de JavaScript a TypeScript tiene como objetivo mejorar la calidad del código, aprovechar las ventajas de tipado estático de TypeScript y hacer el proyecto más escalable y fácil de mantener.

🔧 **Pasos de la Migración**

:pencil2:**1. Configuración Inicial de TypeScript**

Primero, se configuró el proyecto para usar TypeScript:

**Instalación de TypeScript y sus dependencias:**

```npm install --save-dev typescript @types/node```

Se creó el archivo tsconfig.json en la raíz del proyecto con la configuración básica:

```
{
  
"compilerOptions": {

    "target": "ES5",
    "module": "ES6",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"]
}
```
:black_nib:**2. Renombrado de Archivos de .js a .ts**

Se renombraron los archivos de JavaScript en el directorio src/ a la extensión .ts para indicar que ahora se utilizará TypeScript. Por ejemplo:

- [x] index.js → index.ts
- [x] main.js → main.ts



:bookmark:**3. Tipado de Variables y Funciones**

Se agregó el tipado explícito a las variables, parámetros de funciones y valores de retorno. Por ejemplo, en la función `fetchProducts:`

```
interface Product {

  id: number;

  title: string;

  price: number;

  category: string;

}

interface ProductsResponse {

  products: Product[];
}

const fetchProducts = async (): 
Promise<ProductsResponse> => {

  const response = await 

fetch('https://dummyjson.com/products');

  if (!response.ok) {

    throw new Error('Error fetching products');

  }
  return response.json();

};
```

:computer:**Cambios clave:**

Se definieron interfaces como Product y ProductsResponse para describir las estructuras de los productos y las respuestas de la API.

Se utilizaron tipos explícitos como Promise<ProductsResponse> para las funciones asíncronas.

:dvd:**4. Uso de Tipos y Interfaces en Toda la Lógica del Proyecto**
Se crearon interfaces y tipos en archivos separados para mantener el código limpio y modular. Por ejemplo, en el archivo src/interfaces/category.ts:


```
export interface Category {

  id: number;

  name: string;

}

export type CategoriesResponse = string[];

```

Esto garantiza que el código esté más estructurado y fácil de mantener a medida que crece el proyecto.

:mega:**5. Validación de Tipos en Funciones y Componentes**

Se aseguraron de que todas las funciones, como las relacionadas con la manipulación de productos y categorías, estén tipadas correctamente, usando **string[], number, Product[], etc.**

Por ejemplo, el método **displayCategories ahora espera un array de cadenas (string[]):**


```
export function displayCategories(categories: string[]): void {

  const categorySelect = 
document.querySelector('select');

  categories.forEach(category => {

    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect?.appendChild(option);
  });
}
```
:unlock:**6. Manejo de Errores y Excepciones**

Se mejoró el manejo de errores con el uso de try-catch y mensajes de error detallados. Esto permite capturar errores y proporcionar retroalimentación útil durante el desarrollo y producción.


:briefcase:**7. Refactorización de Código**

Se refactorizó el código de las funciones y componentes para aprovechar las ventajas de TypeScript. Esto incluyó:

Eliminación de any y reemplazo por tipos específicos.
Uso de tipos y interfaces para describir correctamente los datos y las respuestas de las API.

:clipboard:**8. Pruebas**

Se implementaron pruebas unitarias utilizando Jest o alguna otra herramienta de pruebas, asegurando que el código migrado funcione correctamente.


### TY se configuró el archivo jest.config.js para TypeScript:
```
npm install --save-dev jest @types/jest ts-jest

module.exports = {

  preset: 'ts-jest',

  testEnvironment: 'node',
};
```

:clipboard:**9. Verificación y Pruebas**

Después de realizar los cambios, se verificó que el código funcionara correctamente ejecutando el proyecto y realizando pruebas. Se comprobó que la aplicación de frontend (HTML/JS) cargaba los productos y las categorías correctamente.

:pushpin:**Conclusiones**

La migración de JavaScript a TypeScript trajo varios beneficios:

**Mejor tipado estático:** Se lograron detectar errores de tipo en tiempo de compilación, lo que redujo los errores en tiempo de ejecución.

**Mayor mantenibilidad:** Con el uso de interfaces y tipos, el código es más fácil de entender y mantener.

**Mayor confianza en el código:** Al contar con un sistema de tipos, se incrementó la seguridad y la calidad del código.
Este proceso de migración no solo ha mejorado la calidad del código, sino que también proporciona una base sólida para el crecimiento del proyecto.



**Autor**

Creado por :smile: 

 - [@yaritzadelgado](https://www.github.com/yaritzadelgado)
