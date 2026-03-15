import { scheduleAppointmentDTO } from "../dto/AppointmentDTO";
import { Appointment } from "../entities/Appointment.entity";
import { Status } from "../interfaces/IAppointments";
import { AppointmentModel } from "../repositories/Appointment.repository";
import { getUserByIdService } from "./usersService";

export const getAppService = async (): Promise<Appointment[] | undefined> => {
  const appoinmentsFound = await AppointmentModel.find();
  if (appoinmentsFound.length > 0) return appoinmentsFound;
  throw new Error("No se encontraton turnos");
};

export const getAppByIdService = async (id: number): Promise<Appointment> => {
  const appFound = await AppointmentModel.findOne({
    where: { id },
    relations: ["user"],
  });
  if (!appFound) throw new Error(`la cita con id: ${id} no fue encontrada`);

  return appFound;
};

export const appointmentUserService = async (
  app: scheduleAppointmentDTO
): Promise<Appointment> => {
  await getUserByIdService(app.userId);

  return await AppointmentModel.createAppointment(
    app.userId,
    app.date,
    app.time
  );
};

export const cancelAppointmentService = async (id: number) => {
  const appFound: Appointment | null = await AppointmentModel.findOne({
    where: { id },
  });

  if (!appFound) {
    throw new Error(`La cita con id ${id} no fue encontrada`);
  }

  if (appFound.status === Status.cancelled) {
    throw new Error(`La cita con id ${id} ya se encuentra cancelada`);
  }

  appFound.status = Status.cancelled;
  return await AppointmentModel.save(appFound);
};
