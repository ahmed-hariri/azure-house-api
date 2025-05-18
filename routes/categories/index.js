const express = require("express");
const { getCategoriesController, getCategoriesWithProductsController, addCategoryController, updateCategoryController, removeCategoryController } = require("../../controllers/categories");
const { authenticateToken, checkAdmin } = require("../../middlewares/auth");

/*---> Define categories routes <---*/
const categorieRoutes = express.Router();

categorieRoutes.get("/categories", getCategoriesController);
categorieRoutes.get("/categories-products", getCategoriesWithProductsController);
categorieRoutes.post("/categorie", authenticateToken, checkAdmin, addCategoryController);
categorieRoutes.delete("/categorie/:id", authenticateToken, checkAdmin, removeCategoryController);
categorieRoutes.put("/categorie/:id", authenticateToken, checkAdmin, updateCategoryController);

module.exports = categorieRoutes;