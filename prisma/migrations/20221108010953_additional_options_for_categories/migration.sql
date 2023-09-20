-- AlterTable
ALTER TABLE `Product` MODIFY `category` ENUM('Armor', 'Helmet', 'Miniature', 'Bust', 'Figure', 'Statue', 'Prop', 'Weapon', 'Misc') NOT NULL DEFAULT 'Misc';
