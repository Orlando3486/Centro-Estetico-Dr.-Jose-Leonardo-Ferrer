import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Status } from "../interfaces/IAppointments";
import { User } from "./User.entity";

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", nullable: false })
  date: Date;

  @Column({ type: "varchar", length: 5, nullable: false })
  time: string;

  @ManyToOne(() => User, (user) => user.appointments, { nullable: false })
  user: User;

  @Column({
    type: "varchar",
    length: 10,
    nullable: false,
    default: Status.active,
  })
  status: Status;

  @CreateDateColumn()
  createAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;
}
