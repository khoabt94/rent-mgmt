import { BaseRepositoryInterface } from "@repositories/base/base.interface.repository";
import { User } from "@modules/user/schemas/user.schema";

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> { }