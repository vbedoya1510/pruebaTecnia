export interface NewsModel {
  post_id?: number;
  title: string;
  content: string;
  creationDate: Date;
  images: string;
  users_id?: number;
}
