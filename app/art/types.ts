export type Category = "Production" | "Personal";

export interface ArtItem {
  id: string;
  title: string;
  category: Category;
  url: string;
  description: string;
  folder: string;
}

export type ManifestEntry = {
  key: string;
  description: string;
  tags?: string[];
};
