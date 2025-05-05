export type ItemCategory = {
  id: number;
  name: string;
  itemId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type Items = {
  id: number;
  name: string;
  quantity: number;
  description: string;
  itemsCategories?: ItemCategory[];
}

export type ItemResponse = {
  count: number;
  totalPages: number;
  results: Items[];
}