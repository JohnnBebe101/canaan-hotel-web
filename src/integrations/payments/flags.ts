import { isPaymentsEnabled } from "@/lib/featureFlags";

export function paymentsFeatureEnabled(): boolean {
  return isPaymentsEnabled();
}
