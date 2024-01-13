import { Router, Request, Response } from "express";

const paymentRoute = Router();


paymentRoute.get("/", (_req: Request, res: Response) => {

  res.status(200).send("ok");
});

paymentRoute.post("/", (req: Request, res: Response) => {
  res.status(200).json(req.body);
});

export default paymentRoute;