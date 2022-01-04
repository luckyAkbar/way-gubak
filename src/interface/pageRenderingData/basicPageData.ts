import { FooterLinkContent } from '../pageResource/footer';

interface BasicPageData {
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
