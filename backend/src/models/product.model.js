// productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  productId:{
    type: mongoose.Types.ObjectId,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    // required: true,
  },
  discountedPrice: {
    type: Number,
  },
  brand: {
    type: String,
  },
  color: {
    type: String,
  },
  sizes: [
    {
        name: { type: String, required: true },
        quantity: { type: Number, required: true, default:0 }
    }
], 
  imageUrl: {
    type: String,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ratings',
    },
  ], 
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reviews',
    },
  ], 
  numRatings: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
  }
},{
  timestamps: true,
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
