import { strict as assert } from 'assert';
import Product from "../models/product";
import UMKMProductsPageData, { RecomendedProduct } from "../interface/pageRenderingData/UMKMProduct";
import UserRequestError from "./Error/UserRequestError";
import CustomError from "./Error/CustomError";
import UMKM from "./UMKM";
import ServerConfigError from "./Error/ServerConfigError";
import { UMKMContact } from "../interface/profileUMKM";
import BasicPage from "./BasicPage";
import IProduct from '../interface/productDetail';
import { CarouselItem } from '../interface/pageResource/product/index/carousel';
import ProductIndexPageData from '../interface/pageRenderingData/productIndex';
import { SidebarItem } from '../interface/pageResource/product/index/sidebar';
import ProfileUMKM from '../models/UMKM';
import { FeaturedProductItem } from '../interface/pageResource/product/index/featuredProduct';
import featuredProductDataShaper from '../util/featuredProductDataShaper';
import { LatestProductItem } from '../interface/pageResource/product/index/latestProduct';

export default class ProductUMKM {
  ID: number;
  imageHrefPrefix: string | undefined;
  UMKMProfilePagePrefixLink: string | undefined;
  villageName: string | undefined;
  defaultProductPageData: UMKMProductsPageData = {
    villageName: '',
    name: '',
    UMKMName: '',
    UMKMLogoLink: '',
    UMKMAltForLogo: '',
    linkToUMKMProfilePage: '',
    contacts: [],
    details: [{ imageName: '', imageAlt: '' }],
    totalLikes: -1,
    descriptions: [''],
    spesifications: [{ title: '', value: '' }],
    recomendedProducts: [],
    currency: '',
    price: 0,
    imageHrefPrefix: '',
    footerLinks: [],
    copyrightYear: '',
  };

  static staticProductHrefPrefix = process.env.PREFIX_PRODUCT_LINK ? process.env.PREFIX_PRODUCT_LINK : '/umkm/product/';
  static staticImageLinkPrefix = process.env.PREFIX_IMAGE_HREF_LINK ? process.env.PREFIX_IMAGE_HREF_LINK : '/images/';
  
  constructor(ID: string) {
    this.ID = Number(ID);
    this.imageHrefPrefix = process.env.PREFIX_IMAGE_HREF_LINK;
    this.UMKMProfilePagePrefixLink = process.env.PREFIX_LINK_TOKO_UMKM;
    this.villageName = process.env.VILLAGE_NAME;

    this.validate();
  }

  async getProductPageData(): Promise<UMKMProductsPageData> {
    try {
      const result = await Product.findOne({ id: this.ID });
      if (result === null) throw new UserRequestError(`Produk dengan ID: ${this.ID} tidak ditemukan`, 'Coba cari produk lainnya.');

      const umkm: UMKM = new UMKM(result.UMKM_ID.toString());
      const UMKMName: string = await umkm.getUMKMName();
      const { UMKMLogoName, UMKMLogoAlt } = await umkm.getUMKMLogoImgName();
      const recomendedProducts: RecomendedProduct[] = await umkm.createRecomendedProduct();
      const contacts: UMKMContact[] = await umkm.getUMKMContact();

      const product: UMKMProductsPageData = {
        UMKMName,
        recomendedProducts,
        contacts,
        villageName: this.villageName,
        name: result.name,
        UMKMLogoLink: `${this.imageHrefPrefix}${UMKMLogoName}`,
        UMKMAltForLogo: UMKMLogoAlt,
        linkToUMKMProfilePage: `${this.UMKMProfilePagePrefixLink}${result.UMKM_ID}`,
        details: result.details,
        totalLikes: result.totalLikes,
        descriptions: result.descriptions,
        spesifications: result.spesifications,
        currency: result.currency,
        price: result.price,
        imageHrefPrefix: this.imageHrefPrefix,
        footerLinks: await BasicPage.getFooterLinks(),
        copyrightYear: process.env.COPYRIGHT_YEAR,
      };

      return product;
    } catch (e: unknown) {
      if (e instanceof UserRequestError) throw e;

      const err = new CustomError('System failed to get Product detail.', (e as Error).message, );
      await err.logError();

      return this.defaultProductPageData;
    }
  }

  validate() {
    if (Number.isNaN(Number(this.ID))) throw new UserRequestError(`Produk ID: ${this.ID} adalah tidak valid`, 'Pastikan anda memasukan ID produk yang benar.');
    if (this.imageHrefPrefix === undefined) {
      const err = new ServerConfigError(`Please define PREFIX_IMAGE_HREF_LINK in your .env file. This server now using default value for PREFIX_IMAGE_HREF_LINK ("/images/")`);
      this.imageHrefPrefix = '/images/';

      err.logError();
    }

    if (this.UMKMProfilePagePrefixLink === undefined) {
      const err = new ServerConfigError(`Please define PREFIX_LINK_TOKO_UMKM in your .env file. This server now using default value for PREFIX_LINK_TOKO_UMKM ("/umkm/")`);
      this.UMKMProfilePagePrefixLink = '/umkm/';

      err.logError();
    }

    if (this.villageName === undefined) {
      const err = new ServerConfigError(`Please define VILLAGE_NAME in your .env file. This server now using default value for VILLAGE_NAME ("Desa")`);
      this.villageName = 'Desa';

      err.logError();
    }
  }

