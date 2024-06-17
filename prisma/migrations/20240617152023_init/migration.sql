/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "username",
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "List" (
    "list_id" SERIAL NOT NULL,
    "list_name" TEXT NOT NULL,
    "list_desc" TEXT NOT NULL,
    "list_cat" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("list_id")
);

-- CreateTable
CREATE TABLE "ListItem" (
    "list_item_id" SERIAL NOT NULL,
    "list_item_date" TIMESTAMP(3) NOT NULL,
    "list_item_cat" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "list_id" INTEGER NOT NULL,

    CONSTRAINT "ListItem_pkey" PRIMARY KEY ("list_item_id")
);

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "List"("list_id") ON DELETE RESTRICT ON UPDATE CASCADE;
