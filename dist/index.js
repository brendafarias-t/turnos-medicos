import { configuracionAgenda } from "./recursos.js";
import { arrayProfesionales, arrayEspecialidades } from "./recursos.js";
console.clear();
console.log('CONFIGURACION');
console.table(configuracionAgenda);
console.log('PROFESIONALES');
console.table(arrayProfesionales);
console.log('ESPECIALIDADES');
console.table(arrayEspecialidades);
