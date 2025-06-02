import Layout from '@/components/Layout';
import { getArticleDataBySlug, getAllArticleSlugs, ArticleData } from '@/lib/articles';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const articles = getAllArticleSlugs();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  try {
    const article = await getArticleDataBySlug(params.slug);
    return {
      title: article.title,
      description: article.summary,
    };
  } catch (error) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }
}

export default async function ArticlePage({ params }: Props) {
  let article: (ArticleData & { contentHtml: string });
  try {
    article = await getArticleDataBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  return (
    <Layout>
      <article className="my-8 prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-sm text-gray-500 mb-6">Published on: {article.date}</p>
        <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
      </article>
    </Layout>
  );
} 