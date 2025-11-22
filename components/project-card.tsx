'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

interface ProjectCardProps {
  project: {
    id: string | number
    title: string
    description: string
    image: string
    link: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={itemVariants}>
      <Card className="group overflow-hidden bg-card border-white/10 hover:border-purple-500/50 transition-all duration-300 h-full">
        <div className="relative aspect-video overflow-hidden bg-zinc-900">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-foreground group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-balance">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors font-medium"
          >
            Ver Projeto
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </Card>
    </motion.div>
  )
}
