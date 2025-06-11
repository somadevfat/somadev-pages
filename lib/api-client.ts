import { Content } from '@/types/content';

const dummyArticles: Content[] = [
  {
    slug: 'first-post',
    title: 'My First Post',
    content: 'This is the content of my very first post!',
    metadata: { author: 'Soma', date: '2024-01-10' },
  },
  {
    slug: 'tailwind-css-guide',
    title: 'A Guide to Tailwind CSS',
    content: '## Getting Started\n\nTailwind CSS is a utility-first CSS framework...',
    metadata: { author: 'Soma', date: '2024-02-20' },
  },
  {
    slug: 'nextjs-14-features',
    title: 'New Features in Next.js 14',
    content: 'Next.js 14 introduced Server Actions and more.',
    metadata: { author: 'Soma', date: '2024-03-15' },
  },
];

export async function getContents(type: string): Promise<Content[]> {
  console.log(`Fetching contents for type: ${type}`);
  // In the future, this will make a real API call.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyArticles);
    }, 500); // Simulate network delay
  });
}

export async function getContent(type: string, slug: string): Promise<Content | undefined> {
  console.log(`Fetching content for type: ${type}, slug: ${slug}`);
  // In the future, this will make a real API call.
  return new Promise((resolve) => {
    setTimeout(() => {
      const article = dummyArticles.find((a) => a.slug === slug);
      resolve(article);
    }, 500); // Simulate network delay
  });
} 