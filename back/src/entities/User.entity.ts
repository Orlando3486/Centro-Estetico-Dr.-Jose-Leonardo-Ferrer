import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Credential } from "./Credentials.entity";
import { Appointment } from "./Appointment.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: "date", nullable: false })
  birthday: Date;

  @Column({ type: "int", nullable: false, unique: true })
  nDni: number;

  @OneToOne(() => Credential, { cascade: true })
  @JoinColumn()
  credential: Credential;

  @OneToMany(() => Appointment, (appointments) => appointments.user)
  appointments: Appointment[];

  @CreateDateColumn()
  createAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;
}
