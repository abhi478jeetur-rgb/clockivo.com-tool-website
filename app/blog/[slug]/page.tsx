import { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdContainer from "@/components/ad-container"
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
          {post.frontmatter.videoUrl || post.frontmatter.imageUrl ? (
            <header className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden mb-12 flex flex-col justify-end p-6 sm:p-10 shadow-2xl">
              {post.frontmatter.videoUrl ? (
                <video
                  src={post.frontmatter.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={post.frontmatter.imageUrl}
                  alt={post.frontmatter.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              <div className="relative z-10 max-w-3xl">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-primary/90 text-primary-foreground font-semibold backdrop-blur-md shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white drop-shadow-lg">
                  {post.frontmatter.title}
                </h1>
                <p className="text-gray-200 text-lg sm:text-xl leading-relaxed max-w-2xl mb-6 font-medium drop-shadow-md">
                  {post.frontmatter.description}
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                  <span>{post.frontmatter.author}</span>
                  <span>•</span>
                  <time>
                    {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
                  </time>
                </div>
              </div>
            </header>
          ) : (
            <header className="mb-10">
              <time className="text-sm font-medium text-muted-foreground block mb-3">
                {format(new Date(post.frontmatter.date), "MMMM d, yyyy")} • {post.frontmatter.author}
              </time>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 text-foreground leading-tight">
                {post.frontmatter.title}
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-3xl mb-6">
                {post.frontmatter.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>
          )}

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          <AdContainer size="leaderboard" className="mt-10" />
        </article>
      </main>

      <Footer />
    </div>
  )
}
