import moment from "moment-timezone";
import { Appointment } from "../entities/Appointment.entity";
export declare const AppointmentModel: import("typeorm").Repository<Appointment> & {
    validateAppointment(userId: number, date: string, time: string): Promise<moment.Moment>;
    createAppointment(userId: number, date: string, time: string): Promise<Appointment>;
};
//# sourceMappingURL=Appointment.repository.d.ts.map