'use client';

import { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Content } from '@/types/content';
import { useRouter } from 'next/navigation';
import { updateContent, createContent, getContents } from '@/lib/api-client';
import TagInput from './TagInput';

interface ArticleEditorFormProps {
  article?: Content;
}

export default function ArticleEditorForm({ article }: ArticleEditorFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (article) {
      setTitle(article.metadata.title || '');
      setSlug(article.slug);
      setMarkdown(article.body);
      if (Array.isArray(article.metadata.tags)) {
        setTags(article.metadata.tags as string[]);
      }
    }
  }, [article]);

  useEffect(() => {
    // fetch existing tags
    (async () => {
      try {
        const contents = await getContents('articles');
        const tagSet = new Set<string>();
        contents.forEach((c) => {
          if (Array.isArray(c.metadata.tags)) {
            (c.metadata.tags as string[]).forEach((t) => tagSet.add(t));
          }
        });
        setAllTags(Array.from(tagSet));
      } catch {
        // ignore errors; suggestions optional
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (article) {
        // Update existing article
        await updateContent('articles', article.slug, {
          title,
          content: markdown,
          tags,
        });
        setSuccessMessage('Article updated successfully!');
        setTimeout(() => {
          router.push('/admin/articles');
        }, 1500);
      } else {
        // Create new article
        await createContent('articles', {
          slug,
          title,
          content: markdown,
          tags,
        });
        setSuccessMessage('Article created successfully!');
        setTimeout(() => {
          router.push('/admin/articles');
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(`Failed to save post: ${err.message}`);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500 text-gray-900"
          placeholder="your-post-slug"
          disabled={!!article} // Disable slug editing for existing articles
          required={!article} // New article creation requires slug
        />
      </div>
      
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>

        {/* 既存タグ一覧 */}
        {allTags.filter((t) => !tags.includes(t)).length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {allTags.filter((t) => !tags.includes(t)).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTags([...tags, t])}
                className="px-2 py-1 text-xs rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <TagInput 
          tags={tags} 
          onChange={setTags} 
          placeholder="Press Enter or Tab to add tags..."
          suggestions={allTags}
        />
        <p className="mt-1 text-xs text-gray-500">
          Press Enter or Tab to add a tag. Click X or press Backspace to remove.
        </p>
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
            preview="edit"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : (article ? 'Update Post' : 'Save Post')}
        </button>
      </div>
    </form>
  );
} 