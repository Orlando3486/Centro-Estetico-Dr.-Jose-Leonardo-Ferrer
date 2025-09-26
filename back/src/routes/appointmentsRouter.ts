import { Router, Request, Response } from "express";
import {
  getAppointmentsController,
  getAppointmentsByIdController,
  scheduleAppointmentController,
  cancelAppointmentController,
  getAppointmentsByUserController,
} from "../controllers/appointmentsControllers";
import auth from "../middlewares/autenticacion";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", auth, (req: Request, res: Response) =>
  getAppointmentsController(req, res)
);

appointmentsRouter.get(
  "/:id",
  auth,
  (req: Request<{ id: string }>, res: Response) =>
    getAppointmentsByIdController(req, res)
);

appointmentsRouter.get("/user/:userId", (req, res) =>
  getAppointmentsByUserController(req, res)
);

appointmentsRouter.post("/schedule", auth, (req: Request, res: Response) =>
  scheduleAppointmentController(req, res)
);

appointmentsRouter.put(
  "/cancel/:id",
  auth,
  (req: Request<{ id: string }>, res: Response) =>
    cancelAppointmentController(req, res)
);

export default appointmentsRouter;
