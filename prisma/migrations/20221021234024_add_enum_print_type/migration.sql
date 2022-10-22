/*
  Warnings:

  - You are about to alter the column `type` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Material_type")`.

*/
-- AlterTable
ALTER TABLE `Material` MODIFY `type` ENUM('FDM', 'SLA') NOT NULL;
