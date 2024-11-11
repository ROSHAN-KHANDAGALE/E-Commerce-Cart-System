import mongoose from "mongoose";

const mainSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    profile: [
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

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productModel",
        },
      },
    ],
  },

  { timestamps: true }
);

const mainModel = mongoose.model("mainModel", mainSchema);

export default mainModel;
