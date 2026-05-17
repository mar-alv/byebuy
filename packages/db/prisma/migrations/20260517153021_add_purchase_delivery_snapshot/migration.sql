-- AlterTable
ALTER TABLE "PurchaseItem" ADD COLUMN "city" TEXT;
ALTER TABLE "PurchaseItem" ADD COLUMN "complement" TEXT;
ALTER TABLE "PurchaseItem" ADD COLUMN "country" TEXT;
ALTER TABLE "PurchaseItem" ADD COLUMN "deliveryMethod" TEXT;
ALTER TABLE "PurchaseItem" ADD COLUMN "neighborhood" TEXT;
ALTER TABLE "PurchaseItem" ADD COLUMN "number" TEXT;
ALTER TABLE "PurchaseItem" ADD COLUMN "state" TEXT;
ALTER TABLE "PurchaseItem" ADD COLUMN "street" TEXT;
ALTER TABLE "PurchaseItem" ADD COLUMN "zipCode" TEXT;

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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shippingPrice" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Purchase" ("buyerClerkId", "createdAt", "id", "installments", "paymentMethod", "status", "totalPrice") SELECT "buyerClerkId", "createdAt", "id", "installments", "paymentMethod", "status", "totalPrice" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
CREATE INDEX "Purchase_buyerClerkId_idx" ON "Purchase"("buyerClerkId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
