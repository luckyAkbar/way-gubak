import express, { Router, Request, Response } from 'express';
import homeController from '../controller/controller.home';
import agendaController from '../controller/controller.agenda';
import asetDesaController from '../controller/controller.asetDesa';
import infoDemografisController from '../controller/controller.infoDemografis';
import infoGeografisController from '../controller/controller.infoGeografis';

const router: Router = express.Router();

router.route('/')
  .get(homeController)
  .post((req: Request, res: Response): void => {
    res.status(200).json({ message: req.body });
  });

router.route('/agenda')
  .get(agendaController);
  
router.route('/asetDesa')
  .get(asetDesaController);

router.route('/infoDemografis')
  .get(infoDemografisController);

router.route('/infoGeografis')
  .get(infoGeografisController);
  
export default router;
