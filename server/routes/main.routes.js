import express from "express";
import mainController from "../controller/main.controller";
import verify from "../middleware/token.auth";
import { authorize } from "../middleware/role.auth";
import upload from "../helper/multer";

const router = express.Router();

/*
 * HTTP REQUESTS URL DECLARATIONS
 * INTERMS OF CRUD Operations (CREATE, READ, UPDATE AND DELETE)
 */
router.get("/fetchAll", verify, mainController.fetchUser);
router.get("/fetchID/:id", mainController.fetchUserById);
router.post(
  "/register",
  upload.array("profile", 1),
  mainController.registeration
);
router.put(
  "/updateUser/:id",
  verify,
  upload.single("profile"),
  mainController.updateData
);
router.delete("/deleteUser/:id", verify, mainController.deleteUser);

/*
 * For Other Controller Handler Routes
 */
router.get("/fetched", mainController.fetchProductData);
router.post(
  "/product/:id",
  verify,
  authorize(["admin"]),
  upload.single("productPicture"),
  mainController.registerProduct
);
router.delete(
  "/product/remove/:id",
  verify,
  authorize(["admin"]),
  mainController.deleteProduct
);
router.put(
  "/product/update/:id",
  verify,
  authorize(["admin"]),
  upload.single("productPicture"),
  mainController.updateProduct
);

// USER MANAGEMENT related Controllers
router.post("/login", mainController.loginHandle);
router.post("/reset", mainController.resetPassword);

export default router;
