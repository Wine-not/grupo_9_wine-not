require('dotenv').config();
const env = process.env;

const development = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASS,
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  dialect: env.DATABASE_DIALECT,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
  define: {
    timestamps: false,
  },
};

const production = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASS,
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  dialect: env.DATABASE_DIALECT,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
  define: {
    timestamps: false,
  },
};

const test = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASS,
  database: env.DATABASE_NAME_TEST,
  host: env.DATABASE_HOST,
  dialect: env.DATABASE_DIALECT,
};

module.exports = { development, production, test };

/*module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "database_wine_not",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
*/