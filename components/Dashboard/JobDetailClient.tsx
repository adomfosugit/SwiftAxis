"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { Loader2, Send, Clock } from "lucide-react";

import { Job, Comment, CommentImage } from "@/lib/generated/prisma/client";
import { JobStatus } from "@/lib/generated/prisma/enums";

import { Badge } from "@/components/ui/badge";
import { Field } from "../ui/field";
import Link from "next/link";
import ReuploadModal from "./Reupload";
import CommentModal from "../Dashboard/CommentModal";

type JobWithComments = Job & {
  comments: (Comment & { images: CommentImage[] })[];
};

type Props = {
  job: JobWithComments;
};

const statusStyles: Record<JobStatus, string> = {
  [JobStatus.FILE_SENT]:
    "bg-slate-500 text-white hover:bg-slate-600 capitalize",
  [JobStatus.PROCESSING]:
    "bg-amber-600 text-white hover:bg-amber-700 capitalize",
  [JobStatus.COMPLETE]: "bg-green-700 text-white hover:bg-green-800 capitalize",
  [JobStatus.FLAGGED]: "bg-red-700 text-white hover:bg-red-800 capitalize",
  [JobStatus.FILE_REUPLOADED]:
    "bg-blue-600 text-white capitalize animate-pulse p-3",
};

const statusLabel = (status: JobStatus) =>
  status.toLowerCase().replace("_", " ");

export default function JobDetailClient({ job }: Props) {
  const isflagged = job.status === JobStatus.FLAGGED;

  const [status, setStatus] = useState<JobStatus>(job.status);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground hover:underline"
        >
          &larr; Back to dashboard
        </Link>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold">Job {job.id}</h1>
            <p className="text-sm text-muted-foreground">{job.userEmail}</p>
          </div>
          <Badge className={statusStyles[status]}>{statusLabel(status)}</Badge>
        </div>
      </div>

      {/* Comment thread */}
      <div className="flex flex-col gap-4 rounded-lg border p-4 h-[300px] overflow-y-scroll">
        <h2 className="text-sm font-medium">Comments</h2>

        <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
          {job.comments.length === 0 && (
            <p className="text-sm text-muted-foreground">No comments yet.</p>
          )}
          {job.comments.map((item) => (
            <div
              key={item.id}
              className="rounded-md border bg-muted/30 p-3 text-sm"
            >
              <div className="mb-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {item.adminEmail}
                </span>
                <span>
                  {format(new Date(item.createdAt), "MMM d, yyyy h:mm a")}
                </span>
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

        <div className="flex flex-col gap-2 border-t pt-3">
          <ReuploadModal id={job.id} isFlagged={isflagged} />
        </div>
      </div>
    </div>
  );
}
