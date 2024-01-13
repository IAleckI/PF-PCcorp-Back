import { Router } from "express";
import { Request, Response } from "express";

const paymentRoute = Router();

paymentRoute.get("/payment", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).send("ok");
});

export default paymentRoute;