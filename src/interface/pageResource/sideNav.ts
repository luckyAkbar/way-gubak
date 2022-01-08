export interface SideNavItem {
   title: string,
   href: string,
}

export default interface SideNav {
  sideNavItems: SideNavItem[],
  activateSideNav: string,
}