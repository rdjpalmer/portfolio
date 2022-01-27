export interface PostReference {
  title: string;
  date: string;
  slug: string;
  description: string;
  sortBy?: number;
  shortTitle?: string;
}

export interface Post extends PostReference {
  // layout: "post" | "newsletter";
  body: string;
  created: string;
  updated: string;
  hasTweetEmbed?: boolean;
  hasSavvyCalEmbed?: boolean;
}
