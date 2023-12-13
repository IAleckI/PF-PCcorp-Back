import { IUserModel} from "../types/user";
import UserModel from "../database/model/userModel";
import bcrypt from "bcrypt";
// import Jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

export default class User {
    static async getAllUsers(): Promise<IUserModel[]> {
        const users = await UserModel.findAll();
        return users;
    }

    static async getById(id: string): Promise<IUserModel> {
        const user = await UserModel.findByPk(id);
        if (user===null){
            throw new GraphQLError('User not found', {
                extensions: { code: 'BAD_USER_INPUT' }
            });
        }
        return user;
    }

    static async create(user: IUserModel): Promise<IUserModel> {
        const userFind = await UserModel.findOne({ where: { email: user.email } });
        if (userFind) {
            throw new GraphQLError('User already exists', {
                extensions: { code: 'BAD_USER_INPUT' }
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(user.passwordHash, salt);
        const newUser = await UserModel.create({
            userName: user.userName,
            email: user.email,
            passwordHash,
            verify: false
        });

        return newUser;
    }

    static async update(id: string, user: IUserModel): Promise<IUserModel> {
        const userUpdated = await UserModel.findOne({
            where: {
                email: id,
                verify: true
            }
        });
        if(userUpdated===null){
            throw new GraphQLError('User not found', {
                extensions: { code: 'BAD_USER_INPUT' }
            });
        }
        userUpdated?.set(user);
        await userUpdated.save();
        return userUpdated;
    }

    static async delete (id:string): Promise<IUserModel|null>{
        const user = await UserModel.findByPk(id);
        if(!user){
            return null;
        }
        await user.destroy();
        return user;
    }

    static async login(email:string,password:string):Promise<IUserModel>{
        const user =await UserModel.findOne({
            where: {
                email,
                verify: true
            }
        })
        if(!user){
            throw new GraphQLError('User not found', {
                extensions: { code: 'BAD_USER_INPUT' }
            });
        }
        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if(!validPassword){
            throw new GraphQLError('Invalid password', {
                extensions: { code: 'BAD_USER_INPUT' }
            });
        }
        return user;
    }

}