const paths = {
  home: () => '/',
  login: () => '/login',
  signup: () => '/signup',
  forgotPassword: () => '/forgot-password',
  resetPassword: () => '/reset-password/:resetTokenId',
  accountInfo: () => '/account/info',
  accountPassword: () => '/account/password',
  notFound: () => '/404',
};

export const siteConfig = {
  paths,
}