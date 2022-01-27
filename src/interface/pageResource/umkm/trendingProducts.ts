interface TrendingProductItem {
  imageLink: string,
  imageAlt: string,
  name: string,
  UMKMName: string,
  currency: string,
  price: number,
  linkToProductPage: string,
}

export default interface TrendingProducts {
  trendingProducts: TrendingProductItem[],
}

export { TrendingProductItem };
