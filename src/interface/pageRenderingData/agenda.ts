import ListAgenda from '../pageResource/listAgenda';
import SideNav from '../pageResource/sideNav';
import BasicPageData from './basicPageData';

interface AgendaPageData extends BasicPageData, SideNav, ListAgenda {
  
}

export default AgendaPageData;
