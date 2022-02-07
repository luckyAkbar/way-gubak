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
import UMKMProfileController from '../controller/frontend/profileUMKM';
import detailProductUMKMController from '../controller/frontend/detailProductUMKM';
import errorPageRenderer from '../controller/error';
import productIndexController from '../controller/frontend/productIndex';
import UMKMIndexController from '../controller/frontend/UMKMIndex';
import createAgenda from '../controller/dashboard/createAgenda';
import renderDashboardIndexPage from '../controller/frontend/indexDashboard';
import getAgenda from '../controller/dashboard/getAgenda';
import deleteAgenda from '../controller/dashboard/deleteAgenda';
import renderUpdateAgenda from '../controller/frontend/updateAgenda';
import updateAgenda from '../controller/dashboard/updateAgenda';
import imageUploadHandler from '../controller/imageUploadHandler';
import createBerita from '../controller/dashboard/createBerita';
import imageRequestHandler from '../controller/imageRequest';
import deleteBerita from '../controller/dashboard/deleteBerita';
import getBerita from '../controller/dashboard/getBerita';
import renderUpdateBeritaPage from '../controller/frontend/updateBerita';
import updateBerita from '../controller/dashboard/updateBerita';
import loginHandler from '../controller/login';
import loginPageRenderer from '../controller/frontend/loginPageRenderer';

const router: Router = express.Router();

router.route('/')
  .get(homeController)

router.route('/login')
  .get(loginPageRenderer)
  .post(loginHandler);

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

router.route('/upload/image')
  .post(imageUploadHandler);

router.route('/dashboard')
  .get(renderDashboardIndexPage);

router.route('/dashboard/agenda')
  .get(getAgenda)
  .post(createAgenda)
  .delete(deleteAgenda)
  .put(updateAgenda);

router.route('/dashboard/berita')
  .get(getBerita)
  .post(createBerita)
  .put(updateBerita)
  .delete(deleteBerita);

router.route('/dashboard/berita/update')
  .get(renderUpdateBeritaPage);

router.route('/dashboard/agenda/update')
  .get(renderUpdateAgenda);

router.route('/umkm')
  .get(UMKMIndexController);

router.route('/umkm/product')
  .get(productIndexController);

router.route('/umkm/:ID')
  .get(UMKMProfileController);

router.route('/umkm/product/:ID')
  .get(detailProductUMKMController);

router.route('/images/:imageName')
  .get(imageRequestHandler);

router.route('*')
  .all((req: Request, res: Response) => {
    errorPageRenderer(res);
  });

export default router;
