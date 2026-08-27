import { MetadataRoute } from 'next';
import { careers } from '@/data/careers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const staticRoutes = [
    '',
    '/explore',
    '/compare',
    '/quiz',
    '/profile',
    '/feedback',
    '/support',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const careerRoutes = careers.map((career) => ({
    url: `${baseUrl}/career/${career.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...careerRoutes];
}
