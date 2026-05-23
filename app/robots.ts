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
      ],
      disallow: [
        '/api/',                 // API routes
        '/*?*',                  // Block crawling of URLs with query parameters to avoid duplication
        '/preview/',             // Preview changes
        '/dev/',                 // Dev environments
        '/admin/',               // Admin pages
        '/fullscreen*',          // Block standalone fullscreen pages to avoid low-content index issues
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
