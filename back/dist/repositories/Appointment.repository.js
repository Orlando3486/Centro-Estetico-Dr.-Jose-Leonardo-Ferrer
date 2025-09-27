"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModel = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const Appointment_entity_1 = require("../entities/Appointment.entity");
const data_source_1 = require("../config/data-source");
const IAppointments_1 = require("../interfaces/IAppointments");
const typeorm_1 = require("typeorm");
exports.AppointmentModel = data_source_1.appDataSource
    .getRepository(Appointment_entity_1.Appointment)
    .extend({
    async validateAppointment(userId, date, time) {
        const tz = "America/Argentina/Buenos_Aires";
        const [hoursRaw, minutesRaw] = time.split(":");
        const hours = Number(hoursRaw);
        const minutes = Number(minutesRaw);
        if (isNaN(hours) || isNaN(minutes)) {
            throw new Error("Hora inválida.");
        }
        const appointmentTime = moment_timezone_1.default
            .tz(date, tz)
            .set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });
        const hour = appointmentTime.hour();
        if (hour < 10 || hour > 18 || (hour === 18 && minutes > 0)) {
            throw new Error("Los turnos solo pueden tomarse entre las 10 y 18 hs.");
        }
        const now = (0, moment_timezone_1.default)().tz(tz);
        if (appointmentTime.isBefore(now)) {
            throw new Error("No puedes tomar turnos en fechas u horarios ya pasados.");
        }
        if (appointmentTime.diff(now, "hours") < 24) {
            throw new Error("Debes solicitar el turno con al menos 24 horas de anticipación.");
        }
        if (appointmentTime.minute() % 30 !== 0) {
            throw new Error("Los turnos deben comenzar en intervalos de 30 minutos (ej: 10:00, 10:30).");
        }
        const dayOfWeek = appointmentTime.day();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new Error("No se pueden agendar turnos los sábados ni domingos.");
        }
        const existingUser = await this.findOne({
            where: {
                date: appointmentTime.toDate(),
                user: { id: userId },
                status: (0, typeorm_1.Not)(IAppointments_1.Status.cancelled),
            },
        });
        if (existingUser) {
            throw new Error("El usuario ya tiene un turno activo a esta hora.");
        }
        return appointmentTime;
    },
    async createAppointment(userId, date, time) {
        const validatedDate = await this.validateAppointment(userId, date, time);
        const existingAppointment = await this.findOne({
            where: {
                date: validatedDate.toDate(),
                time: validatedDate.format("HH:mm"),
                user: { id: userId },
                status: (0, typeorm_1.Not)(IAppointments_1.Status.cancelled),
            },
        });
        if (existingAppointment) {
            throw new Error(`Ya existe un turno activo para este usuario en ${date} a las ${time}`);
        }
        const appointment = this.create({
            user: { id: userId },
            date: validatedDate.toDate(),
            time: validatedDate.format("HH:mm"),
        });
        return await this.save(appointment);
    },
});
//# sourceMappingURL=Appointment.repository.js.map