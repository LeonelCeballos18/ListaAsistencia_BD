import { PrismaClient } from '@prisma/client';
//import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function generateNumeroCuenta() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return parseInt(`2018${randomNum}`);
}

const names = [
    "Leonel", "Tania", "Daniel", "Luis", "Jonhy", "Laura", "Luis", "Oscar", "Julio", "Diego"
];

const lastnames = [
    "Ceballos", "Ceballos", "Heredia", "Nava", "Mora", "Lara", "Perez", "Sanchez", "Verduzco", "Hernandez"
];


const nombresUsados = new Set();

function generateCorreo(nombre, apellido) {
  let baseCorreo = `${nombre[0].toLowerCase()}${apellido.toLowerCase()}@ucol.mx`;
  let correo = baseCorreo;
  let counter = 1;

  while (nombresUsados.has(correo)) {
    correo = `${baseCorreo.split('@')[0]}${counter}@ucol.mx`;
    counter++;
  }

  nombresUsados.add(correo);
  return correo;
}

async function main() {

  // Crear estudiantes
  const estudiantes = [];
for (let i = 0; i < 10; i++) {
  const num_cuenta = generateNumeroCuenta(); 
  const nombre = names[i]; 
  const apellido = lastnames[i]; 
  const correo_ucol = generateCorreo(nombre, apellido);

  const estudiante = await prisma.estudiante.create({
    data: {
      num_cuenta: num_cuenta, 
      nombre: nombre,
      apellido: apellido,
      correo_ucol: correo_ucol,
    },
  });
  estudiantes.push(estudiante);
}

  const profesor1 = await prisma.profesor.create({
    data: {
      num_trabajador: 2001,
      nombre: "Armando",
      apellido: "Gallardo",
      correo_ucol: "agallardo@ucol.mx",
    },
  });

  const profesor2 = await prisma.profesor.create({
    data: {
      num_trabajador: 2002,
      nombre: "Humberto",
      apellido: "Ramirez",
      correo_ucol: "raghum76@ucol.mx",
    },
  });

  // Crear cursos
  const curso1 = await prisma.curso.create({
    data: {
      nombre: "Base de datos avanzada",
    },
  });

  const curso2 = await prisma.curso.create({
    data: {
      nombre: "Estructura de datos",
    },
  });

  // Crear clases
  const clase1 = await prisma.clase.create({
    data: {
      dia_semana: "Lunes",
      hora_inicio: new Date("2024-10-23T08:00:00.000Z"),
      hora_fin: new Date("2024-10-23T10:00:00.000Z"),
      curso: {
        connect: { id: curso1.id },  // Asegúrate de que el ID de `curso1` es válido
      },
      profesor: {
        connect: { num_trabajador: profesor1.num_trabajador },
      },
    },
  });
  
  const clase2 = await prisma.clase.create({
    data: {
      dia_semana: "Martes",
      hora_inicio: new Date("2024-10-24T08:00:00.000Z"),
      hora_fin: new Date("2024-10-24T10:00:00.000Z"),
      curso: {
        connect: { id: curso2.id },  // Asegúrate de que el ID de `curso2` es válido
      },
      profesor: {
        connect: { num_trabajador: profesor2.num_trabajador },
      },
    },
  });
  

  // Asignar estudiantes a las clases
  for (const estudiante of estudiantes) {
    await prisma.estudianteClase.create({
      data: {
        clase: {
          connect: { id_clase: clase1.id_clase },
        },
        estudiante: {
          connect: { num_cuenta: estudiante.num_cuenta },
        },
      },
    });

    await prisma.estudianteClase.create({
      data: {
        clase: {
          connect: { id_clase: clase2.id_clase },
        },
        estudiante: {
          connect: { num_cuenta: estudiante.num_cuenta },
        },
      },
    });
  }
}

main()
  .then(() => {
    console.log('Datos sembrados correctamente');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
