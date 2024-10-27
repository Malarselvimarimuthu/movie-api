"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const bycrypt_1 = __importDefault(require("../configs/bycrypt"));
const authController = {
    Register, function: register
};
{
    try {
        const { name, email, password: passwordBody } = req.body;
        if (!name || !email || !passwordBody) {
            return res.status(400).json({ message: "Missing data" });
        }
        const isUserExists = await user_model_1.default.findOne({ email }).exec();
        if (isUserExists) {
            return res.status(401).json({ message: "User Already Exists" });
        }
        const password = await bcrypt_1.default.hash(passwordBody, bycrypt_1.default.salt);
        const access_token = crypto_1.default.randomBytes(30).toString("hex");
        const newUser = await new user_model_1.default({
            name,
            email,
            password,
            access_token
        }).save();
        return res.status(201).json(newUser);
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
// Login function
login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Missing Data" });
        }
        const user = yield user_model_1.default.findOne({ email }).exec();
        if (!user) {
            return res.status(401).json({ message: "Email or Password is Wrong!" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email or Password is Wrong!" });
        }
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            access_token: user.access_token,
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
;
exports.default = authController;