  static async getLatestProducts(): Promise<Array<IProduct>> {
    try {
      const latestProducts = await Product.find().sort({
        createdAt: -1,
      });

      assert.notStrictEqual(latestProducts.length, 0);

      return latestProducts;
    } catch (e: unknown) {
      const err = new CustomError('System failed to fetch latest product. this may result user seeing empty product.', (e as Error).message);
      await err.logError();

      return [];
    }
  }

  static async getFeaturedProduct(): Promise<Array<FeaturedProductItem[]>> {
    try {
      const featuredProductNames = await ProfileUMKM.find().select({
        featuredImageName: 1,
        _id: 0,
      });

      const featuredProductData = await Product.find({
        imageName: {
          $in: featuredProductNames.map(({ featuredImageName }) => featuredImageName),
        },
      });

      const shapedProductData: Array<FeaturedProductItem[]> = featuredProductDataShaper(featuredProductData);

      return shapedProductData;
    } catch (e: unknown) {
      const err = new CustomError('System failed to get featured product. This may result user not seeing our featured product.', (e as Error).message);
      await err.logError();

      throw err;
    }
  }

  static async getMostLikedProduct(numProduct: number = 5): Promise<Array<IProduct>> {
    try {
      const mostLikedProduct = await Product.find().sort({
        'totalLikes': -1,
      }).limit(numProduct);

      assert.notStrictEqual(mostLikedProduct.length, 0);

      return mostLikedProduct;
    } catch (e: unknown) {
      const err = new CustomError('System failed to fetch most liked product. This may result in user seeing empty product.', (e as Error).message);
      await err.logError();

      return [];
    }
  }

  static async getMostExpensiveProduct(numProducts: number = 5): Promise<Array<IProduct>> {
    try {
      const mostExpensiveProduct = await Product.find().sort({
        'price': -1,
      }).limit(numProducts);

      assert.notStrictEqual(mostExpensiveProduct.length, 0);

      return mostExpensiveProduct;
    } catch (e: unknown) {
      const err = new CustomError('System failed to fetch most expensive product. This may result in user seeing empty product.', (e as Error).message);
      await err.logError();

      return [];
    }
  }

  static async getCarouselItems(): Promise<Array<CarouselItem>> {
    const carouselItems: CarouselItem[] = [];
    const productHrefPrefix = process.env.PREFIX_PRODUCT_LINK ? process.env.PREFIX_PRODUCT_LINK : '/umkm/product/';
    const imageLinkPrefix = process.env.PREFIX_IMAGE_HREF_LINK ? process.env.PREFIX_IMAGE_HREF_LINK : '/images/';

    try {
      const mostExpensiveProduct = await this.getMostExpensiveProduct();

      mostExpensiveProduct.forEach((product) => {
        carouselItems.push({
          imageAlt: product.imageAlt,
          productName: product.name,
          productDesc: product.descriptions.join(' '),
          productLink: `${productHrefPrefix}${product.id}`,
          imageLink: `${imageLinkPrefix}${product.imageName}`,
        });
      });
    } catch (e: unknown) {
      const err = new CustomError('System failed to fetch carousel items. this may result user seeing empty carousel in product index page', (e as Error).message);
      await err.logError();
    } finally {
      return carouselItems;
    }
  }

  static async getSidebarProducts(): Promise<Array<SidebarItem>> {
    const sidebarProducts: SidebarItem[] = [];
    const productHrefPrefix = process.env.PREFIX_PRODUCT_LINK ? process.env.PREFIX_PRODUCT_LINK : '/umkm/product/';
    const imageLinkPrefix = process.env.PREFIX_IMAGE_HREF_LINK ? process.env.PREFIX_IMAGE_HREF_LINK : '/images/';

    try {
      const mostLikedProducts = await this.getMostLikedProduct(4);

      mostLikedProducts.forEach((product) => {
        sidebarProducts.push({
          currency: product.currency,
          price: product.price,
          imageLink: `${imageLinkPrefix}${product.imageName}`,
          productName: product.name,
          productLink: `${productHrefPrefix}${product.id}`,
        });
      });
    } catch (e: unknown) {
      const err = new CustomError('System failed to generate sidebar items. this may result user seeing empty product in sidebar', (e as Error).message);
      await err.logError();
    } finally {
      return sidebarProducts;
    }
  }

  static async getLatestProductPageData(): Promise<Array<LatestProductItem>> {
    const latestProductPageData: LatestProductItem[] = [];
    try {
      const latestProducts = await this.getLatestProducts();

      latestProducts.forEach((product) => {
        latestProductPageData.push({
          href: `${ProductUMKM.staticProductHrefPrefix}${product.id}`,
          name: product.name,
          shortDesc: product.descriptions.join(' ').substring(0, 35).concat('...'),
          currency: product.currency,
          price: product.price,
          imageLink: `${ProductUMKM.staticImageLinkPrefix}${product.imageName}`
        })
      });
    } catch (e: unknown) {
      const err = new CustomError('System failed to fetch latest product. this may result user seeing empty product.', (e as Error).message);
      await err.logError();
    } finally {
      return latestProductPageData;
    }
  }

  static async getProductIndexPageData(): Promise<ProductIndexPageData> {
    try {
      const productIndexPageData: ProductIndexPageData = {
        villageName: BasicPage.villageName,
        carouselItems: await this.getCarouselItems(),
        sidebarItems: await this.getSidebarProducts(),
        featuredProducts: await this.getFeaturedProduct(),
        latestProducts: await this.getLatestProductPageData(),
      };

      return productIndexPageData;
    } catch (e: unknown) {
      const err = new CustomError('System failed to fetch product index page data. this may result user seeing invalid product index page.', (e as Error).message, );
      await err.logError();

      throw err;
    }
  }
}