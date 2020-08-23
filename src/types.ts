export interface PostReference {
  title: string;
  date: string;
  slug: string;
  description: string;
  sortBy?: number;
}

export interface Post extends PostReference {
  // layout: "post" | "newsletter";
  body: string;
  hasTweetEmbed: boolean;
}
