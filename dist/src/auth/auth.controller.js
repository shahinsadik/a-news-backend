"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEditor = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../users/user.model");
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await user_model_1.User.findOne({ email });
    if (!user)
        return res.status(401).json({ error: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        return res.status(401).json({ error: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};
exports.login = login;
const addEditor = async (req, res) => {
    // Only admin can add editor
    if (req.user?.role !== 'admin')
        return res.status(403).json({ error: 'Forbidden' });
    const { name, email, password } = req.body;
    const exists = await user_model_1.User.findOne({ email });
    if (exists)
        return res.status(400).json({ error: 'Email already in use' });
    const editor = new user_model_1.User({ name, email, password, role: 'editor' });
    await editor.save();
    res.status(201).json({ message: 'Editor created', editor: { id: editor._id, name: editor.name, email: editor.email, role: editor.role } });
};
exports.addEditor = addEditor;
