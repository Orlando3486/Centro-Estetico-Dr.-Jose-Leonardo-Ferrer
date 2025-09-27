"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const autenticacion_1 = __importDefault(require("../middlewares/autenticacion"));
const userRouter = (0, express_1.Router)();
userRouter.get("/", autenticacion_1.default, (req, res) => (0, usersController_1.getUsersController)(req, res));
userRouter.get("/:id", autenticacion_1.default, async (req, res) => (0, usersController_1.getUserByIdController)(req, res));
userRouter.post("/register", autenticacion_1.default, (req, res) => (0, usersController_1.registerUserController)(req, res));
userRouter.post("/login", autenticacion_1.default, (req, res) => (0, usersController_1.loginUsersController)(req, res));
exports.default = userRouter;
//# sourceMappingURL=usersRouter.js.map