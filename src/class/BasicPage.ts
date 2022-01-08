import dotenv from 'dotenv';
import { strict as assert } from 'assert';
import { FooterLinkContent } from '../interface/pageResource/footer';
import FooterLinkModel from '../models/frontend/footerLink';
import ServerConfigError from './ServerConfigError';
import { MainNavbarItem } from '../interface/pageResource/navbar';

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
}

export default BasicPage;
