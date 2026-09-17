# TurnosMed - Sistema de Gestión de Turnos Médicos

Este proyecto consiste en el backend de un prototipo para centralizar la gestión de turnos de un centro de atención médica, desarrollado bajo un entorno profesional utilizando **Node.js**, **Express** y **TypeScript**.

## Características Principales
* **Persistencia de Datos:** Carga y lectura asíncrona de archivos JSON (`especialidades.json` y `profesionales.json`) mediante el uso del módulo nativo `node:fs/promises`.
* **Reglas de Negocio:** Delimitación estricta de la agenda del centro médico mediante interfaces robustas en TypeScript, definiendo los límites operativos de atención (Lunes a Viernes de 07:00 hs a 13:00 hs).
* **Compilación Moderna:** Configuración avanzada de entornos de desarrollo y producción automatizados con soporte completo de tipos.

## Comandos del Proyecto

Para iniciar el servidor en modo de desarrollo (con escucha activa de cambios):
```bash
npm run dev
```

Para compilar el proyecto y generar el código de producción en la carpeta `dist/`:
```bash
npm run build
```

Para ejecutar el proyecto compilado en producción:
```bash
npm run start
```
