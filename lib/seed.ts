// lib/cursor-utils.ts
import type { JobCursor } from "@/lib/Seed_data"

export function decodeCursor(raw: string | null | undefined): JobCursor {
  if (!raw) return null
  try {
    const json = Buffer.from(raw, "base64url").toString("utf-8")
    const parsed = JSON.parse(json)
    if (parsed && typeof parsed.createdAt === "string" && typeof parsed.id === "string") {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

export function encodeCursor(cursor: JobCursor): string | null {
  if (!cursor) return null
  return Buffer.from(JSON.stringify(cursor), "utf-8").toString("base64url")
}