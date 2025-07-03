"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAd = exports.updateAd = exports.getAdById = exports.getAds = exports.createAd = void 0;
const ad_model_1 = require("./ad.model");
const createAd = async (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ error: 'Forbidden' });
    const { title, imageUrl, linkUrl, position, isActive } = req.body;
    const ad = new ad_model_1.Ad({ title, imageUrl, linkUrl, position, isActive });
    await ad.save();
    res.status(201).json(ad);
};
exports.createAd = createAd;
const getAds = async (req, res) => {
    const ads = await ad_model_1.Ad.find();
    res.json(ads);
};
exports.getAds = getAds;
const getAdById = async (req, res) => {
    const ad = await ad_model_1.Ad.findById(req.params.id);
    if (!ad)
        return res.status(404).json({ error: 'Ad not found' });
    res.json(ad);
};
exports.getAdById = getAdById;
const updateAd = async (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ error: 'Forbidden' });
    const ad = await ad_model_1.Ad.findById(req.params.id);
    if (!ad)
        return res.status(404).json({ error: 'Ad not found' });
    Object.assign(ad, req.body);
    await ad.save();
    res.json(ad);
};
exports.updateAd = updateAd;
const deleteAd = async (req, res) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ error: 'Forbidden' });
    const ad = await ad_model_1.Ad.findById(req.params.id);
    if (!ad)
        return res.status(404).json({ error: 'Ad not found' });
    await ad.deleteOne();
    res.json({ message: 'Ad deleted' });
};
exports.deleteAd = deleteAd;
