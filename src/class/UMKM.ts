import { strict as assert } from 'assert';
import dotenv from 'dotenv';
import ProfileUMKMModel from "../models/UMKM";
import UserRequestError from './Error/UserRequestError';
import CustomError from "./Error/CustomError";
import ServerConfigError from './Error/ServerConfigError';
import UMKMPage, { ProductAttributeInList } from '../interface/pageRenderingData/UMKMPage';
import Product from '../models/product';
import ProductInterface from '../interface/productDetail';
import { RecomendedProduct } from '../interface/pageRenderingData/UMKMProduct';
import I_UMKM, { UMKMContact } from '../interface/profileUMKM';
import BasicPage from './BasicPage';
import UMKMIndexPageData from '../interface/pageRenderingData/UMKMIndex';
import { UMKMListItem } from '../interface/pageResource/umkm/listUMKM';
import ProductUMKM from './ProductUMKM';

dotenv.config();

export default class UMKM {
  static UMKMProfileLinkPrefix: string = process.env.PREFIX_LINK_TOKO_UMKM ? process.env.PREFIX_LINK_TOKO_UMKM : '/umkm/';

  UMKM_ID: number;
  imageHrefPrefix: string | undefined;
  productLinkPrefix: string | undefined;
  villageName: string | undefined;
  defaultUMKMProfileData: UMKMPage = {
    villageName: '',
    UMKMFeaturedImageLink: '',
    UMKMAltForFeaturedImage: '',
    tags: [''],
    UMKMLogoLink: '',
    UMKMAltForLogo: '',
    UMKMName: '',
    listProducts: [],
    UMKMDescriptions: [''],
    contacts: [{ type: '', detail: '' }],
    footerLinks: [],
    copyrightYear: '',
  };

  constructor(ID: string) {
    this.UMKM_ID = Number(ID);
    this.imageHrefPrefix = process.env.PREFIX_IMAGE_HREF_LINK;
    this.villageName = process.env.VILLAGE_NAME;
    this.productLinkPrefix = process.env.PREFIX_PRODUCT_LINK;

    this.validate();
  }

  async getAllProducts(): Promise<Array<ProductInterface>> {
    try {
      const result = await Product.find({ UMKM_ID: this.UMKM_ID });
      if (result === null) if (result === null) throw new UserRequestError(`UMKM dengan ID ${this.UMKM_ID} tidak ketemu`, 'Pastikan anda mencari UMKM dengan ID-nya yang valid.');

      return result;
    } catch (e) {
      if (e instanceof UserRequestError) throw e;

      const err = new CustomError('System failed to fetch product list from database.', (e as CustomError).message);
      await err.logError();

      return [];
    }
  }

  async getListProducts(): Promise<Array<ProductAttributeInList>> {
    const listProducts: ProductAttributeInList[] = [];

    try {
      const allProducts = await this.getAllProducts();

      for (let i = 0; i < allProducts.length; i++) {
        const product: ProductAttributeInList = {
          productLink: `${this.productLinkPrefix}${allProducts[i].id}`,
          imageLink: `${this.imageHrefPrefix}${allProducts[i].imageName}`,
          imageAlt: allProducts[i].imageAlt,
          currency: allProducts[i].currency,
          name: allProducts[i].name,
          price: allProducts[i].price,
          totalLikes: allProducts[i].totalLikes,
          category: allProducts[i].category,
        };

        listProducts.push(product);
      }

      return listProducts;
    } catch (e: unknown) {
      const err = new CustomError('Unknown error happen which result in user view empty list products', (e as CustomError).message)
      await err.logError();

      return listProducts;
    }
  }

