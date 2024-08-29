/*
  Warnings:

  - Made the column `customer_code` on table `measures` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "measures" DROP CONSTRAINT "measures_customer_code_fkey";

-- AlterTable
ALTER TABLE "measures" ALTER COLUMN "customer_code" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "measures" ADD CONSTRAINT "measures_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customer"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
