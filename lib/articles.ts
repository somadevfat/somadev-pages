import 'server-only';

// サーバーサイド専用の環境変数（絶対URL）を直接読み込む
const API_BASE_URL = process.env.API_BASE_URL_INTERNAL;

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
  console.log(`Fetching contents for type: ${type} from ${API_BASE_URL}`);
  
  if (!API_BASE_URL) {
    console.error('Error: API_BASE_URL_INTERNAL is not set.');
    return [];
  }

  try {
    // API_BASE_URLを直接使って、完全なURLを生成する
    const res = await fetch(`${API_BASE_URL}/contents/${type}`, { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Failed to fetch ${type}:`, res.status, res.statusText);
      const errorBody = await res.text();
      console.error('Error Body:', errorBody);
      return [];
    }

    type ApiContentItem = {
      slug: string;
      metadata: {
        title: string;
        date: string;
        summary: string;
        tags?: string[];
      };
      body: string;
    };

    const data: ApiContentItem[] = await res.json();
    
    // APIレスポンスをArticleData[]に変換
    const articles: ArticleData[] = data.map((item) => ({
      slug: item.slug,
      title: item.metadata.title,
      date: item.metadata.date,
      summary: item.metadata.summary,
      tags: item.metadata.tags ?? [], // tagsがない場合は空配列
      body: item.body,
    }));

    return articles;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return [];
  }
}