import {configuracionAgenda} from "./recursos.ts"
import {arrayProfesionales, arrayEspecialidades} from "./recursos.ts"
import type { Especialidad, Profesional } from "./recursos.ts"
import  Express, {type Response, type Request} from "express"

const PORT = process.env.PORT || 3000
const app = Express ()

// MIDDLEWARE
app.use(Express.json())

// ENDPOINTS
// hello world

app.get("/", (req: Request, rest: Response)=> {
    rest.status(200)
    .json({ success: true, message: "Bienvenido al servidor web de MedTurnos."})
})

//  ESPECIALIDADES
// GET /especialidades - Obtener el listado completo
app.get('/especialidades', async (req: Request, res: Response) => {
  try {
    res.status(200)
       .json(arrayEspecialidades)
    // Lógica para obtener especialidades
  } catch (error) {
    res.status(400)
       .json({ success: false, message: "Erros al intentar enviar los datos de especialidades" });
  }
});

// GET /especialidades/:id - Buscar por especialidadId
app.get('/especialidades/:id', async (req: Request, res: Response) => {
  try {
    const especialidadId: number | undefined = Number(req.params.id)

    if (!especialidadId) {
        throw new Error('Error al obtener el código de la especialidad.')
    }

    const especialidadSolicitada = arrayEspecialidades.find((esp: any)=> esp.especialidadId === especialidadId)
   
    if (!especialidadSolicitada) {
        throw new Error('No se encontró la especialidad indicada.')
     } else {
        console.clear()
        console.table(especialidadSolicitada)
        res.status(200)
           .json(especialidadSolicitada)
     }
    // Lógica para buscar una especialidad
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la especialidad' });
  }
});

// POST /especialidades - Crear una nueva especialidad
app.post('/especialidades', async (req: Request, res: Response) => {
  try {
    const {nombreEspecialidad, activa} = req.body
    const nuevaEspecialidad: Especialidad = {
        especialidadId: arrayEspecialidades.length + 1,
        nombreEspecialidad: nombreEspecialidad,
        activa: Boolean(activa)
    }

    arrayEspecialidades.push(nuevaEspecialidad)
    console.clear()
    console.table(nuevaEspecialidad)
    res.status(201)
       .json(nuevaEspecialidad)
    // Lógica para crear una especialidad
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error al crear la especialidad' });
  }
});

// DELETE /especialidades/:id - Borrado lógico (activa = false)
app.delete('/especialidades/:id', async (req: Request, res: Response) => {
  try {
    const especialidadId: number = Number(req.params.id as string)
    const indice: number = arrayEspecialidades.findIndex((esp: any)=> esp.especialidadId === especialidadId)

    if (indice < -1) {
        arrayEspecialidades(indice).activa = false
        res.status(204)
           .json({})
    }
    // Lógica para el borrado lógico de la especialidad
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar la especialidad' });
  }
});

// ==========================================
// RUTAS DE PROFESIONALES MÉDICOS
// ==========================================

// GET /profesionales - Obtener el listado completo
app.get('/profesionales', async (req: Request, res: Response) => {
  try {
    const profesionalesFiltrados: [] = arrayProfesionales.filter((prof: any)=> prof.avtivo === true)
    
    res.status(200)
       .json(profesionalesFiltrados)
    // Lógica para obtener profesionales
  } catch (error) {
    res.status(400)
    .json({ status: false, errorMessage: "Verifica el código de especialidad enviado." });
  }
});

// GET /profesionales/:id - Buscar por medicoId
app.get('/profesionales/:id', async (req: Request, res: Response) => {
  try {
    const profesionalId = req.params.id
    const profesionalSeleccionado = arrayProfesionales.find((prof: any)=> prof.profesionalId === Number(profesionalId))
    if (profesionalSeleccionado) {
        res.status(200)
           .json(arrayProfesionales)
    }else{
        throw new Error('Error al buscar un profesional médico')
    }
    // Lógica para buscar un profesional
  } catch (error) {
    res.status(400)
    .json({ status: false, errorMessage: (error as Error).message || "Erros buscando un profesional." });
  }
});

// POST /profesionales - Registrar nuevo médico asignando especialidad
app.post('/profesionales', async (req: Request, res: Response) => {
  try {
    const {nombre, especialidad, activo} = req.body
    const nuevoProfesional: Profesional = {
        profesionalId: arrayProfesionales.length + 1,
        nombre: nombre,
        especialidad: especialidad,
        activo: Boolean(activo)
    }
    arrayProfesionales.push(nuevoProfesional)
    res.status(201)
       .json(nuevoProfesional)
    // Lógica para registrar un profesional
  } catch (error) {
    res.status(400)
    .json({ status: false, errorMessage: (error as Error).message || "Error creando un nuevo profesional"});
  }
});

// PUT /profesionales/:id - Modificar datos completos de un profesional
app.put('/profesionales/:id', async (req: Request, res: Response) => {
  try {
    const profesionalId = req.params.profesionalId
    const {nombre, especialidad, activo} = req.body
    const indice = arrayProfesionales.findIndex((prof: any)=> prof.profesionalId === Number(profesionalId))
    if (indice > -1) {
        arrayProfesionales[indice].nombre = nombre
        arrayProfesionales[indice].especialidad = especialidad
        arrayProfesionales[indice].activo= Boolean(activo)

        res.status(200)
           .json(arrayProfesionales[indice])
    } else {
        throw new Error('No se encontró el profesional indicado')
    }
    // Lógica para modificar un profesional
  } catch (error) {
    res.status(400)
       .json({status:false, errorMessage: (error as Error).message || "Error al modificar datos de un profesional." });

  }
});

// DELETE /profesionales/:id - Borrado lógico (activo = false)
app.delete('/profesionales/:id', async (req: Request, res: Response) => {
  try {
    const profesionalId = req.params.profesionalId
    const indice = arrayProfesionales.findIndex((prof: any)=> prof.profesionalId === Number(profesionalId))
     if (indice > -1) {
        arrayProfesionales[indice].activo = false
        res.status(204)
           .json({})
     }else {
        throw new Error('Error al intentar cambiar el estado activo de un profesional')
     }
    // Lógica para el borrado lógico del profesional
  } catch (error) {
    res.status(400)
    .json({ status: false, errorMessage: (error as Error).message || "Error al intentar realizar la operación" });

  }
});

app.use((req: Request, res: Response) => {
    try {
        res.status(404).json({
            error: 'Endpoint no encontrado',
            ruta: req.originalUrl,
            metodo: req.method
    });
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'});
    }
})