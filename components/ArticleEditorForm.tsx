'use client';

import { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Content } from '@/types/content';

interface ArticleEditorFormProps {
  article?: Content;
}

export default function ArticleEditorForm({ article }: ArticleEditorFormProps) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setSlug(article.slug);
      setMarkdown(article.content);
    }
  }, [article]);

  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Your Post Title"
        />
      </div>
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          Slug
        </label>
        <input
          type="text"
          name="slug"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
          placeholder="your-post-slug"
          disabled={!!article} // Disable slug editing for existing articles
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <div data-color-mode="light">
          <MDEditor
            value={markdown}
            onChange={(val) => setMarkdown(val || '')}
            height={400}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {article ? 'Update Post' : 'Save Post'}
        </button>
      </div>
    </form>
  );
} 