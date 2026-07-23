import 'dotenv/config'
import { PrismaNeon } from '@prisma/adapter-neon'
import { JobStatus, Prisma, PrismaClient } from './generated/prisma/client'
import { currentUser } from '@clerk/nextjs/server'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}


interface GetUserJobsCursorParams {
  clerkUserId: string;
  cursor?: { createdAt: Date; id: string } | null; 
  pageSize?: number;
  filters?: {
    status?: JobStatus;
    createdFrom?: Date;
    createdTo?: Date;
    completedFrom?: Date;
    completedTo?: Date;
    hasInvoice?: boolean;
  };
}

export async function getUserJobsCursor({
  clerkUserId,
  cursor = null,
  pageSize = 10,
  filters = {},
}: GetUserJobsCursorParams) {
  const where: Prisma.JobWhereInput = {
    clerkUserId,
    ...(filters.status && { status: filters.status }),
    ...(filters.hasInvoice !== undefined && {
      invoiceUploadRef: filters.hasInvoice ? { not: null } : null,
    }),
    ...((filters.createdFrom || filters.createdTo) && {
      createdAt: {
        ...(filters.createdFrom && { gte: filters.createdFrom }),
        ...(filters.createdTo && { lte: filters.createdTo }),
      },
    }),

  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: pageSize + 1, // fetch one extra to know if there's a next page
    ...(cursor && {
      cursor: { id: cursor.id }, // Prisma finds this row, orderBy determines direction
      skip: 1, // skip the cursor row itself
    }),
  });

  const hasNextPage = jobs.length > pageSize;
  const data = hasNextPage ? jobs.slice(0, pageSize) : jobs;

  const nextCursor = hasNextPage
    ? { createdAt: data[data.length - 1].createdAt, id: data[data.length - 1].id }
    : null;

  return {
    data,
    hasNextPage,
    nextCursor, // pass this back in as `cursor` to get the next page
    pageSize,
  };
}