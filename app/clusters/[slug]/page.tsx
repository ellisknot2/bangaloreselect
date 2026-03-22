import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/ProjectCard'
import ClusterHero from '@/components/ClusterHero'
import { supabase } from '@/lib/supabase'
import type { Cluster, Project } from '@/lib/types'

interface Props {
  params: Promise<{ slug: string }>
}

async function getCluster(slug: string): Promise<Cluster | null> {
  try {
    const { data, error } = await supabase
      .from('clusters')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error || !data) return null
    return data as Cluster
  } catch {
    return null
  }
}

async function getClusterProjects(clusterName: string): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('cluster_name', clusterName)
      .limit(12)
    if (error || !data) return []
    return data as Project[]
  } catch {
    return []
  }
}

const MOCK_CLUSTERS: Record<string, Partial<Cluster>> = {
  devanahalli: {
    id: '1', name: 'Devanahalli', slug: 'devanahalli',
    total_active_projects: 18, upcoming_launches: 5, avg_price_per_sqft: 7800,
    price_momentum: 'Rising Strong', maturity_score: 7,
    investor_sentiment: 'Very Bullish', end_user_trend: 'Growing',
    competition_density: 'Medium',
    key_infra_projects: ['KIAL Expansion', 'Aerospace SEZ', 'ITIR Project', 'Metro Phase 3', 'Peripheral Ring Road'],
    strategic_outlook: 'Aerospace corridor driving unprecedented demand with 45% 3-year appreciation. KIAL expansion and Aerospace SEZ are transforming Devanahalli into a global aviation hub, making it one of the most attractive investment destinations in Bangalore.',
  },
  'north-bangalore': {
    id: '6', name: 'North Bangalore', slug: 'north-bangalore',
    total_active_projects: 35, upcoming_launches: 12, avg_price_per_sqft: 6500,
    price_momentum: 'Rising Strong', maturity_score: 6,
    investor_sentiment: 'Very Bullish', end_user_trend: 'Emerging',
    competition_density: 'Medium',
    key_infra_projects: ['Peripheral Ring Road', 'STRR', 'Metro Phase 2', 'KIAL', 'Aerospace SEZ'],
    strategic_outlook: 'Mega township zone with 14 clusters and infrastructure-led appreciation play. North Bangalore is being transformed by multiple mega infrastructure projects, creating one of the largest residential development corridors in India.',
  },
}

const MOCK_PROJECTS_BY_CLUSTER: Record<string, Partial<Project>[]> = {
  devanahalli: [
    { id: '2', name: 'Brigade Orchards', slug: 'brigade-orchards', developer: 'Brigade Group', micro_location: 'Devanahalli', cluster_name: 'North Bangalore', entry_ticket_cr: 1.8, highest_ticket_cr: 6.5, launch_price_per_sqft: 7800, scale_acres: 135, investor_score: 5, status: 'Available', rera_status: 'Registered', cluster_category: 'Township', township_typology: 'Integrated Township', project_type: 'Mixed Use', latitude: 13.2547, longitude: 77.6675, rera_number: 'PRM/KA/RERA/002', key_highlights: [], payment_plan_detail: '20:80', scarcity_level: 'Very High', infra_trigger_score: 9, strategic_quadrant: 'High Growth', headline_angle: 'Near KIAL', differentiator: '135 acres', infra_hook: 'Airport', ideal_buyer_persona: ['Investor'], end_user_score: 4, rental_score: 5, launch_phase: 'Phase 3', early_access_benefit: '3%' },
    { id: '5', name: 'Embassy Springs', slug: 'embassy-springs', developer: 'Embassy Group', micro_location: 'Devanahalli', cluster_name: 'North Bangalore', entry_ticket_cr: 2.8, highest_ticket_cr: 12, launch_price_per_sqft: 9800, scale_acres: 288, investor_score: 5, status: 'Available', rera_status: 'Registered', cluster_category: 'Luxury', township_typology: 'Integrated Township', project_type: 'Mixed Use', latitude: 13.22, longitude: 77.71, rera_number: 'PRM/KA/RERA/005', key_highlights: [], payment_plan_detail: '15:85', scarcity_level: 'Very High', infra_trigger_score: 10, strategic_quadrant: 'Invest Now', headline_angle: '288 acres', differentiator: "India's largest", infra_hook: 'KIAL', ideal_buyer_persona: ['NRI'], end_user_score: 4, rental_score: 5, launch_phase: 'Phase 4', early_access_benefit: '2%' },
  ],
}

