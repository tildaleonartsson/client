export interface Book {
  id?: number;
  title: string;
  author: string;
  publicationDate: string;  // <-- detta måste finnas!
  userId?: string;
}