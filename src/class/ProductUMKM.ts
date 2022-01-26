import { strict as assert } from 'assert';
import Product from "../models/product";
import UMKMProductsPageData, { RecomendedProduct } from "../interface/pageRenderingData/UMKMProduct";
import UserRequestError from "./Error/UserRequestError";
import CustomError from "./Error/CustomError";
import UMKM from "./UMKM";
import ServerConfigError from "./Error/ServerConfigError";
import { UMKMContact } from "../interface/profileUMKM";
import BasicPage from "./BasicPage";

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
}