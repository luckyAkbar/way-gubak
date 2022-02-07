import ListAgenda from '../pageResource/listAgenda';
import ListBerita from '../pageResource/listBerita';
import BasicPageData from './basicPageData';

interface HomePageData extends BasicPageData, ListAgenda, ListBerita {
  villageYoutubeTrailerLink: string | undefined,
}

export default HomePageData;
