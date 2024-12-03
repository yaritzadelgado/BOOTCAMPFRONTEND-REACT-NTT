# Proyecto Integrador
## Descripción

Este proyecto implementa una solución de autenticación utilizando React. La pantalla de login valida los campos de formulario, permite la recuperación de contraseña mediante un modal, y maneja el estado de autenticación a través de `localStorage` y `context`. Además, cuenta con pruebas unitarias para las funcionalidades implementadas.

## Funcionalidades

1. **Pantalla de Login**
   - El formulario de login incluye dos campos: **usuario** y **contraseña**.
   - Se validan ambos campos antes de enviar el formulario. Si algún campo está vacío, se muestra un mensaje de error debajo de cada input.
   - En caso de que los datos sean correctos, se realiza una autenticación utilizando la API de **dummyjson**.

2. **Recuperación de Contraseña**
   - En la parte inferior de la pantalla de login hay un enlace "Olvidé Contraseña" que abre un modal.
   - El modal solicita el correo electrónico del usuario y valida que el formato sea correcto.
   - Al hacer clic en "Enviar", se muestra una alerta personalizada utilizando SweetAlert (o una librería similar), indicando que la información fue enviada al correo.

3. **Menú de Navegación**
   - En la parte superior de la pantalla se muestra el mensaje "Bienvenido: [NOMBRE DE USUARIO]" durante la interacción con las pantallas de inicio y resumen.
   - También se incluye un enlace de **Cerrar sesión** que:
     - Elimina los datos de autenticación guardados en `localStorage` y limpia el contexto.
     - Redirige al usuario a la pantalla de login.

4. **Rutas**
   - Se utiliza **React Router DOM** para la gestión de rutas.
   - Las rutas principales son:
     - `/login` - Pantalla de inicio de sesión.
     - `/home` - Pantalla de bienvenida.
     - `/resumen` - Pantalla de resumen.

5. **Responsividad**
- El diseño de la interfaz es completamente **responsive**, adaptándose correctamente a diferentes tamaños de pantalla.

6. **Pruebas Unitarias**
- Se agregan pruebas unitarias para las funcionalidades de validación de formulario, autenticación y recuperación de contraseña.

## Tecnologías Utilizadas

- **React**: Librería para la construcción de interfaces de usuario.
- **React Router DOM**: Gestión de rutas en React.
- **SweetAlert** (o librería similar): Para mostrar alertas personalizadas.
- **React Hook Form** / **Formik** (opcional): Para la gestión de formularios y validación.
- **Jest** y **React Testing Library**: Para pruebas unitarias.



📌**Contribuciones**

Si deseas contribuir:

Haz un fork del repositorio.

💼**Autor**

Nombre: [Yaritza Delgado]

GitHub: https://github.com/yaritzadelgado
