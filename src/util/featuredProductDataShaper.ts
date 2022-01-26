import dotenv from 'dotenv';
import ProductUMKM from '../class/ProductUMKM';
import { FeaturedProductItem } from '../interface/pageResource/product/index/featuredProduct';
import Product from "../interface/productDetail";

dotenv.config();

const defaultDivisibleFactor: number = Number.isNaN(Number(process.env.FEATURED_PRODUCT_ROW_ITEM_COUNT!)) ? 4 : Number(process.env.FEATURED_PRODUCT_ROW_ITEM_COUNT!);

const makeFeaturedProductDataDivisibleBy = (divisibleFactor: number = defaultDivisibleFactor, featuredProducts: Product[]): Product[] => {
  if (featuredProducts.length < divisibleFactor || featuredProducts.length % divisibleFactor !== 0) {
    for (let i = 0; i < featuredProducts.length % divisibleFactor; i++) {
      featuredProducts.push(featuredProducts[0]);
    }
  }

  return featuredProducts;
}

const featuredProductDataShaper = (featuredProducts: Product[]): Array<FeaturedProductItem[]> => {
  const shapedFeaturedProductData: Array<FeaturedProductItem[]> = [];
  const normalizeFeaturedProductData: Product[] = makeFeaturedProductDataDivisibleBy(defaultDivisibleFactor, featuredProducts);

  while (normalizeFeaturedProductData.length) {
    const temp: FeaturedProductItem[] = [];

    normalizeFeaturedProductData.splice(0, defaultDivisibleFactor).forEach((product) => {
      temp.push({
        imageAlt: product.imageAlt,
        name: product.name,
        currency: product.currency,
        price: product.price,
        href: `${ProductUMKM.staticProductHrefPrefix}${product.id}`,
        imageLink: `${ProductUMKM.staticImageLinkPrefix}${product.imageName}`,
      });
    });

    shapedFeaturedProductData.push(temp);
  }

  return shapedFeaturedProductData;
};

export default featuredProductDataShaper;
