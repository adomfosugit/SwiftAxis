/*
  Warnings:

  - The values [STARTED] on the enum `JobStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `invoiceUploadRef` on the `Job` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JobStatus_new" AS ENUM ('FILE_SENT', 'PROCESSING', 'COMPLETE', 'FLAGGED');
ALTER TABLE "public"."Job" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "status" TYPE "JobStatus_new" USING ("status"::text::"JobStatus_new");
ALTER TYPE "JobStatus" RENAME TO "JobStatus_old";
ALTER TYPE "JobStatus_new" RENAME TO "JobStatus";
DROP TYPE "public"."JobStatus_old";
ALTER TABLE "Job" ALTER COLUMN "status" SET DEFAULT 'FILE_SENT';
COMMIT;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "invoiceUploadRef",
ALTER COLUMN "status" SET DEFAULT 'FILE_SENT';

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "adminUserId" TEXT NOT NULL,
    "adminEmail" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentImage" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_jobId_createdAt_idx" ON "Comment"("jobId", "createdAt");

-- CreateIndex
CREATE INDEX "Comment_adminUserId_idx" ON "Comment"("adminUserId");

-- CreateIndex
CREATE INDEX "CommentImage_commentId_idx" ON "CommentImage"("commentId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentImage" ADD CONSTRAINT "CommentImage_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
