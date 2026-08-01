"use client";

import { Job } from "@/lib/generated/prisma/client";
import { JobStatus } from "@/lib/generated/prisma/enums";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CommentModal from "../Admin/CommentModal";
import ReuploadModal from "./Reupload";
import { InfoIcon } from "lucide-react";

const statusStyles: Record<JobStatus, string> = {
  [JobStatus.FILE_SENT]:
    "bg-slate-500 text-white hover:bg-slate-600 capitalize",
  [JobStatus.PROCESSING]:
    "bg-amber-600 text-white hover:bg-amber-700 capitalize",
  [JobStatus.COMPLETE]:
    "bg-green-700 text-white  hover:bg-green-800 capitalize",
  [JobStatus.FLAGGED]:
    " bg-white text-red-600 capitalize animate-flag-pulse p-3",
  [JobStatus.FILE_REUPLOADED]:
    " bg-blue-600 text-white capitalize animate-pulse p-3",
};

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "id",
    header: "Job ID",
    cell: ({ row }) => {
      const id = row.getValue<string>("id");
      return <span className=" text-black">{id}</span>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<JobStatus>("status");
      return (
        <span className="relative inline-flex">
          {status === JobStatus.FLAGGED && (
            <span className="absolute inset-0 animate-ping rounded-full bg-red-600 opacity-75" />
          )}
          <Badge className={cn(statusStyles[status], "relative")}>
            {status}
          </Badge>
        </span>
      );
    },
  },

  {
    accessorKey: "jobUploadRef",
    header: "Job Upload Reference",
    cell: ({ row }) => {
      const ref = row.getValue<string>("jobUploadRef");
      return (
        <Link href={ref} className=" text-blue-600 cursor-pointer" title={ref}>
          View Uploaded File
        </Link>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue<string | Date>("createdAt");
      return (
        <span className=" text-muted-foreground">
          {format(new Date(createdAt), "MMM d, yyyy h:mm a")}
        </span>
      );
    },
  },
  {
    accessorKey: "completedAt",
    header: "Completed",
    cell: ({ row }) => {
      const completedAt = row.getValue<string | Date | null>("completedAt");
      if (!completedAt) {
        return <span className="text-xs text-muted-foreground">—</span>;
      }
      return (
        <span className=" text-muted-foreground">
          {format(new Date(completedAt), "MMM d, yyyy h:mm a")}
        </span>
      );
    },
  },
   {
    id: "Re-upload",
    header: "Actions",
    cell: ({ row }) => {
      const isFlagged = row.original.status === JobStatus.FLAGGED;

      return (
        <div className="flex gap-x-3">

          <ReuploadModal id={row.original.id}  isFlagged = {isFlagged}/>
         { isFlagged && (

          <Link href={`dashboard/${row.original.id}`}> <InfoIcon /> </Link>
          )}
        </div>
      );
    },
  },
];
