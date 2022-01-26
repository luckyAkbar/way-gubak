interface SidebarItem {
  imageLink: string,
  productName: string,
  productLink: string,
  currency: string,
  price: number,
}

export default interface Sidebar {
  sidebarItems: SidebarItem[],
}

export { SidebarItem };
