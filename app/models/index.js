const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];


const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Filter only JavaScript files and avoid hidden files
fs.readdirSync(__dirname)
  .filter((file) => file.endsWith('.js') && file !== basename && !file.startsWith('.'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    console.log(`Loading model: ${model.name}`);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    console.log(`Associating model: ${modelName}`);
    db[modelName].associate(db);
  }
});


sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));
  
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
