import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/ProjectCard'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/lib/types'
import Link from 'next/link'

interface SearchParams {
  type?: string
  status?: string
  cluster?: string
  sort?: string
}

async function getProjects(searchParams: SearchParams): Promise<Project[]> {
  try {
    let query = supabase.from('projects').select('*')

    if (searchParams.status) {
      query = query.eq('status', searchParams.status)
    }
    if (searchParams.cluster) {
      query = query.eq('cluster_name', searchParams.cluster)
    }
    if (searchParams.type) {
      query = query.eq('project_type', searchParams.type)
    }

    const { data, error } = await query.limit(50)
    if (error) return FALLBACK_PROJECTS as Project[]
    return (data as Project[]) || FALLBACK_PROJECTS as Project[]
  } catch {
    return FALLBACK_PROJECTS as Project[]
  }
}

const FALLBACK_PROJECTS: Partial<Project>[] = [
  { id: '1', name: 'Prestige Raintree Park', slug: 'prestige-raintree-park', developer: 'Prestige Group', micro_location: 'Whitefield', cluster_name: 'East Bangalore', entry_ticket_cr: 2.5, highest_ticket_cr: 8.5, launch_price_per_sqft: 9500, scale_acres: 80, investor_score: 5, status: 'Available', rera_status: 'Registered', cluster_category: 'Premium', township_typology: 'Integrated Township', project_type: 'Mixed Use', latitude: 12.9716, longitude: 77.75, rera_number: 'PRM/KA/RERA/001', key_highlights: [], payment_plan_detail: '10:80:10', scarcity_level: 'High', infra_trigger_score: 8, strategic_quadrant: 'Invest Now', headline_angle: 'Whitefield largest township', differentiator: 'Premium township', infra_hook: 'Metro', ideal_buyer_persona: ['NRI'], end_user_score: 4, rental_score: 4, launch_phase: 'Phase 2', early_access_benefit: '5%' },
  { id: '2', name: 'Brigade Orchards', slug: 'brigade-orchards', developer: 'Brigade Group', micro_location: 'Devanahalli', cluster_name: 'North Bangalore', entry_ticket_cr: 1.8, highest_ticket_cr: 6.5, launch_price_per_sqft: 7800, scale_acres: 135, investor_score: 5, status: 'Available', rera_status: 'Registered', cluster_category: 'Township', township_typology: 'Integrated Township', project_type: 'Mixed Use', latitude: 13.2547, longitude: 77.6675, rera_number: 'PRM/KA/RERA/002', key_highlights: [], payment_plan_detail: '20:80', scarcity_level: 'Very High', infra_trigger_score: 9, strategic_quadrant: 'High Growth', headline_angle: 'Near KIAL', differentiator: '135 acres', infra_hook: 'Airport', ideal_buyer_persona: ['Investor'], end_user_score: 4, rental_score: 5, launch_phase: 'Phase 3', early_access_benefit: '3%' },
  { id: '3', name: 'Sobha Neopolis', slug: 'sobha-neopolis', developer: 'Sobha Limited', micro_location: 'Panathur', cluster_name: 'East Bangalore', entry_ticket_cr: 3.2, highest_ticket_cr: 9.8, launch_price_per_sqft: 11200, scale_acres: 25, investor_score: 4, status: 'Available', rera_status: 'Registered', cluster_category: 'Premium', township_typology: 'Gated Community', project_type: 'Apartments', latitude: 12.935, longitude: 77.69, rera_number: 'PRM/KA/RERA/003', key_highlights: [], payment_plan_detail: '10:90', scarcity_level: 'High', infra_trigger_score: 7, strategic_quadrant: 'Premium', headline_angle: 'Ultra-luxury', differentiator: 'Sobha quality', infra_hook: 'ORR', ideal_buyer_persona: ['NRI'], end_user_score: 5, rental_score: 3, launch_phase: 'Phase 1', early_access_benefit: '2%' },
  { id: '4', name: 'Godrej Ananda', slug: 'godrej-ananda', developer: 'Godrej Properties', micro_location: 'Bagalur', cluster_name: 'North Bangalore', entry_ticket_cr: 1.2, highest_ticket_cr: 3.5, launch_price_per_sqft: 6200, scale_acres: 62, investor_score: 4, status: 'Upcoming', rera_status: 'Applied', cluster_category: 'Growth', township_typology: 'Township', project_type: 'Apartments', latitude: 13.1688, longitude: 77.6847, rera_number: 'Applied', key_highlights: [], payment_plan_detail: '30:70', scarcity_level: 'Medium', infra_trigger_score: 8, strategic_quadrant: 'Emerging', headline_angle: 'Aerospace corridor', differentiator: 'Entry price', infra_hook: 'SEZ', ideal_buyer_persona: ['Investor'], end_user_score: 3, rental_score: 4, launch_phase: 'Pre-launch', early_access_benefit: '8%' },
  { id: '5', name: 'Embassy Springs', slug: 'embassy-springs', developer: 'Embassy Group', micro_location: 'Devanahalli', cluster_name: 'North Bangalore', entry_ticket_cr: 2.8, highest_ticket_cr: 12, launch_price_per_sqft: 9800, scale_acres: 288, investor_score: 5, status: 'Available', rera_status: 'Registered', cluster_category: 'Luxury', township_typology: 'Integrated Township', project_type: 'Mixed Use', latitude: 13.22, longitude: 77.71, rera_number: 'PRM/KA/RERA/005', key_highlights: [], payment_plan_detail: '15:85', scarcity_level: 'Very High', infra_trigger_score: 10, strategic_quadrant: 'Invest Now', headline_angle: '288 acre master township', differentiator: "India's largest", infra_hook: 'KIAL', ideal_buyer_persona: ['NRI'], end_user_score: 4, rental_score: 5, launch_phase: 'Phase 4', early_access_benefit: '2%' },
  { id: '6', name: 'Mahindra Zen', slug: 'mahindra-zen', developer: 'Mahindra Lifespaces', micro_location: 'Yelahanka', cluster_name: 'North Bangalore', entry_ticket_cr: 1.5, highest_ticket_cr: 4.2, launch_price_per_sqft: 7200, scale_acres: 30, investor_score: 4, status: 'Available', rera_status: 'Registered', cluster_category: 'Mid-Premium', township_typology: 'Gated Community', project_type: 'Apartments', latitude: 13.1, longitude: 77.595, rera_number: 'PRM/KA/RERA/006', key_highlights: [], payment_plan_detail: '20:80', scarcity_level: 'Medium', infra_trigger_score: 6, strategic_quadrant: 'Steady Growth', headline_angle: 'Sustainable living', differentiator: 'Green certified', infra_hook: 'Metro', ideal_buyer_persona: ['Family'], end_user_score: 5, rental_score: 3, launch_phase: 'Phase 1', early_access_benefit: '4%' },
]

