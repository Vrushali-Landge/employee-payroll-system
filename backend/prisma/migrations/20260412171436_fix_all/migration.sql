/*
  Warnings:

  - You are about to drop the column `createdAt` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `designation` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `joiningDate` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the `payroll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doj` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payroll` DROP FOREIGN KEY `Payroll_employeeId_fkey`;

-- DropIndex
DROP INDEX `Employee_email_key` ON `employee`;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `createdAt`,
    DROP COLUMN `department`,
    DROP COLUMN `designation`,
    DROP COLUMN `email`,
    DROP COLUMN `joiningDate`,
    DROP COLUMN `phone`,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `dob` DATETIME(3) NOT NULL,
    ADD COLUMN `doj` DATETIME(3) NOT NULL,
    ADD COLUMN `mobile` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `payroll`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `EmployeeGrade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empId` INTEGER NOT NULL,
    `deptId` INTEGER NOT NULL,
    `gradeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Salary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empId` INTEGER NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `basic` INTEGER NOT NULL,
    `da` INTEGER NOT NULL,
    `ta` INTEGER NOT NULL,
    `hra` INTEGER NOT NULL,
    `ma` INTEGER NOT NULL,
    `bonus` INTEGER NOT NULL,
    `pf` INTEGER NOT NULL,
    `pt` INTEGER NOT NULL,
    `gross` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PayGrade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `basic` INTEGER NOT NULL,
    `da` INTEGER NOT NULL,
    `ta` INTEGER NOT NULL,
    `hra` INTEGER NOT NULL,
    `ma` INTEGER NOT NULL,
    `bonus` INTEGER NOT NULL,
    `pf` INTEGER NOT NULL,
    `pt` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmployeeGrade` ADD CONSTRAINT `EmployeeGrade_empId_fkey` FOREIGN KEY (`empId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeGrade` ADD CONSTRAINT `EmployeeGrade_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `PayGrade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeGrade` ADD CONSTRAINT `EmployeeGrade_deptId_fkey` FOREIGN KEY (`deptId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Salary` ADD CONSTRAINT `Salary_empId_fkey` FOREIGN KEY (`empId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
