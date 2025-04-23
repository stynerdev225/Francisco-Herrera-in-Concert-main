import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// GET current language preference
export async function GET() {
  const cookieStore = cookies()
  const language = cookieStore.get('language')?.value || 'en'
  
  return NextResponse.json({ language })
}

// POST to update language preference
export async function POST(request: Request) {
  const { language } = await request.json()
  
  // Validate language input
  if (language !== 'en' && language !== 'es') {
    return NextResponse.json(
      { error: 'Invalid language selection' }, 
      { status: 400 }
    )
  }
  
  // Set cookie for language preference (1 year expiry)
  const cookieStore = cookies()
  cookieStore.set('language', language, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  })
  
  return NextResponse.json({ success: true, language })
} 