const CLUSTERS = ['All', 'North Bangalore', 'East Bangalore', 'South Bangalore', 'Central Bangalore']
const TYPES = ['All', 'Apartments', 'Villas', 'Mixed Use', 'Plots']
const STATUSES = ['All', 'Available', 'Upcoming']

export default async function ProjectsPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<SearchParams>
}) {
  const searchParams = await searchParamsPromise
  const projects = await getProjects(searchParams)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span className="text-gray-900 font-medium">Projects</span>
          </nav>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Premium Residential Projects</h1>
              <p className="text-gray-500">{projects.length} curated projects across Bangalore&apos;s top clusters</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">Cluster:</label>
            <div className="flex gap-1 flex-wrap">
              {CLUSTERS.map((c) => (
                <Link
                  key={c}
                  href={c === 'All' ? '/projects' : `/projects?cluster=${encodeURIComponent(c)}`}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    (c === 'All' && !searchParams.cluster) || searchParams.cluster === c
                      ? 'bg-primary border-primary text-black'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">Status:</label>
            <div className="flex gap-1">
              {STATUSES.map((s) => (
                <Link
                  key={s}
                  href={s === 'All' ? '/projects' : `/projects?status=${s}`}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    (s === 'All' && !searchParams.status) || searchParams.status === s
                      ? 'bg-primary border-primary text-black'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                  }`}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No projects found matching your filters.</p>
            <Link href="/projects" className="btn-primary inline-flex mt-4">Clear Filters</Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
