const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, Model, DataTypes } = require('sequelize');

const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

class Yo extends Model {}
Yo.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    Estudios: DataTypes.STRING,
    Proyectos: DataTypes.STRING,
    Frameworks: DataTypes.STRING,
    hobbies: DataTypes.STRING 
  },
  { sequelize, modelName: 'yo' }
);

// Sincronizar la base de datos con el modelo y luego insertar datos
sequelize.sync({ force: false })
  .then(async () => {
    try {
      const existingData = await Yo.findAll();
      if (existingData.length === 0) {
        const datosAInsertar = [
          {
            firstName: 'Sebastian',
            lastName: 'Concha',
            email: 'sebastian.concha@alumnos.ucn.cl',
            description: 'Estudiante de ICCI en la UCN. Experiencia en Enseñanza básica y media en el Liceo Experimental Artístico.',
            Estudios: 'Enseñanza básica y media: Liceo Experimental Artístico, actualmente estudiante de ICCI en la UCN',
            Proyectos: 'API para la Facultad de Ing y Cs Geológicas',
            Frameworks: 'Python, JavaScript, C++',
            hobbies: 'Programación, música, deportes' // Agregar hobbies aquí
          }
        ];

        await Yo.bulkCreate(datosAInsertar);
        console.log('Datos migrados exitosamente');
      } else {
        console.log('Los datos ya existen en la base de datos, no se migraron nuevamente.');
      }
    } catch (error) {
      console.error('Error al migrar datos:', error);
    }
  });

// Obtener todos los registros de Yo bajo la ruta /api/profile
app.get('/api/profile', async (req, res) => {
  try {
    const yo = await Yo.findAll();
    res.send(yo);
  } catch (error) {
    res.status(500).send('Error al obtener la información');
  }
});

// Actualizar un registro de Yo por ID
app.put('/api/profile/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const yo = await Yo.findByPk(id);
    if (!yo) {
      return res.status(404).send('Registro no encontrado');
    }
    // Actualizar los campos necesarios
    const { firstName, lastName, email, description, Estudios, Proyectos, Frameworks, hobbies } = req.body;
    await yo.update({
      firstName,
      lastName,
      email,
      description,
      Estudios,
      Proyectos,
      Frameworks,
      hobbies
    });

    res.send('Registro actualizado exitosamente');
  } catch (error) {
    res.status(500).send('Error al actualizar la información');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
