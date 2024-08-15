import express from "express";
import formidable from 'express-formidable'
const router = express.Router()

//controllers
import { addProduct, addProductReview, fetchAllProducts, fetchNewProducts, fetchProductById, fetchProducts, fetchTopProducts, filterProducts, removeProduct, updateProductDetails } from "../controllers/productController.js";

import { authenticate,autherizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router.route('/').post(authenticate,autherizeAdmin,formidable(),addProduct)
                .get(fetchProducts)
router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, autherizeAdmin,formidable(),  updateProductDetails)
  .delete(authenticate, autherizeAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router