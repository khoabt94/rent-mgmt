import { siteConfig } from '@/configs/site';
import { AccountInfoPage, AccountPasswordPage, HomePage } from '@/pages';
import { AreaDetailPage } from '@/pages/area';
import { RenteePage } from '@/pages/rentee';

export const privateRoutes = [
  {
    path: siteConfig.paths.home(),
    element: <HomePage />,
  },
  {
    path: siteConfig.paths.accountInfo(),
    element: <AccountInfoPage />,
  },
  {
    path: siteConfig.paths.accountPassword(),
    element: <AccountPasswordPage />,
  },
  {
    path: siteConfig.paths.areaTemplate(),
    element: <AreaDetailPage />,
  },
  {
    path: siteConfig.paths.rentee(),
    element: <RenteePage />,
  }
];