import { isOTAEnabled } from "@/lib/featureFlags";

export function otaFeatureEnabled(): boolean {
  return isOTAEnabled();
}
