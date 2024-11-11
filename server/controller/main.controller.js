import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mainModel from "../models/main.model";
import productModel from "../models/product.model";
import * as status from "../config/constants";
import sendRegistrationEmail from "../helper/mailer";

// To Fetch All Records
exports.fetchUser = async (req, res) => {
  try {
    const fetch = await mainModel.find().sort({ firstName: 1 });

    console.log("FETCHED ALL RECORDS!!");
    res
      .status(status.OK)
      .json({ message: status.RECORD_FOUND, fetched: fetch });
  } catch (error) {
    res
      .status(status.SERVER_ERROR)
      .json({ message: status.SERVER_MESSAGE_ERROR });
  }
};

// To Fetch Record By Id
exports.fetchUserById = async (req, res) => {
  try {
    const fetchById = await mainModel
      .findById(req.params.id)
      .sort({ firstName: 1 });

    if (!fetchById) {
      res.status(status.NOT_FOUND).json({ message: status.RECORD_NOT_FOUND });
    }

    console.log("USER DATA FETCHED!!");

    res
      .status(status.OK)
      .json({ message: status.RECORD_FOUND, fetch: fetchById });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ message: status.RECORD_NOT_FOUND });
  }
};

// To Create Registration
exports.registeration = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const profile = req.files.map((file) => ({
    filename: file.filename,
    path: file.path,
    mimetype: file.mimetype,
    size: file.size,
    uploadedAt: new Date(),
  }));

  try {
    const existingUser = await mainModel.findOne({ email });
    if (existingUser) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: status.EMAIL_ALREADY_EXISTS });
    }

    const isFirstAdmin = (await mainModel.countDocuments()) === 0;
    const role = isFirstAdmin ? "admin" : "user";

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await mainModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      profile,
    });
    console.log("USER REGISTERED !!");
    res
      .status(status.CREATED)
      .json({ message: status.REGISTERED, registered: newUser });
  } catch (error) {
    console.log("Failed Registration", error.message);
    res.status(status.BAD_REQUEST).json({ message: status.REGISTER_FAILED });
  }
};

// To Update User Data
exports.updateData = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.profile = {
        path: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
      };
    }
    const checkUser = await mainModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!checkUser) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: status.UPDATE_FAILED });
    }

    console.log("USER DATA UPDATED!!");
    return res
      .status(status.CREATED)
      .json({ message: status.UPDATED, updated: checkUser });
  } catch (error) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: status.UPDATE_FAILED });
  }
};

// To Delete User
exports.deleteUser = async (req, res) => {
  try {
    const deleteUserData = await mainModel.findByIdAndDelete(req.params.id);
    if (!deleteUserData) {
      res.status(status.NOT_FOUND).json({ message: status.REMOVE_FAIL });
    }

    res
      .status(status.OK)
      .json({ message: status.REMOVED, removed: deleteUserData });

    console.log("USER DATA DELETED!!");
  } catch (error) {
    console.log(error.message);
    res.status(status.NOT_FOUND).json({ message: status.RECORD_NOT_FOUND });
  }
};

/**
 * Other Controller Handles
 */
// For Login Handle
exports.loginHandle = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await mainModel.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: status.RECORD_NOT_FOUND });
    }

    console.log("User found:", user);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Provided: ", password);
    console.log("Original Pass: ", user.password);
    console.log("Email Provided: ", email);
    console.log("Original Email: ", user.email);
    console.log("Password match:", isMatch);

    if (isMatch) {
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      console.log("JWT: ", process.env.JWT_SECRET);

      user.token = token;
      await user.save();
      return res
        .status(status.OK)
        .json({ message: status.LOGGED_IN, token, userStatus: user });
    } else {
      return res
        .status(status.UNAUTHORIZED)
        .json({ message: status.INVALID_CREDENTIAL });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(status.SERVER_ERROR)
      .json({ message: status.SERVER_MESSAGE_ERROR });
  }
};

// Product Registration Controller
exports.registerProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const productPictures = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      uploadedAt: new Date(),
    }));

    const productEntry = new productModel({
      name,
      description,
      price,
      category,
      productPicture: productPictures,
    });

    const savedProduct = await productEntry.save();

    const adminUser = await mainModel.findById(req.user.id);

    adminUser.products.push({ product: savedProduct._id });

    await adminUser.save();

    console.log("Product Saved!");
    return res
      .status(status.CREATED)
      .json({ message: status.PRODUCT_REGISTRY, product: savedProduct });
  } catch (error) {
    console.log(error.message);
    return res
      .status(status.SERVER_ERROR)
      .json({ message: status.SERVER_MESSAGE_ERROR });
  }
};

// To get all the Products Data
exports.fetchProductData = async (req, res) => {
  // console.log("fetchProductData endpoint hit");
  try {
    const fetchProduct = await productModel.find().sort({ name: 1 });
    res
      .status(status.OK)
      .json({ message: status.FOUND, fetched: fetchProduct });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching data" });
  }
};

// To remove entry of a Product
exports.deleteProduct = async (req, res) => {
  try {
    const remove = await productModel.findByIdAndDelete(req.params.id);
    if (!remove) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: status.REMOVE_FAIL_PRODUCT });
    }

    res
      .status(status.OK)
      .json({ message: status.REMOVED_PRODUCT, Removed_Product: remove });

    console.log("PRODUCT REMOVED!!");
  } catch (error) {
    console.log("Error", error.message);
    res.status(status.NOT_FOUND).json({ message: status.REMOVE_FAIL_PRODUCT });
  }
};

// To update product data
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: status.PRODUCT_UPDATE_FAILED });
    }

    console.log("PRODUCT UPDATED!", updatedProduct);
    return res
      .status(status.OK)
      .json({ message: status.PRODUCT_UPDATE, updated: updatedProduct });
  } catch (error) {
    console.error("Update Product Error:", error);
    return res
      .status(status.BAD_REQUEST)
      .json({ message: status.PRODUCT_UPDATE_FAILED });
  }
};

// Generating random temporary password
function generateRandomPassword() {
  var length = 6,
    charset = "01234#$@&56789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

// To Reset Password
exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await mainModel.findOne({ email });

    if (!user) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: status.RECORD_NOT_FOUND });
    }

    const pass = generateRandomPassword();

    console.log("\nTEMPORARY PASSWORD: ", pass);

    const hashedPassword = await bcrypt.hash(pass, 10);
    user.password = hashedPassword;
    await user.save();

    await sendRegistrationEmail(email, user.firstName, user.lastName, pass)
      .then(() => {
        console.log("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email: ", error);
      });

    res
      .status(status.OK)
      .json({ message: status.TEMP, temporary: user.password });
  } catch (error) {
    console.error(error);
    res.status(status.SERVER_ERROR).json({ message: status.RESET });
  }
};
