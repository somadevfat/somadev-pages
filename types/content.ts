export interface Content {
  slug: string;
  title: string;
  content: string;
  metadata: {
    [key: string]: any;
  };
} 