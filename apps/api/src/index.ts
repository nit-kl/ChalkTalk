import { handleGenerateScript } from './services/script-service'
import { consoleTelemetry } from './services/telemetry'
import type { EnvLike } from './domain/types'

function corsHeaders(origin: string): Record<string, string> {
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST,OPTIONS',
    'access-control-allow-headers': 'content-type,x-client-id',
    'content-type': 'application/json; charset=utf-8',
  }
}

export default {
  async fetch(request: Request, env: EnvLike): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN || '*'
    const headers = corsHeaders(origin)
    const { pathname } = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers })
    }
    if (pathname !== '/api/script/generate') {
      return Response.json(
        { success: false, category: 'internal', code: 'NOT_FOUND', message: 'Not found.', requestId: crypto.randomUUID() },
        { status: 404, headers }
      )
    }
    if (request.method !== 'POST') {
      return Response.json(
        { success: false, category: 'validation', code: 'METHOD_NOT_ALLOWED', message: 'POST is required.', requestId: crypto.randomUUID() },
        { status: 405, headers }
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return Response.json(
        { success: false, category: 'validation', code: 'INVALID_JSON', message: 'Request body must be JSON.', requestId: crypto.randomUUID() },
        { status: 400, headers }
      )
    }

    const result = await handleGenerateScript({
      request,
      body,
      env,
      telemetry: consoleTelemetry,
    })
    return Response.json(result.response, {
      status: result.status,
      headers: {
        ...headers,
        ...(result.headers || {}),
      },
    })
  },
}
