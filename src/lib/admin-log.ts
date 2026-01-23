export function logAdminEvent(event: string, meta?: any) {
  console.log("[ADMIN]", event, meta ?? {});
}