export default async function ClusterDetailPage({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  const cluster = await getCluster(params.slug)
  const mockCluster = MOCK_CLUSTERS[params.slug]

  if (!cluster && !mockCluster) {
    // Show generic cluster page for any slug
    const genericCluster: Cluster = {
      id: params.slug,
      name: params.slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      slug: params.slug,
      total_active_projects: 10,
      upcoming_launches: 3,
      avg_price_per_sqft: 7500,
      price_momentum: 'Rising',
      maturity_score: 7,
      investor_sentiment: 'Bullish',
      end_user_trend: 'Growing',
      competition_density: 'Medium',
      key_infra_projects: ['Metro Connectivity', 'Outer Ring Road', 'IT Hub'],
      strategic_outlook: 'Growing micro-market with strong infrastructure development and investment potential.',
    }
    return <ClusterPageContent cluster={genericCluster} projects={[]} />
  }

  const displayCluster = (cluster || mockCluster) as Cluster
  const projects = cluster
    ? await getClusterProjects(cluster.name)
    : (MOCK_PROJECTS_BY_CLUSTER[params.slug] as Project[]) || []

  return <ClusterPageContent cluster={displayCluster} projects={projects} />
}

function ClusterPageContent({ cluster, projects }: { cluster: Cluster; projects: Project[] }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <Link href="/clusters" className="hover:text-primary transition-colors">Clusters</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span className="text-gray-900 font-medium">{cluster.name}</span>
          </nav>
        </div>
      </div>

      {/* Dark Hero with Map */}
      <ClusterHero cluster={cluster} projects={projects} />

      {/* Stats Bar */}
      <div className="bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-primary">₹{cluster.avg_price_per_sqft?.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-0.5">Avg Price/sqft</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary">₹{((cluster.avg_price_per_sqft || 7000) * 600 / 10000000).toFixed(1)} Cr</p>
            <p className="text-xs text-gray-400 mt-0.5">Entry Ticket</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary">{cluster.price_momentum}</p>
            <p className="text-xs text-gray-400 mt-0.5">Price Momentum</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary">{cluster.total_active_projects}</p>
            <p className="text-xs text-gray-400 mt-0.5">Active Projects</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why It Matters */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Cluster Intelligence</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why {cluster.name} Matters</h2>
            <p className="text-gray-600 leading-relaxed text-base mb-6">
              {cluster.strategic_outlook}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Maturity Score', value: `${cluster.maturity_score}/10`, color: 'text-primary' },
                { label: 'Investor Sentiment', value: cluster.investor_sentiment || 'Bullish', color: 'text-green-600' },
                { label: 'End User Trend', value: cluster.end_user_trend || 'Growing', color: 'text-blue-600' },
                { label: 'Competition', value: cluster.competition_density || 'Medium', color: 'text-gray-900' },
              ].map((metric) => (
                <div key={metric.label} className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className={`text-lg font-bold ${metric.color}`}>{metric.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure Triggers */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🏗️</span> Infrastructure Triggers
            </h3>
            {cluster.key_infra_projects && cluster.key_infra_projects.length > 0 ? (
              <div className="space-y-2">
                {cluster.key_infra_projects.map((infra, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{i + 1}</span>
                    </div>
                    <span className="text-sm text-gray-700">{infra}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Infrastructure data coming soon</p>
            )}

            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Infra Tags</h4>
              <div className="flex flex-wrap gap-1.5">
                {['Metro', 'Airport', 'Ring Road', 'IT Hub', 'SEZ'].map((tag) => (
                  <span key={tag} className="bg-amber-50 text-amber-700 border border-amber-100 text-xs px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects in this Cluster */}
        {projects.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Projects in {cluster.name}</h2>
              <span className="text-sm text-gray-400">{projects.length} projects</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Explore All Clusters CTA */}
        <div className="bg-dark rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Explore All Clusters</h3>
          <p className="text-gray-400 mb-6">Discover investment opportunities across 14 Bangalore micro-markets</p>
          <Link
            href="/clusters"
            className="inline-flex items-center gap-2 bg-primary text-black font-bold px-8 py-3 rounded-xl hover:bg-yellow-400 transition-colors"
          >
            View All Clusters
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
