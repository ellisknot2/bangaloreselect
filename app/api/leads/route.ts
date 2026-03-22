import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, intent, message, project_id, cluster_name, source } = body

    // Validate required fields
    if (!name || !phone || !email || !intent) {
      return NextResponse.json(
        { error: 'Name, phone, email, and intent are required' },
        { status: 400 }
      )
    }

    // Basic phone validation
    const phoneRegex = /^[\+]?[0-9]{10,15}$/
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Please provide a valid phone number' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        intent,
        message: message?.trim() || null,
        project_id: project_id || null,
        cluster_name: cluster_name || null,
        source: source || 'website',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save your request. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, lead: data, message: 'Thank you! Our team will contact you within 24 hours.' },
      { status: 201 }
    )
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
