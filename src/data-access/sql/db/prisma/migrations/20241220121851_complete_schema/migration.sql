/*
  Warnings:

  - The primary key for the `InstructsArticle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `instruct` on the `InstructsArticle` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `InstructsArticle` DROP PRIMARY KEY,
    MODIFY `instruct` ENUM('whashing', 'ironning', 'spinning', 'dryCleanning') NOT NULL,
    ADD PRIMARY KEY (`instruct`, `articleId`);

-- CreateTable
CREATE TABLE `Measures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shoudler` DECIMAL(65, 30) NULL,
    `chest` DECIMAL(65, 30) NULL,
    `waist` DECIMAL(65, 30) NULL,
    `hips` DECIMAL(65, 30) NULL,
    `foot` DECIMAL(65, 30) NULL,
    `height` DECIMAL(65, 30) NULL,
    `weight` DECIMAL(65, 30) NULL,
    `unitHeight` ENUM('cm', 'inch') NOT NULL,
    `unitWeight` ENUM('kg', 'lb') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alias` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `obs` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `pass` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `bday` VARCHAR(191) NOT NULL,
    `sex` ENUM('female', 'male') NOT NULL,
    `measureId` INTEGER NOT NULL,

    UNIQUE INDEX `User_measureId_key`(`measureId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFavs` (
    `userId` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `articleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartLine` (
    `cartId` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,

    UNIQUE INDEX `CartLine_cartId_articleId_key`(`cartId`, `articleId`),
    PRIMARY KEY (`cartId`, `order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shipping` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idTracking` VARCHAR(191) NULL,
    `idPayment` VARCHAR(191) NULL,
    `payment` ENUM('transfer', 'card', 'crypto', 'paypal') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShippingState` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` ENUM('orderRecieved', 'prodessing', 'shipped', 'delivering', 'returned', 'exception') NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `shippingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShippingLine` (
    `shippingId` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,

    UNIQUE INDEX `ShippingLine_shippingId_articleId_key`(`shippingId`, `articleId`),
    PRIMARY KEY (`shippingId`, `order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_measureId_fkey` FOREIGN KEY (`measureId`) REFERENCES `Measures`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavs` ADD CONSTRAINT `UserFavs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavs` ADD CONSTRAINT `UserFavs_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartLine` ADD CONSTRAINT `CartLine_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartLine` ADD CONSTRAINT `CartLine_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShippingState` ADD CONSTRAINT `ShippingState_shippingId_fkey` FOREIGN KEY (`shippingId`) REFERENCES `Shipping`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShippingLine` ADD CONSTRAINT `ShippingLine_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShippingLine` ADD CONSTRAINT `ShippingLine_shippingId_fkey` FOREIGN KEY (`shippingId`) REFERENCES `Shipping`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
