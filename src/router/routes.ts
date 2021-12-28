import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.route('/')
  .post((req: Request, res: Response): void => {
    res.status(200).json({ message: req.body });
  });

export default router;
