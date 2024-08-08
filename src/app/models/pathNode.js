module.exports = (sequelize, Sequelize) => {
  const Node = sequelize.define(
    'Node',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'nodes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      type: {
        type: Sequelize.ENUM('folder', 'file'),
        allowNull: false,
      },
      data: {
        type: Sequelize.JSON,
        allowNull: true, // Only used for files
      },
    },
    {
      tableName: 'nodes',
    },
  )
  return Node
}
