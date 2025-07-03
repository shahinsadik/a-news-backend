"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdSchema = exports.createAdSchema = void 0;
const zod_1 = require("zod");
exports.createAdSchema = zod_1.z.object({
    title: zod_1.z.string().min(2),
    imageUrl: zod_1.z.string().url(),
    linkUrl: zod_1.z.string().url(),
    position: zod_1.z.enum(['sidebar', 'header', 'footer']),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateAdSchema = exports.createAdSchema.partial();
