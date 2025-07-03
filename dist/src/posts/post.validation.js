"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostSchema = exports.createPostSchema = void 0;
const zod_1 = require("zod");
exports.createPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(2),
    content: zod_1.z.string().min(1),
    categories: zod_1.z.array(zod_1.z.string()).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    youtubeUrls: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.updatePostSchema = exports.createPostSchema.partial();
