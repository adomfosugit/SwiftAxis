"use client";

import { Job } from "@/lib/generated/prisma/client";
import { JobStatus } from "@/lib/generated/prisma/enums";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";
import { MessageSquarePlus } from "lucide-react";
import StatusCell from "./Status";
import CommentModal from "./CommentModal";

const statusStyles: Record<JobStatus, string> = {
  [JobStatus.FILE_SENT]:
    "bg-slate-500 text-white hover:bg-slate-600 capitalize",
  [JobStatus.PROCESSING]:
    "bg-amber-600 text-white hover:bg-amber-700 capitalize",
  [JobStatus.COMPLETE]:
    "bg-green-700 text-white  hover:bg-green-800 capitalize",

  [JobStatus.FLAGGED]: "bg-red-700 text-white hover:bg-red-800 capitalize",
  [JobStatus.FILE_REUPLOADED]:
    " bg-blue-600 text-white capitalize animate-pulse p-3",
};

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "id",
    header: "Job ID",
    cell: ({ row }) => {
      const id = row.getValue<string>("id");
      return (
        <Link
          href={`/admin/${id}`}
          className=" text-blue-600 cursor-pointer"
          title={id}
        >
          {id}
        </Link>
      );
    },
  },
  {
    accessorKey: "userEmail",
    header: "Email",
    cell: ({ row }) => {
      const userEmail = row.getValue<string>("userEmail");
      return <span className=" text-black">{userEmail}</span>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <StatusCell jobId={row.original.id} status={status} />;
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
  // {
  //   accessorKey: "completedAt",
  //   header: "Completed",
  //   cell: ({ row }) => {
  //     const completedAt = row.getValue<string | Date | null>("completedAt");
  //     if (!completedAt) {
  //       return <span className="text-xs text-muted-foreground">—</span>;
  //     }
  //     return (
  //       <span className=" text-muted-foreground">
  //         {format(new Date(completedAt), "MMM d, yyyy h:mm a")}
  //       </span>
  //     );
  //   },
  // },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const isFlagged = row.original.status === JobStatus.FLAGGED;

      return <CommentModal jobId={row.original.id} />;
    },
  },
];
