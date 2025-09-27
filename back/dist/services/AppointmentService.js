"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentService = exports.appointmentUserService = exports.getAppByIdService = exports.getAppService = void 0;
const IAppointments_1 = require("../interfaces/IAppointments");
const Appointment_repository_1 = require("../repositories/Appointment.repository");
const usersService_1 = require("./usersService");
const getAppService = async () => {
    const appoinmentsFound = await Appointment_repository_1.AppointmentModel.find();
    if (appoinmentsFound.length > 0)
        return appoinmentsFound;
    throw new Error("No se encontraton turnos");
};
exports.getAppService = getAppService;
const getAppByIdService = async (id) => {
    const appFound = await Appointment_repository_1.AppointmentModel.findOne({
        where: { id },
        relations: ["user"],
    });
    if (!appFound)
        throw new Error(`la cita con id: ${id} no fue encontrada`);
    return appFound;
};
exports.getAppByIdService = getAppByIdService;
const appointmentUserService = async (app) => {
    await (0, usersService_1.getUserByIdService)(app.userId);
    return await Appointment_repository_1.AppointmentModel.createAppointment(app.userId, app.date, app.time);
};
exports.appointmentUserService = appointmentUserService;
const cancelAppointmentService = async (id) => {
    const appFound = await Appointment_repository_1.AppointmentModel.findOne({
        where: { id },
    });
    if (!appFound) {
        throw new Error(`La cita con id ${id} no fue encontrada`);
    }
    if (appFound.status === IAppointments_1.Status.cancelled) {
        throw new Error(`La cita con id ${id} ya se encuentra cancelada`);
    }
    appFound.status = IAppointments_1.Status.cancelled;
    return await Appointment_repository_1.AppointmentModel.save(appFound);
};
exports.cancelAppointmentService = cancelAppointmentService;
//# sourceMappingURL=AppointmentService.js.map