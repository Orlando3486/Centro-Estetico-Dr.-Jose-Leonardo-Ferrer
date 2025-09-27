import { Credential } from "./Credentials.entity";
import { Appointment } from "./Appointment.entity";
export declare class User {
    id: number;
    name: string;
    email: string;
    birthday: Date;
    nDni: number;
    credential: Credential;
    appointments: Appointment[];
    createAt?: Date;
    updateAt?: Date;
}
//# sourceMappingURL=User.entity.d.ts.map