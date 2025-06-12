import Layout from '@/components/Layout';
import { getContent } from '@/lib/api-client';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { remark } from 'remark';
import html from 'remark-html';

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: { slug: string } },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const article = await getContent('articles', params.slug);
    if (!article) {
      return { title: 'Article Not Found' };
    }
    return {
      title: article.metadata.title,
      description: article.metadata.summary,
    };
  } catch {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getContent('articles', params.slug);

  if (!article) {
    notFound();
  }

  const processedContent = await remark().use(html).process(article.body);
  const contentHtml = processedContent.toString();

  return (
    <Layout>
      <article className="py-section-y">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-heading-lg font-semibold mb-item-gap text-textDark">{article.metadata.title}</h1>
          <div className="flex items-center space-x-2 text-body-sm text-gray-500 mb-content-gap">
            <span>Published on: {article.metadata.date}</span>
            {article.metadata.tags && article.metadata.tags.length > 0 && <span>·</span>}
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {article.metadata.tags?.map((tag: string) => (
                <Link href={`/blog?tag=${tag}`} key={tag} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-sm text-xs hover:bg-chicBlue hover:text-white">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </article>
      <div className="container mx-auto px-4">
        <hr className="my-section-y border-t border-gray-200" />
      </div>
    </Layout>
  );
} 