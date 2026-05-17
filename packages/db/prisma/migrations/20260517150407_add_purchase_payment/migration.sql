/*
  Warnings:

  - Added the required column `paymentMethod` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buyerClerkId" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentMethod" TEXT NOT NULL,
    "installments" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Purchase" ("buyerClerkId", "createdAt", "id", "status", "totalPrice") SELECT "buyerClerkId", "createdAt", "id", "status", "totalPrice" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
CREATE INDEX "Purchase_buyerClerkId_idx" ON "Purchase"("buyerClerkId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
