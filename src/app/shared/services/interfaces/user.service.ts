import {User} from "../../models/user.model";

export interface UserService {
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    getById(id: string): Promise<User>;
    getByAuthId(authId: string): Promise<User>;
}
