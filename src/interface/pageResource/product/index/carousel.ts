interface CarouselItem {
  productLink: string,
  imageLink: string,
  imageAlt: string,
  productName: string,
  productDesc: string,
}

export default interface Carousel {
  carouselItems: CarouselItem[],
}

export { CarouselItem };
