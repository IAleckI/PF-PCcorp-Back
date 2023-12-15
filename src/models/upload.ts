import UploadModel from '../database/model/uploadModel';
import { IUpload } from '../types/upload';
import { GraphQLError } from 'graphql';

export default class Upload {
  static async createUpload(url: string): Promise<IUpload> {
    try {
      const createdUpload = await UploadModel.create({ url });
      return createdUpload;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  }

  static async getAllUploads(): Promise<IUpload[]> {
    try {
      const uploads = await UploadModel.findAll();
      return uploads;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  }

  static async getUploadById(id: string): Promise<IUpload | null> {
    try {
      const upload = await UploadModel.findByPk(id);
      return upload;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  }

  static async deleteUpload(id: string): Promise<boolean> {
    try {
      const deletedCount = await UploadModel.destroy({
        where: { id },
      });

      return deletedCount > 0;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  }
}