const { getProductRepository, addProductRepository, removeProductRepository, updateProductRepository } = require("../../repositories/articles");

/*---> Get all products controller <---*/
const getProductsController = async (req, res, next) => {
    try {
        const { data, message } = await getProductRepository();
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}

/*---> Add product controller <---*/
const addProductController = async (req, res) => {
    try {
        const { title, description, price, taille, contenance, categoryId } = req.body;
        const picture = req.file ? req.file.filename : null;

        if (!title || !description || !price || !picture || !categoryId) {
            return res.status(400).json({
                message: `You don't have: ${!title ? "title " : ""}${!description ? "description " : ""}${!price ? "price " : ""}${!picture ? "picture " : ""}${!categoryId ? "categoryId " : ""}`
            });
        } else if (!picture) {
            return res.status(400).json({ message: "Picture is required!" });
        }

        const { data, message } = await addProductRepository({ picture, title, description, price, taille, contenance, categoryId });
        if (message === "Product has been created!") {
            return res.status(201).json({ data: data, message: message });
        }
        return res.status(400).json({ message });
    } catch (error) {
        console.error("Error in addProductController:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

/*---> Remove product controller <---*/
const removeProductController = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).type("json").json({ message: "You don't have productId!" })
    }
    try {
        const { data, message } = await removeProductRepository({ id });
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(404).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}

/*---> Update product controller <---*/
const updateProductController = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, price, taille, contenance, categoryId } = req.body;
    const picture = req.file ? req.file.filename : null;

    if (!id) {
        return res.status(400).json({ message: "You don't have productId!" });
    }
    try {
        const product = { title, description, price, taille, contenance, categoryId, };
        // On ajoute la picture seulement si elle est envoyée (mise à jour optionnelle)
        if (picture) product.picture = picture;

        const { data, message } = await updateProductRepository({ id }, product);
        if (data) {
            return res.status(200).json({ data, message });
        }

        return res.status(404).json({ message });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProductsController,
    addProductController,
    removeProductController,
    updateProductController
};