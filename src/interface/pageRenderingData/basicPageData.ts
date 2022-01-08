import { FooterLinkContent } from '../pageResource/footer';
import MainNavbar from '../pageResource/navbar';

interface BasicPageData extends MainNavbar {
  villageName: string | undefined,
  districtName: string | undefined,
  copyrightYear: string | undefined,
  provinceName: string | undefined,
  phoneContact: string | undefined,
  villageEmailAddress: string | undefined,
  postalCode: string | undefined,
  footerLinks: FooterLinkContent[],
}

export default BasicPageData;
