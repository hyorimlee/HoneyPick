export interface ItemState {
  itemId: string,
  item: {
    _id: string,
    brand?: string,
    url: string,
    title?: string,
    thumbnail?: string,
    priceBefore?: number,
    priceAfter?: number,
    discountRate?: number,
    stickers: object,
  },
  review: {
    _id: string,
    user: string,
    item: string,
    isRecommend: 0 | 1 | 2,
    stickers: number[],
  } | null
}