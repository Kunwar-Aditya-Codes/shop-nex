import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection';

const Verification = sequelize.define<Model>(
  'Verification',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    },
  },
  {
    tableName: 'verifications',
    timestamps: true,
  }
);

export default Verification;
