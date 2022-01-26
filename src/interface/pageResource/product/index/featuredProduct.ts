interface FeaturedProductItem {
  href: string,
  imageLink: string,
  imageAlt: string,
  name: string,
  currency: string,
  price: number,
}

export default interface FeaturedProducts {
  featuredProducts: Array<FeaturedProductItem[]>,
}

export { FeaturedProductItem };
