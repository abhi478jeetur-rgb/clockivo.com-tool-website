import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Use production URL - clockivo.com
  const baseUrl = 'https://clockivo.com'

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/alarm-clock',
        '/timer',
        '/stopwatch',
        '/digital-clock',
        '/analog-clock',
        '/world-clock',
        '/help',
        '/about',
        '/contact',
        '/timer-vs-stopwatch',
      ],
      disallow: [
        '/api/',                 // API routes
        '/*?*',                  // Block crawling of URLs with query parameters to avoid duplication
        '/preview/',             // Preview changes
        '/dev/',                 // Dev environments
        '/admin/',               // Admin pages
        '/fullscreen*',          // Block standalone fullscreen pages to avoid low-content index issues
        '/embed/',               // Disallow raw widget pages to prevent duplicate/thin content indexing
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
