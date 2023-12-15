import { GraphQLError } from 'graphql';
import { IUpload } from '../types/upload';
import UploadModel from '../database/model/uploadModel';
import express from 'express';
import fileUpload from 'express-fileupload';

export default class UploadController {
  static async createUpload(req: express.Request): Promise<IUpload> {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        throw new GraphQLError('No files were uploaded.');
      }

      const uploadedFile = req.files.file as fileUpload.UploadedFile;
      const { name, mv } = uploadedFile;

      // Move the file to a directory or process it as needed
      const filePath = `/path/to/uploads/${name}`;
      mv(filePath);

      const createdUpload = await UploadModel.create({ url: filePath });
      return createdUpload;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }

  static async getAllUploads(): Promise<IUpload[]> {
    try {
      const uploads = await UploadModel.findAll();
      return uploads;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }

  static async getUploadById(id: string): Promise<IUpload | null> {
    try {
      const upload = await UploadModel.findByPk(id);
      return upload;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }

  static async deleteUpload(id: string): Promise<boolean> {
    try {
      const deletedCount = await UploadModel.destroy({
        where: { id },
      });

      return deletedCount > 0;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }
}