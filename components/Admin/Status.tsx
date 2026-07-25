"use client";

import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobStatus } from "@/lib/generated/prisma/enums";


import { toast } from "../ui/toast";
import { updateJobStatus } from "@/lib/actions";

type Props = {
  jobId: string;
  status: JobStatus;
};

const StatusCell = ({ jobId, status }: Props) => {
  const [value, setValue] = useState(status);
  const [isPending, startTransition] = useTransition();
  const handleChange = (
    newStatus: JobStatus | null,
    // eventDetails param exists but we don't need it here
  ) => {
    if (!newStatus) return; // guard against null (e.g. cleared selection)

    const previous = value;
    setValue(newStatus); // optimistic update

    startTransition(async () => {
      try {
        await updateJobStatus(jobId, newStatus as JobStatus);
        toast.add({
          title: "Status Updated",
          type: "success",
        });
      } catch (err) {
        setValue(previous); // revert on failure
        toast.add({
          title: "Status Updated",
          type: "error",
        });
      }
    });
  };

  return (
    <Select value={value} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-[140px] mx-auto">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(JobStatus).map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusCell;
