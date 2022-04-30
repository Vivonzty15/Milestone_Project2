'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question_Type.init({
    question_type_id: DataTypes.INTEGER,
    question_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question_Type',
  });
  return Question_Type;
};