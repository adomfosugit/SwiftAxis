
import { columns } from "@/components/Admin/columns";
import { DataTable } from "@/components/Admin/data-table";
import Filter from "@/components/Admin/Filter";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import DashboardPagination from "@/components/Dashboard/DashboardPagination";
import { getJobsCursor } from "@/lib/db";
import { JobStatus } from "@/lib/generated/prisma/enums";
import { isAdminUser } from "@/lib/isAdmin";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;

    cursorCreatedAt?: string;
    cursorId?: string;

    status?: JobStatus;
    userEmail?: string;

    createdFrom?: string;
    createdTo?: string;
  }>;
};

const Page = async ({ searchParams }: Props) => {
 

  await auth.protect() // redirects to sign-in if not authenticated

  const isAdmin = await isAdminUser()
  if (!isAdmin) {
    redirect("/dashboard")
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

  const data = await getJobsCursor({
    userEmail: params.userEmail || undefined,
    cursor,
    pageSize: Number(params.pageSize ?? 10),
    filters,
  });

  return (
    <div className="flex min-h-screen flex-col gap-y-4 bg-zinc-50/80">
      <DashboardNav />

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