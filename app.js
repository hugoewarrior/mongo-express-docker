//const Estudiantes = require('./src/estudiantes');
const bodyParser = require('body-parser');
require('dotenv').config();
var mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();

/**
 * DB connection
 */

var mongoDB = process.env.MONGODB_SERVER;
mongoose.connect(mongoDB, { useNewUrlParser: true, });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', (m) => console.log("Database connection opened, we are cool to go!"));


/**
 * Pug Injectors
 */

app.set('view engine', 'pug');
app.set('views', './views');


/**
 * Middlewares 
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());


/**
 * DB Schemas
 */

const Estudiantes = require('./models/Estudiantes');


/**
 * Start - Services ************************************************************************
 */

//const st = new Estudiantes();

/**
 * Brings all students
 */
/* app.get('/estudiantes', (req, resp) => {
    resp.send(JSON.stringify(st.sudents))
});
 */

app.get('/estudiantes', async (req, res) => {
    const estudiantes = await Estudiantes.find().select('nombre edad');
    res.render('estudiantes', { estudiantes });
});

/**
 * Brings specific student
 */

/* app.get('/estudiantes/:id', (req, resp) => {
    let ans = st.getSpecificStudent(req.params.id)
    resp.send(JSON.stringify(ans))
}); */

app.get('/estudiantes/:id', async (req, res) => {
    try {
        const estudiante = await Estudiantes.findById(req.params.id).select('nombre edad');
        res.render('estudiantes_detail', { estudiante });
    } catch (error) {
        console.log(error);
        res.send('Error');
    }
});

/**
 * Creates a new student
 */

/* app.post('/estudiantes', (req, resp) => {
    let ans = st.createStudent(req.body)
    resp.send(ans)
}); */

app.post('/estudiantes', async (req, res) => {
    const { nombre, edad } = req.body;
    await Estudiantes.create({ nombre, edad });
    const estudiantes = await Estudiantes.find().select('nombre edad');
    res.render('estudiantes', { estudiantes, success: true });
});

/**
 * Edits one student
 */
/* app.put('/estudiantes', (req, resp) => {
    let ans = st.editStudent(req.body)
    resp.send(ans)
}); */



/**
 * Deletes one student
 */

/* app.delete('/estudiantes/:id', (req, resp) => {
    let ans = st.deleteStudent(req.params.id)
    resp.send(JSON.stringify(ans))
});
 */

app.delete('/api/estudiantes/:id', async (req, res) => {
    try {
        await Estudiantes.findByIdAndDelete(req.params.id);
        res.status(202).json({});
    } catch (error) {
        console.log(error);
        res.json({});
    }
});

/**
 * End - Services ***************************************************
 */


app.listen(3000, () => {
    console.log("Rest API running on port 3000, By Hugo!")
}); 
/* db().then(() => {
    app.listen(PORT, () => {
      console.log(`Ejecutando en el puerto ${PORT}`);
    });
}); */