'use client'

import { useState, useCallback } from 'react'

interface EMICalculatorProps {
  defaultAmount?: number
}

export default function EMICalculator({ defaultAmount = 5000000 }: EMICalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(defaultAmount)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const calculateEMI = useCallback(() => {
    const principal = loanAmount
    const r = interestRate / 12 / 100
    const n = tenure * 12
    if (r === 0) return principal / n
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    return Math.round(emi)
  }, [loanAmount, interestRate, tenure])

  const emi = calculateEMI()
  const totalPayment = emi * tenure * 12
  const totalInterest = totalPayment - loanAmount

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`
    return `₹${amount.toLocaleString()}`
  }

  const formatEMI = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L/mo`
    return `₹${amount.toLocaleString()}/mo`
  }

  return (
    <div className="space-y-5">
      {/* Loan Amount */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Loan Amount</label>
          <span className="text-sm font-bold text-gray-900">{formatCurrency(loanAmount)}</span>
        </div>
        <input
          type="range"
          min={500000}
          max={50000000}
          step={500000}
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹5L</span>
          <span>₹5 Cr</span>
        </div>
      </div>

      {/* Interest Rate */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Interest Rate</label>
          <span className="text-sm font-bold text-gray-900">{interestRate.toFixed(1)}% p.a.</span>
        </div>
        <input
          type="range"
          min={6}
          max={15}
          step={0.25}
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>6%</span>
          <span>15%</span>
        </div>
      </div>

      {/* Tenure */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Loan Tenure</label>
          <span className="text-sm font-bold text-gray-900">{tenure} years</span>
        </div>
        <input
          type="range"
          min={5}
          max={30}
          step={1}
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>5 yrs</span>
          <span>30 yrs</span>
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-primary/10 to-amber-50 rounded-xl p-4 border border-primary/20">
        <div className="text-center mb-3">
          <p className="text-xs text-gray-500 mb-0.5">Monthly EMI</p>
          <p className="text-3xl font-extrabold text-gray-900">{formatEMI(emi)}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/70 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 mb-0.5">Principal</p>
            <p className="text-sm font-bold text-gray-900">{formatCurrency(loanAmount)}</p>
          </div>
          <div className="bg-white/70 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 mb-0.5">Total Interest</p>
            <p className="text-sm font-bold text-red-500">{formatCurrency(Math.round(totalInterest))}</p>
          </div>
        </div>
        <div className="mt-3 bg-white/70 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 mb-0.5">Total Payment</p>
          <p className="text-sm font-bold text-gray-900">{formatCurrency(Math.round(totalPayment))}</p>
        </div>

        {/* Simple pie representation */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-2.5 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(loanAmount / totalPayment) * 100}%` }}
            />
          </div>
          <div className="flex gap-3 text-xs shrink-0">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
              Principal
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block" />
              Interest
            </span>
          </div>
        </div>
      </div>

      <button className="w-full text-sm text-primary font-medium underline hover:no-underline">
        Compare Home Loan Rates →
      </button>
    </div>
  )
}
