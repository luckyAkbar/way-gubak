import dotenv from 'dotenv';
import { strict as assert } from 'assert';
import { FooterLinkContent } from '../interface/pageResource/footer';
import FooterLinkModel from '../models/frontend/footerLink';
import ServerConfigError from './Error/ServerConfigError';
import { MainNavbarItem } from '../interface/pageResource/navbar';
import { SideNavItem } from '../interface/pageResource/sideNav';

dotenv.config();

class BasicPage {
  static async getFooterLinks(): Promise<Array<FooterLinkContent>> {
    try {
      const result = await FooterLinkModel.findOne({});
      assert.notStrictEqual(result, null, new ServerConfigError(
        'Important data is missing from database. This will result in user to see blank footer',
        'You forget to initialize footer data in database',
      ));

      return result.links;
    } catch (e: unknown) {
      if (e instanceof ServerConfigError) await e.logError();
      return [];
    }
  }

  static async getNavbarItems(): Promise<Array<MainNavbarItem>> {
    const navbar: string | undefined = process.env.MAIN_NAVBAR_ITEMS;
    const fullNavbarItems: MainNavbarItem[] = [];

    try {
      if (navbar === undefined) throw new ServerConfigError('Failed to lookup for DESKTOP_NAVBAR_ITEMS in your .env file', 'This posibbly caused by forget to supply all necessary data in .env file.');

      const navbarItems: string[] = navbar.split(';')

      for (let i = 0; i < navbarItems.length; i++) {
        const navbarItem = navbarItems[i].split(',');

        fullNavbarItems.push({
          name: navbarItem[0],
          href: navbarItem[1],
        });
      }

      return fullNavbarItems;
    } catch (e: unknown) {
      if (e instanceof ServerConfigError) await e.logError();
      return [];
    }
  }

  static async getInfoSideNavItems(): Promise<Array<SideNavItem>> {
    const rawInfoSideNav: string[] | undefined = process.env.INFO_PAGE_SIDENAV_ITEMS?.split(';');
    const infoSideNavs: SideNavItem[] = [];


    try {
      if (rawInfoSideNav === undefined) throw new ServerConfigError('Sidenav items for Info page is missing from your env file.');

      for (let i = 0; i < rawInfoSideNav.length; i++) {
        const title = rawInfoSideNav[i].split(',')[0];
        const href = rawInfoSideNav[i].split(',')[1];

        infoSideNavs.push({
          title,
          href,
        });
      }

      return infoSideNavs;
    } catch (e: unknown) {
      if (e instanceof ServerConfigError) await e.logError();

      return [];
    }
  }

  static async getProfileSideNavItems(): Promise<Array<SideNavItem>> {
    const rawProfileSideNav: string[] | undefined = process.env.PROFILE_PAGE_SIDENAV_ITEMS?.split(';');
    const profileSideNavItems: SideNavItem[] = [];

    try {
      if (rawProfileSideNav === undefined) throw new ServerConfigError('Profile page sidenav items is not specified in your env file.');

      for (let i = 0; i < rawProfileSideNav.length; i++) {
        const title = rawProfileSideNav[i].split(',')[0];
        const href = rawProfileSideNav[i].split(',')[1];

        profileSideNavItems.push({
          title,
          href,
        });
      }

      return profileSideNavItems;
    } catch (e: unknown) {
      if (e instanceof ServerConfigError) await e.logError();

      return [];
    }
  }

  static async getAsetSideNavItems(): Promise<Array<SideNavItem>> {
    const rawAsetSideNavItems: string[] | undefined = process.env.ASET_PAGE_SIDENAV_ITEMS?.split(';');
    const asetSideNavItems: SideNavItem[] = [];

    try {
      if (rawAsetSideNavItems === undefined) throw new ServerConfigError('Aset page sidenav items is not specified in your env file.');

      for (let i = 0; i < rawAsetSideNavItems.length; i++) {
        const title = rawAsetSideNavItems[i].split(',')[0];
        const href = rawAsetSideNavItems[i].split(',')[1];

        asetSideNavItems.push({
          title,
          href,
        });
      }

      return asetSideNavItems;
    } catch (e: unknown) {
      if (e instanceof ServerConfigError) await e.logError();

      return [];
    }
  }
}

export default BasicPage;
