'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Job.init({
    title: DataTypes.STRING,
    joining_date: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Job',
  });
  Job.associate = models => {
  Job.belongsTo(models.User, { foreignKey: 'userId' });
  Job.belongsTo(models.Post, { foreignKey: 'postId' });
  return Job;
  }
};