import { Request, Response } from "express";
export declare const getAppointmentsController: (req: Request, res: Response) => Promise<void>;
export declare const getAppointmentsByIdController: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export declare const scheduleAppointmentController: (req: Request<unknown, unknown, {
    date: string;
    time: string;
    userId: number;
}>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const cancelAppointmentController: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export declare const getAppointmentsByUserController: (req: Request<{
    userId: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=appointmentsControllers.d.ts.map