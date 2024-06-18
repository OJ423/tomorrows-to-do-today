/*
  Warnings:

  - You are about to drop the column `list_item_cat` on the `ListItem` table. All the data in the column will be lost.
  - Added the required column `list_item_desc` to the `ListItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListItem" DROP COLUMN "list_item_cat",
ADD COLUMN     "list_item_desc" TEXT NOT NULL;
