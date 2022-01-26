import Carousel from '../pageResource/product/index/carousel';
import FeaturedProducts from '../pageResource/product/index/featuredProduct';
import Footer from '../pageResource/product/index/footer';
import Head from '../pageResource/product/index/head';
import LatestProduct from '../pageResource/product/index/latestProduct';
import Sidebar from '../pageResource/product/index/sidebar';

export default interface ProductIndexPageData extends 
  Carousel,
  Sidebar,
  FeaturedProducts,
  LatestProduct,
  Head,
  Footer {

}
