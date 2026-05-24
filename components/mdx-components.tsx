import Link from "next/link"
import { ArrowRight } from "lucide-react"

function CTACard({
  title,
  description,
  href,
  linkText,
}: {
  title: string
  description: string
  href: string
  linkText: string
}) {
  return (
    <div className="my-8 p-6 rounded-2xl bg-card/40 backdrop-blur-md border border-primary/20 shadow-sm">
      <h3 className="text-lg font-bold tracking-tight text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        {linkText} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

export const mdxComponents = {
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-bold tracking-tight mt-12 mb-4 text-foreground"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-semibold mt-8 mb-3 text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-muted-foreground leading-relaxed mb-4"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link
      href={href || "#"}
      className="text-primary hover:underline font-medium"
      {...props}
    >
      {children}
    </Link>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc pl-6 space-y-2 text-muted-foreground mb-6"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({
    children,
    ...props
  }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-6"
      {...props}
    >
      {children}
    </blockquote>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border/50" {...props} />
  ),
  CTACard,
}
