/**
  Order.js
  Class model that

  @param sequelize
*/

const Sequelize = require('sequelize');

module.exports =
  class Order extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        customer_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
             model: 'customer',
             key: 'id'
          },
        },
        restaurant_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
             model: 'restaurant',
             key: 'id'
          },
        },
      }, {
        tableName: 'order',
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
      this.belongsTo(models.Customer, {
        onDelete: 'RESTRICT',
        foreignKey: 'customer_id',
        targetKey: 'id'
      });
      this.belongsTo(models.Restaurant, {
        onDelete: 'RESTRICT',
        foreignKey: 'restaurant_id',
        targetKey: 'id'
      });
    }
  };
