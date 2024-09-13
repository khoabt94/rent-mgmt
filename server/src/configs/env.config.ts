export enum CONFIG_KEY {
  CONFIG_DATABASE = 'database',
  PORT = 'port',
  JWT = 'jwt',
}

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    connection_url: process.env.DATABASE_URL,
    password: process.env.DATABASE_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRED_IN,
  }
});