import { UMKMContact } from "../profileUMKM";

interface ProductAttributeInList {
  imageLink: string,
  imageAlt: string,
  currency: string,
  name: string,
  price: number,
  totalLikes: number,
}

export default interface UMKMPage {
  UMKMFeaturedImageLink: string,
  UMKMAltForFeaturedImage: string,
  tags: string[],
  UMKMLogoLink: string,
  UMKMAltForLogo: string,
  UMKMName: string,
  listProducts: ProductAttributeInList[],
  UMKMDescriptions: string[],
  contacts: UMKMContact[]
}

export { ProductAttributeInList }