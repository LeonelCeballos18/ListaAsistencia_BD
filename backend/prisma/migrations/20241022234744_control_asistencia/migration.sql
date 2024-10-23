/*
  Warnings:

  - You are about to drop the column `fecha` on the `clase` table. All the data in the column will be lost.
  - The primary key for the `curso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_curso` on the `curso` table. All the data in the column will be lost.
  - You are about to alter the column `correo_ucol` on the `estudiante` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `correo_ucol` on the `profesor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - Added the required column `dia_semana` to the `Clase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_fin` to the `Clase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_inicio` to the `Clase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `asistencia` DROP FOREIGN KEY `Asistencia_id_clase_fkey`;

-- DropForeignKey
ALTER TABLE `asistencia` DROP FOREIGN KEY `Asistencia_id_estudiante_fkey`;

-- DropForeignKey
ALTER TABLE `clase` DROP FOREIGN KEY `Clase_id_curso_fkey`;

-- DropForeignKey
ALTER TABLE `clase` DROP FOREIGN KEY `Clase_id_profesor_fkey`;

-- DropForeignKey
ALTER TABLE `estudianteclase` DROP FOREIGN KEY `EstudianteClase_id_clase_fkey`;

-- DropForeignKey
ALTER TABLE `estudianteclase` DROP FOREIGN KEY `EstudianteClase_id_estudiante_fkey`;

-- AlterTable
ALTER TABLE `asistencia` ADD COLUMN `comentarios` VARCHAR(200) NULL,
    MODIFY `id_clase` INTEGER NULL,
    MODIFY `id_estudiante` INTEGER NULL;

-- AlterTable
ALTER TABLE `clase` DROP COLUMN `fecha`,
    ADD COLUMN `dia_semana` ENUM('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes') NOT NULL,
    ADD COLUMN `hora_fin` TIME NOT NULL,
    ADD COLUMN `hora_inicio` TIME NOT NULL,
    ADD COLUMN `id_semestre_grupo` INTEGER NULL,
    MODIFY `id_curso` INTEGER NULL,
    MODIFY `id_profesor` INTEGER NULL;

-- AlterTable
ALTER TABLE `curso` DROP PRIMARY KEY,
    DROP COLUMN `id_curso`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `estudiante` ADD COLUMN `id_semestre_grupo` INTEGER NULL,
    MODIFY `correo_ucol` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `estudianteclase` MODIFY `id_clase` INTEGER NULL,
    MODIFY `id_estudiante` INTEGER NULL;

-- AlterTable
ALTER TABLE `profesor` MODIFY `correo_ucol` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `contrasena` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `SemestreGrupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `semestre` INTEGER NOT NULL,
    `grupo` VARCHAR(1) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Estudiante` ADD CONSTRAINT `Estudiante_id_semestre_grupo_fkey` FOREIGN KEY (`id_semestre_grupo`) REFERENCES `SemestreGrupo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clase` ADD CONSTRAINT `Clase_id_curso_fkey` FOREIGN KEY (`id_curso`) REFERENCES `Curso`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clase` ADD CONSTRAINT `Clase_id_profesor_fkey` FOREIGN KEY (`id_profesor`) REFERENCES `Profesor`(`num_trabajador`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clase` ADD CONSTRAINT `Clase_id_semestre_grupo_fkey` FOREIGN KEY (`id_semestre_grupo`) REFERENCES `SemestreGrupo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstudianteClase` ADD CONSTRAINT `EstudianteClase_id_clase_fkey` FOREIGN KEY (`id_clase`) REFERENCES `Clase`(`id_clase`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstudianteClase` ADD CONSTRAINT `EstudianteClase_id_estudiante_fkey` FOREIGN KEY (`id_estudiante`) REFERENCES `Estudiante`(`num_cuenta`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_id_clase_fkey` FOREIGN KEY (`id_clase`) REFERENCES `Clase`(`id_clase`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_id_estudiante_fkey` FOREIGN KEY (`id_estudiante`) REFERENCES `Estudiante`(`num_cuenta`) ON DELETE SET NULL ON UPDATE CASCADE;
