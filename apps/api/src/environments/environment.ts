
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
    authSource: null
  },
  host: {
    url: '<server-url>',
    port: 3000
  },
  jwt: {
    secretOrKey: 'secret',
    'expiresIn': 36000000
  },
  mail: {
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    user: 'ccdff3b99c83ec',
    pass: 'a700a7eafe1e28'
  }
};
