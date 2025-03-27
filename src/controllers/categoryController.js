const Category = require('../models/category');
const SubCategory = require('../models/subCategory');

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

exports.getSubCategories = async (req, res) => {
    const { category_id } = req.query;
    if (!category_id) return res.status(400).json({ message: "category_id diperlukan" });
    
    try {
        const subCategories = await SubCategory.findAll({ where: { category_id } });
        res.json(subCategories);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};
