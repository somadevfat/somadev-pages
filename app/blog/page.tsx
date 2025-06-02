import Layout from '@/components/Layout';
import Link from 'next/link';
import { getSortedArticlesData, ArticleData } from '@/lib/articles';

export default function BlogPage() {
  const articles = getSortedArticlesData();

  return (
    <Layout>
      <section className="my-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        {articles.length === 0 ? (
          <p className="text-center text-gray-600">No articles found.</p>
        ) : (
          <ul className="space-y-6">
            {articles.map((article) => (
              <li key={article.slug} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/blog/${article.slug}`} className="block group">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-800 group-hover:text-chicBlue">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                  <p className="text-gray-700">{article.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  );
} 