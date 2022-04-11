import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Schedule from "./Schedules";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  age: string;

  @Column()
  gender: string;

  @Column()
  isDoc: boolean;

  @Column()
  createdAt: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  user: User;

  @OneToMany(() => Schedule, (schedule) => schedule.doctor)
  doctor: User;

  serialize() {
    return {
      name: this.name,
      email: this.email,
      age: this.age,
      gender: this.gender,
      isDoc: this.isDoc,
      createdAt: this.createdAt,
    };
  }
}
