const mongoose = require('mongoose'); //nueva forma de importar
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('DB conectada');
    } catch (error) {
        console.log(error);
        process.exit(1); //En caso de que haya un error de conexion detener la app
    }
}

module.exports = conectarDB; //nueva forma de exportar una funcion