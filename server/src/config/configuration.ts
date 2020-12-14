export default () => {
  if (process.env.LAWGIC_DB_PWD === undefined) {
    console.error('FATAL: Please set LAWGIC_DB_PWD');
    process.exit();
  }
  if (process.env.LAWGIC_JWT_KEY === undefined) {
    console.error('FATAL: Please set LAWGIC_JWT_KEY');
    process.exit();
  }
  return {
    name: 'LAWGIC',
    jwtkey: process.env.LAWGIC_JWT_KEY,
    base_url: 'https://beta.lawgic.website',
    database: {
      host: 'localhost',
      port: 27017,
      user: 'lawgic',
      pwd: process.env.LAWGIC_DB_PWD,
    },
  };
};
