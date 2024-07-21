import { siteConfig } from '@/configs/site';
import { AccountInfoPage, AccountPasswordPage, HomePage } from '@/pages';

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
  }
];