import { Sequelize  } from "sequelize";

const sequelize = new Sequelize(
    'myan_type',
    'root',
    '',
    {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
    }
);
export default sequelize;