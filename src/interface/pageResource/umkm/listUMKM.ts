interface UMKMListItem {
  UMKMFeaturedProductImageLink: string,
  UMKMFeaturedProductImageAlt: string,
  name: string,
  fullDescription: string,
  profileLink: string,
}

export default interface ListUMKM {
  UMKMList: UMKMListItem[],
}

export { UMKMListItem };
