'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { FileUploaderRegular } from '@uploadcare/react-uploader'
import '@uploadcare/react-uploader/core.css'
import { Loader2, Send, Clock } from 'lucide-react'

import { Job, Comment, CommentImage } from '@/lib/generated/prisma/client'
import { JobStatus } from '@/lib/generated/prisma/enums'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import { createComment,  updateJobStatus } from '@/lib/actions'
import CommentModal from './CommentModal'


type JobWithComments = Job & {
  comments: (Comment & { images: CommentImage[] })[]
}

type Props = {
  job: JobWithComments
}

const statusStyles: Record<JobStatus, string> = {
  [JobStatus.FILE_SENT]: 'bg-slate-500 text-white hover:bg-slate-600 capitalize',
  [JobStatus.PROCESSING]: 'bg-amber-600 text-white hover:bg-amber-700 capitalize',
  [JobStatus.COMPLETE]: 'bg-green-700 text-white hover:bg-green-800 capitalize',
  [JobStatus.FLAGGED]: 'bg-red-700 text-white hover:bg-red-800 capitalize',
    [JobStatus.FILE_REUPLOADED]:
    " bg-blue-600 text-white capitalize animate-pulse p-3",
}

const statusLabel = (status: JobStatus) => status.toLowerCase().replace('_', ' ')

export default function JobDetailClient({ job }: Props) {
  const router = useRouter()

  const [status, setStatus] = useState<JobStatus>(job.status)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [statusError, setStatusError] = useState<string | null>(null)

  const [comment, setComment] = useState('')
  const [images, setImages] = useState<{ cdnUrl: string; name: string }[]>([])
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [commentError, setCommentError] = useState<string | null>(null)

  const handleStatusChange = async (next: string) => {
    const nextStatus = next as JobStatus
    const previous = status
    setStatus(nextStatus) // optimistic
    setIsUpdatingStatus(true)
    setStatusError(null)

    try {
      // updateJobStatus currently throws on auth/forbidden rather than
      // returning a result — adjust here if you change it to return
      // { success, message } like the other actions
      await updateJobStatus(job.id, nextStatus)
      router.refresh()
    } catch (err) {
      setStatus(previous) // revert
      setStatusError(err instanceof Error ? err.message : 'Failed to update status.')
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  const handleSendComment = async () => {
    if (!comment.trim()) {
      setCommentError('Add a message before sending.')
      return
    }

    setIsSubmittingComment(true)
    setCommentError(null)

    const result = await createComment({
      jobId: job.id,
      comment: comment.trim(),
      imageUrls: images.map((img) => img.cdnUrl),
    })

    if (!result.success) {
      setCommentError(result.message)
    } else {
      setComment('')
      setImages([])
      router.refresh()
    }
    setIsSubmittingComment(false)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <Link href="/admin" className="text-sm text-muted-foreground hover:underline">
          &larr; Back to jobs
        </Link>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold">Job {job.id}</h1>
            <p className="text-sm text-muted-foreground">{job.userEmail}</p>
          </div>
          <Badge className={statusStyles[status]}>{statusLabel(status)}</Badge>
        </div>
      </div>

      {/* Status + file (read-only — re-upload is a user action, not admin's) */}
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="status">Status</FieldLabel>
          {/* @ts-ignore */}
          <Select value={status} onValueChange={handleStatusChange} disabled={isUpdatingStatus}>
            <SelectTrigger id="status" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(JobStatus).map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {statusLabel(s)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isUpdatingStatus && (
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Saving...
            </p>
          )}
          {statusError && <p className="mt-1 text-xs text-destructive">{statusError}</p>}
        </Field>

        <Field>
          <FieldLabel>Job file</FieldLabel>
          <Link
            href={job.jobUploadRef}
            target="_blank"
            className="text-sm text-blue-600 hover:underline"
            title={job.jobUploadRef}
          >
            View current file
          </Link>
          {status === JobStatus.FLAGGED && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Waiting on the user to re-upload a corrected file
            </p>
          )}
        </Field>
      </div>

      {/* Comment thread */}
      <div className="flex flex-col gap-4 rounded-lg border p-4 h-[300px] overflow-y-scroll">
        <h2 className="text-sm font-medium">Comments</h2>

        <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
          {job.comments.length === 0 && (
            <p className="text-sm text-muted-foreground">No comments yet.</p>
          )}
          {job.comments.map((item) => (
            <div key={item.id} className="rounded-md border bg-muted/30 p-3 text-sm">
              <div className="mb-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{item.adminEmail}</span>
                <span>{format(new Date(item.createdAt), 'MMM d, yyyy h:mm a')}</span>
              </div>
              <p className="whitespace-pre-wrap">{item.comment}</p>
              {item.images.length > 0 && (
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {item.images.map((img) => (
                    <a
                      key={img.id}
                      href={img.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block aspect-square overflow-hidden rounded border"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.imageUrl}
                        alt="Attached screenshot"
                        className="h-full w-full object-cover"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t pt-3">
         
         <CommentModal jobId={job.id} />
        </div>
      </div>
    </div>
  )
}