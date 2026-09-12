/*
  Warnings:

  - You are about to drop the column `description` on the `refunds` table. All the data in the column will be lost.
  - Added the required column `name` to the `refunds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "refunds" DROP COLUMN "description",
ADD COLUMN     "name" TEXT NOT NULL;
