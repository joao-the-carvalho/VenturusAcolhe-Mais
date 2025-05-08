/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Psicologos` table. All the data in the column will be lost.
  - Made the column `especialidades` on table `Psicologos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Psicologos` DROP COLUMN `createdAt`,
    MODIFY `especialidades` VARCHAR(191) NOT NULL;
