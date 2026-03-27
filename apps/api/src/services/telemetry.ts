export interface Telemetry {
  recordEvent: (name: string, payload: Record<string, unknown>) => void
}

export const consoleTelemetry: Telemetry = {
  recordEvent(name, payload) {
    // Keep logs structured and secret-free.
    console.log(JSON.stringify({ level: 'info', event: name, ...payload }))
  },
}
