import Link from 'next/link'
import type { Cluster } from '@/lib/types'

interface ClusterCardProps {
  cluster: Cluster
}

function MomentumBadge({ momentum }: { momentum: string }) {
  const isUp = momentum?.toLowerCase().includes('up') || momentum?.toLowerCase().includes('rising')
  const isStrong = momentum?.toLowerCase().includes('strong')

  let colorClass = 'bg-gray-100 text-gray-600'
  if (isUp || isStrong) colorClass = 'bg-green-100 text-green-700'
  if (momentum?.toLowerCase().includes('stable')) colorClass = 'bg-blue-100 text-blue-700'

  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colorClass}`}>
      {momentum || 'Stable'}
    </span>
  )
}

function MaturityBar({ score }: { score: number }) {
  const percentage = (score / 10) * 100
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-600">{score}/10</span>
    </div>
  )
}

export default function ClusterCard({ cluster }: ClusterCardProps) {
  return (
    <div className="card hover:shadow-md transition-shadow duration-200 group">
      {/* Header */}
      <div className="p-5 border-b border-gray-50">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-gray-900 text-base group-hover:text-primary transition-colors">
              {cluster.name}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {cluster.total_active_projects} active projects · {cluster.upcoming_launches} upcoming
            </p>
          </div>
          <MomentumBadge momentum={cluster.price_momentum} />
        </div>

        {/* Strategic Outlook */}
        {cluster.strategic_outlook && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
            {cluster.strategic_outlook}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Avg Price/sqft</p>
            <p className="text-sm font-bold text-gray-900">
              ₹{cluster.avg_price_per_sqft?.toLocaleString() || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Investor Sentiment</p>
            <p className="text-sm font-bold text-gray-900 capitalize">
              {cluster.investor_sentiment || 'Positive'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">End User Trend</p>
            <p className="text-sm font-bold text-gray-900 capitalize">
              {cluster.end_user_trend || 'Growing'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Competition</p>
            <p className="text-sm font-bold text-gray-900 capitalize">
              {cluster.competition_density || 'Moderate'}
            </p>
          </div>
        </div>

        {/* Maturity Score */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <p className="text-xs text-gray-400">Maturity Score</p>
          </div>
          <MaturityBar score={cluster.maturity_score || 6} />
        </div>

        {/* Key Infra Tags */}
        {cluster.key_infra_projects && cluster.key_infra_projects.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cluster.key_infra_projects.slice(0, 3).map((infra, idx) => (
              <span
                key={idx}
                className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full"
              >
                {infra}
              </span>
            ))}
            {cluster.key_infra_projects.length > 3 && (
              <span className="text-xs text-gray-400 px-2 py-0.5">
                +{cluster.key_infra_projects.length - 3} more
              </span>
            )}
          </div>
        )}

        <Link
          href={`/clusters/${cluster.slug}`}
          className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-primary border border-primary py-2.5 rounded-lg hover:bg-primary hover:text-black transition-colors group/btn"
        >
          Explore Cluster
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
