"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const category_model_1 = require("./category.model");
const createCategory = async (req, res) => {
    const { name } = req.body;
    const exists = await category_model_1.Category.findOne({ name });
    if (exists)
        return res.status(400).json({ error: 'Category already exists' });
    const category = new category_model_1.Category({ name });
    await category.save();
    res.status(201).json(category);
};
exports.createCategory = createCategory;
const getCategories = async (req, res) => {
    const categories = await category_model_1.Category.find();
    res.json(categories);
};
exports.getCategories = getCategories;
const getCategoryById = async (req, res) => {
    const category = await category_model_1.Category.findById(req.params.id);
    if (!category)
        return res.status(404).json({ error: 'Category not found' });
    res.json(category);
};
exports.getCategoryById = getCategoryById;
const updateCategory = async (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ error: 'Forbidden' });
    const category = await category_model_1.Category.findById(req.params.id);
    if (!category)
        return res.status(404).json({ error: 'Category not found' });
    if (req.body.name)
        category.name = req.body.name;
    await category.save();
    res.json(category);
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ error: 'Forbidden' });
    const category = await category_model_1.Category.findById(req.params.id);
    if (!category)
        return res.status(404).json({ error: 'Category not found' });
    await category.deleteOne();
    res.json({ message: 'Category deleted' });
};
exports.deleteCategory = deleteCategory;
