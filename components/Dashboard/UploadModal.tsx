"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { FileUploaderRegular } from "@uploadcare/react-uploader/next"
import "@uploadcare/react-uploader/core.css"
import { Loader2, CheckCircle2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Button } from "../ui/button"
import { createJob } from "@/lib/actions"

type props = {
    clerkUserId:string;
    userEmail:string
}

const UploadModal = ({clerkUserId, userEmail}:props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [cdnUrl, setCdnUrl] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetState = () => {
    setCdnUrl(null)
    setIsSaving(false)
    setError(null)
  }

  const handleUploadSuccess = (e: {
    detail: { successEntries: { cdnUrl: string | null }[] }
  }) => {
    const url = e.detail.successEntries[0]?.cdnUrl ?? null
    if (url) {
      setCdnUrl(url)
      setError(null)
    }
  }

  const handleCreateJob = async () => {
    if (!cdnUrl) {
      setError("Please upload a file first.")
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      await createJob(cdnUrl)
      resetState()
      setOpen(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) resetState()
      }}
    >
      <DialogTrigger className="bg-cardprimary text-white p-2 rounded-xs">
        Upload Project
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Job</DialogTitle>
          <DialogDescription>
            Upload your CSV list with payment details and we handle the rest
          </DialogDescription>
        </DialogHeader>

        <Field>
          <FieldLabel htmlFor="uploadfile">Excel/CSV</FieldLabel>

          <FileUploaderRegular
            dynamicButtonViewMode="auto"
            sourceList="local"
            cdnCname="https://3ry6qx9e9t.ucarecd.net/"
            classNameUploader="uc-light"
            pubkey="834647401c06d67a05d0"
            //@ts-ignore
            onCommonUploadSuccess={handleUploadSuccess}
          />

          <FieldDescription>
            {cdnUrl ? (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                File uploaded successfully
              </span>
            ) : (
              "Select a CSV or Excel file to upload."
            )}
          </FieldDescription>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </Field>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateJob}
            disabled={!cdnUrl || isSaving}
            className="bg-cardprimary text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating job...
              </>
            ) : (
              "Create Job"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploadModal