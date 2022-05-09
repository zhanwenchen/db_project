module.exports = {
  development: {
    database: 'db_project',
    username: 'root',
    password: '',
    dialect: 'mysql',
    secret: 'A_Sa_Dah?',
    jwtSecret: 'omfglolz',
    port: 3000,
  },
  production: {
    database: 'blog_production',
    username: 'blog_production',
    password: 'blog_production',
    dialect: 'mysql',
    secret: 'Lolz',
    jwtSecret: 'omfglolz',
    port: 80,
  },
  test: {
    database: 'blog_test',
    username: 'blog_test',
    password: 'blog_test',
    dialect: 'mysql',
    secret: 'major lolz',
    jwtSecret: 'omfglolz',
    port: 3000,
  },
};
