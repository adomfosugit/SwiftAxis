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
import { reuploadJobFile } from "@/lib/actions"
import { JobStatus } from "@/lib/generated/prisma/enums"
type props = {
  id: string
  isFlagged: boolean
}

const ReuploadModal = ({id, isFlagged}:props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [fileUrl, setfileUrl] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetState = () => {
    setfileUrl(null)
    setIsSaving(false)
    setError(null)
  }

  const handleCreateJob = async () => {
    if (!fileUrl) {
      setError("Please upload a file first.")
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      await reuploadJobFile(id, fileUrl)
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
        {isFlagged && (
      <DialogTrigger className="bg-white ring-1 ring-cardprimary text-cardprimary p-2 rounded-xs">
        Reupload 
      </DialogTrigger>)}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Re-Upload File</DialogTitle>
          <DialogDescription>
            This will overwrite the existing file for this job. Please ensure that the new file is correct before proceeding.
          </DialogDescription>
        </DialogHeader>

        <Field>
          <FieldLabel htmlFor="uploadfile">Excel/CSV</FieldLabel>

          <FileUploaderRegular
            sourceList="local,"
            cdnCname="https://3ry6qx9e9t.ucarecd.net/"
            classNameUploader="uc-light"
            pubkey="834647401c06d67a05d0"
            onCommonUploadSuccess={(e) => {
              const url = e.successEntries[0]?.cdnUrl ?? null
              if (e.isSuccess) {
                setfileUrl(url)
                setError(null)
              }
            }}
          />

          <FieldDescription>
            {fileUrl ? (
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
            disabled={!fileUrl || isSaving}
            className="bg-cardprimary text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 Overwriting file 
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReuploadModal