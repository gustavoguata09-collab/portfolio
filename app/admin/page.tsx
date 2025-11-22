"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, Eye, EyeOff, Upload, ImageIcon, Pencil } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  image_url: string
  project_url: string
  created_at: string
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image_url: "",
    project_url: "",
  })
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [useUrlInput, setUseUrlInput] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth")
    if (auth === "authenticated") {
      setIsAuthenticated(true)
      loadProjects()
    }
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      console.log("[v0] Loading projects from API...")
      const response = await fetch("/api/projects")
      console.log("[v0] API Response status:", response.status)
      if (response.ok) {
        const data = await response.json()
        console.log("[v0] Loaded projects:", data)
        setProjects(data)
      } else {
        console.error("[v0] Failed to load projects:", response.statusText)
      }
    } catch (error) {
      console.error("[v0] Error loading projects:", error)
      alert("Erro ao carregar projetos")
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const adminPassword = "gustavogomes@091gg"
    if (password === adminPassword) {
      setIsAuthenticated(true)
      localStorage.setItem("admin_auth", "authenticated")
      loadProjects()
    } else {
      alert("Senha incorreta!")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin_auth")
    setPassword("")
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setNewProject({
      title: project.title,
      description: project.description,
      image_url: project.image_url,
      project_url: project.project_url,
    })
  }

  const handleCancelEdit = () => {
    setEditingProject(null)
    setNewProject({ title: "", description: "", image_url: "", project_url: "" })
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProject.title || !newProject.description || !newProject.image_url || !newProject.project_url) {
      alert("Preencha todos os campos!")
      return
    }

    try {
      setLoading(true)
      console.log("[v0] Saving project:", newProject)

      if (editingProject) {
        const response = await fetch(`/api/projects?id=${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProject),
        })

        console.log("[v0] Update response:", response.status)

        if (response.ok) {
          setNewProject({ title: "", description: "", image_url: "", project_url: "" })
          setEditingProject(null)
          alert("Projeto atualizado com sucesso!")
          await loadProjects()
        } else {
          const error = await response.json()
          console.error("[v0] Update error:", error)
          alert(`Erro ao atualizar projeto: ${error.error || "Desconhecido"}`)
        }
      } else {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProject),
        })

        console.log("[v0] Create response:", response.status)

        if (response.ok) {
          setNewProject({ title: "", description: "", image_url: "", project_url: "" })
          alert("Projeto adicionado com sucesso!")
          await loadProjects()
        } else {
          const error = await response.json()
          console.error("[v0] Create error:", error)
          alert(`Erro ao adicionar projeto: ${error.error || "Desconhecido"}`)
        }
      }
    } catch (error) {
      console.error("[v0] Error saving project:", error)
      alert("Erro ao salvar projeto")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover este projeto?")) return

    try {
      setLoading(true)
      const response = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        alert("Projeto removido com sucesso!")
        await loadProjects()
      } else {
        alert("Erro ao remover projeto")
      }
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("Erro ao remover projeto")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 4.5 * 1024 * 1024) {
      alert("Imagem muito grande! Máximo 4.5MB")
      return
    }

    try {
      setUploadingImage(true)
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setNewProject({ ...newProject, image_url: data.url })
      } else {
        const errorData = await response.json()
        alert(`Erro ao fazer upload: ${errorData.error || "Erro desconhecido"}`)
      }
    } catch (error) {
      console.error("Image upload error:", error)
      alert("Erro ao fazer upload da imagem")
    } finally {
      setUploadingImage(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <Card className="w-full max-w-md bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Painel Administrativo</CardTitle>
            <CardDescription className="text-center">Entre com sua senha para acessar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Painel Admin</h1>
          <Button onClick={handleLogout} variant="outline" className="bg-white text-black hover:bg-gray-200">
            Sair
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Adicionar/Editar Projeto */}
          <Card className="bg-white text-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {editingProject ? <Pencil size={24} /> : <Plus size={24} />}
                {editingProject ? "Editar Projeto" : "Adicionar Novo Projeto"}
              </CardTitle>
              {editingProject && (
                <CardDescription>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCancelEdit}
                    className="mt-2 bg-transparent"
                  >
                    Cancelar Edição
                  </Button>
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="Nome do projeto"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Descrição do projeto"
                    rows={3}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="image">Imagem do Projeto</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setUseUrlInput(!useUrlInput)}
                      className="text-xs"
                    >
                      {useUrlInput ? (
                        <>
                          <Upload size={14} className="mr-1" />
                          Fazer Upload
                        </>
                      ) : (
                        <>
                          <ImageIcon size={14} className="mr-1" />
                          Usar Link
                        </>
                      )}
                    </Button>
                  </div>

                  {useUrlInput ? (
                    <>
                      <Input
                        id="image"
                        value={newProject.image_url}
                        onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
                        placeholder="https://exemplo.com/imagem.png"
                        disabled={loading}
                      />
                      <p className="text-xs text-gray-500">Cole o link direto da imagem hospedada online</p>
                    </>
                  ) : (
                    <>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        {uploadingImage ? (
                          <div className="py-4">
                            <p className="text-sm text-gray-600">Fazendo upload...</p>
                          </div>
                        ) : newProject.image_url ? (
                          <div className="space-y-2">
                            <img
                              src={newProject.image_url || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded"
                            />
                            <p className="text-xs text-green-600">Imagem carregada!</p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setNewProject({ ...newProject, image_url: "" })}
                              className="text-xs"
                            >
                              Trocar Imagem
                            </Button>
                          </div>
                        ) : (
                          <>
                            <input
                              type="file"
                              id="imageUpload"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              disabled={loading}
                            />
                            <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center gap-2">
                              <Upload size={32} className="text-gray-400" />
                              <p className="text-sm text-gray-600">Clique para escolher imagem</p>
                              <p className="text-xs text-gray-400">Máximo 4.5MB</p>
                            </label>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Link do Projeto</Label>
                  <Input
                    id="link"
                    value={newProject.project_url}
                    onChange={(e) => setNewProject({ ...newProject, project_url: e.target.value })}
                    placeholder="https://seuprojeto.com"
                    disabled={loading}
                  />
                </div>

                <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white" disabled={loading}>
                  {loading
                    ? editingProject
                      ? "Atualizando..."
                      : "Adicionando..."
                    : editingProject
                      ? "Atualizar Projeto"
                      : "Adicionar Projeto"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Lista de Projetos */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Projetos ({projects.length})</h2>
            {loading && projects.length === 0 ? (
              <Card className="bg-white text-black">
                <CardContent className="py-8 text-center text-gray-500">Carregando projetos...</CardContent>
              </Card>
            ) : projects.length === 0 ? (
              <Card className="bg-white text-black">
                <CardContent className="py-8 text-center text-gray-500">Nenhum projeto adicionado ainda</CardContent>
              </Card>
            ) : (
              projects.map((project) => (
                <Card key={project.id} className="bg-white text-black">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline break-all"
                        >
                          {project.project_url}
                        </a>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          onClick={() => handleEditProject(project)}
                          variant="outline"
                          size="icon"
                          disabled={loading}
                        >
                          <Pencil size={18} />
                        </Button>
                        <Button
                          onClick={() => handleDeleteProject(project.id)}
                          variant="destructive"
                          size="icon"
                          disabled={loading}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
