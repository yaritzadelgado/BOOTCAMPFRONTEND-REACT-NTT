# Dynamic Product Viewer

Este proyecto es una aplicación web interactiva que permite a los usuarios 
explorar y filtrar productos dinámicamente desde la API de [DummyJSON](https://dummyjson.com/docs/products).

## Características

- **Visualización Dinámica de Productos**: Los productos se muestran en tarjetas con su imagen, título, descripción y precio.
- **Carrito de Compras**: Incluye un contador que incrementa al agregar productos.
- **Filtro por Categorías**: Un desplegable que permite filtrar los productos según sus categorías.
- **Buscador en Tiempo Real**: Permite buscar productos por nombre.
- **Responsivo**: Compatible con dispositivos móviles y escritorios.

---

##  Tecnologías Usadas
 - [x] **HTML**: Estructura del documento.
 - [x] **CSS**: Estilos para el diseño.
 - [x] **JavaScript**: Funcionalidad dinámica.
- [x] **API de DummyJSON**: Fuente de datos para productos y categorías.

---

**Funcionalidades Principales**

**1. Mostrar Productos**
La función fetchProducts recupera productos desde la API y los renderiza en la página.

**2. Agregar al Carrito**
Cada tarjeta de producto tiene un botón que incrementa un contador en el carrito.

**3. Filtro por Categorías**
Un menú desplegable permite seleccionar una categoría para filtrar productos. 

**Se utilizan las funciones:**

**fetchCategories** para obtener las categorías.

**filterByCategory** para aplicar el filtro.

**4. Buscador**
El campo de búsqueda filtra productos en tiempo real según el texto ingresado. 

Esto es manejado por la función **filterBySearch.**


## **Archivos Clave**
 | Syntax | Description |
| ----------- | ----------- |
|index.html | Estructura base del proyecto |
|styles.css| Estilo para las tarjetas y diseño general|
|main.js| Contiene toda la lógica del proyecto |



### 
**API Utilizada**

**Productos**: https://dummyjson.com/products

**Categorías:** https://dummyjson.com/products/categories

**Productos por Categoría:** https://dummyjson.com/products/category/{categoria}


**Licencia**
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

**Contribuciones**

¡Las contribuciones son bienvenidas! 
Si tienes ideas para mejorar este proyecto, por favor abre un `issue` o envía un `pull request`.


**Autor**

Creado por

 - [@yaritzadelgado](https://www.github.com/yaritzadelgado)
