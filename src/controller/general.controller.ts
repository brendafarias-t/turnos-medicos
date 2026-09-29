
import { type Response, type Request } from "express"

export class GeneralController {

    static helloWorld = async (req: Request, rest: Response)=> {
        rest.status(200)
        .json({ success: true, message: "Bienvenido al servidor web de MedTurnos."})
    }

    static notFound = async(req: Request, res: Response) => {
        try {
            return res.status(404).json({
                error: 'Endpoint no encontrado',
                ruta: req.originalUrl,
                metodo: req.method
        });
        } catch (error) {
            return res.status(500).json({error: 'Error interno del servidor'});
        }
    }
}