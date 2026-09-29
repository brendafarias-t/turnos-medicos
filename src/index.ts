import {configuracionAgenda} from "./recursos.ts"
import { ProfesionalesController } from "./controller/profesionales.controller.ts"
import { GeneralController} from "./controller/general.controller.ts"
import { EspecilidadesController } from "./controller/especialidades.controller.ts"
// import type { Especialidad, Profesional } from "./recursos.ts"
import  Express, {type Response, type Request} from "express"


const PORT = process.env.PORT || 3000
const app = Express ()

// MIDDLEWARE
app.use(Express.json())

// ENDPOINTS
// hello world

app.get("/", GeneralController.helloWorld)

//  ESPECIALIDADES

app.get('/especialidades', EspecilidadesController.getAll);

app.get('/especialidades/:id', EspecilidadesController.findById);

app.post('/especialidades', EspecilidadesController.create);

app.delete('/especialidades/:id', EspecilidadesController.delete);


// Profesionales
app.get('/profesionales', ProfesionalesController.getAll);

app.get('/profesionales/:id', ProfesionalesController.findById);

app.post('/profesionales', ProfesionalesController.create);

app.put('/profesionales/:id', ProfesionalesController.modify);

app.delete('/profesionales/:id', ProfesionalesController.delete);

app.use( GeneralController.notFound)
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
