-- AlterTable: make telefono optional and add google_id
ALTER TABLE "Usuario" ALTER COLUMN "telefono" DROP NOT NULL;

-- AlterTable: add google_id column
ALTER TABLE "Usuario" ADD COLUMN "google_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_google_id_key" ON "Usuario"("google_id");
