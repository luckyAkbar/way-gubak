import { FooterLinkContent } from "../pageResource/footer";
import ListUMKM from "../pageResource/umkm/listUMKM";
import TrendingProducts from "../pageResource/umkm/trendingProducts";

export default interface UMKMIndexPageData extends ListUMKM, TrendingProducts {
  villageName: string,
  copyrightYear: string,
  footerLinks: FooterLinkContent[],
}