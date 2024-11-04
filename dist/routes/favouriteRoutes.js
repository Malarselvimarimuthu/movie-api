"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favourite_controller_1 = require("../controllers/favourite.controller");
const router = express_1.default.Router();
router.post('/favourites', favourite_controller_1.addFavourite);
router.delete('/favourites', favourite_controller_1.removeFavourite);
router.get('/favourites', favourite_controller_1.getFavourites);
exports.default = router;
