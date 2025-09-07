const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Resume = sequelize.define('Resume', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  analysisData: {
    type: DataTypes.JSONB, // JSONB is highly efficient for storing JSON in PostgreSQL
    allowNull: false,
  },
});

module.exports = Resume;