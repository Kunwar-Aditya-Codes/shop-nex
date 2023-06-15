import { Sequelize } from 'sequelize';

const DB = process.env.POSTGRES_DB as string;
const USER = process.env.POSTGRES_USER as string;
const PASSWORD = process.env.POSTGRES_PASSWORD as string;

let sequelize: Sequelize;

if (process.env.NODE_ENV !== 'production') {
  sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    dialectModule: require('pg'),
  });
} else {
  sequelize = new Sequelize(process.env.POSTGRES_URL as string, {
    dialectModule: require('pg'),
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

const startDatabaseConnection = async () => {
  await sequelize.authenticate();
  console.log('Database connected');
};

export { sequelize, startDatabaseConnection };
