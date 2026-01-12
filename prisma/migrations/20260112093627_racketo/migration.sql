-- CreateTable
CREATE TABLE "Racket" (
    "id" SERIAL NOT NULL,
    "brand" VARCHAR(300) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Racket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Racket_slug_key" ON "Racket"("slug");
