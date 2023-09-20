-- AlterTable
ALTER TABLE `Product` MODIFY `category` ENUM('Armor', 'Helmet', 'Miniature', 'Bust', 'Figure', 'Statue', 'Prop', 'Weapon', 'Misc', 'Kit', 'Bundle') NOT NULL DEFAULT 'Misc';
