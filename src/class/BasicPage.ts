import { strict as assert } from 'assert';
import { FooterLinkContent } from '../interface/pageResource/footer';
import FooterLinkModel from '../models/frontend/footerLink';
import mongoConnect from '../connection/mongoConnect';
import CustomError from './CustomError';

class BasicPage {
  static async getFooterLinks(): Promise<Array<FooterLinkContent>> {
    try {
      await mongoConnect();
      const result = await FooterLinkModel.findOne({});
      assert.notStrictEqual(result, null, new CustomError(
        'Important data is missing from database. This will result in user to see blank footer',
        'You forget to initialize footer data in database',
      ));

      return result.links;
    } catch (e: unknown) {
      if (e instanceof CustomError) await e.logError();
      return [];
    }
  }
}

export default BasicPage;
