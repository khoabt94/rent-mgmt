import { siteConfig } from '@/configs/site';
import { AccountInfoPage, AccountPasswordPage, HomePage } from '@/pages';
import { AreaDetailPage } from '@/pages/area';
import { CollectionPage } from '@/pages/collection';
import { CollectionDetailPage } from '@/pages/collection/detail';
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
  },
  {
    path: siteConfig.paths.collection(),
    element: <CollectionPage />,
  },
  {
    path: siteConfig.paths.collectionTemplate(),
    element: <CollectionDetailPage />,
  }
];