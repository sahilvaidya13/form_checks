const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Applicant = sequelize.define(
  "applicant",
  {
    applicant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mission: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    expectedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    visaType: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    purpose: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    captcha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

// Export the model
module.exports = Applicant;
