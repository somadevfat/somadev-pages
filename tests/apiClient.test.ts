import { describe, it, expect, vi, afterEach } from 'vitest';
import { getDummyArticle, DummyArticle } from '../lib/apiClient';

// Mock the global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('getDummyArticle', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch and return a dummy article successfully', async () => {
    const mockArticle: DummyArticle = {
      title: 'Dummy Post',
      content: 'This is a dummy post from the backend.',
      author: 'Soma',
      publicationDate: '2024-07-27',
    };

    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockArticle),
    };
    mockFetch.mockResolvedValue(mockResponse as Response);

    const article = await getDummyArticle();

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/contents/articles/dummy-post');
    expect(article).toEqual(mockArticle);
  });

  it('should throw an error if the API call fails', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
    };
    mockFetch.mockResolvedValue(mockResponse as Response);

    await expect(getDummyArticle()).rejects.toThrow('API call failed with status: 500');
  });

  it('should handle network errors', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    await expect(getDummyArticle()).rejects.toThrow('Network error');
  });
}); 