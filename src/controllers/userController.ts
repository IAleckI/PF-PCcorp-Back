import { GraphQLError } from "graphql";
import User from "../models/user";
import {IUserModel } from "../types/user";

export default class UserController {

  static async getAllUser (): Promise<IUserModel[]> {
    try {
      const users = await User.getAllUsers();
      if(users.length === 0) {
        throw new GraphQLError("No users found", {
          extensions: { code: "BAD_USER_INPUT" }
        });
      }
      return users;
    } catch (error:any) {
      throw new GraphQLError(error.message);
    }
  }

  static async getUserById (id: string): Promise<IUserModel> {
    try {
      const user = await User.getById(id);
      if(!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "BAD_USER_INPUT" }
        });
      }
      return user;
    } catch (error:any) {
      throw new GraphQLError("User not found");
    }
  }

  static async createUser (user: IUserModel): Promise<IUserModel> {
    try {
            
      if (!user.userName || !user.email || !user.passwordHash) {
        throw new GraphQLError("User name, email and password are required", {
          extensions: { code: "BAD_USER_INPUT" }
        });
      }
          
      const newUser = await User.create(user);
      return newUser;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }

  static async deleteUser (id: string): Promise<IUserModel>  {
    try {
      if (id === undefined) throw new GraphQLError("User id is undefined", {
        extensions: { code: "BAD_USER_INPUT", argumentName: "id" }
      });
    
      const user = await User.delete(id);
      if (user === null) throw new GraphQLError("User not found", {
        extensions: { code: "BAD_USER_INPUT" }
      });
      return user;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }

  static async updateUser(id:string, user:IUserModel):Promise<IUserModel>{
    try {
      if (id === undefined) throw new GraphQLError("User id is undefined", {
        extensions: { code: "BAD_USER_INPUT", argumentName: "id" }
      });
      const userUpdated = await User.update(id, user);
      if (userUpdated === null) throw new GraphQLError("User not found", {
        extensions: { code: "BAD_USER_INPUT" }
      });
      return userUpdated;

    } catch (error:any) {
      throw new GraphQLError(error.message);
    }
  }

  static async login(email:string, password:string):Promise<IUserModel>{
    try {
      if(!email || !password) {
        throw new GraphQLError("Email and password are required", {
          extensions: { code: "BAD_USER_INPUT" }
        });
      }
      const user = await User.login(email, password);
      if(!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "BAD_USER_INPUT" }
        });
      }
      return user;
    } catch (error:any) {
      throw new GraphQLError(error.message);
    }
  }

  static async userNetworkLogin (email: string, userNmae: string): Promise<string>{
    try {
      if (!email || !userNmae) throw new GraphQLError("User data is incomplete", {
        extensions: { code: "BAD_USER_INPUT" }
      });

      const user = await User.networkLogin(userNmae, email);
      return user;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }

  }


  static async verifyUser(token:string):Promise<IUserModel>{
    try {
      if (token === undefined) throw new GraphQLError("User id is undefined", {
        extensions: { code: "BAD_USER_INPUT", argumentName: "id" }
      });
      const userVerified = await User.verify(token);
      if (userVerified === null) throw new GraphQLError("User not found", {
        extensions: { code: "BAD_USER_INPUT" }
      });
      return userVerified;
    } catch (error:any) {
      throw new GraphQLError(error.message);
    }
  }

    
}