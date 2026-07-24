import { columns } from "@/components/Dashboard/columns";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import DashboardPagination from "@/components/Dashboard/DashboardPagination";
import { DataTable } from "@/components/Dashboard/data-table";
import Filter from "@/components/Dashboard/Filter";
import UploadModal from "@/components/Dashboard/UploadModal";
import { getUserJobsCursor } from "@/lib/db";
import { JobStatus } from "@/lib/generated/prisma/enums";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;

    cursorCreatedAt?: string;
    cursorId?: string;

    status?: JobStatus;

    createdFrom?: string;
    createdTo?: string;

    // completedFrom?: string;
    // completedTo?: string;
    // hasInvoice?: string;
  }>;
};

const Page = async ({ searchParams }: Props) => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const params = await searchParams;

  // Cursor
  const cursor =
    params.cursorCreatedAt && params.cursorId
      ? {
          createdAt: new Date(params.cursorCreatedAt),
          id: params.cursorId,
        }
      : null;

  // Filters
  const filters = {
    status: params.status ? params.status : undefined,

    createdFrom: params.createdFrom
      ? new Date(`${params.createdFrom}T00:00:00.000`)
      : undefined,

    createdTo: params.createdTo
      ? new Date(`${params.createdTo}T23:59:59.999`)
      : undefined,
  };

  console.log(filters);

  const data = await getUserJobsCursor({
    clerkUserId: user.id,
    cursor,
    pageSize: Number(params.pageSize ?? 10),
    filters,
  });

  return (
    <div className="flex min-h-screen flex-col gap-y-4 bg-zinc-50/80">
      <DashboardNav />
      <div className="flex max-w-6xl justify-end">
        <UploadModal  />
      </div>

      <div className="mx-auto m-5 flex max-w-6xl flex-col items-center justify-center bg-white shadow-xl">
        <Filter />

        <DataTable columns={columns} data={data.data} />
      </div>

      <DashboardPagination
        hasNextPage={data.hasNextPage}
        nextCursor={data.nextCursor}
      />
    </div>
  );
};

export default Page;
