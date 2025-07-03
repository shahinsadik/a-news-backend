"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("./src/users/user.model");
const db_1 = require("./src/config/db");
const express_1 = require("express");
dotenv_1.default.config();
// Set your admin credentials here
const name = 'Shahin Sadik';
const email = 'shahinsadik@gmail.com';
const password = 'Sd@01706995324';
async function main() {
    await (0, db_1.connectDB)();
    const existingAdmin = await user_model_1.User.findOne({ role: 'admin' });
    if (existingAdmin) {
        console.log('An admin user already exists.');
        process.exit(0);
    }
    try {
        const admin = new user_model_1.User({ name, email, password, role: 'admin' });
        await admin.save();
        console.log('Admin user created successfully!');
    }
    catch (err) {
        console.error('Error creating admin:', err.message);
    }
    finally {
        mongoose_1.default.disconnect();
    }
}
const router = (0, express_1.Router)();
// You can add your category routes here
exports.default = router;
main();
