import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

if (!process.env.DATABASE_URL) {
  console.error("[v0] DATABASE_URL não configurada!")
}

const sql = neon(process.env.DATABASE_URL!)

// GET - Listar todos os projetos
export async function GET() {
  try {
    console.log("[v0] Fetching all projects...")
    const projects = await sql`
      SELECT id, title, description, image_url, project_url, created_at
      FROM projects 
      ORDER BY created_at DESC
    `
    console.log("[v0] Found projects:", projects.length)
    return NextResponse.json(projects)
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    return NextResponse.json({ error: "Erro ao buscar projetos" }, { status: 500 })
  }
}

// POST - Adicionar novo projeto
export async function POST(request: Request) {
  try {
    const { title, description, image_url, project_url } = await request.json()
    console.log("[v0] Creating project:", { title, description, image_url, project_url })

    if (!title || !description || !image_url || !project_url) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO projects (title, description, image_url, project_url)
      VALUES (${title}, ${description}, ${image_url}, ${project_url})
      RETURNING *
    `

    console.log("[v0] Project created:", result[0])
    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating project:", error)
    return NextResponse.json({ error: "Erro ao criar projeto" }, { status: 500 })
  }
}

// PUT - Atualizar projeto existente
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 })
    }

    const { title, description, image_url, project_url } = await request.json()

    if (!title || !description || !image_url || !project_url) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    const result = await sql`
      UPDATE projects 
      SET title = ${title}, 
          description = ${description}, 
          image_url = ${image_url}, 
          project_url = ${project_url}
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("[v0] Error updating project:", error)
    return NextResponse.json({ error: "Erro ao atualizar projeto" }, { status: 500 })
  }
}

// DELETE - Remover projeto
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 })
    }

    await sql`DELETE FROM projects WHERE id = ${id}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting project:", error)
    return NextResponse.json({ error: "Erro ao deletar projeto" }, { status: 500 })
  }
}
