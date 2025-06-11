export type DummyArticle = {
  title: string;
  content: string;
  author: string;
  publicationDate: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export async function getDummyArticle(): Promise<DummyArticle> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contents/articles/dummy-post`);

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data: DummyArticle = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch dummy article:", error);
    // In a real app, you might want to handle this more gracefully
    // For this dummy implementation, we can re-throw or return a mock/error object
    throw error;
  }
} 