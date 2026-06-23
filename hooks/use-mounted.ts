import { useSyncExternalStore } from "react";

/** True only on the client after hydration — keeps SSR and hydration markup aligned. */
export function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
