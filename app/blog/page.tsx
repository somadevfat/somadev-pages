import { getArticles, getAllTags } from '@/lib/articles';
import BlogPageClient from '@/components/BlogPageClient';
import { Suspense } from 'react';

export default function ArticlesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page || 1);
  const limit = 10;
  
  const { articles, totalArticles } = getArticles({ page, limit });
  const tags = getAllTags();
  
  const totalPages = Math.ceil(totalArticles / limit);

  return (
    <Suspense>
      <BlogPageClient 
        articles={articles} 
        tags={tags} 
        totalArticles={totalArticles}
        currentPage={page}
        totalPages={totalPages}
      />
    </Suspense>
  );
} 