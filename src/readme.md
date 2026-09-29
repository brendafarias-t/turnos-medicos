### TurnosMed API — Sistema de Gestión de Turnos Médicos

**TurnosMed** es un prototipo de backend diseñado para centralizar y optimizar la gestión de agendas, especialidades y profesionales de un centro de atención médica. El sistema opera bajo reglas institucionales estrictas (atención de lunes a viernes de 07:00 hs a 13:00 hs en bloques de 30 minutos) y utiliza una arquitectura desacoplada basada en controladores de acuerdo con los principios de **Clean Architecture**. 

### 🛠️ Tecnologías y Entorno de Desarrollo

El entorno profesional de desarrollo backend ha sido configurado utilizando las siguientes tecnologías de nivel de producción: 

* **Runtime:** Node.js (Versión LTS).
* **Framework Web:** Express.js con tipado estricto.
* **Lenguaje:** TypeScript configurado en modo modular (nodenext / esnext).
* **Persistencia Inicial:** Lectura asíncrona de archivos JSON del sistema mediante el módulo nativo node:fs/promises.
* **Herramientas de Testing:** Postman para la validación exhaustiva de la suite de endpoints.

### 📂 Estructura del Proyecto

El código fuente se organiza siguiendo una separación limpia de responsabilidades: 

```text

turnos-medicos/
├── dist/                          # Código TypeScript compilado a JavaScript
├── src/
│   ├── controller/                # Capa de Controladores (Lógica de Negocio)
│   │   ├── especialidades.controller.ts
│   │   ├── general.controller.ts
│   │   └── profesionales.controller.ts
│   ├── data/                      # Archivos de persistencia mock (JSON)
│   │   ├── especialidades.json
│   │   └── profesionales.json
│   ├── index.ts                   # Punto de entrada de la aplicación y ruteo
│   └── recursos.ts                # Interfaces, tipos y configuraciones globales
├── .env                           # Variables de entorno (PORT=3000)
├── .gitignore                     # Exclusión de entornos y dependencias
├── package.json                   # Manifiesto del proyecto y scripts
├── tsconfig.json                  # Configuración del compilador de TypeScript
└── README.md                      # Documentación del proyecto
```



### 🚀 Scripts de Automatización

Dentro del archivo package.json se configuraron los siguientes comandos para controlar el ciclo de vida de la aplicación: 

* npm run build: Compila el código fuente de TypeScript hacia la carpeta de distribución (dist/).
* npm run dev: Ejecuta el servidor de desarrollo en tiempo real utilizando el modo de escucha activa nativo node --watch.
* npm start: Inicia la aplicación en entorno de producción ejecutando el código compilado final.

### 🏛️ Decisiones Arquitectónicas y Control de Flujo

Durante la evolución del proyecto se aplicaron las siguientes pautas de diseño de software para robustecer el backend: 

1. **Desacoplamiento de Rutas (Clean Architecture):** La definición de los pathname HTTP en index.ts se delegó por completo a funciones controladoras independientes basadas en clases estáticas (EspecialidadesController, ProfesionalesController y GeneralController).
2. **Firmas Asincrónicas Homogéneas:** Todos los handlers exponen firmas explícitas async/await preparándose para una futura migración hacia un ORM o base de datos relacional.
3. **Validaciones Previas y Retornos Anticipados:** Cada petición entrante es sometida a validaciones estrictas de payload y parámetros (ej. verificación de IDs numéricos y cuerpos no vacíos). Si la validación falla, se interrumpe el flujo de forma inmediata mediante lanzamientos de errores (throw new Error) y retornos explícitos (return res.status().json()), previniendo errores de cabeceras duplicadas (*headers already sent*).
4. **Gestión Dinámica de Códigos de Estado:** Los controladores administran de manera dinámica las respuestas HTTP utilizando variables internas de estado (statusCode) evaluando caminos felices (200 OK, 201 Created, 204 No Content) y escenarios fallidos (400 Bad Request, 404 Not Found).
5. **Manejo Global de Rutas Inexistentes:** Un middleware final intercepta cualquier invocación a un endpoint o método no contemplado por la API RESTful, retornando un JSON con información explícita del error, el pathname y el método utilizado.

### 📖 Diccionario de la API (Endpoints)

### Especialidades

Colección de las ramas médicas de atención del centro de salud. Cada objeto cuenta con las propiedades especialidadId (number), nombreEspecialidad (string) y activa (boolean). 

* GET /especialidades: Recupera el listado exclusivo de las especialidades que se encuentran con estado activo en el sistema.
* GET /especialidades/:id: Busca y retorna una única especialidad según su identificador único.
* POST /especialidades: Crea y añade una nueva especialidad médica al array global, autogenerando su ID correlativo.
* DELETE /especialidades/:id: Aplica un borrado lógico (*soft delete*) conmutando la propiedad activa a false para preservar el histórico de transacciones.

### Profesionales Médicos

Personal de salud asignado a una especialidad existente en el sistema. Cada objeto contiene medicoId (number), nombre (string), especialidad (string) y activo (boolean). 

* GET /profesionales: Recupera la lista completa de profesionales de la salud registrados.
* GET /profesionales/:id: Busca y expone el perfil de un médico específico filtrando por su identificador único.
* POST /profesionales: Registra un nuevo profesional médico dentro del sistema.
* PUT /profesionales/:id: Modifica e impacta de forma integral todas las propiedades alterables de un médico existente.
* DELETE /profesionales/:id: Ejecuta la baja lógica del profesional médico alternando su propiedad activo a false.

### Endpoints Generales

* GET /: Endpoint de bienvenida para verificar el estado de conexión del servidor (*Hello World*).
* Middleware de Caída (Rutas no encontradas): Captura peticiones a URLs inválidas devolviendo un estado 404 Not Found.

### 🔒 Límites de Agenda (Reglas de Backend)

El sistema expone e implementa una interfaz estricta de parametrización para restringir la asignación de turnos futuros de acuerdo con el alcance de la institución: 

* **Fecha Máxima de Agenda:** Operaciones válidas limitadas hasta el 2026-12-30.
* **Hora Mínima de Atención:** 07:00 hs.
* **Hora Máxima de Atención:** 13:00 hs.

# Pasos para trabajar con este proyecto
1. Descargar el proyecto desde: ```https://github.com/brendafarias-t/turnos-medicos```

## Inicializar el proyecto

```bash
npm install
```
Mac - Linux
```bash
sudo npm install
```

## Ejecutar en DEV
```bash
npm run dev
```
## Transpilar el proyecto
```bash
npm run build
```

## Ejecutar en Producción
```bash
npm run prod
````


