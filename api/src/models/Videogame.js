const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      released: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      description: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING,
      },
      createInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false, // PARA ELIMINAR EL CREATEAT Y EL UPDATEAT DE LA TABLA DE DB
    }
  );
};
