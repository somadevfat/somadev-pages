import ArticleEditorForm from '@/components/ArticleEditorForm';

export default function NewArticlePage() {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Post</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <ArticleEditorForm />
      </div>
    </div>
  );
} 