-- CreateTable
CREATE TABLE `Psicologos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `especialidades` VARCHAR(191) NULL,
    `crp` VARCHAR(191) NOT NULL,
    `termsAccepted` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Psicologos_email_key`(`email`),
    UNIQUE INDEX `Psicologos_crp_key`(`crp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
