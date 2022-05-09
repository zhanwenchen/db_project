/**
  OrderedItem.js
  Class model that

  @param sequelize
*/

const Sequelize = require('sequelize');

module.exports =
  class OrderedItem extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        order_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
             model: 'order',
             key: 'id'
          },
        },
        inventory_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
             model: 'inventory',
             key: 'id'
          },
        },
        quantity: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        notes: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      }, {
        tableName: 'ordered_item',
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
      this.belongsTo(models.Order, {
        onDelete: 'RESTRICT',
        foreignKey: 'order_id',
        targetKey: 'id'
      });
      this.belongsTo(models.Inventory, {
        onDelete: 'RESTRICT',
        foreignKey: 'inventory_id',
        targetKey: 'id'
      });
    }
  };

// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define('ordered_item',
//     {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//       },
//       order_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//            model: 'order',
//            key: 'id'
//         },
//       },
//       inventory_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//            model: 'inventory',
//            key: 'id'
//         },
//       },
//       quantity: {
//         type: Sequelize.DECIMAL(10, 2),
//         allowNull: false,
//       },
//       notes: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },);
// };
