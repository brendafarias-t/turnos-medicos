import {configuracionAgenda} from "./recursos.ts"
import {arrayProfesionales, arrayEspecialidades} from "./recursos.ts"

console.clear()
console.log('CONFIGURACION')
console.table(configuracionAgenda)
console.log('PROFESIONALES')
console.table(arrayProfesionales)
console.log('ESPECIALIDADES')
console.table(arrayEspecialidades)
