const pool = require('../../config/db');

/*---> Get all products repository <---*/
const getProductRepository = async () => {
    try {
        const [products] = await pool.query(`
            SELECT products.*, categories.name AS categoryName
            FROM products
            JOIN categories ON products.category_id = categories.id 
        `);
        if (products.length > 0) {
            return { data: products, message: 'Get all products' };
        }
        return { data: [], message: 'Not found any products' };
    } catch (error) {
        console.error("Error get products:", error);
        return { data: [], message: "Error get products!" };
    }
}

const addProductRepository = async (product) => {
    const { picture, title, description, price, taille, contenance, categoryId } = product;

    try {
        // Check that the category exists
        const [category] = await pool.query("SELECT * FROM categories WHERE id = ?", [categoryId]);
        if (category.length === 0) {
            return { data: null, message: "Category not found!" };
        }

        // Insert a new product
        const [result] = await pool.query(
            "INSERT INTO products (picture, title, description, price, taille, contenance, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [picture, title, description, price, taille, contenance, categoryId]
        );
        if (result.insertId) {
            return { data: result.insertId, message: "Product has been created!" };
        }
    } catch (error) {
        console.error("Error creating product:", error);
        return { data: null, message: "Error creating product!" };
    }
};

/*---> Remove product repository <---*/
const removeProductRepository = async (productId) => {
    const { id } = productId;
    try {
        const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
        if (result.affectedRows === 1) {
            return { data: result.affectedRows, message: 'Product deleted successfully!' };
        }

        return { data: null, message: 'Product not found!' };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { data: null, message: 'An error occurred while deleting the product.' };
    }
};

/*---> Update product repository <---*/
const updateProductRepository = async (productId, product) => {
    const { picture, title, description, price, taille, contenance, categoryId } = product;
    const { id } = productId

    try {
        // Check that the category exists
        const [category] = await pool.query("SELECT * FROM categories WHERE id = ?", [categoryId]);
        if (category.length === 0) {
            return { data: null, message: "Category not found!" };
        }

        // Update the product
        const [result] = await pool.query(
            `UPDATE products 
             SET picture = ?, title = ?, description = ?, price = ?, taille = ?, contenance = ?, category_id = ?
             WHERE id = ?`,
            [picture, title, description, price, taille, contenance, categoryId, id]
        );
        if (result.affectedRows === 1) {
            return { data: id, message: "Product updated successfully!" };
        }

        return { data: null, message: "Product not found or no changes made." };
    } catch (error) {
        console.error("Error updating product:", error);
        return { data: null, message: "Error updating product!" };
    }
};


module.exports = {
    getProductRepository,
    addProductRepository,
    removeProductRepository,
    updateProductRepository
};