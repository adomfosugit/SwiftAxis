"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Cursor = {
  createdAt: Date
  id: string
}

type Props = {
  hasNextPage: boolean
  nextCursor: Cursor | null
  pageCount?: number
}

const DashboardPagination = ({
  hasNextPage,
  nextCursor,
  pageCount,
}: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageIndex = Number(searchParams?.get("page") ?? "0")
  const pageSize = Number(searchParams?.get("pageSize") ?? "10")

  const hasPreviousPage = pageIndex > 0

 
  const goToNext = () => {
    if (!hasNextPage || !nextCursor) return

    const params = new URLSearchParams(searchParams?.toString())

    params.set("page", String(pageIndex + 1))
    params.set("pageSize", String(pageSize))

    params.set(
      "cursorCreatedAt",
      nextCursor.createdAt.toISOString()
    )

    params.set("cursorId", nextCursor.id)

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }


  const goToPrevious = () => {
    if (!hasPreviousPage) return

    router.back()
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={hasPreviousPage ? "#" : undefined}
            onClick={(e) => {
              e.preventDefault()
              goToPrevious()
            }}
            aria-disabled={!hasPreviousPage}
            className={
              !hasPreviousPage
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            onClick={(e) => e.preventDefault()}
          >
            {pageIndex + 1}
            {pageCount ? ` / ${pageCount}` : ""}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={hasNextPage ? "#" : undefined}
            onClick={(e) => {
              e.preventDefault()
              goToNext()
            }}
            aria-disabled={!hasNextPage}
            className={
              !hasNextPage
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default DashboardPagination