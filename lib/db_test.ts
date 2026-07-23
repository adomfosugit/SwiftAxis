import { prisma } from './db'

async function main() {

  // ============================
  // MOCK CLERK USER
  // ============================

  const clerkUserId = `user_3GiO1IfB4VFErb2rksHSWT6BCQf`
  const userEmail = 'adomfosu2000@gmail.com'
  console.log("Clerk User ID:", clerkUserId)


  // ============================
  // CREATE JOBS
  // ============================

  const job1 = await prisma.job.create({
    data: {
      clerkUserId,
      userEmail,


      status: 'STARTED',

      jobUploadRef:
        'cloudinary/job-upload-123',
    },
  })

  console.log('Created job:', job1)


  const job2 = await prisma.job.create({
    data: {
      clerkUserId,
      userEmail,

      status: 'PROCESSING',

      jobUploadRef:
        'uploadcare/job-upload-456',
    },
  })

  console.log('Created processing job:', job2)



  // ============================
  // READ ALL JOBS FOR USER
  // ============================

  const userJobs = await prisma.job.findMany({
    where: {
      clerkUserId,
    },
  })

  console.log(
    'All jobs for Clerk user:',
    userJobs
  )



  // ============================
  // UPDATE JOB TO COMPLETE
  // ============================

  const completedJob =
    await prisma.job.update({
      where: {
        id: job2.id,
      },

      data: {
        status: 'COMPLETE',

        invoiceUploadRef:
          'cloudinary/invoice-789',

        completedAt:
          new Date(),
      },
    })


  console.log(
    'Completed job:',
    completedJob
  )



  // ============================
  // QUERY USING INDEX
  // clerkUserId + status
  // ============================

  const completedJobs =
    await prisma.job.findMany({

      where: {
        clerkUserId,

        status: 'COMPLETE',
      },

    })


  console.log(
    'Completed jobs:',
    completedJobs
  )



  // ============================
  // JOB HISTORY
  // clerkUserId + createdAt
  // ============================

  const jobHistory =
    await prisma.job.findMany({

      where: {
        clerkUserId,
      },

      orderBy: {
        createdAt: 'desc',
      },

    })


  console.log(
    'Job history:',
    jobHistory
  )



  // ============================
  // CLEANUP TEST DATA
  // ============================

  // await prisma.job.deleteMany({
  //   where: {
  //     clerkUserId,
  //   },
  // })


  // console.log(
  //   'Deleted test jobs'
  // )
}


main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })