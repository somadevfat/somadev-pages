import { Content } from '@/types/content';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://backend:8080/api';

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