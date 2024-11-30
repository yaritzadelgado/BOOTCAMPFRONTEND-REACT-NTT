**Testing con Jest y Testing Library**

Este proyecto ha sido desarrollado utilizando Jest y Testing Library para garantizar la calidad y el correcto funcionamiento de cada funcionalidad, componente, hook y página.

📝**Requisitos**

Para ejecutar los tests en este proyecto, necesitarás tener instalados los siguientes paquetes:

**Jest:** Framework de testing para JavaScript.

**React Testing Library:** Herramienta para realizar pruebas en componentes de React.

    @testing-library/jest-dom

📝**Instalación**

**Clona el repositorio a tu máquina local:**

     bash

    Copiar código

    git clone <URL del repositorio>

**Navega a la carpeta del proyecto:**

     bash

    Copiar código

    cd <nombre del proyecto>

✒️**Instala las dependencias:**

     bash
     Copiar código
     npm install

✒️**Estructura de los Tests**

La estructura de los tests debe seguir el siguiente patrón:

**1. Tests de Componentes:** 
Cada componente debe tener su archivo de test dentro de la misma carpeta. El archivo debe seguir la convención ComponentName.test.tsx.

**2. Tests de Hooks:** Los hooks se deben testear de manera aislada. Los tests de hooks deben estar en archivos con el formato use<HookName>.test.ts.

**3. Tests de Páginas:** Las pruebas de las páginas deben incluirse en la carpeta correspondiente dentro de src/pages. Los archivos de test deben seguir la convención PageName.test.tsx.

**📝 Convenciones de Nombres**

Es importante que los nombres de los archivos de test sigan una convención consistente, ya que se evaluará la correcta definición de los mismos. A continuación, algunos ejemplos:

**Componente:** Button.test.tsx

**Hook:** useFetchData.test.ts

**Página:** HomePage.test.tsx


🔓**Testing de Componentes:**

- Utiliza render de React Testing Library para montar el componente.
- Usa screen para seleccionar elementos del DOM.

- Realiza aserciones utilizando jest-dom.

**Ejemplo de un test de un componente Button:**

    tsx
    Copiar código
    import { render, screen } from '@testing-library/react';
    import Button from './Button';

    test('muestra el texto del botón correctamente', () => {
    render(<Button text="Hacer clic" />);
    const buttonElement = screen.getByText(/Hacer clic/i);
    expect(buttonElement).toBeInTheDocument();
    });

🔓**Testing de Hooks:**

Usa renderHook para probar hooks.
Realiza aserciones sobre el estado o los efectos del hook.

Ejemplo de un test para el hook useFetchData:

    tsx
    Copiar código
    import { renderHook } from '@testing-library/react-hooks';
    import useFetchData from './useFetchData';

    test('debería retornar datos al hacer fetch', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>        useFetchData('https://api.com/data'));
    await waitForNextUpdate();
    expect(result.current.data).toBeDefined();
    });

🔓**Testing de Páginas:**

Similar al testing de componentes, pero asegurándote de que la página completa se renderice correctamente.

Ejemplo de test para la página HomePage:

    tsx
    Copiar código
    import { render, screen } from '@testing-library/react';
    import HomePage from './HomePage';

    test('debería mostrar el título de la página', () => {
    render(<HomePage />);
    const titleElement = screen.getByText(/Bienvenido a la página de inicio/i);
    expect(titleElement).toBeInTheDocument();
    });

**Correr los Tests**

Para ejecutar los tests, puedes usar el siguiente comando:

    bash
    Copiar código
    npm test
    Esto ejecutará todos los tests y generará un informe de los resultados.

**Ejecutar solo un test específico**

Si solo deseas ejecutar un test específico, puedes usar el comando:

    bash
    Copiar código
    npm test -- -t 'nombre_del_test'
    Donde 'nombre_del_test' es el nombre o patrón del test que deseas ejecutar.

📝**Buenas Prácticas**

- **Cobertura de Tests:** Asegúrate de que todos los componentes, hooks y páginas estén correctamente testeados. Se evaluará la cobertura de los tests.

- **Nombres Descriptivos:** Los nombres de los tests deben ser claros y describir lo que están probando. Utiliza nombres descriptivos para las funciones de los tests y las aserciones.


📝**Conclusión**

Este enfoque de testing proporciona una cobertura completa de la funcionalidad del proyecto. El objetivo es garantizar que cada parte del código esté bien probada y funcione correctamente, siguiendo buenas prácticas de desarrollo y pruebas.




📌**Contribuciones**

Si deseas contribuir:

Haz un fork del repositorio.

💼**Autor**

Nombre: [Yaritza Delgado]

GitHub: https://github.com/yaritzadelgado