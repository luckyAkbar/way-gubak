import dotenv from 'dotenv';
import ProfileUMKMModel from "../models/UMKM";
import UserRequestError from './Error/UserRequestError';
import CustomError from "./Error/CustomError";
import ServerConfigError from './Error/ServerConfigError';
import UMKMPage, { ProductAttributeInList } from '../interface/pageRenderingData/UMKMPage';
import Product from '../models/product';
import ProductInterface from '../interface/productDetail';
import { RecomendedProduct } from '../interface/pageRenderingData/UMKMProduct';

dotenv.config();

export default class UMKM {
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
        UMKMFeaturedImageLink: `${this.imageHrefPrefix}${result.featuredImageName}`,
        UMKMAltForFeaturedImage: result.featuredImageAlt,
        tags: result.tags,
        UMKMLogoLink: `${this.imageHrefPrefix}${result.logoName}`,
        UMKMAltForLogo: result.logoAlt,
        UMKMName: result.name,
        listProducts: await this.getListProducts(),
        UMKMDescriptions: result.descriptions,
        contacts: result.contacts,
        // id: result.id,
      }

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
  }
}