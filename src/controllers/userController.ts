import { GraphQLError } from "graphql";
import User from "../models/user";
import { IUser,IUserModel } from "../types/user";

export default class UserController {

    static async getAllUser (): Promise<IUserModel[]> {
        try {
            const users = await User.getAllUsers();
            if(users.length === 0) {
                throw new GraphQLError('No users found', {
                    extensions: { code: 'BAD_USER_INPUT' }
                });
            }
            return users;
        } catch (error) {
            throw new GraphQLError('No users found', {
                extensions: { code: 'BAD_USER_INPUT' }
            });
        }
    }

    static async getUserById (id: string): Promise<IUserModel | null> {
        try {
            const user = await User.getById(id);
            if(!user) {
                throw new GraphQLError('User not found', {
                    extensions: { code: 'BAD_USER_INPUT' }
                });
            }
            return user;
        } catch (error) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'BAD_USER_INPUT' }
            });
        }
    }

    

}