  async createRecomendedProduct(): Promise<Array<RecomendedProduct>> {
    const recomendedProduct: RecomendedProduct[] = [];
    
    try {
      const allProducts = await this.getAllProducts();

      for (let i = 0; i < allProducts.length; i++) {
        recomendedProduct.push({
          href: `${this.productLinkPrefix}${allProducts[i].id}`,
          name: allProducts[i].name,
          imageLink: `${this.imageHrefPrefix}${allProducts[i].imageName}`,
          imageAlt: allProducts[i].imageAlt,
          category: allProducts[i].category,
          currency: allProducts[i].currency,
          price: allProducts[i].price,
          totalLikes: allProducts[i].totalLikes,
        });
      }
    } catch (e: unknown) {
      const err = new CustomError('System failed to generate recomendation product.', (e as Error).message);
      await err.logError();
    } finally {
      return recomendedProduct;
    }
  }

  async getProfilePageData(): Promise<UMKMPage> {
    try {
      const result = await ProfileUMKMModel.findOne({ id: this.UMKM_ID });
      if (result === null) throw new UserRequestError(`UMKM dengan ID ${this.UMKM_ID} tidak ketemu`, 'Pastikan anda mencari UMKM dengan ID-nya yang valid.');

      const UMKMPageData: UMKMPage = {
        villageName: this.villageName,
        UMKMFeaturedImageLink: `${this.imageHrefPrefix}${result.featuredImageName}`,
        UMKMAltForFeaturedImage: result.featuredImageAlt,
        tags: result.tags,
        UMKMLogoLink: `${this.imageHrefPrefix}${result.logoName}`,
        UMKMAltForLogo: result.logoAlt,
        UMKMName: result.name,
        listProducts: await this.getListProducts(),
        UMKMDescriptions: result.descriptions,
        contacts: result.contacts,
        footerLinks: await BasicPage.getFooterLinks(),
        copyrightYear: process.env.COPYRIGHT_YEAR,
      };

      return UMKMPageData;
    } catch (e: unknown) {
      if (e instanceof UserRequestError) throw e;
      
      const err = new CustomError('System failed to fetch UMKM profile data from database', (e as Error).message, true, 'high');
      await err.logError();

      return this.defaultUMKMProfileData;
    }
  }

  async getUMKMName(): Promise<string> {
    try {
      const result = await ProfileUMKMModel.findOne({ id: this.UMKM_ID }, { name: 1 });
      if (result === null) throw new CustomError(`Data UMKM dengan ID: ${this.UMKM_ID} tidak ditemukan.`, 'Hal ini bisa disebabkan antara User mencari UMKM yang tidak ditemukan, atau terdapat data UMKM yang hilang.');

      return result.name;
    } catch (e: unknown) {
      if (e instanceof CustomError) {
        await e.logError();

        return '';
      }

      const err = new CustomError('System failed to get UMKM name.', (e as Error).message, );
      await err.logError();

      return '';
    }
  }

  async getUMKMContact(): Promise<Array<UMKMContact>> {
    try {
      const result = await ProfileUMKMModel.findOne({ id: this.UMKM_ID }, { contacts: 1 });
      if (result === null) throw new CustomError(`Data UMKM dengan ID: ${this.UMKM_ID} tidak ditemukan.`, 'Hal ini bisa disebabkan antara User mencari UMKM yang tidak ditemukan, atau terdapat data UMKM yang hilang.');

      return result.contacts;
    } catch (e: unknown) {
      if (e instanceof CustomError) {
        await e.logError();

        return [];
      }

      const err = new CustomError('System failed to get UMKM name.', (e as Error).message, );
      await err.logError();

      return [];
    }
  }

  async getUMKMLogoImgName(): Promise<{ UMKMLogoName: string, UMKMLogoAlt: string }> {
    try {
      const result = await ProfileUMKMModel.findOne({ id: this.UMKM_ID }, { logoName: 1, logoAlt: 1 });
      if (result === null) throw new CustomError(`Data UMKM dengan ID: ${this.UMKM_ID} tidak ditemukan.`, 'Hal ini bisa disebabkan antara User mencari UMKM yang tidak ditemukan, atau terdapat data UMKM yang hilang.');

      return {
        UMKMLogoName: result.logoName,
        UMKMLogoAlt: result.logoAlt,
      };
    } catch (e: unknown) {
      if (e instanceof CustomError) {
        await e.logError();

        return {
          UMKMLogoName: '',
          UMKMLogoAlt: '',
        };
      }

      const err = new CustomError('System failed to get UMKM name.', (e as Error).message, );
      await err.logError();

      return {
        UMKMLogoName: '',
        UMKMLogoAlt: '',
      };
    }
  }

