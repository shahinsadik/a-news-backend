"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const category_validation_1 = require("./category.validation");
const router = (0, express_1.Router)();
router.get('/', category_controller_1.getCategories);
router.get('/:id', category_controller_1.getCategoryById);
router.post('/', auth_1.authMiddleware, (0, validate_1.validate)(category_validation_1.createCategorySchema), category_controller_1.createCategory); // admin/editor
router.put('/:id', auth_1.authMiddleware, (0, validate_1.validate)(category_validation_1.updateCategorySchema), category_controller_1.updateCategory); // admin only
router.delete('/:id', auth_1.authMiddleware, category_controller_1.deleteCategory); // admin only
exports.default = router;
