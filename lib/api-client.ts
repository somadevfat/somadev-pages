import { Content } from '@/types/content';

// サーバーサイド（Node.js）かクライアントサイド（ブラウザ）かを判定
const isServer = typeof window === 'undefined';

// 実行環境に応じてAPIのベースURLを切り替える
const API_BASE_URL = isServer
  ? process.env.API_BASE_URL_INTERNAL // サーバーサイドでは内部URL
  : process.env.NEXT_PUBLIC_API_BASE_URL; // クライアントサイドでは公開URL

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    // More specific error handling could be added here
    throw new Error(`An error occurred while fetching the data: ${res.statusText}`);
  }
  return res.json();
}

export async function getContents(type: string): Promise<Content[]> {
  console.log(`Fetching contents for type: ${type}`);
  const url = `${API_BASE_URL}/contents/${type}`;
  return fetcher<Content[]>(url);
}

export async function getContent(type: string, slug: string): Promise<Content | undefined> {
  console.log(`Fetching content for type: ${type}, slug: ${slug}`);
  const url = `${API_BASE_URL}/contents/${type}/${slug}`;
  try {
    return await fetcher<Content>(url);
  } catch (error) {
    console.error(`Failed to fetch content for ${slug}:`, error);
    // Depending on requirements, you might return undefined, null, or re-throw
    return undefined;
  }
}

export async function updateContent(
  type: string,
  slug: string,
  data: { title: string; content: string; tags: string[] }
): Promise<Content> {
  const url = `${API_BASE_URL}/contents/${type}/${slug}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`An error occurred while updating the data: ${res.statusText}`);
  }
  return res.json();
}

export async function createContent(
  type: string,
  data: { slug: string; title: string; content: string; tags: string[] }
): Promise<Content> {
  const url = `${API_BASE_URL}/contents/${type}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // Attempt to get more detailed error info from the response body
    const errorData = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(`Failed to create content: ${errorData.message || res.statusText}`);
  }
  return res.json();
} 