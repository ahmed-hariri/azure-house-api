const {
    getCategoriesRepository,
    getCategoriesWithProductsRepository,
    addCategoryRepository,
    updateCategoryRepository,
    removeCategoryRepository
} = require("../../repositories/categories");

/*---> Get all categories <---*/
const getCategoriesController = async (req, res, next) => {
    try {
        const { data, message } = await getCategoriesRepository();
        if (data) {
            return res.status(200).json({ data, message });
        }
        return res.status(404).json({ message });
    } catch (error) {
        next(error);
    }
};

/*---> Get all categories with products <---*/
const getCategoriesWithProductsController = async (req, res, next) => {
    try {
        const { data, message } = await getCategoriesWithProductsRepository();
        if (data) {
            return res.status(200).json({ data, message });
        }
        return res.status(404).json({ message });
    } catch (error) {
        next(error);
    }
};

/*---> Add category <---*/
const addCategoryController = async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "You must provide a category name!" });
    }

    try {
        const { data, message } = await addCategoryRepository(name);
        if (data) {
            return res.status(201).json({ data, message });
        }
        return res.status(400).json({ message });
    } catch (error) {
        next(error);
    }
};

/*---> Update category <---*/
const updateCategoryController = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ message: "You must provide category id and name!" });
    }

    try {
        const { data, message } = await updateCategoryRepository(id, name);
        if (data) {
            return res.status(200).json({ data, message });
        }
        return res.status(404).json({ message });
    } catch (error) {
        next(error);
    }
};

/*---> Remove category <---*/
const removeCategoryController = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "You must provide category id!" });
    }

    try {
        const { data, message } = await removeCategoryRepository(id);
        if (data) {
            return res.status(200).json({ data, message });
        }
        return res.status(404).json({ message });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCategoriesController,
    getCategoriesWithProductsController,
    addCategoryController,
    updateCategoryController,
    removeCategoryController
};
