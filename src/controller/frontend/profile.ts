import { Request, Response } from 'express';
import BasicPage from '../../class/BasicPage';
import Profile from '../../interface/pageRenderingData/profile';

const profileController = async (req: Request, res: Response): Promise<void> => {
  const profile: Profile = {
    villageName: process.env.VILLAGE_NAME,
    districtName: process.env.DISTRICT_NAME,
    copyrightYear: process.env.COPYRIGHT_YEAR,
    provinceName: process.env.PROVINCE_NAME,
    phoneContact: process.env.PHONE_CONTACT,
    villageEmailAddress: process.env.VILLAGE_EMAIL_ADDRESS,
    postalCode: process.env.POSTAL_CODE,
    footerLinks: await BasicPage.getFooterLinks(),
    navbarItems: await BasicPage.getNavbarItems(),
    activateMainNavbar: 'Profile',
    sideNavItems: await BasicPage.getProfileSideNavItems(),
    activateSideNav: 'Sejarah Desa',
  };

  res.render('pages/profile', profile);
};

export default profileController;
