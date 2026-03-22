import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.5 6 6 9 6 13c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-2.5-7-6-11z" fill="#0a0a0a" />
                  <path d="M12 9c-1 2-2 3.5-2 5 0 1.1.9 2 2 2s2-.9 2-2c0-1.5-1-3-2-5z" fill="#F5C000" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">
                Bangalore<span className="text-primary">Select</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Curated spatial intelligence platform for Bangalore residential real estate.
              Data-driven insights for smarter property decisions.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="#0a0a0a" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#0a0a0a" strokeWidth="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/#about' },
                { label: 'Market Analysis', href: '/#market' },
                { label: 'Insights', href: '/insights' },
                { label: 'Contact', href: '/#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Properties</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'All Projects', href: '/projects' },
                { label: 'Premium Villas', href: '/projects?type=villa' },
                { label: 'Luxury Apartments', href: '/projects?type=apartment' },
                { label: 'Township Projects', href: '/projects?type=township' },
                { label: 'Upcoming Launches', href: '/projects?status=upcoming' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clusters */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Clusters</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'All Clusters', href: '/clusters' },
                { label: 'North Bangalore', href: '/clusters/north-bangalore' },
                { label: 'Devanahalli', href: '/clusters/devanahalli' },
                { label: 'Whitefield', href: '/clusters/whitefield' },
                { label: 'Sarjapur Road', href: '/clusters/sarjapur-road' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Help Center', href: '#' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Cookie Policy', href: '#' },
                { label: 'RERA Compliance', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BangaloreSelect. All rights reserved.
            <span className="ml-1">MahaRERA registered platform.</span>
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
