"use client"

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"

import { JobStatus } from "@/lib/generated/prisma/enums"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Filter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const status = searchParams?.get("status") ?? ""

  const createdFrom =
    searchParams?.get("createdFrom") ?? ""

  const createdTo =
    searchParams?.get("createdTo") ?? ""



  const updateFilter = (
    key: string,
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams?.toString()
    )

    if (value && value !== "ALL") {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // Reset pagination when filters change
    params.set("page", "0")

    // Remove cursor because the old cursor
    // belongs to the previous filter result
    params.delete("cursorCreatedAt")
    params.delete("cursorId")

    router.push(
      `${pathname}?${params.toString()}`,
      {
        scroll: false,
      }
    )
  }

  const clearFilters = () => {
    const params = new URLSearchParams(
      searchParams?.toString()
    )

    params.delete("status")
    params.delete("createdFrom")
    params.delete("createdTo")
    params.delete("completedFrom")
    params.delete("completedTo")

    // Reset pagination
    params.set("page", "0")

    // Reset cursor
    params.delete("cursorCreatedAt")
    params.delete("cursorId")

    router.push(
      `${pathname}?${params.toString()}`,
      {
        scroll: false,
      }
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border p-1 justify-center w-5xl mx-auto">

      {/* Status */}
      <div className="flex flex-row space-x-2 items-center">
        <label className="font-medium">
          Status
        </label>

        <Select
          value={status}
          onValueChange={(value) =>
            //@ts-ignore
            updateFilter("status", value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>

          <SelectContent>
          

            {Object.values(JobStatus).map(
              (jobStatus) => (
                <SelectItem
                  key={jobStatus}
                  value={jobStatus}
                >
                  {jobStatus}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Created From */}
      <div className="flex flex-row space-x-2 items-center">
        <label className="font-medium">
          Created From
        </label>

        <Input
          type="date"
          value={createdFrom}
          onChange={(e) =>
            updateFilter(
              "createdFrom",
              e.target.value
            )
          }
        />
      </div>

      {/* Created To */}
      <div className="flex flex-row space-x-2 items-center">
        <label className="font-medium">
          Created To
        </label>

        <Input
          type="date"
          value={createdTo}
          onChange={(e) =>
            updateFilter(
              "createdTo",
              e.target.value
            )
          }
        />

      </div>

      {/* Completed From */}
     

      {/* Clear */}
      <Button
        variant="default"
        onClick={clearFilters}
        className="bg-cardprimary"
      >
        Clear filters
      </Button>

    </div>
  )
}

export default Filter