-- CreateTable
CREATE TABLE "Collections" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT,
    "FloorSale" JSONB,

    CONSTRAINT "Collections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collections_externalId_key" ON "Collections"("externalId");
