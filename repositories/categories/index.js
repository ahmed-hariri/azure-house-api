const pool = require('../../config/db');

/*---> Get all categories (name only) <---*/
const getCategoriesRepository = async () => {
    try {
        const [categories] = await pool.query("SELECT * FROM categories");
        if (categories.length > 0) {
            return { data: categories, message: 'All categories retrieved successfully.' };
        }
        return { data: [], message: 'No categories found.' };
    } catch (error) {
        console.error("Error retrieving categories:", error);
        return { data: [], message: "Error retrieving categories!" };
    }
};

/*---> Get all categories with their products <---*/
const getCategoriesWithProductsRepository = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                c.id AS categoryId,
                c.name AS categoryName,
                p.id AS productId,
                p.title,
                p.description,
                p.price,
                p.picture,
                p.taille,
                p.contenance
            FROM categories c
            LEFT JOIN products p ON c.id = p.category_id
        `);

        // Regrouper les produits sous chaque catégorie
        const categoryMap = {};
        for (const row of rows) {
            if (!categoryMap[row.categoryId]) {
                categoryMap[row.categoryId] = {
                    id: row.categoryId,
                    name: row.categoryName,
                    products: []
                };
            }
            if (row.productId) {
                categoryMap[row.categoryId].products.push({
                    id: row.productId,
                    title: row.title,
                    description: row.description,
                    price: row.price,
                    picture: row.picture,
                    taille: row.taille,
                    contenance: row.contenance
                });
            }
        }

        const categoriesWithProducts = Object.values(categoryMap);
        return { data: categoriesWithProducts, message: "Categories with products retrieved successfully." };
    } catch (error) {
        console.error("Error retrieving categories with products:", error);
        return { data: [], message: "Error retrieving categories with products." };
    }
};

/*---> Add new category <---*/
const addCategoryRepository = async (name) => {
    try {
        const [result] = await pool.query("INSERT INTO categories (name) VALUES (?)", [name]);
        if (result.insertId) {
            return { data: result.insertId, message: "Category created successfully!" };
        }
        return { data: null, message: "Category not created." };
    } catch (error) {
        console.error("Error adding category:", error);
        return { data: null, message: "Error adding category!" };
    }
};

/*---> Update category <---*/
const updateCategoryRepository = async (id, name) => {
    try {
        const [result] = await pool.query("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
        if (result.affectedRows === 1) {
            return { data: id, message: "Category updated successfully!" };
        }
        return { data: null, message: "Category not found or no change made." };
    } catch (error) {
        console.error("Error updating category:", error);
        return { data: null, message: "Error updating category!" };
    }
};

/*---> Remove category <---*/
const removeCategoryRepository = async (id) => {
    try {
        const [result] = await pool.query("DELETE FROM categories WHERE id = ?", [id]);
        if (result.affectedRows === 1) {
            return { data: id, message: "Category deleted successfully!" };
        }
        return { data: null, message: "Category not found." };
    } catch (error) {
        console.error("Error deleting category:", error);
        return { data: null, message: "Error deleting category!" };
    }
};

module.exports = {
    getCategoriesRepository,
    getCategoriesWithProductsRepository,
    addCategoryRepository,
    updateCategoryRepository,
    removeCategoryRepository
};
