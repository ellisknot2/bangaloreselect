'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C8.5 6 6 9 6 13c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-2.5-7-6-11z"
                  fill="#0a0a0a"
                />
                <path
                  d="M12 9c-1 2-2 3.5-2 5 0 1.1.9 2 2 2s2-.9 2-2c0-1.5-1-3-2-5z"
                  fill="#F5C000"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              Bangalore<span className="text-primary">Select</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-yellow-50 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-yellow-50 rounded-lg transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/clusters"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-yellow-50 rounded-lg transition-colors"
            >
              Clusters
            </Link>
            <Link
              href="/#market"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-yellow-50 rounded-lg transition-colors"
            >
              Market
            </Link>
            <Link
              href="/#about"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-yellow-50 rounded-lg transition-colors"
            >
              About
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* User Icon */}
            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors hidden sm:flex"
              aria-label="User account"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Sign In Button */}
            <button className="hidden sm:flex btn-primary text-sm">
              Sign In
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects, clusters, developers..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-3">
            <div className="flex flex-col gap-1">
              <Link href="/" className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/projects" className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Projects</Link>
              <Link href="/clusters" className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Clusters</Link>
              <Link href="/#market" className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Market</Link>
              <Link href="/#about" className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>About</Link>
              <div className="px-4 pt-2">
                <button className="w-full btn-primary text-sm">Sign In</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
