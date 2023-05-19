export interface Book {
  id: number,
  status: boolean,
  title: string,
  author: string,
  category: string,
  ISBN: number | undefined
  createdAt: string,
  editedAt: string,
  imgSrc: string
}