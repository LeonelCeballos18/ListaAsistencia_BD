-- CreateTable
CREATE TABLE `Estudiante` (
    `num_cuenta` INTEGER NOT NULL,
    `nombre` VARCHAR(80) NOT NULL,
    `apellido` VARCHAR(80) NOT NULL,
    `correo_ucol` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Estudiante_correo_ucol_key`(`correo_ucol`),
    PRIMARY KEY (`num_cuenta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profesor` (
    `num_trabajador` INTEGER NOT NULL,
    `nombre` VARCHAR(80) NOT NULL,
    `apellido` VARCHAR(80) NOT NULL,
    `correo_ucol` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Profesor_correo_ucol_key`(`correo_ucol`),
    PRIMARY KEY (`num_trabajador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id_curso` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_curso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clase` (
    `id_clase` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `id_curso` INTEGER NOT NULL,
    `id_profesor` INTEGER NOT NULL,

    PRIMARY KEY (`id_clase`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asistencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_clase` INTEGER NOT NULL,
    `id_estudiante` INTEGER NOT NULL,
    `estado` ENUM('Presente', 'Ausente', 'Retardo', 'Justificado') NOT NULL,
    `marca_tiempo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_usuario` VARCHAR(50) NOT NULL,
    `contrasena` VARCHAR(12) NOT NULL,
    `rol` ENUM('profesor', 'admin') NOT NULL,

    UNIQUE INDEX `Usuario_nombre_usuario_key`(`nombre_usuario`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EstudianteClase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_clase` INTEGER NOT NULL,
    `id_estudiante` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Clase` ADD CONSTRAINT `Clase_id_curso_fkey` FOREIGN KEY (`id_curso`) REFERENCES `Curso`(`id_curso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clase` ADD CONSTRAINT `Clase_id_profesor_fkey` FOREIGN KEY (`id_profesor`) REFERENCES `Profesor`(`num_trabajador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_id_clase_fkey` FOREIGN KEY (`id_clase`) REFERENCES `Clase`(`id_clase`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_id_estudiante_fkey` FOREIGN KEY (`id_estudiante`) REFERENCES `Estudiante`(`num_cuenta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstudianteClase` ADD CONSTRAINT `EstudianteClase_id_clase_fkey` FOREIGN KEY (`id_clase`) REFERENCES `Clase`(`id_clase`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstudianteClase` ADD CONSTRAINT `EstudianteClase_id_estudiante_fkey` FOREIGN KEY (`id_estudiante`) REFERENCES `Estudiante`(`num_cuenta`) ON DELETE RESTRICT ON UPDATE CASCADE;
