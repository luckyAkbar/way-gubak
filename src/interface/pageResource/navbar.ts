export interface MainNavbarItem {
  name: string,
  href: string,
}

interface MainNavbar {
  navbarItems: MainNavbarItem[],
  activateMainNavbar: string,
}

export default MainNavbar;
