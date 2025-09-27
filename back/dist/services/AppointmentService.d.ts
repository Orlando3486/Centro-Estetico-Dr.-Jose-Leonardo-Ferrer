import { scheduleAppointmentDTO } from "../dto/AppointmentDTO";
import { Appointment } from "../entities/Appointment.entity";
export declare const getAppService: () => Promise<Appointment[] | undefined>;
export declare const getAppByIdService: (id: number) => Promise<Appointment>;
export declare const appointmentUserService: (app: scheduleAppointmentDTO) => Promise<Appointment>;
export declare const cancelAppointmentService: (id: number) => Promise<Appointment>;
//# sourceMappingURL=AppointmentService.d.ts.map