"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentsByUserController = exports.cancelAppointmentController = exports.scheduleAppointmentController = exports.getAppointmentsByIdController = exports.getAppointmentsController = void 0;
const AppointmentService_1 = require("../services/AppointmentService");
const data_source_1 = require("../config/data-source");
const Appointment_entity_1 = require("../entities/Appointment.entity");
const emailService_1 = require("../services/emailService");
const User_entity_1 = require("../entities/User.entity");
const getAppointmentsController = async (req, res) => {
    try {
        res.status(200).json({
            message: "Listado de todos los turnos de todos los usuarios.",
            data: await (0, AppointmentService_1.getAppService)(),
        });
    }
    catch (error) {
        res.status(404).json({
            message: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
exports.getAppointmentsController = getAppointmentsController;
const getAppointmentsByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const appointment = await (0, AppointmentService_1.getAppByIdService)(id);
        res.status(200).json({
            message: "Detalle del turno encontrado.",
            data: appointment,
        });
    }
    catch (error) {
        res.status(404).json({
            msg: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
exports.getAppointmentsByIdController = getAppointmentsByIdController;
const scheduleAppointmentController = async (req, res) => {
    try {
        const { date, time, userId } = req.body;
        if (!userId || !date || !time) {
            return res.status(400).json({
                message: "Faltan datos: se requiere userId, date y time.",
            });
        }
        const appointment = await (0, AppointmentService_1.appointmentUserService)(req.body);
        const userRepository = data_source_1.appDataSource.getRepository(User_entity_1.User);
        const user = await userRepository.findOne({ where: { id: userId } });
        if (user?.email) {
            await (0, emailService_1.sendEmail)(user.email, "Turno agendado", `Hola ${user.name}, tu turno fue agendado para el día ${date} a las ${time}.`).catch((err) => console.error("Error enviando email:", err));
        }
        return res.status(201).json({
            message: "Turno agendado con éxito.",
            data: appointment,
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            msg: err instanceof Error
                ? err.detail
                    ? err.detail
                    : err.message
                : "Error desconocido",
        });
    }
};
exports.scheduleAppointmentController = scheduleAppointmentController;
const cancelAppointmentController = async (req, res) => {
    try {
        const appointmentRepository = data_source_1.appDataSource.getRepository(Appointment_entity_1.Appointment);
        const appointment = await (0, AppointmentService_1.cancelAppointmentService)(parseInt(req.params.id, 10));
        const appointmentWithUser = await appointmentRepository.findOne({
            where: { id: appointment.id },
            relations: ["user"],
        });
        if (appointmentWithUser?.user?.email) {
            await (0, emailService_1.sendEmail)(appointmentWithUser.user.email, "Turno cancelado", `Hola ${appointmentWithUser.user.name}, tu turno programado para el día ${appointmentWithUser.date} a las ${appointmentWithUser.time} ha sido cancelado.`).catch((err) => console.error("Error enviando email:", err));
        }
        res.status(200).json({
            message: "Turno cancelado con éxito",
            data: appointment,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
exports.cancelAppointmentController = cancelAppointmentController;
const getAppointmentsByUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        const appointmentRepo = data_source_1.appDataSource.getRepository(Appointment_entity_1.Appointment);
        const appointments = await appointmentRepo.find({
            where: { user: { id: Number(userId) } },
            relations: ["user"],
        });
        if (!appointments.length) {
            return res.status(404).json({ message: "No se encontraron turnos" });
        }
        return res.json({ data: appointments });
    }
    catch (error) {
        console.error("Error al obtener turnos:", error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};
exports.getAppointmentsByUserController = getAppointmentsByUserController;
//# sourceMappingURL=appointmentsControllers.js.map