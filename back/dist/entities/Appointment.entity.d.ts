import { Status } from "../interfaces/IAppointments";
import { User } from "./User.entity";
export declare class Appointment {
    id: number;
    date: Date;
    time: string;
    user: User;
    status: Status;
    createAt?: Date;
    updateAt?: Date;
}
//# sourceMappingURL=Appointment.entity.d.ts.map