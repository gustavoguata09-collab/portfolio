"use client"

import { motion } from "framer-motion"
import ProjectCard from "@/components/project-card"
import { useEffect, useState } from "react"

interface Project {
  id: number
  title: string
  description: string
  image_url: string
  project_url: string
  created_at: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("[v0] Fetching projects for homepage...")
        const response = await fetch("/api/projects")
        console.log("[v0] Homepage fetch response:", response.status)
        if (response.ok) {
          const data = await response.json()
          console.log("[v0] Homepage loaded projects:", data.length)
          setProjects(data)
        } else {
          console.error("[v0] Error fetching projects:", response.statusText)
        }
      } catch (error) {
        console.error("[v0] Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <section id="projects" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-balance"
        >
          Projetos
        </motion.h2>

        {loading ? (
          <div className="text-center text-muted-foreground">Carregando projetos...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground">Nenhum projeto disponível no momento.</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 gap-8"
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={{
                  id: project.id.toString(),
                  title: project.title,
                  description: project.description,
                  image: project.image_url,
                  link: project.project_url,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
