import Layout from '@/components/Layout';
import { getArticleDataBySlug, getAllArticleSlugs, ArticleData } from '@/lib/articles';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const articles = getAllArticleSlugs();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const slug = params?.slug as string;
    if (!slug) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.',
      };
    }
    const article = await getArticleDataBySlug(slug);
    return {
      title: article.title,
      description: article.summary,
    };
  } catch {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ArticlePage({ params }: any) {
  let article: (ArticleData & { contentHtml: string });
  try {
    const slug = params?.slug as string;
    if (!slug) {
      notFound();
    }
    article = await getArticleDataBySlug(slug);
  } catch {
    notFound();
  }

  if (!article) {
    notFound();
  }

  return (
    <Layout>
      <article className="py-section-y">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-heading-lg font-semibold mb-item-gap text-textDark">{article.title}</h1>
          <div className="flex items-center space-x-2 text-body-sm text-gray-500 mb-content-gap">
            <span>Published on: {article.date}</span>
            {article.tags.length > 0 && <span>·</span>}
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {article.tags.map(tag => (
                <Link href={`/blog?tag=${tag}`} key={tag} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-sm text-xs hover:bg-chicBlue hover:text-white">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
        </div>
      </article>
      <div className="container mx-auto px-4">
        <hr className="my-section-y border-t border-gray-200" />
      </div>
    </Layout>
  );
} 