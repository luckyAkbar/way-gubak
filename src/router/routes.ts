import express, { Router, Request, Response } from 'express';
import homeController from '../controller/frontend/home';
import agendaController from '../controller/frontend/agenda';
import asetDesaController from '../controller/frontend/asetDesa';
import infoDemografisController from '../controller/frontend/infoDemografis';
import infoGeografisController from '../controller/frontend/infoGeografis';
import beritaController from '../controller/frontend/berita';
import profileController from '../controller/frontend/profile';
import visiMisiController from '../controller/frontend/visiMisi';
import saranaPrasaranaController from '../controller/frontend/saranaPrasarana';

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

router.route('/berita')
  .get(beritaController);

router.route('/profile')
  .get(profileController);

router.route('/visiMisi')
  .get(visiMisiController);

router.route('/saranaPrasarana')
  .get(saranaPrasaranaController);

export default router;
