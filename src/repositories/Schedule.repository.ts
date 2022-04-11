import { EntityRepository, Repository } from "typeorm";
import Schedules from "../entities/Schedules";

@EntityRepository(Schedules)
export default class SchedulesRepository extends Repository<Schedules> {}
