import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import User from "./User";

@Entity("schedules")
export default class Schedule {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => User, (user) => user, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, (user) => user, { eager: true })
  @JoinColumn()
  doctor: User;

  @Column()
  status: "Agendado" | "Cancelado";

  @Column()
  schedule: Date;

  serialize() {
    return {
      id: this.id,
      user: this.user.id,
      doctor: this.doctor.id,
      status: this.status,
      schedule: this.schedule,
    };
  }
}
