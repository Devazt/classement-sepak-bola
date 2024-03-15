/*
  Warnings:

  - You are about to drop the column `TeamCity` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `TeamName` on the `Team` table. All the data in the column will be lost.
  - Added the required column `teamCity` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamName` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "TeamCity",
DROP COLUMN "TeamName",
ADD COLUMN     "teamCity" TEXT NOT NULL,
ADD COLUMN     "teamName" TEXT NOT NULL;
