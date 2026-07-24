// lib/actions/create-job.ts — this IS the "use server" file, and it only exports async functions
'use server'

import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'



export const JobStatus = {
  STARTED: 'STARTED',
  PROCESSING: 'PROCESSING',
  COMPLETE: 'COMPLETE'
}
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
      //@ts-ignore
      status: JobStatus.STARTED,
      jobUploadRef,
    },
  })

  return job
}