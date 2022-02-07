import ListBerita from '../pageResource/listBerita';
import SideNav from '../pageResource/sideNav';
import BasicPageData from './basicPageData';

interface Berita extends BasicPageData, SideNav, ListBerita {
  
}

export default Berita;
