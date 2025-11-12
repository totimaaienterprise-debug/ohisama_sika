import type { NextRequest } from 'next/server'
import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_KEY, API_URL, APP_ID, APP_INFO, SESSION_HEADER_KEY } from '@/config'
const userPrefix = `user_${APP_ID}:`

export const getInfo = (request: NextRequest) => {
  const headerSessionId = request.headers.get(SESSION_HEADER_KEY) || ''
  const cookieSessionId = request.cookies.get('session_id')?.value || ''
  const sessionId = (headerSessionId || cookieSessionId || '').trim() || v4()
  const user = userPrefix + sessionId
  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  if (APP_INFO.disable_session_same_site)
  { return { 'Set-Cookie': `session_id=${sessionId}; SameSite=None; Secure` } }

  return { 'Set-Cookie': `session_id=${sessionId}` }
}

export const client = new ChatClient(API_KEY, API_URL || undefined)
