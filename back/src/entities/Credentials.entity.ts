import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { User } from "./User.entity";

@Entity("credentials")
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  username: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password: string;

  @OneToOne(() => User)
  user: User;

  @CreateDateColumn()
  createAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;
}
