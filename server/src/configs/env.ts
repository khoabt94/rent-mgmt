export enum CONFIG_KEY {
  CONFIG_DATABASE = 'database',
  PORT = 'port'
}

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    connection_url: process.env.DATABASE_URL,
    password: process.env.DATABASE_PASSWORD,
  }
});