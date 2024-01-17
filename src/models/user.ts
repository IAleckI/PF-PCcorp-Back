import { IUserModel} from "../types/user";
import UserModel from "../database/model/userModel";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendVerifyMail from "../services/mail/mail.services";
import { GraphQLError } from "graphql";
dotenv.config();

export default class User {
  static async getAllUsers(): Promise<IUserModel[]> {
    const users = await UserModel.findAll();
    return users;
  }

  static async getById(id: string): Promise<IUserModel> {
    const user = await UserModel.findByPk(id);
    if (user===null){
      throw new GraphQLError("User not found", {
        extensions: { code: "BAD_USER_INPUT" }
      });
    }
    return user;
  }

  static async create(user: IUserModel): Promise<IUserModel> {
    const userFind = await UserModel.findOne({ where: { email: user.email } });
    if (userFind) {
      throw new GraphQLError("User already exists", {
        extensions: { code: "BAD_USER_INPUT" }
      });
    }        

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.passwordHash, salt);
    const newUser = await UserModel.create({
      userName: user.userName,
      email: user.email,
      passwordHash: passwordHash,
    });

    const token = Jwt.sign({ email: newUser.email }, process.env.SECRET as string, {
      expiresIn: "1h",
    });
    
    await sendVerifyMail(newUser.email, newUser.userName, token);

    return newUser;
        
  }

  static async update(email: string, user: IUserModel): Promise<IUserModel> {
    const existingUser = await UserModel.findOne({
      where: {
        email: email,
        verify: true,
      },
    });  
    if (!existingUser) {
      throw new GraphQLError("User not found", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }    
    existingUser.set({     
      passwordHash: await bcrypt.hash(user.passwordHash, await bcrypt.genSalt(10)),
    });   
    await existingUser.save();  
    return existingUser;
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
    const user = await UserModel.findOne({
      where: {
        email,
        verify: true,
        ban: false
      }
    });

    if (!user) throw new Error("Invalid user or password");
    
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.dataValues.passwordHash);

    if (!passwordCorrect) throw new Error("Invalid user or password");
    const userToken = {
      name: user?.dataValues.userName,
      email: user?.dataValues.email,
      role: user?.dataValues.role,
    };

    const token = Jwt.sign(userToken, process.env.SECRET as string);
    return { ...user?.dataValues, token };
  }

  static async networkLogin (userName: string, email: string) {
    const userFind = await UserModel.findOne({ where: { email: email, ban: false } });
    const pwd = crypto.randomUUID();
    const userToken = {
      userName,
      email,
      role: userFind?.dataValues.role,
    };

    const token = Jwt.sign(userToken, process.env.SECRET as string, { expiresIn: 604800 });

    if (userFind === null) {
      await UserModel.create({
        userName,
        email,
        passwordHash: pwd,
        verify: true
      });
    }

    return token;

  }

  static async verify (token: string): Promise<IUserModel> {
    const user = Jwt.verify(token, process.env.SECRET as string) as IUserModel;
    
    if (!user) throw new Error("Invalid token");
    const userFind = await UserModel.findOne({ where: { email: user.email } });
        
    if (!userFind) throw new Error("Invalid token");
        
    userFind?.set({ verify: true });
    await userFind?.save();
        
    return userFind;
  }

  static async banUser (userId: string) {
    const user = await UserModel.findByPk(userId);
    if (user === null) throw new Error("User not found");
    user?.set({ ban: user.dataValues.ban === false ? true : false });
    await user?.save();

    return user;
  }
}