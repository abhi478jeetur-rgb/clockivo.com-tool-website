import { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getAllPosts } from "@/lib/blog"
import { format } from "date-fns"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog - Time Management Tips & Productivity Guides",
  description:
    "Read expert tips on time management, productivity techniques, and how to get the most out of Clockivo's free browser-based timing tools.",
  alternates: { canonical: "/blog" },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Clockivo Blog",
    description: "Time management tips, productivity guides, and study techniques.",
    url: "https://clockivo.com/blog",
    hasPart: posts.map((post) => ({
      "@type": "Article",
      headline: post.frontmatter.title,
      url: `https://clockivo.com/blog/${post.slug}`,
      datePublished: post.frontmatter.date,
      author: { "@type": "Person", name: post.frontmatter.author },
    })),
  }

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-8">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase flex items-center justify-center sm:justify-start gap-1.5 mb-2">
            <BookOpen className="w-4 h-4" /> Insights & Guides
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Clockivo Blog
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed mt-2">
            Tips, techniques, and strategies for better time management and productivity. All backed by free tools you can use right now.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl bg-card border border-border/50 p-6 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <time className="text-xs text-muted-foreground">
                  {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
                </time>
                <h2 className="text-lg font-bold tracking-tight text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">
                  {post.frontmatter.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {post.frontmatter.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
