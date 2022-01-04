interface SublinkContent {
  title: string,
  href: string,
}

export interface FooterLinkContent {
  mainLink: string,
  subLinks: SublinkContent[],
}

interface FooterLinkAttr {
  links: FooterLinkContent[],
}

export default FooterLinkAttr;
