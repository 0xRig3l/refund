/*
  Warnings:

  - You are about to drop the column `name` on the `refunds` table. All the data in the column will be lost.
  - Added the required column `description` to the `refunds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "refunds" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL;
