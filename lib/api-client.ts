import { Content } from '@/types/content';
import { AuthRequest } from '@/types/auth';

// サーバーサイド（Node.js）かクライアントサイド（ブラウザ）かを判定
const isServer = typeof window === 'undefined';

// 実行環境に応じてAPIのベースURLを切り替える
const API_BASE_URL = (() => {
  if (isServer) {
    return process.env.API_BASE_URL_INTERNAL || 'http://localhost:8080/api';
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || '/api/proxy';
})();

async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const defaultOptions: RequestInit = {
    credentials: 'include', // Automatically send cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
  };

  return fetch(url, mergedOptions);
}

async function fetcher<T>(url: string): Promise<T> {
  const res = await apiFetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(errorData.message || `An error occurred: ${res.statusText}`);
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
  data: { title: string; content: string; summary?: string; tags: string[] }
): Promise<Content> {
  const url = `${API_BASE_URL}/contents/${type}/${slug}`;
  const res = await apiFetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`An error occurred while updating the data: ${res.statusText}`);
  }
  return res.json();
}

export async function createContent(
  type: string,
  data: { slug: string; title: string; summary?: string; content: string; tags: string[] }
): Promise<Content> {
  const url = `${API_BASE_URL}/contents/${type}`;
  const res = await apiFetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // Attempt to get more detailed error info from the response body
    const errorData = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(`Failed to create content: ${errorData.message || res.statusText}`);
  }
  return res.json();
}

export async function deleteContent(type: string, slug: string): Promise<void> {
  const url = `${API_BASE_URL}/contents/${type}/${slug}`;
  const res = await apiFetch(url, { method: 'DELETE' });
  if (!res.ok && res.status !== 204) {
    throw new Error(`Failed to delete content: ${res.statusText}`);
  }
}

export async function login(credentials: AuthRequest): Promise<void> {
  const url = `${API_BASE_URL}/auth/login`;
  const res = await apiFetch(url, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(errorData.message || 'Invalid credentials');
  }
}