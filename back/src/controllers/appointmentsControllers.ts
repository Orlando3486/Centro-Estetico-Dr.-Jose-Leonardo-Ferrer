import { Request, Response } from "express";
import {
  appointmentUserService,
  cancelAppointmentService,
  getAppByIdService,
  getAppService,
} from "../services/AppointmentService";
import { PostgresError } from "../interfaces/Errorinterface";
import { appDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment.entity";
import { sendEmail } from "../services/emailService";
import { User } from "../entities/User.entity";

export const getAppointmentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({
      message: "Listado de todos los turnos de todos los usuarios.",
      data: await getAppService(),
    });
  } catch (error) {
    res.status(404).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getAppointmentsByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const appointment = await getAppByIdService(id);

    res.status(200).json({
      message: "Detalle del turno encontrado.",
      data: appointment,
    });
  } catch (error) {
    res.status(404).json({
      msg: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const scheduleAppointmentController = async (
  req: Request<
    unknown,
    unknown,
    { date: string; time: string; userId: number }
  >,
  res: Response
) => {
  try {
    const { date, time, userId } = req.body;

    if (!userId || !date || !time) {
      return res.status(400).json({
        message: "Faltan datos: se requiere userId, date y time.",
      });
    }

    const appointment = await appointmentUserService(req.body);

    const userRepository = appDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (user?.email) {
      await sendEmail(
        user.email,
        "Turno agendado",
        `Hola ${user.name}, tu turno fue agendado para el día ${date} a las ${time}.`
      ).catch((err) => console.error("Error enviando email:", err));
    }

    return res.status(201).json({
      message: "Turno agendado con éxito.",
      data: appointment,
    });
  } catch (error) {
    const err = error as PostgresError;
    res.status(400).json({
      msg:
        err instanceof Error
          ? err.detail
            ? err.detail
            : err.message
          : "Error desconocido",
    });
  }
};

export const cancelAppointmentController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const appointmentRepository = appDataSource.getRepository(Appointment);

    const appointment = await cancelAppointmentService(
      parseInt(req.params.id, 10)
    );

    const appointmentWithUser = await appointmentRepository.findOne({
      where: { id: appointment.id },
      relations: ["user"],
    });

    if (appointmentWithUser?.user?.email) {
      await sendEmail(
        appointmentWithUser.user.email,
        "Turno cancelado",
        `Hola ${appointmentWithUser.user.name}, tu turno programado para el día ${appointmentWithUser.date} a las ${appointmentWithUser.time} ha sido cancelado.`
      ).catch((err) => console.error("Error enviando email:", err));
    }

    res.status(200).json({
      message: "Turno cancelado con éxito",
      data: appointment,
    });
  } catch (error) {
    res.status(404).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getAppointmentsByUserController = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const appointmentRepo = appDataSource.getRepository(Appointment);

    const appointments = await appointmentRepo.find({
      where: { user: { id: Number(userId) } },
      relations: ["user"],
    });

    if (!appointments.length) {
      return res.status(404).json({ message: "No se encontraron turnos" });
    }

    return res.json({ data: appointments });
  } catch (error) {
    console.error("Error al obtener turnos:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};
