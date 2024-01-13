import { Router, Request, Response } from "express";

import ProductController from "../controllers/productController";
const uploadRouter = Router();

uploadRouter.post("/", async (req: Request, res: Response) => {
  try {
    const createdProduct = await ProductController.createProduct(req, res);
    res.json(createdProduct);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

uploadRouter.post("/webhook", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

export default uploadRouter;