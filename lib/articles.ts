import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export type ArticleData = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  contentHtml?: string; // 詳細ページ用にオプショナル
};

// 全記事データを取得するための内部関数
function getAllArticlesData(): ArticleData[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    // .md ファイルのみを対象にする
    if (!fileName.endsWith('.md')) {
        return null;
    }
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title as string,
      date: matterResult.data.date as string,
      summary: matterResult.data.summary as string,
      tags: (matterResult.data.tags as string[]) || [],
    };
  }).filter((article): article is ArticleData => article !== null); // nullを除外

  // 日付でソート
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getArticles({ page = 1, limit = 10 }: { page?: number; limit?: number; } = {}) {
  const allArticles = getAllArticlesData();
  const totalArticles = allArticles.length;
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const articles = allArticles.slice(startIndex, endIndex);

  return {
    articles,
    totalArticles,
  };
}

export async function getArticleDataBySlug(slug: string): Promise<ArticleData & { contentHtml: string }> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: matterResult.data.title as string,
    date: matterResult.data.date as string,
    summary: matterResult.data.summary as string,
    tags: (matterResult.data.tags as string[]) || [],
    contentHtml,
  };
}

export function getAllArticleSlugs() {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md')) // .mdファイルのみ対象
    .map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

export type TagCount = {
  [tag: string]: number;
};

export function getAllTags(): TagCount {
  const allArticles = getAllArticlesData(); // 全記事を取得する内部関数を呼び出す
  const tags: TagCount = {};

  allArticles.forEach(article => {
    article.tags.forEach(tag => {
      if (tag in tags) {
        tags[tag]++;
      } else {
        tags[tag] = 1;
      }
    });
  });

  return tags;
}

// 詳細ページ用の関数もここに追加予定 (getArticleDataBySlugなど) 