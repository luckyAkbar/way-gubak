interface LatestProductItem {
  href: string,
  imageLink: string,
  name: string,
  shortDesc: string,
  currency: string,
  price: number,
}

export default interface LatestProduct {
  latestProducts: LatestProductItem[],
}

export { LatestProductItem };
