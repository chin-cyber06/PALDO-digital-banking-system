// True when mock services are active (shows the "Demo mode" indicator).
export function useDemoMode() {
  const { useMocks } = useRuntimeConfig().public
  return String(useMocks) !== "false"
}
