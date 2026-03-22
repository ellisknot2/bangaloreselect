'use client'

import dynamic from 'next/dynamic'
import type { Project } from '@/lib/types'

const MapboxMap = dynamic(() => import('./MapboxMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" style={{ borderWidth: '3px' }} />
        <p className="text-sm text-gray-500">Loading map...</p>
      </div>
    </div>
  ),
})

interface ProjectMapSectionProps {
  project: Project
}

export default function ProjectMapSection({ project }: ProjectMapSectionProps) {
  return (
    <MapboxMap
      projects={[project]}
      height="300px"
      center={[project.longitude || 77.5946, project.latitude || 13.0827]}
      zoom={14}
      singleProject
    />
  )
}
