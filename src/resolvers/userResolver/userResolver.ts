import UserController from '../../controllers/userController';
import { IUserModel } from '../../types/user';

const userResolver = {
  Query: {
    getAllUser: async (): Promise<IUserModel[]> => await UserController.getAllUser(),
    getUserById: async (_root: any, args: { id: string }): Promise<IUserModel | null> => 
      await UserController.getUserById(args.id),
    getUserLogin: async (_root: any, args: IUserModel) =>
      await UserController.login(args.email, args.passwordHash)
  },
  Mutation: {
    userCreate: async (_root: any, args: IUserModel): Promise<IUserModel> => 
      await UserController.createUser(args),
    userUpdate: async (_root: any, args: { id: string, data: IUserModel }): Promise<IUserModel | null> =>
      await UserController.updateUser(args.id, args.data), 
    userDelete: async (_root: any, args: { id: string }): Promise<IUserModel> =>
      await UserController.deleteUser(args.id)
  }
};

export default userResolver;