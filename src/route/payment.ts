import { Router } from "express";
import { Request, Response } from "express";

const paymentRoute = Router();

paymentRoute.get("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.sendStatus(200);
});

export default paymentRoute;