const paths = {
  home: () => '/',
  login: () => '/login',
  signup: () => '/signup',
  forgotPassword: () => '/forgot-password',
  resetPassword: () => '/reset-password/:resetTokenId',
  accountInfo: () => '/account/info',
  accountPassword: () => '/account/password',
  notFound: () => '/404',
  area: (area_id: string) => `/area/${area_id}`,
  areaTemplate: () => '/area/:areaId',
  rentee: () => '/rentee',
};

export const siteConfig = {
  paths,
}