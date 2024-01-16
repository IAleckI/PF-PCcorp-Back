import UserController from "../../controllers/userController";
import { IUserModel } from "../../types/user";

const userResolver = {
  Query: {
    getAllUser: async (): Promise<IUserModel[]> => await UserController.getAllUser(),
    getUserById: async (_root: any, args: { id: string }): Promise<IUserModel | null> => 
      await UserController.getUserById(args.id),
    getUserLogin: async (_root: any, args: IUserModel) =>
      await UserController.login(args.email, args.passwordHash),
    getUserNetworkLogin: async (_root: IUserModel, args: IUserModel) =>
      await UserController.userNetworkLogin(args.email, args.userName)
  },
  Mutation: {
    createUser: async (_root: any, args: IUserModel): Promise<IUserModel> => 
      await UserController.createUser(args),
    updateUser: async (_root: any, args: IUserModel): Promise<IUserModel | null> =>
      await UserController.updateUser(args.email as string, args), 
    deleteUser: async (_root: any, args: { id: string }): Promise<IUserModel> =>
      await UserController.deleteUser(args.id),
    userVeryfy: async (_root: any, args: { token: string }): Promise<IUserModel> =>
      await UserController.verifyUser(args.token)
  }
};

export default userResolver;