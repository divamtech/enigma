// module.exports = (sequelize, Sequelize) => {
// const EnvData = sequelize.define(
//   'EnvData',
//   {
//     key: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     value: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: true,
//   },
//   )
//   return EnvData
// }
module.exports = (sequelize, Sequelize) => {
  const EnvData = sequelize.define(
    'EnvData',
    {
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.JSON, // Use JSON type to store JSON data
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  )

  return EnvData
}
