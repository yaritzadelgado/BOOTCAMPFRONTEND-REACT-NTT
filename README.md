**Página Resumen de Compra**

Este proyecto implementa una página de resumen de compra en React con TypeScript. Incluye funcionalidades como gestión de carrito, actualización de cantidades, validación de formulario para detalles de envío y manejo de estados globales utilizando useReducer, Context, y Provider. La navegación entre páginas se realiza mediante React Router DOM.

📝**Características**

**Visualización del carrito:** Una tabla que muestra los productos agregados con opciones para:

      Aumentar/disminuir cantidades.

      Eliminar productos.


✒️**Formulario de detalles de envío:**

Validación de campos con retroalimentación visual para errores.

Mensaje de éxito tras completar el formulario correctamente.

**Estados globales:** Manejo del estado global del carrito mediante useReducer, sin usar librerías externas.

**Custom Hook:** Un hook personalizado para cargar distritos desde un archivo JSON.


🔓**Uso** 

**Resumen del Carrito:**

    Cambiar la cantidad de un producto con los botones "+" y "-" en la tabla.

    Eliminar un producto del carrito con el botón "Eliminar".

📝**Formulario de Envío**

**Completar los campos del formulario:**

Nombres, Apellidos, Distrito, Dirección, Referencia, Celular.

**Validaciones:**

Los nombres y apellidos no pueden contener números.

El celular debe ser un número válido de 9 dígitos.

**Enviar el formulario para:**

Mostrar un mensaje de éxito si está completo.
Reiniciar el carrito y redirigir a la página de inicio.

📝**Distritos**

El campo Distrito muestra opciones cargadas dinámicamente desde un archivo JSON usando un custom hook.

📝**Dependencias**

**React:** Biblioteca para construir interfaces de usuario.

**React Router DOM:** Manejo de rutas dentro de la aplicación.

**TypeScript:** Tipado estático para mayor robustez en el desarrollo.

**Vite:** Herramienta de construcción rápida para React.


📌**Contribuciones**

Si deseas contribuir:

Haz un fork del repositorio.

💼**Autor**

Nombre: [Yaritza Delgado]

GitHub: https://github.com/yaritzadelgado
