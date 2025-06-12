import 'server-only';

export interface ArticleData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  body: string;
}

export type TagCount = { [key: string]: number };

// APIから記事データを取得する関数
export async function getContents(type: 'articles' | 'projects'): Promise<ArticleData[]> {
  console.log(`Fetching contents for type: ${type}`);
  try {
    const res = await fetch(`http://backend:8080/api/contents/${type}`, { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Failed to fetch ${type}:`, res.status, res.statusText);
      const errorBody = await res.text();
      console.error('Error Body:', errorBody);
      // エラーが発生した場合、空の配列を返すか、エラーをスローするか選択
      // ここでは空の配列を返して、フロントエンドがクラッシュしないようにする
      return [];
    }

    const data = await res.json();
    
    // APIレスポンスをArticleData[]に変換
    const articles: ArticleData[] = data.map((item: any) => ({
      slug: item.slug,
      title: item.metadata.title,
      date: item.metadata.date,
      summary: item.metadata.summary,
      tags: item.metadata.tags || [], // tagsがない場合は空配列
      body: item.body
    }));

    return articles;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return [];
  }
} 