import type { Role } from "@/types"

// Real role definitions, mirroring the roles seeded in the database.
// Used only to populate the role selector — these are not sample content.
export const adminRoles: Role[] = [
  { id: "role-admin", name: "admin", label: "Admin", permissions: ["all"] },
  { id: "role-editor", name: "editor", label: "Editor", permissions: ["read", "write"] },
  { id: "role-viewer", name: "viewer", label: "Viewer", permissions: ["read"] },
]

// Fetch a list from an admin API endpoint.
// Returns the real records, or an empty list on failure — never sample data.
export async function fetchAdminList<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error("API not available")
    const json = (await res.json()) as { data?: T[] }
    return Array.isArray(json.data) ? json.data : []
  } catch {
    return []
  }
}

// Fetch a single object from an admin API endpoint.
// Returns the real record, or the provided empty value on failure.
export async function fetchAdminObject<T>(url: string, empty: T): Promise<T> {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error("API not available")
    const json = (await res.json()) as { data?: T }
    return (json.data ?? empty) as T
  } catch {
    return empty
  }
}

// Build a URL-safe slug from a title. Falls back to a unique id when the input
// has no usable characters (e.g. a purely non-latin title).
export function slugify(input: string): string {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
  return slug || `item-${Date.now()}`
}

// Send a mutating request to an admin API endpoint.
// Returns true only when the server confirms success.
async function adminSend(url: string, method: string, body?: unknown): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method,
      headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
    const json = (await res.json().catch(() => ({}))) as { success?: boolean }
    return res.ok && json.success !== false
  } catch {
    return false
  }
}

export function adminCreate(url: string, body: unknown): Promise<boolean> {
  return adminSend(url, "POST", body)
}

export function adminUpdate(url: string, body: unknown): Promise<boolean> {
  return adminSend(url, "PUT", body)
}

export function adminPatch(url: string, body: unknown): Promise<boolean> {
  return adminSend(url, "PATCH", body)
}

export function adminDelete(url: string): Promise<boolean> {
  return adminSend(url, "DELETE")
}
