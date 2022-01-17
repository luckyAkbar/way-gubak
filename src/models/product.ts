import mongoose from 'mongoose';
import ProductInterface from "../interface/productDetail";

const product = new mongoose.Schema<ProductInterface>({
  id: {
    type: Number,
    required: true,
    index: true,
  },

  name: {
    type: String,
    required: true,
  },

  UMKM_ID: {
    type: Number,
    required: true,
    min: 1,
  },

  imageName: {
    type: String,
    required: true,
  },

  imageAlt: {
    type: String,
    default: 'Foto produk',
  },

  category: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    min: 1,
    required: true,
  },

  currency: {
    type: String,
    enum: ['USD', 'IDR'],
  },

  totalLikes: {
    type: Number,
    min: 0,
    default: 0,
  },

  details: {
    type: [{ imageName: String, imageAlt: String }],
    required: true,
  },

  descriptions: {
    type: [String],
    required: true,
  },

  spesifications: {
    type: [{ title: String, value: String }],
  },
});

const Product = mongoose.model<ProductInterface>('Product', product);

export default Product;
