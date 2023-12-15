import UploadController from '../../controllers/uploadController';
import { IUpload } from '../../types/upload';

const uploadResolver = {
  Query: {
    getAllUploads: async (): Promise<IUpload[]> => UploadController.getAllUploads(),
    getUploadById: async (_parent: any, args: { id: string }): Promise<IUpload | null> =>
      UploadController.getUploadById(args.id),
  },
  Mutation: {
    uploadFile: async (_parent: any, args: { file: any }): Promise<IUpload> => {
      // Assuming 'file' is the URL; replace it with the correct property
      const url: string = args.file;

      return UploadController.createUpload(url);
    },
    deleteUpload: async (_parent: any, args: { id: string }): Promise<boolean> =>
      UploadController.deleteUpload(args.id),
  },
};

export default uploadResolver;