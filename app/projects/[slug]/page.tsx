import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeadForm from '@/components/LeadForm'
import EMICalculator from '@/components/EMICalculator'
import ProjectMapSection from '@/components/ProjectMapSection'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/lib/types'

interface Props {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) return null
    return data as Project
  } catch {
    return null
  }
}

interface AdjacentProject {
  id: string
  name: string
  slug: string
  developer: string
  entry_ticket_cr: number
  highest_ticket_cr: number
  micro_location: string
}

async function getAdjacentProjects(slug: string, clusterName: string): Promise<AdjacentProject[]> {
  try {
    const { data } = await supabase
      .from('projects')
      .select('id, name, slug, developer, entry_ticket_cr, highest_ticket_cr, micro_location')
      .eq('cluster_name', clusterName)
      .neq('slug', slug)
      .limit(2)
    return (data as AdjacentProject[]) || []
  } catch {
    return []
  }
}

function ScoreBar({ label, score, maxScore = 10, color = 'bg-primary' }: { label: string; score: number; maxScore?: number; color?: string }) {
  const pct = (score / maxScore) * 100
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{score}/{maxScore}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default async function ProjectDetailPage({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  const project = await getProject(params.slug)

  if (!project) {
    // Use mock data for demonstration
    return <ProjectDetailMock slug={params.slug} />
  }

  const adjacent = await getAdjacentProjects(params.slug, project.cluster_name)
  const loanAmount = Math.round((project.entry_ticket_cr * 10000000) * 0.8)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <Link href={`/clusters/${project.cluster_name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary transition-colors">{project.cluster_name}</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span className="text-gray-900 font-medium">{project.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          {/* Tags Row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={project.status?.toLowerCase() === 'available' ? 'badge-available' : 'badge-upcoming'}>
              {project.status || 'Available'}
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
              {project.developer}
            </span>
            {project.rera_number && (
              <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                RERA: {project.rera_number}
              </span>
            )}
          </div>

          {/* Prev/Next */}
          {adjacent.length > 0 && (
            <div className="flex gap-2 mb-4">
              {adjacent[0] && (
                <Link href={`/projects/${adjacent[0].slug}`} className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                  Prev
                </Link>
              )}
              {adjacent[1] && (
                <Link href={`/projects/${adjacent[1].slug}`} className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors">
                  Next
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </Link>
              )}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{project.name}</h1>

          <div className="flex items-center gap-2 text-gray-500 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{project.micro_location}, {project.cluster_name}, Bangalore</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-3xl font-extrabold text-green-600">
              ₹{project.entry_ticket_cr} Cr
              {project.highest_ticket_cr > project.entry_ticket_cr && ` – ₹${project.highest_ticket_cr} Cr`}
            </span>
            {project.launch_price_per_sqft > 0 && (
              <span className="text-gray-400 text-base">₹{project.launch_price_per_sqft.toLocaleString()}/sqft onwards</span>
            )}
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Scale</p>
              <p className="font-bold text-gray-900">{project.scale_acres} Acres</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Type</p>
              <p className="font-bold text-gray-900">{project.project_type || 'Residential'}</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Investor Score</p>
              <p className="font-bold text-gray-900">{project.investor_score}/5</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div>
              <p className="text-xs text-gray-400 mb-0.5">3Y Appreciation</p>
              <p className="font-bold text-green-600">~{25 + project.infra_trigger_score * 2}%</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Launch Phase</p>
              <p className="font-bold text-gray-900">{project.launch_phase || 'Phase 1'}</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Headline */}
            {project.headline_angle && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <p className="text-sm text-amber-700 font-semibold mb-1">Why This Project</p>
                <p className="text-gray-800 font-medium">{project.headline_angle}</p>
                {project.differentiator && (
                  <p className="text-gray-600 text-sm mt-2">{project.differentiator}</p>
                )}
              </div>
            )}

            {/* Location Map */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location & Connectivity</h2>
              <ProjectMapSection project={project} />

              {/* Connectivity Distances */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {[
                  { icon: '🚇', label: 'Metro Station', dist: '2.5 km' },
                  { icon: '💻', label: 'IT Hub', dist: '8 km' },
                  { icon: '✈️', label: 'Airport', dist: '18 km' },
                  { icon: '🛒', label: 'Mall', dist: '4 km' },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-2xl mb-1">{item.icon}</p>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-bold text-gray-900">{item.dist}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Intelligence */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location Intelligence Scores</h2>
              <div className="space-y-3 bg-white border border-gray-100 rounded-xl p-5">
                <ScoreBar label="Infrastructure Trigger Score" score={project.infra_trigger_score} color="bg-primary" />
                <ScoreBar label="Investor Score" score={project.investor_score * 2} color="bg-green-500" />
                <ScoreBar label="End User Score" score={project.end_user_score * 2} color="bg-blue-500" />
                <ScoreBar label="Rental Yield Score" score={project.rental_score * 2} color="bg-purple-500" />
              </div>
            </div>

            {/* Investment Analytics */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Investment Performance Analytics</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Projected ROI (3Y)', value: `${25 + project.infra_trigger_score * 2}%`, icon: '📈', color: 'text-green-600' },
                  { label: 'Rental Yield', value: '3.8%', icon: '🏠', color: 'text-blue-600' },
                  { label: 'Capital Appreciation', value: '12% p.a.', icon: '💰', color: 'text-primary' },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <p className="text-2xl mb-2">{item.icon}</p>
                    <p className={`text-xl font-extrabold ${item.color}`}>{item.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Specs */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Property Specifications</h2>
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      { label: 'Developer', value: project.developer },
                      { label: 'Project Type', value: project.project_type || 'Residential' },
                      { label: 'Township Typology', value: project.township_typology || 'Gated Community' },
                      { label: 'Scale', value: `${project.scale_acres} Acres` },
                      { label: 'Launch Phase', value: project.launch_phase || 'Phase 1' },
                      { label: 'RERA Number', value: project.rera_number || 'Applied' },
                      { label: 'RERA Status', value: project.rera_status || 'Registered' },
                      { label: 'Scarcity Level', value: project.scarcity_level || 'High' },
                      { label: 'Strategic Quadrant', value: project.strategic_quadrant || 'Premium Growth' },
                      { label: 'Payment Plan', value: project.payment_plan_detail || '20:80' },
                    ].map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 font-medium text-gray-500 w-1/3">{row.label}</td>
                        <td className="px-4 py-3 text-gray-900 font-medium">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Highlights */}
            {project.key_highlights && project.key_highlights.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.key_highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Developer Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Developer</h2>
              <div className="bg-white border border-gray-100 rounded-xl p-5 flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-lg font-bold text-gray-600 shrink-0">
                  {project.developer.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{project.developer}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Established developer with a track record of premium residential projects across Bangalore.
                    Known for quality construction, timely delivery, and strong after-sales service.
                  </p>
                  <div className="flex gap-4 mt-3 text-xs text-gray-500">
                    <span>⭐ 4.5/5 Rating</span>
                    <span>📋 25+ Projects</span>
                    <span>🏠 5000+ Units Delivered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Gallery */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Property Gallery</h2>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            {/* Express Interest Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm sticky top-20">
              <h3 className="font-bold text-gray-900 mb-1">Express Your Interest</h3>
              <p className="text-sm text-gray-500 mb-4">Get exclusive pricing & site visit details</p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button className="flex items-center justify-center gap-1.5 text-sm font-medium border border-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  Favourite
                </button>
                <button className="flex items-center justify-center gap-1.5 text-sm font-medium border border-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="8" height="8" />
                    <rect x="13" y="3" width="8" height="8" />
                    <rect x="3" y="13" width="8" height="8" />
                    <rect x="13" y="13" width="8" height="8" />
                  </svg>
                  Compare
                </button>
              </div>

              <LeadForm projectId={project.id} clusterName={project.cluster_name} compact />

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-1.5 text-xs font-medium bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Schedule Visit
                </button>
                <button className="flex items-center justify-center gap-1.5 text-xs font-medium bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  Virtual Tour
                </button>
              </div>
            </div>

            {/* Payment Scheme */}
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3">Payment Scheme</h3>
              <p className="text-2xl font-extrabold text-primary mb-1">{project.payment_plan_detail || '20:80'}</p>
              <p className="text-xs text-gray-400 mb-4">Construction-linked plan</p>

              <div className="space-y-2">
                {[
                  { milestone: 'Booking Amount', percentage: 10, color: 'bg-primary' },
                  { milestone: 'On Agreement', percentage: 10, color: 'bg-yellow-400' },
                  { milestone: 'On Completion (80%)', percentage: 80, color: 'bg-gray-200' },
                ].map((item) => (
                  <div key={item.milestone} className="flex items-center gap-3 text-sm">
                    <div className="w-24 text-gray-500 text-xs shrink-0">{item.milestone}</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full flex items-center pl-2`}
                        style={{ width: `${item.percentage}%` }}
                      >
                        <span className="text-xs font-bold text-black/70">{item.percentage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EMI Calculator */}
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-4">EMI Calculator</h3>
              <EMICalculator defaultAmount={loanAmount} />
            </div>

            {/* Market Intelligence */}
            <div className="bg-dark rounded-xl p-5 text-white">
              <h3 className="font-bold text-white mb-3">Market Intelligence</h3>
              <div className="space-y-3">
                {[
                  { label: 'Cluster Appreciation', value: '35% (3Y)', icon: '📈' },
                  { label: 'Demand Index', value: project.scarcity_level || 'High', icon: '🔥' },
                  { label: 'Infra Trigger', value: project.infra_hook || 'Metro + Airport', icon: '🏗️' },
                  { label: 'Buyer Profile', value: (project.ideal_buyer_persona || ['NRI', 'Investor']).join(', '), icon: '👤' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-semibold text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Mock fallback for demo
async function ProjectDetailMock({ slug }: { slug: string }) {
  const mockProject: Project = {
    id: '1',
    name: slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    slug,
    developer: 'Prestige Group',
    micro_location: 'Whitefield',
    cluster_name: 'East Bangalore',
    township_typology: 'Integrated Township',
    cluster_category: 'Premium',
    scale_acres: 80,
    longitude: 77.75,
    latitude: 12.9716,
    project_type: 'Mixed Use',
    launch_phase: 'Phase 2',
    rera_number: 'PRM/KA/RERA/1251/308/PR/001',
    rera_status: 'Registered',
    launch_price_per_sqft: 9500,
    entry_ticket_cr: 2.5,
    highest_ticket_cr: 8.5,
    early_access_benefit: '5% Pre-launch discount',
    ideal_buyer_persona: ['NRI', 'IT Professional', 'Investor'],
    investor_score: 5,
    end_user_score: 4,
    rental_score: 4,
    scarcity_level: 'High',
    infra_trigger_score: 8,
    strategic_quadrant: 'Invest Now',
    headline_angle: 'Largest integrated township in Whitefield with seamless metro connectivity',
    differentiator: '80-acre integrated township with 5000+ units, world-class clubhouse, and retail precinct',
    infra_hook: 'Purple Metro Line | ITPL | ORR',
    key_highlights: [
      '80 acres integrated township',
      'Purple Metro Line walkable',
      'World-class 2-acre clubhouse',
      '5000+ residential units',
      'Retail & commercial precinct',
      'International school within campus',
    ],
    payment_plan_detail: '10:80:10',
    status: 'Available',
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <Link href="/clusters" className="hover:text-primary transition-colors">Clusters</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span className="text-gray-900 font-medium">{mockProject.name}</span>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="badge-available">Available</span>
          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">{mockProject.developer}</span>
          <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">RERA: {mockProject.rera_number}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{mockProject.name}</h1>
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          <span>{mockProject.micro_location}, {mockProject.cluster_name}, Bangalore</span>
        </div>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-3xl font-extrabold text-green-600">₹{mockProject.entry_ticket_cr} Cr – ₹{mockProject.highest_ticket_cr} Cr</span>
          <span className="text-gray-400 text-base">₹{mockProject.launch_price_per_sqft.toLocaleString()}/sqft onwards</span>
        </div>
        <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-xl mb-8">
          <div><p className="text-xs text-gray-400 mb-0.5">Scale</p><p className="font-bold text-gray-900">{mockProject.scale_acres} Acres</p></div>
          <div className="w-px bg-gray-200" />
          <div><p className="text-xs text-gray-400 mb-0.5">Type</p><p className="font-bold text-gray-900">{mockProject.project_type}</p></div>
          <div className="w-px bg-gray-200" />
          <div><p className="text-xs text-gray-400 mb-0.5">Investor Score</p><p className="font-bold text-gray-900">{mockProject.investor_score}/5</p></div>
          <div className="w-px bg-gray-200" />
          <div><p className="text-xs text-gray-400 mb-0.5">3Y Appreciation</p><p className="font-bold text-green-600">~35%</p></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
              <p className="text-sm text-amber-700 font-semibold mb-1">Why This Project</p>
              <p className="text-gray-800 font-medium">{mockProject.headline_angle}</p>
              <p className="text-gray-600 text-sm mt-2">{mockProject.differentiator}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location & Connectivity</h2>
              <ProjectMapSection project={mockProject} />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {[{ icon: '🚇', label: 'Metro Station', dist: '2.5 km' },{ icon: '💻', label: 'IT Hub', dist: '8 km' },{ icon: '✈️', label: 'Airport', dist: '18 km' },{ icon: '🛒', label: 'Mall', dist: '4 km' }].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-2xl mb-1">{item.icon}</p>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-bold text-gray-900">{item.dist}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockProject.key_highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                    <span className="text-sm text-gray-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm sticky top-20">
              <h3 className="font-bold text-gray-900 mb-1">Express Your Interest</h3>
              <p className="text-sm text-gray-500 mb-4">Get exclusive pricing & site visit details</p>
              <LeadForm projectId={mockProject.id} clusterName={mockProject.cluster_name} compact />
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-4">EMI Calculator</h3>
              <EMICalculator defaultAmount={Math.round(mockProject.entry_ticket_cr * 10000000 * 0.8)} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
