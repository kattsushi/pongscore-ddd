/**
 * Development Environment
 */
export const environment = {
  production: false,
  db: {
    user: 'admin',
    pass: 'Jn0dbdRJLs2CIkeX',
    host: 'pongscore.k4af9.mongodb.net',
    port: 27017,
    database: 'pongscore-dev',
    authSource: null,
  },
  host: {
    url: 'http://localhost',
    port: 3333,
  },
  jwt: {
    secretOrKey: 'secretKey',
    expiresIn: '60s',
  },
  mail: {
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    user: 'cb6bc14dd98c62',
    pass: '10a9b36ab70a3f',
  },
};
