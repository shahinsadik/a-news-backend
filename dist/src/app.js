"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const post_routes_1 = __importDefault(require("./posts/post.routes"));
const upload_routes_1 = __importDefault(require("./uploads/upload.routes"));
const category_routes_1 = __importDefault(require("./categories/category.routes"));
const ad_routes_1 = __importDefault(require("./ads/ad.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Auth routes
app.use('/api/auth', auth_routes_1.default);
// Post routes
app.use('/api/posts', post_routes_1.default);
// Upload routes
app.use('/api/uploads', upload_routes_1.default);
// Category routes
app.use('/api/categories', category_routes_1.default);
// Ad routes
app.use('/api/ads', ad_routes_1.default);
// Root route
app.get('/', (req, res) => {
    res.send('News portal server is running');
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
// Centralized error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
});
(0, db_1.connectDB)().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});
