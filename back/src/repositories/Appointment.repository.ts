import moment from "moment-timezone";
import { Appointment } from "../entities/Appointment.entity";
import { appDataSource } from "../config/data-source";
import { Status } from "../interfaces/IAppointments";
import { Not } from "typeorm";

export const AppointmentModel = appDataSource
  .getRepository(Appointment)
  .extend({
    async validateAppointment(userId: number, date: string, time: string) {
      const tz = "America/Argentina/Buenos_Aires";

      const [hoursRaw, minutesRaw] = time.split(":");
      const hours = Number(hoursRaw);
      const minutes = Number(minutesRaw);
      if (isNaN(hours) || isNaN(minutes)) {
        throw new Error("Hora inválida.");
      }
      const appointmentTime = moment
        .tz(date, tz)
        .set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });

      const hour = appointmentTime.hour();
      if (hour < 10 || hour > 18 || (hour === 18 && minutes > 0)) {
        throw new Error("Los turnos solo pueden tomarse entre las 10 y 18 hs.");
      }

      const now = moment().tz(tz);
      if (appointmentTime.isBefore(now)) {
        throw new Error(
          "No puedes tomar turnos en fechas u horarios ya pasados."
        );
      }

      if (appointmentTime.diff(now, "hours") < 24) {
        throw new Error(
          "Debes solicitar el turno con al menos 24 horas de anticipación."
        );
      }

      if (appointmentTime.minute() % 30 !== 0) {
        throw new Error(
          "Los turnos deben comenzar en intervalos de 30 minutos (ej: 10:00, 10:30)."
        );
      }

      const dayOfWeek = appointmentTime.day();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        throw new Error("No se pueden agendar turnos los sábados ni domingos.");
      }

      const existingUser = await this.findOne({
        where: {
          date: appointmentTime.toDate(),
          user: { id: userId },
          status: Not(Status.cancelled),
        },
      });

      if (existingUser) {
        throw new Error("El usuario ya tiene un turno activo a esta hora.");
      }
      return appointmentTime;
    },

    async createAppointment(userId: number, date: string, time: string) {
      const validatedDate = await this.validateAppointment(userId, date, time);

      const existingAppointment = await this.findOne({
        where: {
          date: validatedDate.toDate(),
          time: validatedDate.format("HH:mm"),
          user: { id: userId },
          status: Not(Status.cancelled),
        },
      });

      if (existingAppointment) {
        throw new Error(
          `Ya existe un turno activo para este usuario en ${date} a las ${time}`
        );
      }

      const appointment = this.create({
        user: { id: userId },
        date: validatedDate.toDate(),
        time: validatedDate.format("HH:mm"),
      });

      return await this.save(appointment);
    },
  });
