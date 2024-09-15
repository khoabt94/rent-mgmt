import { BaseRepositoryInterface } from "@repositories/base/base.interface.repository";
import { Rentee } from "@modules/rentee/schemas/rentee.schema";

export interface RenteeRepositoryInterface extends BaseRepositoryInterface<Rentee> { }