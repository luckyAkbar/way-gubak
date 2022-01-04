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

router.route('/info')
  .get(beritaController);

router.route('/info/agenda')
  .get(agendaController);

router.route('/profile')
  .get(profileController);

router.route('/profile/visiMisi')
  .get(visiMisiController);

router.route('/profile/geografis')
  .get(infoGeografisController);

router.route('/profile/demografis')
  .get(infoDemografisController);

router.route('/profile/saranaPrasarana')
  .get(saranaPrasaranaController);

router.route('/aset')
  .get(asetDesaController);

export default router;
