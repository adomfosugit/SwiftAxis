// lib/actions/create-job.ts — this IS the "use server" file, and it only exports async functions
'use server'

import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { JobStatus } from '@/lib/generated/prisma/enums'
import { isAdminUser } from './isAdmin'

// export async function createJob(jobUploadRef: string) {
//   const user = await currentUser()

//   if (!user) {
//     throw new Error('Unauthorized')
//   }

//   const clerkUserId = user.id
//   const userEmail = user.primaryEmailAddress?.emailAddress ?? ''

//   const job = await prisma.job.create({
//     data: {
//       clerkUserId,
//       userEmail,
//       status: JobStatus.FILE_SENT,
//       jobUploadRef,
//     },
//   })

//   return job
// }

// export async function updateJobStatus(jobId: string, status: JobStatus) {
//   const user = await currentUser()

//   if (!user) {
//     throw new Error("Unauthorized")
//   }

//   const isAdmin = await isAdminUser()
//   if (!isAdmin) {
//     throw new Error("Forbidden")
//   }

//   await prisma.job.update({
//     where: { id: jobId },
//     data: {
//       status,
//       completedAt: status === "COMPLETE" ? new Date() : null,
//     },
//   })

//   revalidatePath("/admin")
// }

// // admin adding comment to jobs
// type CreateCommentInput = {
//   jobId: string
//   comment: string
//   imageUrls: string[]
// }

// type CreateCommentResult =
//   | { success: true; commentId: string }
//   | { success: false; message: string }

// export async function createComment({
//   jobId,
//   comment,
//   imageUrls,
// }: CreateCommentInput): Promise<CreateCommentResult> {
//   const userId  = await currentUser()

//   if (!userId) {
//     return { success: false, message: 'Not authenticated.' }
//   }

//  const isAdmin = await isAdminUser()
//   if (!isAdmin) {
//     throw new Error("Forbidden")
//   }

//   if (!isAdmin) {
//     return { success: false, message: 'Not authorized.' }
//   }

//   const trimmedComment = comment.trim()

//   if (!trimmedComment) {
//     return { success: false, message: 'Comment cannot be empty.' }
//   }

//   const job = await prisma.job.findUnique({
//     where: { id: jobId },
//     select: { id: true },
//   })

//   if (!job) {
//     return { success: false, message: 'Job not found.' }
//   }

//   try {
//     const created = await prisma.comment.create({
//       data: {
//         jobId,
//         adminUserId: userId.id,
//         adminEmail: userId?.primaryEmailAddress?.emailAddress ?? '',
//         comment: trimmedComment,
//         images: {
//           create: imageUrls.map((imageUrl) => ({ imageUrl })),
//         },
//       },
//       select: { id: true },
//     })


//     revalidatePath(`/admin`)

//     return { success: true, commentId: created.id }
//   } catch (err) {
//     console.error('createComment failed', err)
//     return { success: false, message: 'Failed to save comment.'}
//   }
// }





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
      status: JobStatus.FILE_SENT,
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

// user re-uploading a corrected file on their own flagged job
type ReuploadFileResult =
  | { success: true }
  | { success: false; message: string }

export async function reuploadJobFile(
  jobId: string,
  newFileUrl: string
): Promise<ReuploadFileResult> {
  const user = await currentUser()

  if (!user) {
    return { success: false, message: 'Not authenticated.' }
  }

  if (!newFileUrl) {
    return { success: false, message: 'No file provided.' }
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { id: true, clerkUserId: true, status: true },
  })

  if (!job) {
    return { success: false, message: 'Job not found.' }
  }

  // Only the job's owner can re-upload — this is a user action, not an admin one
  if (job.clerkUserId !== user.id) {
    return { success: false, message: "You don't have access to this job." }
  }

  // Only makes sense while the admin is actually waiting on a corrected file
  if (job.status !== JobStatus.FLAGGED) {
    return { success: false, message: "This job isn't awaiting a re-upload." }
  }

  try {
    await prisma.job.update({
      where: { id: jobId },
      data: {
        jobUploadRef: newFileUrl,
        status: JobStatus.FILE_SENT,
        completedAt: null,
      },
    })

    // Adjust to wherever the user views their own job (not /admin, they can't see that)
    revalidatePath(`/${jobId}`)
    revalidatePath('/admin')

    return { success: true }
  } catch (err) {
    console.error('reuploadJobFile failed', err)
    return { success: false, message: 'Failed to save the re-uploaded file.' }
  }
}

// admin adding comment to jobs
type CreateCommentInput = {
  jobId: string
  comment: string
  imageUrls: string[]
}

type CreateCommentResult =
  | { success: true; commentId: string }
  | { success: false; message: string }

export async function createComment({
  jobId,
  comment,
  imageUrls,
}: CreateCommentInput): Promise<CreateCommentResult> {
  const user = await currentUser()

  if (!user) {
    return { success: false, message: 'Not authenticated.' }
  }

  const isAdmin = await isAdminUser()
  if (!isAdmin) {
    return { success: false, message: 'Not authorized.' }
  }

  const trimmedComment = comment.trim()

  if (!trimmedComment) {
    return { success: false, message: 'Comment cannot be empty.' }
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { id: true },
  })

  if (!job) {
    return { success: false, message: 'Job not found.' }
  }

  try {
    const created = await prisma.comment.create({
      data: {
        jobId,
        adminUserId: user.id,
        adminEmail: user?.primaryEmailAddress?.emailAddress ?? '',
        comment: trimmedComment,
        images: {
          create: imageUrls.map((imageUrl) => ({ imageUrl })),
        },
      },
      select: { id: true },
    })

    revalidatePath(`/admin`)

    return { success: true, commentId: created.id }
  } catch (err) {
    console.error('createComment failed', err)
    return { success: false, message: 'Failed to save comment.' }
  }
}