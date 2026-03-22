import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ClusterCard from '@/components/ClusterCard'
import { supabase } from '@/lib/supabase'
import type { Cluster } from '@/lib/types'
import Link from 'next/link'

async function getClusters(): Promise<Cluster[]> {
  try {
    const { data, error } = await supabase.from('clusters').select('*')
    if (error || !data) return FALLBACK_CLUSTERS as Cluster[]
    return data as Cluster[]
  } catch {
    return FALLBACK_CLUSTERS as Cluster[]
  }
}

const FALLBACK_CLUSTERS: Partial<Cluster>[] = [
  { id: '1', name: 'Devanahalli', slug: 'devanahalli', total_active_projects: 18, upcoming_launches: 5, avg_price_per_sqft: 7800, price_momentum: 'Rising Strong', maturity_score: 7, investor_sentiment: 'Very Bullish', end_user_trend: 'Growing', competition_density: 'Medium', key_infra_projects: ['KIAL Expansion', 'Aerospace SEZ', 'Metro Phase 3'], strategic_outlook: 'Aerospace corridor driving unprecedented demand with 45% 3-year appreciation.' },
  { id: '2', name: 'Hebbal', slug: 'hebbal', total_active_projects: 12, upcoming_launches: 3, avg_price_per_sqft: 9500, price_momentum: 'Stable Rising', maturity_score: 8, investor_sentiment: 'Bullish', end_user_trend: 'Strong', competition_density: 'High', key_infra_projects: ['Outer Ring Road', 'Metro Yellow Line', 'Nagavara Lake'], strategic_outlook: 'Mature cluster with strong end-user demand and consistent appreciation.' },
  { id: '3', name: 'Whitefield', slug: 'whitefield', total_active_projects: 24, upcoming_launches: 7, avg_price_per_sqft: 8200, price_momentum: 'Rising', maturity_score: 9, investor_sentiment: 'Positive', end_user_trend: 'Very Strong', competition_density: 'Very High', key_infra_projects: ['Purple Metro Line', 'ITPL', 'EPIP Zone'], strategic_outlook: 'Established IT corridor with metro connectivity boosting premium segment.' },
  { id: '4', name: 'Sarjapur Road', slug: 'sarjapur-road', total_active_projects: 20, upcoming_launches: 8, avg_price_per_sqft: 7500, price_momentum: 'Rising', maturity_score: 7, investor_sentiment: 'Bullish', end_user_trend: 'Growing', competition_density: 'High', key_infra_projects: ['Peripheral Ring Road', 'TCS Campus', 'Amazon HQ'], strategic_outlook: 'Tech campus cluster with strong rental demand and appreciation potential.' },
  { id: '5', name: 'Bannerghatta Road', slug: 'bannerghatta-road', total_active_projects: 15, upcoming_launches: 4, avg_price_per_sqft: 6800, price_momentum: 'Stable', maturity_score: 7, investor_sentiment: 'Positive', end_user_trend: 'Stable', competition_density: 'Medium', key_infra_projects: ['Metro Green Line', 'NIMHANS', 'JP Nagar'], strategic_outlook: 'Healthcare and education hub with good social infrastructure.' },
  { id: '6', name: 'North Bangalore', slug: 'north-bangalore', total_active_projects: 35, upcoming_launches: 12, avg_price_per_sqft: 6500, price_momentum: 'Rising Strong', maturity_score: 6, investor_sentiment: 'Very Bullish', end_user_trend: 'Emerging', competition_density: 'Medium', key_infra_projects: ['Peripheral Ring Road', 'STRR', 'Metro Phase 2'], strategic_outlook: 'Mega township zone with 14 clusters and infrastructure-led appreciation play.' },
  { id: '7', name: 'Electronic City', slug: 'electronic-city', total_active_projects: 14, upcoming_launches: 3, avg_price_per_sqft: 6200, price_momentum: 'Stable', maturity_score: 8, investor_sentiment: 'Positive', end_user_trend: 'Stable', competition_density: 'High', key_infra_projects: ['Elevated Expressway', 'Infosys Campus', 'Wipro Campus'], strategic_outlook: 'Mature IT cluster with stable end-user demand and good rental yields.' },
  { id: '8', name: 'Yelahanka', slug: 'yelahanka', total_active_projects: 10, upcoming_launches: 4, avg_price_per_sqft: 6800, price_momentum: 'Rising', maturity_score: 6, investor_sentiment: 'Bullish', end_user_trend: 'Growing', competition_density: 'Low', key_infra_projects: ['Metro Phase 2', 'Peripheral Ring Road', 'KIAL Proximity'], strategic_outlook: 'Emerging suburb with infrastructure-led growth and affordable entry points.' },
]

export default async function ClustersPage() {
  const clusters = await getClusters()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span className="text-gray-900 font-medium">Clusters</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Bangalore Real Estate Clusters</h1>
          <p className="text-gray-500">Spatial intelligence across {clusters.length} micro-markets with data-driven investment insights</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Clusters', value: '14' },
            { label: 'Township Projects', value: '6' },
            { label: 'Price Range', value: '₹3.9K–18K/sqft' },
            { label: 'Avg 3Y Appreciation', value: '25–45%' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cluster Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clusters.map((cluster) => (
            <ClusterCard key={cluster.id} cluster={cluster} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
