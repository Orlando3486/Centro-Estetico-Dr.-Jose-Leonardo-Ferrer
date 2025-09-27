export interface IAppointment {
    id: number;
    date: Date;
    time: string;
    userId: number;
    status: Status;
}
export declare enum Status {
    active = "active",
    cancelled = "cancelled"
}
//# sourceMappingURL=IAppointments.d.ts.map