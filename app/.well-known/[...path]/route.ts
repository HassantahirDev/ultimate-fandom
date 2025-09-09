import { NextResponse } from 'next/server'

export async function GET() {
  // Handle all .well-known requests gracefully
  return NextResponse.json({
    error: 'Well-known resource not found'
  }, { status: 404 })
}

export async function POST() {
  return NextResponse.json({
    error: 'Method not allowed'
  }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({
    error: 'Method not allowed'
  }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({
    error: 'Method not allowed'
  }, { status: 405 })
} 