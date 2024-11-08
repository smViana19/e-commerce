'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'products_category_id_fkey');
    await queryInterface.changeColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      onDelete: 'CASCADE', // Adiciona comportamento de deletar em cascata
      onUpdate: 'CASCADE', // Adiciona comportamento de atualizar em cascata
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      // Remover os atributos onDelete e onUpdate no rollback
      onDelete: null,
      onUpdate: null,
    });
  }
};
