module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'test',
      database: 'smartbrain'
    }
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: 'postgres://smartbraindb_funx_user:JYekBfYYU50dT3HsvWcjXaYOO8PLRCaZ@dpg-chfdlkbhp8u065uirf8g-a.oregon-postgres.render.com/smartbraindb_funx',
      ssl: { rejectUnauthorized: false },
      host : 'dpg-chfdlkbhp8u065uirf8g-a',
      port : 5432,
      user : 'smartbraindb_funx_user',
      password : 'JYekBfYYU50dT3HsvWcjXaYOO8PLRCaZ',
      database : 'smartbraindb_funx'
    }
  }
};
