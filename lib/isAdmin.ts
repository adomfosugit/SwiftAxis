// lib/auth/is-admin.ts
import { currentUser } from "@clerk/nextjs/server"

function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export async function isAdminUser() {
  const user = await currentUser()
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase()

  if (!email) return false

  return getAdminEmails().includes(email)
}

// Sync helper — fine to keep sync since this file has no 'use server' directive
export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false
  return getAdminEmails().includes(email.toLowerCase())
}