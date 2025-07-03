"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const post_model_1 = require("./post.model");
const createPost = async (req, res) => {
    const { title, content, categories, tags, images, youtubeUrls } = req.body;
    const post = new post_model_1.Post({
        title,
        content,
        categories,
        tags,
        images,
        youtubeUrls,
        author: req.user.userId,
    });
    await post.save();
    res.status(201).json(post);
};
exports.createPost = createPost;
const getPosts = async (req, res) => {
    const posts = await post_model_1.Post.find().populate('author', 'name email role').populate('categories', 'name');
    res.json(posts);
};
exports.getPosts = getPosts;
const getPostById = async (req, res) => {
    const post = await post_model_1.Post.findById(req.params.id).populate('author', 'name email role').populate('categories', 'name');
    if (!post)
        return res.status(404).json({ error: 'Post not found' });
    res.json(post);
};
exports.getPostById = getPostById;
const updatePost = async (req, res) => {
    const post = await post_model_1.Post.findById(req.params.id);
    if (!post)
        return res.status(404).json({ error: 'Post not found' });
    // Only admin or owner (editor) can update
    if (req.user.role !== 'admin' && post.author.toString() !== req.user.userId) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    Object.assign(post, req.body);
    await post.save();
    res.json(post);
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    const post = await post_model_1.Post.findById(req.params.id);
    if (!post)
        return res.status(404).json({ error: 'Post not found' });
    // Only admin or owner (editor) can delete
    if (req.user.role !== 'admin' && post.author.toString() !== req.user.userId) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
};
exports.deletePost = deletePost;
