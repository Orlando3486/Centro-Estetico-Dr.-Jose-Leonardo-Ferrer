import { Router } from "express";
import appointmentsRouter from "./appointmentsRouter";
import usersRouter from "./usersRouter";

const router: Router = Router();

router.use("/users", usersRouter);
router.use("/appointments", appointmentsRouter);

export default router;
