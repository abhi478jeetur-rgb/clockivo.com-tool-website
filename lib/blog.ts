import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export interface BlogPostFrontmatter {
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  videoUrl?: string
  imageUrl?: string
}

export interface BlogPost {
  slug: string
  frontmatter: BlogPostFrontmatter
  content: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8")
    const { data, content } = matter(raw)

    return {
      slug,
      frontmatter: data as BlogPostFrontmatter,
      content,
    }
  })

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return undefined

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    slug,
    frontmatter: data as BlogPostFrontmatter,
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}
