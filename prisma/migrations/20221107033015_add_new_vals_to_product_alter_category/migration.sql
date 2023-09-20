/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `category` ENUM('Armor', 'Helmet', 'Miniature', 'Bust', 'Prop', 'Weapon', 'Misc') NOT NULL DEFAULT 'Misc',
    ADD COLUMN `durationInMonths` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `stlPrice` DOUBLE NULL;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `_CategoryToProduct`;

-- CreateTable
CREATE TABLE `Modifier` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ModifierToProduct` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ModifierToProduct_AB_unique`(`A`, `B`),
    INDEX `_ModifierToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
