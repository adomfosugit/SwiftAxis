-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('STARTED', 'PROCESSING', 'COMPLETE');

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'STARTED',
    "jobUploadRef" TEXT NOT NULL,
    "invoiceUploadRef" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Job_clerkUserId_status_idx" ON "Job"("clerkUserId", "status");

-- CreateIndex
CREATE INDEX "Job_clerkUserId_createdAt_idx" ON "Job"("clerkUserId", "createdAt");
