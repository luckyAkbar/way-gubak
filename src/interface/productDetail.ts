interface ProductDetail {
  imageName: string,
  imageAlt: string,
}

interface ProductSpesification {
  title: string,
  value: string,
}

export default interface Product {
  id: number,
  name: string,
  UMKM_ID: number,
  imageName: string,
  imageAlt: string,
  category: string,
  price: number,
  currency: 'IDR' | 'USD',
  totalLikes: number,
  details: ProductDetail[],
  descriptions: string[],
  spesifications: ProductSpesification[],
}

export { ProductDetail, ProductSpesification };