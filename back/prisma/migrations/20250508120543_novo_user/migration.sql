/*
  Warnings:

  - You are about to drop the column `cargo` on the `User` table. All the data in the column will be lost.
  - Added the required column `telefone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Psicologos_crp_key` ON `Psicologos`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `cargo`,
    ADD COLUMN `telefone` VARCHAR(191) NOT NULL;
