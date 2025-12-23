import { isEmailEnabled } from "@/lib/featureFlags";

export function emailFeatureEnabled(): boolean {
  return isEmailEnabled();
}