  validate() {
    if (Number.isNaN(Number(this.UMKM_ID))) throw new UserRequestError('UMKM ID yang diminta tidak valid.', 'Pastikan anda mencari UMKM dengan ID-nya yang valid.');
    
    if (this.imageHrefPrefix === undefined) {
      const err = new ServerConfigError(`Please define PREFIX_IMAGE_HREF_LINK in your .env file. This server now using default value for PREFIX_IMAGE_HREF_LINK ("/images/")`);
      this.imageHrefPrefix = '/images/';

      err.logError();
    }

    if (this.villageName === undefined) {
      const err = new ServerConfigError(`Please define VILLAGE_NAME in your .env file. This server now using default value for VILLAGE_NAME ("Desa")`);
      this.villageName = 'Desa';

      err.logError();
    }

    if (this.productLinkPrefix === undefined) {
      const err = new ServerConfigError(`Please define PREFIX_PRODUCT_LINK in your .env file. This server now using default value for PREFIX_PRODUCT_LINK ("/umkm/product/")`);
      this.productLinkPrefix = '/umkm/product/';

      err.logError();
    }
  }

  static async getAllUMKM(): Promise<Array<I_UMKM>> {
    try {
      const allUMKM = await ProfileUMKMModel.find();

      assert.notStrictEqual(allUMKM.length, 0);

      return allUMKM;
    } catch (e: unknown) {
      const err = new CustomError('System failed to fetch all UMKM from database.', (e as CustomError).message);
      await err.logError();

      return [];
    }
  }

  static async getUMKMNameFromID(ID: number): Promise<string> {
    try {
      const result = await ProfileUMKMModel.findOne({
        id: ID,
      }, {
        name: 1,
        _id: 0,
      });

      if (result === null) throw new Error();

      return result.name;
    } catch (e: unknown) {
      return '';
    }
  }

  static async createUMKMListData(): Promise<Array<UMKMListItem>> {
    const UMKMList: UMKMListItem[] = [];

    try {
      const allUMKM = await this.getAllUMKM();
      assert.notStrictEqual(allUMKM.length, 0);

      allUMKM.forEach((umkm) => {
        UMKMList.push({
          name: umkm.name,
          UMKMFeaturedProductImageAlt: umkm.featuredImageAlt,
          UMKMFeaturedProductImageLink: `${ProductUMKM.staticImageLinkPrefix}${umkm.featuredImageName}`,
          fullDescription: umkm.descriptions.join(' '),
          profileLink: `${UMKM.UMKMProfileLinkPrefix}${umkm.id}`,
        })
      });
    } catch (e: unknown) {
      const err = new CustomError('System failed to create UMKM list data.', (e as Error).message);

      await err.logError();
    } finally {
      return UMKMList;
    }
  }

  static async getIndexPageData(): Promise<UMKMIndexPageData> {
    try {
      const indexPageData: UMKMIndexPageData = {
        villageName: BasicPage.villageName,
        copyrightYear: BasicPage.copyrightYear,
        footerLinks: await BasicPage.getFooterLinks(),
        UMKMList: await this.createUMKMListData(),
        trendingProducts: await ProductUMKM.createTrendingProductsData(),
      };

      return indexPageData;
    } catch (e: unknown) {
      const err = new CustomError('System failed to generate UMKM index page data.', (e as Error).message, true, 'high');
      await err.logError();

      throw err;
    }
  }
}