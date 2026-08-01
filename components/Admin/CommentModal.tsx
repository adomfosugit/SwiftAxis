'use client'

import React, { useState } from 'react'
import { FileUploaderRegular } from '@uploadcare/react-uploader'
import '@uploadcare/react-uploader/core.css'



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldLabel } from '@/components/ui/field'
import { Loader2, X, MessageSquarePlus } from 'lucide-react'
import { createComment } from '@/lib/actions'

type UploadedImage = {
  cdnUrl: string
  name: string
}

type Props = {
  jobId: string
  // Called after a successful send so the parent can refetch / update the audit trail list
  onSent?: () => void
  // Optional controlled trigger — if you'd rather open this modal from elsewhere,
  // pass open/onOpenChange and omit the default trigger button
  trigger?: React.ReactNode
}

const CommentModal = ({ jobId, onSent, trigger }: Props) => {
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetState = () => {
    setComment('')
    setImages([])
    setError(null)
    setIsSubmitting(false)
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) resetState()
    setOpen(next)
  }

  const handleRemoveImage = (cdnUrl: string) => {
    setImages((prev) => prev.filter((img) => img.cdnUrl !== cdnUrl))
  }

  const handleSubmit = async () => {
    if (!comment.trim()) {
      setError('Add a message before sending.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const result = await createComment({
        jobId,
        comment: comment.trim(),
        imageUrls: images.map((img) => img.cdnUrl),
      })

      if (!result.success) {
        throw new Error(result.message)
      }

      onSent?.()
      handleOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong sending this comment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger  className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cardprimary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            Add comment
       
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Flag an issue</DialogTitle>
          <DialogDescription>
            This message and any attached screenshots will be sent to the user and added to this job&apos;s audit trail.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="comment">Message</FieldLabel>
            <Textarea
              id="comment"
              placeholder="Describe the error you found..."
              value={comment}
              onChange={(e:any) => setComment(e.target.value)}
              rows={5}
              disabled={isSubmitting}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="uploadfile">Attach screenshots (optional)</FieldLabel>
            <FileUploaderRegular
              sourceList="local"
              cdnCname="https://3ry6qx9e9t.ucarecd.net/"
              classNameUploader="uc-light"
              accept="image/*"
              multiple
              pubkey="834647401c06d67a05d0"
              onCommonUploadSuccess={(e) => {
                if (!e.isSuccess) return
                const newImages = e.successEntries.map((entry) => ({
                  cdnUrl: entry.cdnUrl,
                  name: entry.name ?? 'screenshot',
                }))
                setImages((prev) => [...prev, ...newImages])
                setError(null)
              }}
            />

            {images.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {images.map((img) => (
                  <div
                    key={img.cdnUrl}
                    className="group relative aspect-square overflow-hidden rounded-md border"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.cdnUrl}
                      alt={img.name}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img.cdnUrl)}
                      className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label={`Remove ${img.name}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Field>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send to user
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CommentModal