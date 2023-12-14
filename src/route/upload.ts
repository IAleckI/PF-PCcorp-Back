import { Router, Request, Response } from 'express';
import UploadController from '../controllers/uploadController';

const uploadRouter = Router();

uploadRouter.post('/', async (req: Request, res: Response) => {
  try {
    const createdUpload = await UploadController.createUpload(req);
    res.json(createdUpload);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

export default uploadRouter;