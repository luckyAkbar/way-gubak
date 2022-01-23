import { FooterLinkContent } from "../pageResource/footer";
import { ProductDetail, ProductSpesification } from "../productDetail";
import { UMKMContact } from "../profileUMKM";

interface RecomendedProduct {
  href: string,
  name: string,
  imageLink: string,
  imageAlt: string,
  category: string,
  currency: string,
  price: number,
  totalLikes: number,
}

export default interface UMKMProductsPageData {
  villageName: string | undefined,
  name: string,
  UMKMName: string,
  UMKMLogoLink: string,
  UMKMAltForLogo: string,
  linkToUMKMProfilePage: string,
  contacts: UMKMContact[],
  details: ProductDetail[],
  totalLikes: number,
  descriptions: string[],
  spesifications: ProductSpesification[],
  recomendedProducts: RecomendedProduct[],
  currency: string,
  price: number,
  imageHrefPrefix: string | undefined,
  footerLinks: FooterLinkContent[],
  copyrightYear: string | undefined,
}

export { RecomendedProduct };
