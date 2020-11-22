export default () => ({
  name: 'LAWGIC',
  jwtkey: 'THISISSECRETKEY',
  database: {
    host: 'localhost',
    port: 27017,
    user: 'lawgic',
    pwd: process.env.LAWGIC_DB_PWD,
  },
});
