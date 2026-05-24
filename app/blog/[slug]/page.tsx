import { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getAllPosts, getPostBySlug, getAllSlugs } from "@/lib/blog"
import { mdxComponents } from "@/components/mdx-components"
import { format } from "date-fns"

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `https://clockivo.com/blog/${slug}`,
      siteName: "Clockivo",
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
      tags: post.frontmatter.tags,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    author: { "@type": "Person", name: post.frontmatter.author },
    publisher: {
      "@type": "Organization",
      name: "Clockivo",
      url: "https://clockivo.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://clockivo.com/blog/${slug}`,
    },
    keywords: post.frontmatter.tags.join(", "),
  }

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-8">
        <article className="pb-12">
          <header className="mb-8">
            <time className="text-sm text-muted-foreground">
              {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
            </time>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 text-foreground">
              {post.frontmatter.title}
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
              {post.frontmatter.description}
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
