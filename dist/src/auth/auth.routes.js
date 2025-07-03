"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router.post('/login', (0, validate_1.validate)(auth_validation_1.loginSchema), auth_controller_1.login);
router.post('/users', auth_1.authMiddleware, (0, validate_1.validate)(auth_validation_1.addEditorSchema), auth_controller_1.addEditor); // Only admin can add editor
exports.default = router;
