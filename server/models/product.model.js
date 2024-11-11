import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    productPicture: [
      {
        filename: {
          type: String,
        },
        path: {
          type: String,
        },
        mimetype: {
          type: String,
        },
        size: {
          type: Number,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const productModel = mongoose.model("productModel", productSchema);

export default productModel;
