/*
  Warnings:

  - You are about to drop the column `pictureArticleId` on the `Picture` table. All the data in the column will be lost.
  - You are about to drop the column `pictureCommentId` on the `Picture` table. All the data in the column will be lost.
  - You are about to drop the `PictureArticle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PictureComment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `articleId` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentId` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Picture` DROP FOREIGN KEY `Picture_pictureArticleId_fkey`;

-- DropForeignKey
ALTER TABLE `Picture` DROP FOREIGN KEY `Picture_pictureCommentId_fkey`;

-- DropForeignKey
ALTER TABLE `PictureArticle` DROP FOREIGN KEY `PictureArticle_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `PictureComment` DROP FOREIGN KEY `PictureComment_commentId_fkey`;

-- AlterTable
ALTER TABLE `Picture` DROP COLUMN `pictureArticleId`,
    DROP COLUMN `pictureCommentId`,
    ADD COLUMN `articleId` INTEGER NOT NULL,
    ADD COLUMN `commentId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `PictureArticle`;

-- DropTable
DROP TABLE `PictureComment`;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
