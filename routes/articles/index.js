const express = require("express");
const { getProductsController, addProductController, removeProductController, updateProductController } = require("../../controllers/articles");
const { upload } = require("../../middlewares/upload");
const { authenticateToken, checkAdmin } = require("../../middlewares/auth");

/*---> Define products routes <---*/
const productRoutes = express.Router();

productRoutes.get("/products", getProductsController);

/*---> Add multer middleware to handle single file upload with field name "picture" <---*/
productRoutes.post("/product", authenticateToken, checkAdmin, upload.single("picture"), addProductController);

productRoutes.delete("/product/:id", authenticateToken, checkAdmin, removeProductController);
productRoutes.put("/product/:id", authenticateToken, checkAdmin, updateProductController);

module.exports = productRoutes;