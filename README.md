# Proyecto de Gestión de Eventos - Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Este repositorio contiene el código fuente del frontend para la aplicación de **Gestión de Entradas para Micro-Eventos**, desarrollado como parte del curso de Pruebas de Software.

## 📝 Descripción

La aplicación permite a los usuarios autenticados gestionar eventos de manera integral. La interfaz está diseñada para ser intuitiva y funcional, proporcionando todas las herramientas necesarias para el control de eventos, desde su creación hasta la gestión de ventas.

### Características Principales
- **Autenticación de Usuarios:** Interfaz de inicio de sesión para proteger el acceso al panel de gestión.
- **Gestión de Eventos (CRUD):** Formularios para crear, leer, actualizar y eliminar eventos.
- **Validación de Formularios:** Validaciones en el lado del cliente para asegurar la integridad de los datos.
- **Filtrado y Búsqueda:** Herramientas para buscar y filtrar eventos por nombre, categoría o precio.
- **Visualización de Reportes:** Un dashboard que muestra estadísticas clave como el total de eventos y los cupos disponibles.

## 🚀 Instalación

Para ejecutar este proyecto en tu entorno local, sigue estos pasos.

### Prerrequisitos
- **Node.js:** Asegúrate de tener Node.js instalado (versión 16 o superior). Puedes descargarlo desde [nodejs.org](https://nodejs.org/).

### Pasos
1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Pruebas-de-Software-Tareas/URL-A-TU-REPO-FRONTEND.git
    ```

2.  **Navegar a la carpeta del proyecto:**
    ```bash
    cd Tarea1-front
    ```

3.  **Instalar las dependencias:**
    ```bash
    npm install
    ```
    o también puedes usar:
    ```bash
    npm i
    ```

### Configuración
Este proyecto requiere una variable de entorno para conectarse al backend.

1.  Crea un archivo llamado `.env` en la raíz de la carpeta `Tarea1-front`.
2.  Añade la siguiente línea, reemplazando la URL con la dirección de tu API de backend:
    ```
    VITE_API_BASE_URL=http://localhost:8080/api
    ```

## 💻 Cómo Usar

Una vez que hayas instalado las dependencias y configurado el entorno, puedes iniciar la aplicación.

1.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

2.  **Abrir en el navegador:**
    El comando anterior iniciará el servidor de desarrollo de Vite. Abre tu navegador web y visita la dirección que aparece en la consola (generalmente es `http://localhost:5173`).

## 🤝 Cómo Contribuir

Las contribuciones se gestionan siguiendo un flujo de trabajo basado en Pull Requests. Si deseas contribuir, por favor sigue estos pasos:

1.  **Crea una nueva rama** para tu funcionalidad o corrección de error:
    ```bash
    git checkout -b feature/nombre-de-la-funcionalidad
    ```

2.  **Realiza tus cambios** y haz commits descriptivos.

3.  **Sube tus cambios** al repositorio remoto:
    ```bash
    git push origin feature/nombre-de-la-funcionalidad
    ```

4.  **Abre un Pull Request (PR)** en GitHub, apuntando a la rama `main` o `develop`.

5.  **Asigna a un revisor** del equipo para que apruebe tus cambios antes de hacer el merge.

## 📜 Licencia

Este proyecto está distribuido bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.