/**
  Customer.js
  Class model that

  @param sequelize
*/

const Sequelize = require('sequelize');

module.exports =
  class Customer extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phone: {
          type: Sequelize.CHAR(12),
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      }, {
        tableName: 'customer',
        sequelize,
        timestamps: false
      });
    }

    static associate(models) {
      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.Post);
      // this.hasMany(models.Comment, {
      //   onDelete: 'CASCADE',
      //   foreignKey: {
      //     allowNull: false,
      //   },
      // });

      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.Post);
      // this.hasMany(models.Order);
    }
  };
