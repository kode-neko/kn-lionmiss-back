/*
  Warnings:

  - You are about to alter the column `price` on the `ArticleArea` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `tax` on the `ArticleArea` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `shoudler` on the `Measures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `chest` on the `Measures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `waist` on the `Measures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `hips` on the `Measures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `foot` on the `Measures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `height` on the `Measures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `weight` on the `Measures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `ArticleArea` MODIFY `price` DOUBLE NOT NULL,
    MODIFY `tax` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Measures` MODIFY `shoudler` DOUBLE NULL,
    MODIFY `chest` DOUBLE NULL,
    MODIFY `waist` DOUBLE NULL,
    MODIFY `hips` DOUBLE NULL,
    MODIFY `foot` DOUBLE NULL,
    MODIFY `height` DOUBLE NULL,
    MODIFY `weight` DOUBLE NULL;
