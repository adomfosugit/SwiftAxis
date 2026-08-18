import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import JobDetailClient from '@/components/Dashboard/JobDetailClient'

type Props = {
  params: Promise<{ jobId: string }>
}

export default async function JobDetailPage({ params }: Props) {
  const { jobId } = await params

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      comments: {
        orderBy: { createdAt: 'asc' },
        include: {
          images: true,
        },
      },
    },
  })

  if (!job) {
    notFound()
  }

  return <JobDetailClient job={job} />
}