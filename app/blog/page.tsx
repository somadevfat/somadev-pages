import { getContents, type ArticleData, type TagCount } from '@/lib/articles';
import BlogPageClient from '@/components/BlogPageClient';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default async function ArticlesPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const allArticles: ArticleData[] = await getContents('articles');
  const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page, 10) : 1;
  const limit = 10;
  
  const totalArticles = allArticles.length;
  const totalPages = Math.ceil(totalArticles / limit);
  const offset = (page - 1) * limit;

  const articlesForPage = allArticles.slice(offset, offset + limit);

  const tags: TagCount = allArticles.reduce((acc: TagCount, article) => {
    article.tags?.forEach((tag: string) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  return (
    <BlogPageClient 
      articles={articlesForPage} 
      tags={tags} 
      totalArticles={totalArticles}
      currentPage={page}
      totalPages={totalPages}
    />
  );
} 