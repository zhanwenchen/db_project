/**
  Inventory.js
  Class model that

  @param sequelize
*/

const Sequelize = require('sequelize');

module.exports =
  class Inventory extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        restaurant_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
             model: 'restaurant',
             key: 'id'
          },
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        quantity: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
      }, {
        tableName: 'inventory',
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
      this.belongsTo(models.Restaurant, {
        onDelete: 'RESTRICT',
        foreignKey: 'restaurant_id',
        targetKey: 'id'
      });
    }
  };
