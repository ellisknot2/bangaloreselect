'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import type { Cluster, Project } from '@/lib/types'

const MapboxMap = dynamic(() => import('./MapboxMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" style={{ borderWidth: '3px' }} />
    </div>
  ),
})

interface ClusterHeroProps {
  cluster: Cluster
  projects: Project[]
}

export default function ClusterHero({ cluster, projects }: ClusterHeroProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="relative bg-gray-900 h-[500px] overflow-hidden">
      {/* Map background */}
      <div className="absolute inset-0">
        <MapboxMap
          projects={projects}
          onProjectSelect={setSelectedProject}
          selectedProjectId={selectedProject?.id}
          height="100%"
          zoom={12}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none" />
      </div>

      {/* Cluster Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">
                {cluster.price_momentum}
              </span>
              <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                {cluster.total_active_projects} Active Projects
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-1 drop-shadow-lg">
              {cluster.name}
            </h1>
            <p className="text-gray-300 text-sm">
              {cluster.investor_sentiment} · {cluster.upcoming_launches} Upcoming Launches
            </p>
          </div>

          {/* Project List Sidebar — on map */}
          {projects.length > 0 && (
            <div className="hidden lg:block w-72 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden max-h-64">
              <div className="p-3 bg-gray-900 text-white text-xs font-bold">{projects.length} Projects in {cluster.name}</div>
              <div className="overflow-y-auto max-h-52">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id === selectedProject?.id ? null : project)}
                    className={`w-full text-left px-3 py-2.5 border-b border-gray-50 hover:bg-amber-50 transition-colors text-sm ${
                      selectedProject?.id === project.id ? 'bg-amber-50 border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <p className="font-semibold text-gray-900 leading-tight">{project.name}</p>
                    <p className="text-xs text-gray-500">{project.developer} · ₹{project.entry_ticket_cr}Cr+</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
