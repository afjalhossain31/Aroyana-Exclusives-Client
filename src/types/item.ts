export interface Item {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  shortDescription: string;
  fullDescription?: string;
  category?: string;
}