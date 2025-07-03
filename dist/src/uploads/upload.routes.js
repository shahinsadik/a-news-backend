"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("./upload.controller");
const auth_1 = require("../middleware/auth");
const multer_1 = require("./multer");
const router = (0, express_1.Router)();
router.post('/images', auth_1.authMiddleware, multer_1.upload.array('images', 10), upload_controller_1.uploadImages);
exports.default = router;
