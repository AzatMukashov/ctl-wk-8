export interface Quote {
  id: string;
  author: string;
  text: string;
  category: string;
}

export interface QuoteList {
  category?: string;
}