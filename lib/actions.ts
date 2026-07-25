// lib/actions/create-job.ts — this IS the "use server" file, and it only exports async functions
'use server'

import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { JobStatus } from '@/lib/generated/prisma/enums'
import { isAdminUser } from './isAdmin'

export async function createJob(jobUploadRef: string) {
  const user = await currentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const clerkUserId = user.id
  const userEmail = user.primaryEmailAddress?.emailAddress ?? ''

  const job = await prisma.job.create({
    data: {
      clerkUserId,
      userEmail,
      status: JobStatus.STARTED,
      jobUploadRef,
    },
  })

  return job
}

export async function updateJobStatus(jobId: string, status: JobStatus) {
  const user = await currentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const isAdmin = await isAdminUser()
  if (!isAdmin) {
    throw new Error("Forbidden")
  }

  await prisma.job.update({
    where: { id: jobId },
    data: {
      status,
      completedAt: status === "COMPLETE" ? new Date() : null,
    },
  })

  revalidatePath("/admin")
}




// check if user isAdmin 


