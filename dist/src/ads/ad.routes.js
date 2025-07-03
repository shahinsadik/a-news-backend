"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ad_controller_1 = require("./ad.controller");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const ad_validation_1 = require("./ad.validation");
const router = (0, express_1.Router)();
router.get('/', ad_controller_1.getAds);
router.get('/:id', ad_controller_1.getAdById);
router.post('/', auth_1.authMiddleware, (0, validate_1.validate)(ad_validation_1.createAdSchema), ad_controller_1.createAd); // admin only
router.put('/:id', auth_1.authMiddleware, (0, validate_1.validate)(ad_validation_1.updateAdSchema), ad_controller_1.updateAd); // admin only
router.delete('/:id', auth_1.authMiddleware, ad_controller_1.deleteAd); // admin only
exports.default = router;
