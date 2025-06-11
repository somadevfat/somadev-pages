import ArticleEditorForm from '@/components/ArticleEditorForm';
import { getContent } from '@/lib/api-client';
import { notFound } from 'next/navigation';

interface EditArticlePageProps {
  params: {
    slug: string;
  };
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { slug } = params;
  const article = await getContent('articles', slug);

  if (!article) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Post</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <ArticleEditorForm article={article} />
      </div>
    </div>
  );
} 