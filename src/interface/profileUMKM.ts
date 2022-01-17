interface UMKMContact {
  type: string,
  detail: string,
}

export default interface UMKM {
  id: number,
  featuredImageName: string,
  featuredImageAlt: string,
  tags: string[],
  logoName: string,
  logoAlt: string,
  name: string,
  contacts: UMKMContact[],
  descriptions: string[], // displayed as p tags for each index
}

export { UMKMContact };
