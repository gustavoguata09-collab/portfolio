"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Trash2, Plus, LogOut } from "lucide-react"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  image: string
  link: string
}

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Project>({
    id: "",
    title: "",
    description: "",
    image: "",
    link: "",
  })

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
      loadProjects()
    }
  }, [])

  const loadProjects = () => {
    const stored = localStorage.getItem("portfolioProjects")
    if (stored) {
      setProjects(JSON.parse(stored))
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "guedes2024") {
      sessionStorage.setItem("adminAuth", "true")
      setIsAuthenticated(true)
      loadProjects()
    } else {
      alert("Senha incorreta!")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
    router.push("/")
  }

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    const projectWithId = {
      ...newProject,
      id: Date.now().toString(),
    }
    const updatedProjects = [...projects, projectWithId]
    setProjects(updatedProjects)
    localStorage.setItem("portfolioProjects", JSON.stringify(updatedProjects))
    setNewProject({ id: "", title: "", description: "", image: "", link: "" })
  }

  const handleDeleteProject = (id: string) => {
    const updatedProjects = projects.filter((p) => p.id !== id)
    setProjects(updatedProjects)
    localStorage.setItem("portfolioProjects", JSON.stringify(updatedProjects))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-zinc-900 border-zinc-800">
          <div className="flex justify-center mb-6">
            <Image src="/images/guedes-logo.png" alt="Guedes Logo" width={80} height={80} className="rounded-lg" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-white">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="Digite a senha"
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Image src="/images/guedes-logo.png" alt="Guedes Logo" width={60} height={60} className="rounded-lg" />
            <h1 className="text-4xl font-bold">Painel Admin</h1>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2 bg-transparent">
            <LogOut size={16} />
            Sair
          </Button>
        </div>

        {/* Form to add new project */}
        <Card className="p-6 mb-8 bg-zinc-900 border-zinc-800">
          <h2 className="text-2xl font-bold mb-4">Adicionar Novo Projeto</h2>
          <form onSubmit={handleAddProject} className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="image">URL da Imagem</Label>
              <Input
                id="image"
                value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="/placeholder.svg?height=300&width=400"
                required
              />
            </div>
            <div>
              <Label htmlFor="link">Link do Projeto</Label>
              <Input
                id="link"
                value={newProject.link}
                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 gap-2">
              <Plus size={16} />
              Adicionar Projeto
            </Button>
          </form>
        </Card>

        {/* List of projects */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Projetos ({projects.length})</h2>
          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="p-4 bg-zinc-900 border-zinc-800 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-zinc-400">{project.description}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 text-sm">
                    {project.link}
                  </a>
                </div>
                <Button onClick={() => handleDeleteProject(project.id)} variant="destructive" size="icon">
                  <Trash2 size={16} />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
