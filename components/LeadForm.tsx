'use client'

import { useState } from 'react'

interface LeadFormProps {
  projectId?: string
  clusterName?: string
  source?: string
  compact?: boolean
  onSuccess?: () => void
}

export default function LeadForm({
  projectId,
  clusterName,
  source = 'website',
  compact = false,
  onSuccess,
}: LeadFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    intent: 'buy',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          project_id: projectId,
          cluster_name: clusterName,
          source,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit')
      }

      setSubmitted(true)
      if (onSuccess) onSuccess()

      // WhatsApp redirect
      const waMessage = encodeURIComponent(
        `Hi BangaloreSelect! I'm ${form.name} interested in ${
          clusterName ? `${clusterName} cluster` : 'your properties'
        }. My intent: ${form.intent}. Please contact me at ${form.email}.`
      )
      setTimeout(() => {
        window.open(`https://wa.me/919999999999?text=${waMessage}`, '_blank')
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-1">Request Submitted!</h3>
        <p className="text-gray-500 text-sm">
          Our team will contact you within 24 hours. Connecting you to WhatsApp...
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className={compact ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400"
        />
      </div>

      <div>
        <label htmlFor="intent" className="block text-sm font-medium text-gray-700 mb-1">
          I&apos;m looking to...
        </label>
        <select
          id="intent"
          name="intent"
          value={form.intent}
          onChange={handleChange}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
        >
          <option value="buy">Buy a property</option>
          <option value="invest">Invest for appreciation</option>
          <option value="rent">Rent / Lease</option>
          <option value="explore">Just exploring</option>
          <option value="consult">Get expert consultation</option>
        </select>
      </div>

      {!compact && (
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message (optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Any specific requirements or questions..."
            rows={3}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 resize-none"
          />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2.5 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Express Interest
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        By submitting, you agree to our{' '}
        <a href="#" className="underline hover:text-primary">Terms</a> and{' '}
        <a href="#" className="underline hover:text-primary">Privacy Policy</a>. We&apos;ll connect you on WhatsApp.
      </p>
    </form>
  )
}
