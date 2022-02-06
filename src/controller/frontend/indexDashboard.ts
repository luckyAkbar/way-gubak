import { Request, Response } from 'express';
import Dashboard from "../../class/Dashboard";
import IndexDashboard from '../../interface/pageRenderingData/indexDashboard';
import errorPageRenderer from '../error';

const renderDashboardIndexPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const listAgenda = await Dashboard.getAgenda();
    const listBerita = await Dashboard.getBerita();
    
    const indexDashboardPageData: IndexDashboard = {
      listAgenda,
      listBerita,
    };

    res.render('pages/dashboard/index', indexDashboardPageData);
  } catch (e: unknown) {
    errorPageRenderer(res, 500);
  }
};

export default renderDashboardIndexPage;
