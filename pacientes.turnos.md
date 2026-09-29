# Documentación del Sistema: Gestión de Turnos Médicos

Este documento detalla la estructura de datos y los endpoints de la API para la gestión de pacientes y turnos médicos.

---

## 1. Estructuras de Datos

A continuación se detalla la información y el propósito de cada una de las entidades del sistema.

### Pacientes
Representa a los usuarios del sistema de salud que solicitan o reciben atención médica.
*   **Información almacenada:** Datos de identificación personal (ID único o código de paciente, documento de identidad), información de contacto (nombre completo, teléfono, correo electrónico), fecha de nacimiento y un indicador de estado activo/inactivo (utilizado para el borrado lógico).

### Turnos
Representa la reserva de una cita médica entre un paciente y un profesional de la salud en un momento específico.
*   **Información almacenada:** Identificador único (código de turno), código del paciente asociado, fecha y hora de la cita, especialidad médica o profesional asignado, y el código o identificador del estado actual del turno.

### Estados
Define la situación o etapa en la que se encuentra un turno dentro de su ciclo de vida.
*   **Información almacenada:** Código identificador del estado y el nombre/descripción del mismo (por ejemplo: `PENDIENTE`, `CONFIRMADO`, `CANCELADO`, `ATENDIDO`, `AUSENTE`). Funciona como una tabla de referencia paramétrica para garantizar la consistencia en los turnos.

---

## 2. Endpoints de Pacientes

### `GET /pacientes`
*   **Descripción:** Recupera el listado completo de todos los pacientes registrados en el sistema.
*   **Comportamiento:** Por defecto, esta consulta filtra los resultados para retornar únicamente aquellos registros que se encuentren activos (excluyendo los que sufrieron un *soft delete*).

### `GET /pacientes/{codigo_paciente}`
*   **Descripción:** Obtiene la información detallada de un paciente específico utilizando su código único.
*   **Comportamiento:** Devuelve los datos completos del perfil si el paciente existe y está activo. Si el código no corresponde a un usuario activo, devuelve un error 404 (No encontrado).

### `POST /pacientes`
*   **Descripción:** Registra un nuevo paciente en la base de datos.
*   **Comportamiento:** Recibe los datos personales en el cuerpo de la petición (JSON), valida que los campos obligatorios estén presentes (ej. documento, correo) y crea el registro con el estado activo por defecto.

### `PUT /pacientes`
*   **Descripción:** Actualiza la información de un paciente ya existente.
*   **Comportamiento:** Se envían los datos modificados en el cuerpo de la petición. El sistema localiza al paciente mediante su identificador único y actualiza los campos permitidos (como teléfono o dirección), manteniendo intacto el historial médico.

### `DELETE /pacientes` *(Soft Delete)*
*   **Descripción:** Realiza la baja lógica de un paciente del sistema.
*   **Comportamiento:** En lugar de eliminar físicamente el registro de la base de datos, este método cambia el indicador de estado del paciente a "inactivo". De esta forma, el paciente deja de aparecer en las búsquedas cotidianas (`GET`), pero se preserva su integridad referencial en el historial de turnos pasados.

---

## 3. Endpoints de Turnos

### `GET /turnos`
*   **Descripción:** Retorna la lista de todos los turnos programados en el sistema.
*   **Comportamiento:** Permite visualizar la agenda global. Habitualmente soporta filtros por fecha, profesional o estado del turno.

### `GET /turnos/{codigo_turnos}`
*   **Descripción:** Recupera el detalle completo de un turno específico mediante su código identificador.
*   **Comportamiento:** Devuelve la información del turno, incluyendo los datos vinculados del paciente y la descripción de su estado actual.

### `POST /turnos`
*   **Descripción:** Reserva o crea un nuevo turno médico.
*   **Comportamiento:** Valida la disponibilidad horaria del profesional y la existencia del paciente. Todo turno nuevo se crea inicialmente asignándole de forma automática el **Estado: PENDIENTE** (o *A Confirmar* según las reglas de negocio).

### `PUT /turnos`
*   **Descripción:** Modifica un turno existente o gestiona su ciclo de vida a través del cambio de estados.
*   **Comportamiento y Correlación con Estados:** Este método recibe en el cuerpo de la petición el código del turno y las modificaciones. Tiene una correlación directa con la estructura de **Estados**, ya que procesa las transiciones del turno según la siguiente lógica de negocio:
    *   **Confirmación:** Transiciona el estado de `PENDIENTE` a `CONFIRMADO`.
    *   **Cancelación:** Si el paciente o la clínica cancelan la cita, el estado se actualiza a `CANCELADO`, liberando inmediatamente ese espacio de la agenda.
    *   **Cierre de Atención:** Una vez concluida la cita por el profesional, el estado se actualiza a `ATENDIDO`.
    *   **Inasistencia:** Si el paciente no se presenta, se registra la correlación con el estado `AUSENTE`.
