import { NextResponse } from 'next/server'

export async function GET() {
  // Return a minimal valid response for Chrome DevTools
  return NextResponse.json({
    message: 'Chrome DevTools integration not configured'
  }, { status: 404 })
} 