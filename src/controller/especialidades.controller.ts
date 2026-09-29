import { arrayEspecialidades } from "../recursos.ts"
import type {Especialidad} from "../recursos.ts"
import { type Response, type Request } from "express"

export class EspecilidadesController {
     //getAll - findById, create, modify, delete
static getAll = async (req: Request, res: Response) => {
       try {         
         const especialidadesActivas = arrayEspecialidades.filter((esp: any) => esp.activa === true)
         
         if (!especialidadesActivas || especialidadesActivas.length === 0) {
             throw new Error('No hay especialidades activas en este momento.')
         }
         
         return res.status(200)
                   .json(especialidadesActivas)
     
       } catch (error: any) {
         return res.status(400)
                   .json({ success: false, message: error.message })
       }
     }

static findById = async (req: Request, res: Response) => {
  try {
    const especialidadId: number | undefined = Number(req.params.id)

    if (!especialidadId) {
        throw new Error('Verifica el código o ID de la especialidad que buscas.')
    }

    const especialidadSolicitada = arrayEspecialidades.find((esp: any)=> esp.especialidadId === especialidadId)
   
    if (!especialidadSolicitada) {
        throw new Error('No se encontró la especialidad con el código o ID indicado.')
    }
        return res.status(200)
           .json(especialidadSolicitada)
         
  } catch (error: any) {
    return res.status(400)
              .json({success: false, message: error.message });
  }
}

static create = async (req: Request, res: Response) => {
  try {
    const {nombreEspecialidad, activa} = req.body

        if (!nombreEspecialidad || !activa) {
        throw new Error('Verifica los datos enviados para la nueva especialidad.')
    } 

    const nuevaEspecialidad: Especialidad = {
        especialidadId: arrayEspecialidades.length + 1,
        nombreEspecialidad: nombreEspecialidad,
        activa: Boolean(activa)
    }
    arrayEspecialidades.push(nuevaEspecialidad)
    
    return res.status(201)
       .json(nuevaEspecialidad)
   
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

static delete = async (req: Request, res: Response) => {
  try {
    const especialidadId: number = Number(req.params.id as string)

        if (!especialidadId) {
        throw new Error('Verifica el código de la especialidad.')
    }

    const indice: number = arrayEspecialidades.findIndex((esp: any)=> esp.especialidadId === especialidadId)
    
    if (!especialidadId) {
        throw new Error('No se encontró especialidad con el código indicado.')
    }

    arrayEspecialidades[indice].activa=false

    return res.status(200).json(arrayEspecialidades[indice])
    // Lógica para el borrado lógico de la especialidad
  } catch (error:any) {
    return res.status(400).json({success: false, message:error.message});
  }
}

}