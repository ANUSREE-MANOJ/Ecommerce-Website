import express from "express";
const router = express.Router();


import { createCategory ,updatedCategory ,removeCategory ,listCategory ,readCategory} from "../controllers/categoryController.js";
import { authenticate ,autherizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate,autherizeAdmin,  createCategory);
router.route('/:categoryId').put(authenticate,autherizeAdmin,updatedCategory)

router
  .route("/:categoryId")
  .delete(authenticate, autherizeAdmin , removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);
export default router;