"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsControllers_1 = require("../controllers/appointmentsControllers");
const autenticacion_1 = __importDefault(require("../middlewares/autenticacion"));
const appointmentsRouter = (0, express_1.Router)();
appointmentsRouter.get("/", autenticacion_1.default, (req, res) => (0, appointmentsControllers_1.getAppointmentsController)(req, res));
appointmentsRouter.get("/:id", autenticacion_1.default, (req, res) => (0, appointmentsControllers_1.getAppointmentsByIdController)(req, res));
appointmentsRouter.get("/user/:userId", (req, res) => (0, appointmentsControllers_1.getAppointmentsByUserController)(req, res));
appointmentsRouter.post("/schedule", autenticacion_1.default, (req, res) => (0, appointmentsControllers_1.scheduleAppointmentController)(req, res));
appointmentsRouter.put("/cancel/:id", autenticacion_1.default, (req, res) => (0, appointmentsControllers_1.cancelAppointmentController)(req, res));
exports.default = appointmentsRouter;
//# sourceMappingURL=appointmentsRouter.js.map